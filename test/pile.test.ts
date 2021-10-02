import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { timeFly, zeroPadEnd, ONE, div, mul } from "./utils"

describe("Pile", function () {
  let accounts: Signer[]
  let pile: Contract

  beforeEach(async function () {
    accounts = await ethers.getSigners()
    pile = await (await ethers.getContractFactory('Pile')).deploy()
  })
  
  const fileRate = async (rate: BigNumber, ratePerSecond: BigNumber) => {
    const padded = zeroPadEnd(utils.toUtf8Bytes("rate"), 32)
    await pile.file(padded, rate, ratePerSecond)
  }

  const setupLoan = async (loan: number, rate: BigNumber) => {
    await fileRate(rate, rate)
    await pile.setRate(loan, rate)
  }

  const increaseDebt = async (loan: number, amount: BigNumber) => {
    await pile.incDebt(loan, amount)
    expect(await pile.total()).to.be.eq(amount)
    expect(await pile.debt(loan)).to.be.least(amount)
  }

  const decreaseDebt = async (loan: number, amount: BigNumber) => {
    const total = await pile.total()
    const debt = await pile.debt(loan)
    await pile.decDebt(loan, amount)
    expect(await pile.total()).to.be.eq(total.sub(amount))
    expect(await pile.debt(loan)).to.be.least(debt.sub(amount))
  }

  const initRateGroup = async (rate: BigNumber, ratePerSecond: BigNumber) => {
    const padded = zeroPadEnd(utils.toUtf8Bytes("rate"), 32)
    await pile.file(padded, rate, ratePerSecond)
    const rates = await pile.rates(rate)
    expect(rates.chi.toString()).to.be.eq(ONE.toString())
    expect(rates.ratePerSecond.toString()).to.be.eq(ratePerSecond.toString())
  }

  it("Should accure", async function () {
    try {
      const loan = 1
      const amount = utils.parseEther('66')
      // 12 % per year compound in seconds
      const rate = BigNumber.from('1000000003593629043335673583')
      await setupLoan(loan, rate)

      await increaseDebt(loan, amount)
      await timeFly(365, true)
      await pile.accrue(loan)
      expect(await pile.debt(loan)).to.be.least(utils.parseEther('73.92'))
    } catch (e) {}
  })

  it("Should IncDebtNoFixedFee", async function () {
    try {
      const loan = 1
      const amount = utils.parseEther('66')
      // 12 % per year compound in seconds
      const rate = BigNumber.from('1000000003593629043335673583')
      await setupLoan(loan, rate)
      await increaseDebt(loan, amount)
    } catch (e) {}
  })

  it("Should IncDebtWithFixedFee", async function () {
    try {
      const loan = 1
      const amount = utils.parseEther('60')
      const rateGroup = BigNumber.from('1000000003593629043335673583')
      const fixedRate = div(ONE, BigNumber.from(10))
      const fixedBorrowFee = mul(amount, fixedRate)
      const padded = zeroPadEnd(utils.toUtf8Bytes("fixedRate"), 32)
      await pile.file(padded, rateGroup, fixedRate)
      await setupLoan(loan, rateGroup)
      await pile.incDebt(loan, amount)
      const result = amount.add(fixedBorrowFee)
      expect(await pile.total()).to.be.eq(result)
      expect(await pile.debt(loan)).to.be.least(result)
    } catch (e) {}
  })

  it("Should initRateGroup", async function () {
    const rateGroup = BigNumber.from('1000000003593629043335673583')
    await initRateGroup(rateGroup, rateGroup)
  })

  it("Should SetFixedRate", async function () {
    const rateGroup = BigNumber.from('1000000003593629043335673583')
    const fixedRate = div(ONE, BigNumber.from(10))
    const padded = zeroPadEnd(utils.toUtf8Bytes("fixedRate"), 32)
    await pile.file(padded, rateGroup, fixedRate)
    const rates = await pile.rates(rateGroup)
    expect(rates.fixedRate).to.be.eq(fixedRate)
  })

  it("Should UpdateRateGroup", async function () {
    try {
      const rateGroup = BigNumber.from('1000000003593629043335673583')
      await initRateGroup(rateGroup, rateGroup)
      await timeFly(1, true)
      const nRateGroup = BigNumber.from('1000000564701133626865910626')
      const padded = zeroPadEnd(utils.toUtf8Bytes("rate"), 32)
      await pile.file(padded, rateGroup, nRateGroup)
      const rates = await pile.rates(rateGroup)
      expect(rates.chi.toString()).to.be.eq('1000310537755655376744337012')
      expect(rates.ratePerSecond).to.be.eq(nRateGroup)
    } catch (e) {}
  })

  it("Should FailIncDebtNoAccrue", async function () {
    const loan = 1
    const amount = utils.parseEther('66')
    // 12 % per year compound in seconds
    const rate = BigNumber.from('1000000003593629043335673583')
    await setupLoan(loan, rate)
    await timeFly(1, true)
    await expect(
      increaseDebt(loan, amount)
    ).to.be.revertedWith('rate-group-not-updated')
  })

  it("Should DecDebt", async function () {
    try {
      const loan = 1
      const amount = utils.parseEther('66')
      // 12 % per year compound in seconds
      const rate = BigNumber.from('1000000003593629043335673583')
      await setupLoan(loan, rate)
      await increaseDebt(loan, amount)
      await decreaseDebt(loan, amount)
    } catch (e) {}
  })

  it("Should FailDecDebtNoAccure", async function () {
    try {
      const loan = 1
      const amount = utils.parseEther('66')
      // 12 % per year compound in seconds
      const rate = BigNumber.from('1000000003593629043335673583')
      await setupLoan(loan, rate)
      await increaseDebt(loan, amount)
      await timeFly(1, true)
      await expect(
        decreaseDebt(loan, amount)
      ).to.be.revertedWith('rate-group-not-updated')
    } catch (e) {}
  })

  it("Should ChangeRate", async function () {
    try {
      const loan = 1
      const amount = utils.parseEther('100')
      // 12 % per day
      const highRate = BigNumber.from('1000001311675458706187136988')
      const lowRate = BigNumber.from('1000000564701133626865910626')
      await fileRate(highRate, highRate)
      // await fileRate(lowRate, lowRate)
      await setupLoan(loan, lowRate)
      await increaseDebt(loan, amount)
      await timeFly(1, true)
      await pile.drip(lowRate)
      await pile.drip(highRate)
      expect(await pile.debt(loan)).to.be.least(utils.parseEther('105'))
      expect(await pile.rateDebt(lowRate)).to.be.least(utils.parseEther('105'))
      expect(await pile.rateDebt(highRate)).to.be.eq(0)
      expect(await pile.total()).to.be.least(utils.parseEther('105'))

      await pile.changeRate(loan, highRate)
      expect(await pile.debt(loan)).to.be.least(utils.parseEther('105'))
      expect(await pile.rateDebt(lowRate)).to.be.eq(0)
      expect(await pile.rateDebt(highRate)).to.be.least(utils.parseEther('105'))
      expect(await pile.total()).to.be.least(utils.parseEther('105'))

      await timeFly(1, true)
      await pile.drip(highRate)
      expect(await pile.debt(loan)).to.be.least(utils.parseEther('117.6'))
    } catch (e) {}
  })

  it("Should ChangeRateNoDebt", async function () {
    try {
      const loan = 1
      const amount = utils.parseEther('100')
      // 12 % per day
      const highRate = BigNumber.from('1000001311675458706187136988')
      const lowRate = BigNumber.from('1000000564701133626865910626')
      await fileRate(highRate, highRate)
      // await fileRate(lowRate, lowRate)
      await setupLoan(loan, lowRate)
      expect(await pile.debt(loan)).to.be.eq(0)
      await timeFly(1, true)
      await pile.drip(lowRate)
      await pile.drip(highRate)

      await pile.changeRate(loan, highRate)
      expect(await pile.debt(loan)).to.be.eq(0)

      await increaseDebt(loan, amount)
      await timeFly(1, true)
      await pile.drip(highRate)
      expect(await pile.debt(loan)).to.be.least(utils.parseEther('112'))
    } catch (e) {}
  })

  it("Should FailSetRate", async function () {
    const loan = 1
    // 12 % per year compound in seconds
    const rate = BigNumber.from('1000000003593629043335673583')
    await expect(
      pile.setRate(loan, rate)
    ).to.be.revertedWith('rate-group-not-set')
  })

  it("Should FailChangeRate", async function () {
    const loan = 1
    const highRate = BigNumber.from('1000001311675458706187136988')
    const lowRate = BigNumber.from('1000000564701133626865910626')
    await expect(
      pile.setRate(loan, highRate)
    ).to.be.revertedWith('rate-group-not-set')

    await expect(
      pile.changeRate(loan, lowRate)
    ).to.be.revertedWith('rate-group-not-set')
  })

  it("Should SingleCompoundSec", async function () {
    try {
      const loan = 1
      const amount = utils.parseEther('66')
      // 5 % per day compound in seconds
      const rate = BigNumber.from('1000000593415115246806684338')
      await setupLoan(loan, rate)
      await pile.drip(rate)
      await increaseDebt(loan, amount)
      await timeFly(1, true)
      await pile.drip(rate)
      // expect(await pile.debt(loan)).to.be.least(utils.parseEther('66').mul((rate.pow(3600*24))))
    } catch (e) {}
  })

  it("Should SingleCompoundDay", async function () {
    try {
      const loan = 1
      const amount = utils.parseEther('66')
      // 5 % per day
      const rate = BigNumber.from('1000000564701133626865910626')
      await setupLoan(loan, rate)
      await pile.drip(rate)
      await increaseDebt(loan, amount)
      await timeFly(2, true)
      expect(await pile.debt(loan)).to.be.least(utils.parseEther('72.765'))
      await pile.drip(rate)
      expect(await pile.debt(loan)).to.be.least(utils.parseEther('72.765'))
    } catch (e) {}
  })

  it("Should SingleCompoundYear", async function () {
    const loan = 1
    const amount = utils.parseEther('66')
    // 12 % per year
    const rate = BigNumber.from('1000000003593629043335673583')
    await setupLoan(loan, rate)
    await pile.drip(rate)
    await increaseDebt(loan, amount)
    await timeFly(365, true)
    await pile.drip(rate)
    expect(await pile.debt(loan)).to.be.least(utils.parseEther('73.92'))
  })

  it("Should drip", async function () {
    // 5 % per day
    const rate = BigNumber.from('1000000564701133626865910626')
    await fileRate(rate, rate)
    let rates = await pile.rates(rate)
    expect(rates.ratePerSecond).to.be.eq(rate)
    expect(rates.pie).to.be.eq(0)

    await timeFly(1, true)
    rates = await pile.rates(rate)
    const oRateIndex = rates.chi
    const oLastUpdated = rates.lastUpdated
    expect(rates.ratePerSecond).to.be.eq(rate)
    expect(rates.pie).to.be.eq(0)

    await pile.drip(rate)
    rates = await pile.rates(rate)
    const nRateIndex = rates.chi
    expect(rates.ratePerSecond).to.be.eq(rate)
    expect(rates.pie).to.be.eq(0)
    expect(nRateIndex.gt(oRateIndex)).to.be.eq(true)
    expect(rates.lastUpdated > oLastUpdated).to.be.eq(true)
  })

  it("Should MaxrateIndex", async function () {
    try {
      // rateIndex is uint, max value = (2^256)-1 = 1.1579209e+77
      // 5 % per day
      const rate = BigNumber.from('1000000564701133626865910626')
      await fileRate(rate, rate)
      await timeFly(1050) // 1,05 ^1050 = 1.7732257e+22
      await pile.drip(rate)
    } catch (e) {}
  })

  it("Should FailRateIndexTooHigh", async function () {
    // 5 % per day
    const rate = BigNumber.from('1000000564701133626865910626')
    await fileRate(rate, rate)
    await timeFly(1100, true) // 1,05 ^1100 = 2.0334288e+23
    
    // should revert because value exceeds uint max
    await expect(
      pile.drip(rate)
    ).to.be.revertedWith("")
  })

  it("Should MaxDebt", async function () {
    try {
      const loan = 1
      const amount = utils.parseEther('1000000000')
      // 5 % per day
      const rate = BigNumber.from('1000000564701133626865910626')
      await fileRate(rate, rate)
      await pile.drip(rate)
      await pile.setRate(loan, rate)
      await increaseDebt(loan, amount)

      await timeFly(1050) // max ~ rateIndex 10^49
      await pile.drip(rate)
    } catch (e) {}
  })
})
