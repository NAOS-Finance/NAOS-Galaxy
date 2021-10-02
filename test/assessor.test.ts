import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { zeroPadEnd, percentToBig, timeFly, now, ONE } from "./utils"
import { NAVFeedMock } from '../types/NAVFeedMock'
import { TrancheMock } from '../types/TrancheMock'
import { Assessor } from '../types/Assessor'
import { toUtf8Bytes } from "ethers/lib/utils"

describe("Assessor", function () {
  let accounts: Signer[]
  let assessor: Contract
  let seniorTranche: Contract
  let juniorTranche: Contract
  let feed: Contract

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    seniorTranche = await (await ethers.getContractFactory("TrancheMock")).deploy() as TrancheMock
    juniorTranche = await (await ethers.getContractFactory("TrancheMock")).deploy() as TrancheMock
    feed = await (await ethers.getContractFactory("NAVFeedMock")).deploy() as NAVFeedMock
    assessor = await (await ethers.getContractFactory("Assessor")).deploy() as Assessor
    
    let padded = zeroPadEnd(utils.toUtf8Bytes("juniorTranche"), 32)
    await assessor.depend(padded, juniorTranche.address)

    padded = zeroPadEnd(utils.toUtf8Bytes("seniorTranche"), 32)
    await assessor.depend(padded, seniorTranche.address)

    padded = zeroPadEnd(utils.toUtf8Bytes("navFeed"), 32)
    await assessor.depend(padded, feed.address)
  })

  it("Should CurrentNAV", async () => {
    let padded = zeroPadEnd(utils.toUtf8Bytes("calcUpdateNAV"), 32)
    await feed["setReturn(bytes32,uint256)"](padded, utils.parseEther("100"))
    expect(await assessor.callStatic.calcUpdateNAV()).to.be.eq(utils.parseEther("100"))
  })

  it("Should FileAssessor", async () => {
    const maxReserve = utils.parseEther("10000")
    const maxSeniorRatio = percentToBig(80)
    const minSeniorRatio = percentToBig(75)
    const seniorInterestRate = BigNumber.from("1000000593415115246806684338") // 5% per day

    let padded = zeroPadEnd(toUtf8Bytes("seniorInterestRate"), 32)
    await assessor["file(bytes32,uint256)"](padded, seniorInterestRate)
    expect(await assessor.seniorInterestRate()).to.be.eq(seniorInterestRate)

    padded = zeroPadEnd(toUtf8Bytes("maxReserve"), 32)
    await assessor["file(bytes32,uint256)"](padded, maxReserve)
    expect(await assessor.maxReserve()).to.be.eq(maxReserve)

    padded = zeroPadEnd(toUtf8Bytes("maxSeniorRatio"), 32)
    await assessor["file(bytes32,uint256)"](padded, maxSeniorRatio)
    expect(await assessor.maxSeniorRatio()).to.be.eq(maxSeniorRatio)

    padded = zeroPadEnd(toUtf8Bytes("minSeniorRatio"), 32)
    await assessor["file(bytes32,uint256)"](padded, minSeniorRatio)
    expect(await assessor.minSeniorRatio()).to.be.eq(minSeniorRatio)
  })

  it("Should FileMinSeniorRatio", async () => {
    const minSeniorRatio = percentToBig(75)

    let padded = zeroPadEnd(toUtf8Bytes("minSeniorRatio"), 32)
    await expect(
      assessor["file(bytes32,uint256)"](padded, minSeniorRatio)
    ).to.be.revertedWith("")
  })

  it("Should FileMaxSeniorRatio", async () => {
    const maxSeniorRatio = percentToBig(80)
    const minSeniorRatio = percentToBig(75)

    let padded = zeroPadEnd(toUtf8Bytes("maxSeniorRatio"), 32)
    await assessor["file(bytes32,uint256)"](padded, maxSeniorRatio)
    expect(await assessor.maxSeniorRatio()).to.be.eq(maxSeniorRatio)

    padded = zeroPadEnd(toUtf8Bytes("minSeniorRatio"), 32)
    await assessor["file(bytes32,uint256)"](padded, minSeniorRatio)
    expect(await assessor.minSeniorRatio()).to.be.eq(minSeniorRatio)

    padded = zeroPadEnd(toUtf8Bytes("maxSeniorRatio"), 32)
    await expect(
      assessor["file(bytes32,uint256)"](padded, minSeniorRatio.sub(1))
    ).to.be.revertedWith("")
  })

  it("Should BorrowerUpdate", async () => {
    let currencyAmount = utils.parseEther("100")
    await assessor.borrowUpdate(currencyAmount)
    // current senior ratio 0 no change
    expect(await assessor.seniorBalance()).to.be.eq(0)
    expect(await assessor.seniorDebt()).to.be.eq(0)

    const seniorSupply = utils.parseEther("200")
    const seniorRatio = percentToBig(60)
    await assessor.changeSeniorAsset(seniorRatio, seniorSupply, 0)
    expect(await assessor.seniorRatio()).to.be.eq(seniorRatio)

    await assessor.borrowUpdate(currencyAmount)
    // current senior ratio 0 no change

    const increase = currencyAmount.mul(seniorRatio).div(ONE)
    expect(await assessor.seniorBalance()).to.be.eq(seniorSupply.sub(increase))
    expect(await assessor.seniorDebt()).to.be.eq(increase)


    // very high increase very rare case
    currencyAmount = utils.parseEther("1000")
    await assessor.borrowUpdate(currencyAmount)

    expect(await assessor.seniorDebt()).to.be.eq(seniorSupply)
    expect(await assessor.seniorBalance()).to.be.eq(0)
  })

  it("Should ChangeSeniorAsset", async () => {
    let seniorSupply = utils.parseEther("100")
    let seniorRedeem = BigNumber.from(0)
    const seniorRatio = percentToBig(60)
    await assessor.changeSeniorAsset(seniorRatio, seniorSupply, seniorRedeem)
    expect(await assessor.seniorBalance()).to.be.eq(seniorSupply)
    expect(await assessor.seniorDebt()).to.be.eq(0)

    let padded = zeroPadEnd(toUtf8Bytes("approximatedNAV"), 32)
    await feed["setReturn(bytes32,uint256)"](padded, utils.parseEther("10"))
    await assessor.changeSeniorAsset(seniorRatio, 0, 0)

    expect(await assessor.seniorBalance()).to.be.eq(utils.parseEther("94"))
    expect(await assessor.seniorDebt()).to.be.eq(utils.parseEther("6"))

    seniorSupply = utils.parseEther("10")
    seniorRedeem = utils.parseEther("4")
    await assessor.changeSeniorAsset(seniorRatio, seniorSupply, seniorRedeem)
    expect(await assessor.seniorBalance()).to.be.eq(utils.parseEther("100"))
    expect(await assessor.seniorDebt()).to.be.eq(utils.parseEther("6"))
  })

  it("Should RepayUpdate", async () => {
    let repayAmount = utils.parseEther("100")
    await assessor.repaymentUpdate(repayAmount)
    expect(await assessor.seniorBalance()).to.be.eq(0)
    expect(await assessor.seniorDebt()).to.be.eq(0)

    let seniorSupply = utils.parseEther("200")
    let seniorRedeem = BigNumber.from(0)
    const seniorRatio = percentToBig(60)
    await assessor.changeSeniorAsset(seniorRatio, seniorSupply, seniorRedeem)
    expect(await assessor.seniorBalance()).to.be.eq(seniorSupply)
    expect(await assessor.seniorDebt()).to.be.eq(0)

    let borrowAmount = utils.parseEther("100")
    await assessor.borrowUpdate(borrowAmount)
    expect(await assessor.seniorBalance()).to.be.eq(utils.parseEther("140"))
    expect(await assessor.seniorDebt()).to.be.eq(utils.parseEther("60"))
    expect(await assessor.seniorDebt()).to.be.eq(borrowAmount.mul(seniorRatio).div(ONE))

    repayAmount = utils.parseEther("50")
    await assessor.repaymentUpdate(repayAmount)
    expect(await assessor.seniorBalance()).to.be.eq(utils.parseEther("170"))
    expect(await assessor.seniorDebt()).to.be.eq(utils.parseEther("30"))
  })

  it("Should SeniorInterest", async () => {
    const seniorInterestRate = BigNumber.from("1000000564701133626865910626") // 5% per day
    let padded = zeroPadEnd(toUtf8Bytes("seniorInterestRate"), 32)
    await assessor["file(bytes32,uint256)"](padded, seniorInterestRate)
    
    padded = zeroPadEnd(toUtf8Bytes("approximatedNAV"), 32)
    await feed["setReturn(bytes32,uint256)"](padded, utils.parseEther("200"))

    let seniorSupply = utils.parseEther("200")
    let seniorRedeem = BigNumber.from(0)
    const seniorRatio = percentToBig(50)
    await assessor.changeSeniorAsset(seniorRatio, seniorSupply, seniorRedeem)
    expect(await assessor.seniorBalance()).to.be.eq(utils.parseEther("100"))
    expect(await assessor.seniorDebt()).to.be.least(utils.parseEther("100"))

    await timeFly(1, true)
    expect(await assessor.seniorDebt()).to.be.least(utils.parseEther("105"))
    await assessor.dripSeniorDebt()
    expect(await assessor.seniorDebt()).to.be.least(utils.parseEther("105"))

    await timeFly(1, true)
    await assessor.dripSeniorDebt()
    expect(await assessor.seniorDebt()).to.be.least(utils.parseEther("110.25"))
  })

  it("Should CalcSeniorTokenPrice", async () => {
    expect(await assessor["calcSeniorTokenPrice(uint256,uint256)"](0, 0)).to.be.eq(ONE)

    let reserve = utils.parseEther("50")
    let nav = utils.parseEther("50")

    let padded = zeroPadEnd(toUtf8Bytes("tokenSupply"), 32)
    await seniorTranche["setReturn(bytes32,uint256)"](padded, 0)

    let seniorTokenPrice = await assessor["calcSeniorTokenPrice(uint256,uint256)"](nav, reserve)
    expect(seniorTokenPrice).to.be.eq(ONE)

    padded = zeroPadEnd(toUtf8Bytes("approximatedNAV"), 32)
    await feed["setReturn(bytes32,uint256)"](padded, utils.parseEther("200"))

    let seniorSupply = utils.parseEther("200")
    let seniorRedeem = BigNumber.from(0)
    const seniorRatio = percentToBig(50)
    await assessor.changeSeniorAsset(seniorRatio, seniorSupply, seniorRedeem)
    expect(await assessor.seniorBalance()).to.be.eq(utils.parseEther("100"))
    expect(await assessor.seniorDebt()).to.be.eq(utils.parseEther("100"))

    padded = zeroPadEnd(toUtf8Bytes("tokenSupply"), 32)
    await seniorTranche["setReturn(bytes32,uint256)"](padded, utils.parseEther("100"))

    reserve = utils.parseEther("100")
    nav = utils.parseEther("100")
    seniorTokenPrice = await assessor["calcSeniorTokenPrice(uint256,uint256)"](nav, reserve)
    expect(reserve.add(nav)).to.be.eq((await assessor.calcSeniorAssetValue(await assessor.seniorDebt(), await assessor.seniorBalance())))
    expect(seniorTokenPrice).to.be.eq(BigNumber.from(2).mul(ONE))

    reserve = utils.parseEther("1000")
    nav = utils.parseEther("100")
    seniorTokenPrice = await assessor["calcSeniorTokenPrice(uint256,uint256)"](nav, reserve)
    expect(seniorTokenPrice).to.be.eq(BigNumber.from(2).mul(ONE))

    reserve = utils.parseEther("100")
    nav = utils.parseEther("1000")
    seniorTokenPrice = await assessor["calcSeniorTokenPrice(uint256,uint256)"](nav, reserve)
    expect(seniorTokenPrice).to.be.eq(BigNumber.from(2).mul(ONE))

    reserve = utils.parseEther("25")
    nav = utils.parseEther("25")
    seniorTokenPrice = await assessor["calcSeniorTokenPrice(uint256,uint256)"](nav, reserve)
    expect(seniorTokenPrice).to.be.eq(BigNumber.from(5).mul(ONE).div(10))
  })

  it("Should CalcJuniorTokenPrice", async () => {
    expect(await assessor["calcJuniorTokenPrice(uint256,uint256)"](0, 0)).to.be.eq(ONE)

    let reserve = utils.parseEther("50")
    let nav = utils.parseEther("50")

    let padded = zeroPadEnd(toUtf8Bytes("tokenSupply"), 32)
    await juniorTranche["setReturn(bytes32,uint256)"](padded, 0)

    let juniorTokenPrice = await assessor["calcJuniorTokenPrice(uint256,uint256)"](nav, reserve)
    expect(juniorTokenPrice).to.be.eq(ONE)

    padded = zeroPadEnd(toUtf8Bytes("approximatedNAV"), 32)
    await feed["setReturn(bytes32,uint256)"](padded, utils.parseEther("200"))

    let seniorSupply = utils.parseEther("200")
    let seniorRedeem = BigNumber.from(0)
    const seniorRatio = percentToBig(50)
    await assessor.changeSeniorAsset(seniorRatio, seniorSupply, seniorRedeem)
    expect(await assessor.seniorBalance()).to.be.eq(utils.parseEther("100"))
    expect(await assessor.seniorDebt()).to.be.eq(utils.parseEther("100"))

    padded = zeroPadEnd(toUtf8Bytes("tokenSupply"), 32)
    await juniorTranche["setReturn(bytes32,uint256)"](padded, utils.parseEther("100"))

    reserve = utils.parseEther("300")
    nav = utils.parseEther("200")
    juniorTokenPrice = await assessor["calcJuniorTokenPrice(uint256,uint256)"](nav, reserve)
    expect(juniorTokenPrice).to.be.eq(BigNumber.from(3).mul(ONE))

    reserve = utils.parseEther("300")
    nav = utils.parseEther("0")
    juniorTokenPrice = await assessor["calcJuniorTokenPrice(uint256,uint256)"](nav, reserve)
    expect(juniorTokenPrice).to.be.eq(ONE)

    reserve = utils.parseEther("150")
    nav = utils.parseEther("0")
    juniorTokenPrice = await assessor["calcJuniorTokenPrice(uint256,uint256)"](nav, reserve)
    expect(juniorTokenPrice).to.be.eq(0)

    await seniorTranche["setReturn(bytes32,uint256)"](padded, utils.parseEther("200"))
    let seniorTokenPrice = await assessor["calcSeniorTokenPrice(uint256,uint256)"](nav, reserve)
    expect(seniorTokenPrice).to.be.eq(BigNumber.from(75).mul(ONE).div(100))
  })

  it("Should CalcTokenPrices", async () => {
    let reserve = utils.parseEther("300")
    let nav = utils.parseEther("200")
    let juniorTokenPrice: BigNumber
    let seniorTokenPrice: BigNumber
    let prices = await assessor["calcTokenPrices(uint256,uint256)"](0, 0)
    juniorTokenPrice = prices[0]
    seniorTokenPrice = prices[1]
    expect(juniorTokenPrice).to.be.eq(ONE)
    expect(seniorTokenPrice).to.be.eq(ONE)

    let padded = zeroPadEnd(toUtf8Bytes("approximatedNAV"), 32)
    await feed["setReturn(bytes32,uint256)"](padded, utils.parseEther("200"))

    let seniorSupply = utils.parseEther("200")
    let seniorRedeem = BigNumber.from(0)
    const seniorRatio = percentToBig(50)
    await assessor.changeSeniorAsset(seniorRatio, seniorSupply, seniorRedeem)
    expect(await assessor.seniorBalance()).to.be.eq(utils.parseEther("100"))
    expect(await assessor.seniorDebt()).to.be.eq(utils.parseEther("100"))

    padded = zeroPadEnd(toUtf8Bytes("tokenSupply"), 32)
    await juniorTranche["setReturn(bytes32,uint256)"](padded, utils.parseEther("100"))

    
    prices = await assessor["calcTokenPrices(uint256,uint256)"](nav, reserve)
    juniorTokenPrice = prices[0]
    seniorTokenPrice = prices[1]
    expect(juniorTokenPrice).to.be.eq(BigNumber.from(3).mul(ONE))
    expect(seniorTokenPrice).to.be.eq(ONE)
  })
})