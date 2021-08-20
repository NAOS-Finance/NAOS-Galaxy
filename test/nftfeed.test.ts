import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { zeroPadEnd, percentToBig, ONE } from "./utils"
import { BaseNFTFeed } from '../types/BaseNFTFeed'
import { ShelfMock } from '../types/ShelfMock'
import { PileMock } from '../types/PileMock'

describe("NFTFeed", function () {
  const defaultThresholdRatio = percentToBig(80)
  const defaultCeilingRatio = percentToBig(60)
  const defaultRate = BigNumber.from('1000000564701133626865910626')     // 5 % day

  let accounts: Signer[]
  let feed: Contract
  let pile: Contract
  let shelf: Contract

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    feed = await (await ethers.getContractFactory("BaseNFTFeed")).deploy() as BaseNFTFeed
    shelf = await (await ethers.getContractFactory("ShelfMock")).deploy() as ShelfMock
    pile = await (await ethers.getContractFactory("PileMock")).deploy() as PileMock
    
    let padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await feed.depend(padded, shelf.address)

    padded = zeroPadEnd(utils.toUtf8Bytes("pile"), 32)
    await feed.depend(padded, pile.address)
    await init()
  })

  const init = async () => {
    // risk group  => 0
    // thresholdRatio => 80%
    // ceilingRatio => 60%
    // interestRatio: 0%
    let padded = zeroPadEnd(utils.toUtf8Bytes("riskGroupNFT"), 32)
    await feed["file(bytes32,uint256,uint256,uint256,uint256)"](padded, 0, defaultThresholdRatio, defaultCeilingRatio, ONE)

    // risk group  => 1
    // thresholdRatio => 70%
    // ceilingRatio => 50%
    // interestRate => 12 % per year
    await feed["file(bytes32,uint256,uint256,uint256,uint256)"](padded, 1, percentToBig(70), percentToBig(50), BigNumber.from('1000000003593629043335673583'))

    // risk group  => 2
    // thresholdRatio => 70%
    // ceilingRatio => 50%
    // interestRate => 5 % per day
    await feed["file(bytes32,uint256,uint256,uint256,uint256)"](padded, 2, percentToBig(70), percentToBig(50), defaultRate)

    // risk group  => 3
    // ceiling ratio => 100%
    // thresholdRatio => 70%
    // interest rate => 5% per day
    await feed["file(bytes32,uint256,uint256,uint256,uint256)"](padded, 3, percentToBig(70), ONE, defaultRate)

    // risk group => 4 (used by collector tests)
    // ceiling ratio => 50%
    // thresholdRatio => 60%
    // interest rate => 5% per day
    await feed["file(bytes32,uint256,uint256,uint256,uint256)"](padded, 4, percentToBig(50), percentToBig(60), defaultRate)
  }

  const assertLoanValuesSetCorrectly = async (nftID: any, nftValue: BigNumber, loan: number, riskGroup: number, loanHasDebt: boolean) => {
    // check nft value set correctly
    expect(await feed.nftValues(nftID)).to.be.eq(nftValue)
    // check threshold computed correctly
    expect(await feed.threshold(loan)).to.be.eq(nftValue.mul(await feed.thresholdRatio(riskGroup)).div(ONE))
    // check ceiling computed correctly
    expect(await feed.currentCeiling(loan)).to.be.eq(nftValue.mul(await feed.ceilingRatio(riskGroup)).div(ONE))

    // check rate set correctly in pile
    if (loanHasDebt) {
      let padded = zeroPadEnd(utils.toUtf8Bytes("changeRate_loan"), 32)
      expect(await pile["values_uint(bytes32)"](padded)).to.be.eq(loan)

      padded = zeroPadEnd(utils.toUtf8Bytes("changeRate_rate"), 32)
      expect(await pile["values_uint(bytes32)"](padded)).to.be.eq(riskGroup)
    }
  }

  it("Should BasicNFT", async () => {
    const addr = "1".padStart(40, "0")
    const nftID = await feed["nftID(address,uint256)"](addr, 1)
    const value = utils.parseEther("100")
    await feed["update(bytes32,uint256)"](nftID, value)

    const loan = 1
    let padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await shelf["setReturn(bytes32,address,uint256)"](padded, addr, loan)

    expect(await feed.nftValues(nftID)).to.be.eq(value)
    expect(await feed.threshold(nftID)).to.be.eq(utils.parseEther("80"))
    expect(await feed.ceiling(nftID)).to.be.eq(utils.parseEther("60"))
  })

  it("Should UpdateRiskGroupLoanHasNoDebt", async () => {
    const addr = "1".padStart(40, "0")
    const nftID = await feed["nftID(address,uint256)"](addr, 1)
    const value = utils.parseEther("100")
    let risk = 1
    await feed["update(bytes32,uint256,uint256)"](nftID, value, risk)

    const loan = 1
    let padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await shelf["setReturn(bytes32,address,uint256)"](padded, addr, loan)
    await assertLoanValuesSetCorrectly(nftID, value, loan, risk, false)

    risk = 0
    await feed["update(bytes32,uint256,uint256)"](nftID, value, risk)
    await assertLoanValuesSetCorrectly(nftID, value, loan, risk, false)
  })

  it("Should UpdateNFTValueLoanHasNoDebt", async () => {
    const addr = "1".padStart(40, "0")
    const nftID = await feed["nftID(address,uint256)"](addr, 1)
    let value = utils.parseEther("100")
    let risk = 1
    await feed["update(bytes32,uint256,uint256)"](nftID, value, risk)

    const loan = 1
    let padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await shelf["setReturn(bytes32,address,uint256)"](padded, addr, loan)
    await assertLoanValuesSetCorrectly(nftID, value, loan, risk, false)

    value = BigNumber.from("1000")
    await feed["update(bytes32,uint256,uint256)"](nftID, value, risk)
    await assertLoanValuesSetCorrectly(nftID, value, loan, risk, false)
  })

  it("Should UpdateRiskGroupAndValueLoanHasDebt", async () => {
    const addr = "1".padStart(40, "0")
    const nftID = await feed["nftID(address,uint256)"](addr, 1)
    let value = utils.parseEther("100")
    let risk = 1
    const loan = 1
    let padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await shelf["setReturn(bytes32,address,uint256)"](padded, addr, loan)
    padded = zeroPadEnd(utils.toUtf8Bytes("nftlookup"), 32)
    await shelf["setReturn(bytes32,uint256)"](padded, loan)
    padded = zeroPadEnd(utils.toUtf8Bytes("pie"), 32)
    await pile["setReturn(bytes32,uint256)"](padded, 100)
    await feed["update(bytes32,uint256,uint256)"](nftID, value, risk)
    await assertLoanValuesSetCorrectly(nftID, value, loan, risk, false)

    value = BigNumber.from("1000")
    risk = 0
    await feed["update(bytes32,uint256,uint256)"](nftID, value, risk)
    await assertLoanValuesSetCorrectly(nftID, value, loan, risk, false)
  })

  it("Should FailUpdateRiskGroupDoesNotExist", async () => {
    const addr = "1".padStart(40, "0")
    const nftID = await feed["nftID(address,uint256)"](addr, 1)
    let value = utils.parseEther("100")
    let risk = 1000
    const loan = 1
    let padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await shelf["setReturn(bytes32,address,uint256)"](padded, addr, loan)
    await expect(
      feed["update(bytes32,uint256,uint256)"](nftID, value, risk)
    ).to.be.revertedWith("threshold for risk group not defined")
    await assertLoanValuesSetCorrectly(nftID, BigNumber.from(0), loan, risk, false)

    risk = 0
    await feed["update(bytes32,uint256,uint256)"](nftID, value, risk)
    await assertLoanValuesSetCorrectly(nftID, value, loan, risk, false)
  })

  it("Should BorrowEvent", async () => {
    const addr = "1".padStart(40, "0")
    const nftID = await feed["nftID(address,uint256)"](addr, 1)
    let value = utils.parseEther("100")
    let risk = 0
    const loan = 1
    let padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await shelf["setReturn(bytes32,address,uint256)"](padded, addr, loan)
    padded = zeroPadEnd(utils.toUtf8Bytes("loanRates"), 32)
    await pile["setReturn(bytes32,uint256)"](padded, loan)
    await feed["update(bytes32,uint256,uint256)"](nftID, value, risk)
    await feed.borrowEvent(loan)

    padded = zeroPadEnd(utils.toUtf8Bytes("setRate_loan"), 32)
    expect(await pile["values_uint(bytes32)"](padded)).to.be.eq(loan)

    padded = zeroPadEnd(utils.toUtf8Bytes("setRate_rate"), 32)
    expect(await pile["values_uint(bytes32)"](padded)).to.be.eq(risk)
  })

  it("Should Ceiling", async () => {
    const addr = "1".padStart(40, "0")
    const nftID = await feed["nftID(address,uint256)"](addr, 1)
    let value = utils.parseEther("100")
    let risk = 1
    const loan = 1
    let padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await shelf["setReturn(bytes32,address,uint256)"](padded, addr, loan)
    await feed["update(bytes32,uint256,uint256)"](nftID, value, risk)

    let ceiling = utils.parseEther("50")
    expect(await feed.ceiling(loan)).to.be.eq(ceiling)

    let amount = utils.parseEther("20")
    await feed.borrow(loan, amount)

    expect(await feed.ceiling(loan)).to.be.eq(ceiling.sub(amount))

    await feed.borrow(loan, ceiling.sub(amount))

    expect(await feed.ceiling(loan)).to.be.eq(0)
  })

  it("Should UpdateNFTCeilingExceedsBorrowedAmount", async () => {
    const addr = "1".padStart(40, "0")
    const nftID = await feed["nftID(address,uint256)"](addr, 1)
    let value = utils.parseEther("100")
    let risk = 1
    const loan = 1
    let padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await shelf["setReturn(bytes32,address,uint256)"](padded, addr, loan)
    await feed["update(bytes32,uint256,uint256)"](nftID, value, risk)
    await assertLoanValuesSetCorrectly(nftID, value, loan, risk, false)

    let ceiling = utils.parseEther("50")
    expect(await feed.ceiling(loan)).to.be.eq(ceiling)

    await feed.borrow(loan, ceiling)

    await feed["update(bytes32,uint256)"](nftID, value.sub(2))
    await assertLoanValuesSetCorrectly(nftID, value.sub(2), loan, risk, false)

    expect(await feed.ceiling(loan)).to.be.eq(0)
  })

  it("Should FailBorrowTooHigh", async () => {
    const addr = "1".padStart(40, "0")
    const nftID = await feed["nftID(address,uint256)"](addr, 1)
    let value = utils.parseEther("100")
    let risk = 1
    const loan = 1
    let padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await shelf["setReturn(bytes32,address,uint256)"](padded, addr, loan)
    await feed["update(bytes32,uint256,uint256)"](nftID, value, risk)

    let ceiling = utils.parseEther("50")
    expect(await feed.ceiling(loan)).to.be.eq(ceiling)

    await expect(
      feed.borrow(loan, ceiling.add(1))
    ).to.be.revertedWith("borrow-amount-too-high")
  })
})