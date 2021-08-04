import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { timeFly } from "./utils"

describe("Interest", function () {
  let interest: Contract
  const ONE: BigNumber = BigNumber.from(10).pow(27)

  beforeEach(async function () {
    interest = await (await ethers.getContractFactory('Interest')).deploy()
  })

  it("Should update chi in second", async function () {
    // 5% per day compounds in seconds
    const rate = BigNumber.from('1000000593415115246806684338')
    const currentBlock = await ethers.provider.getBlock('latest')
    const timestamp = currentBlock.timestamp
    const chi = await interest.chargeInterest(ONE, rate, timestamp)
    // add one day
    await timeFly(1)
    const _chi = await interest.chargeInterest(chi, rate, timestamp)
    expect(_chi.toString()).to.be.eq('1052608164847005065391965708')
  })

  it("Should update chi in day", async function () {
    // 5% per day
    const rate = BigNumber.from('1000000564701133626865910626')
    const currentBlock = await ethers.provider.getBlock('latest')
    const timestamp = currentBlock.timestamp
    const chi = await interest.chargeInterest(ONE, rate, timestamp)
    // add two days
    await timeFly(2)
    const _chi = await interest.chargeInterest(chi, rate, timestamp)
    expect(_chi.toString()).to.be.eq('1102500000000000000000033678')
  })

  it("Should compounding", async function () {
    // 5% per day
    const rate = BigNumber.from('1000000564701133626865910626')
    const currentBlock = await ethers.provider.getBlock('latest')
    const timestamp = currentBlock.timestamp
    const pie = await interest.toPie(ONE, utils.parseEther('100'))
    const [ chi, delta] = await interest.compounding(ONE, rate, timestamp, pie)
    expect(delta.toString()).to.be.eq('0')
    // add one day
    await timeFly(1)
    const [ _chi, _delta] = await interest.compounding(ONE, rate, timestamp, pie)
    expect(_delta.toString()).to.be.eq('5000000000000000000')
    const oAmount = await interest.toAmount(pie, chi)
    const nAmount = await interest.toAmount(pie, _chi)
    const amtDiff = nAmount.sub(oAmount)
    expect(amtDiff.toString()).to.be.eq('5000000000000000000')
  })

  it("Should compounding delta amount", async function () {
    // 5% per day
    const rate = BigNumber.from('1000000564701133626865910626')
    const currentBlock = await ethers.provider.getBlock('latest')
    const timestamp = currentBlock.timestamp
    const pie = await interest.toPie(ONE, utils.parseEther('10'))
    // add one day and 666 seconds
    await timeFly(3 + 666 / 86400)
    const [ chi, delta] = await interest.compounding(rate, rate, timestamp, pie)
    const oAmount = await interest.toAmount(rate, pie)
    const nAmount = await interest.toAmount(chi, pie)
    const amtDiff = nAmount.sub(oAmount)
    expect(amtDiff.toString()).to.be.eq(delta.toString())
  })

  it("Should update chi in day", async function () {
    // 5% per day
    const rate = BigNumber.from('1000000564701133626865910626')
    const currentBlock = await ethers.provider.getBlock('latest')
    const timestamp = currentBlock.timestamp
    // add one day
    await timeFly(1)
    const chi = await interest.chargeInterest(utils.parseEther('100'), rate, timestamp)
    expect(chi.toString()).to.be.eq(utils.parseEther('105').toString())
  })
})
