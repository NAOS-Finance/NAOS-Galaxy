import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber } from "ethers"
import { zeroPadEnd, rdiv, rmul, percentToBig, ONE, MAX_UINT256 } from "./utils"
import { Tranche } from '../types/Tranche'
import { ReserveMock } from '../types/ReserveMock'
import { EpochTickerMock } from '../types/EpochTickerMock'
import { SimpleToken } from '../types/SimpleToken'
import { toUtf8Bytes, parseEther } from "ethers/lib/utils"

describe("Tranche", function () {

  let accounts: Signer[]
  let tranche: Contract
  let token: Contract
  let currency: Contract
  let reserve: Contract
  let epochTicker: Contract

  const closeAndUpdate = async (supplyFulfillment: BigNumber, redeemFulfillment: BigNumber, tokenPrice: BigNumber) => {
    const res = await tranche.callStatic.closeEpoch()
    await tranche.closeEpoch()
    const epochID = await epochTicker.currentEpoch()
    await epochTicker.incCurrentEpoch(1)
    await tranche.epochUpdate(epochID, supplyFulfillment, redeemFulfillment, tokenPrice, res.totalSupplyCurrency_, rmul(res.totalRedeemToken_, tokenPrice))
    await epochTicker.incLastEpochExecuted(1)
  }

  const supplyOrder = async (account: Signer, amount: BigNumber) => {
    const addr = await account.getAddress()
    await currency.mint(addr, amount)
    await currency.approve(tranche.address, amount)
    await tranche.supplyOrder(addr, amount)

    const res = await tranche.users(addr)
    expect(res.supplyCurrencyAmount).to.be.eq(amount)
  }

  const redeemOrder = async (account: Signer, amount: BigNumber) => {
    const addr = await account.getAddress()
    await token.mint(addr, amount)
    await token.approve(tranche.address, amount)
    await tranche.redeemOrder(addr, amount)

    const res = await tranche.users(addr)
    expect(res.redeemTokenAmount).to.be.eq(amount)
  }

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    currency = await (await ethers.getContractFactory("SimpleToken")).deploy("TIN", "TIN") as SimpleToken
    token = await (await ethers.getContractFactory("SimpleToken")).deploy("CUR", "Currency") as SimpleToken
    reserve = await (await ethers.getContractFactory("ReserveMock")).deploy(currency.address) as ReserveMock
    epochTicker = await (await ethers.getContractFactory("EpochTickerMock")).deploy() as EpochTickerMock
    tranche = await (await ethers.getContractFactory("Tranche")).deploy(currency.address, token.address) as Tranche
    let padded = zeroPadEnd(toUtf8Bytes("reserve"), 32)
    await tranche.depend(padded, reserve.address)

    const firstMember = await accounts[0].getAddress()
    padded = zeroPadEnd(toUtf8Bytes("epochTicker"), 32)
    await tranche.depend(padded, epochTicker.address)

    await currency.mint(reserve.address, parseEther("1000000000000"))
  })

  it("Should SupplyOrder", async () => {
    let amount = parseEther("100")
    await supplyOrder(accounts[0], amount)
    expect(await tranche.totalSupply()).to.be.eq(amount)

    amount = parseEther("120")
    await supplyOrder(accounts[0], amount)
    expect(await tranche.totalSupply()).to.be.eq(amount)
  })

  it("Should SimpleCloseEpoch", async () => {
    let amount = parseEther("100")
    await supplyOrder(accounts[0], amount)
    expect(await tranche.totalSupply()).to.be.eq(amount)

    const res = await tranche.callStatic.closeEpoch()
    await tranche.closeEpoch()
    expect(res.totalSupplyCurrency_).to.be.eq(amount)
  })

  it("Should FailSupplyAfterCloseEpoch", async () => {
    let amount = parseEther("100")
    await supplyOrder(accounts[0], amount)
    expect(await tranche.totalSupply()).to.be.eq(amount)

    const res = await tranche.callStatic.closeEpoch()
    await tranche.closeEpoch()
    expect(res.totalSupplyCurrency_).to.be.eq(amount)
    await epochTicker.incCurrentEpoch(1)
    await expect(
      supplyOrder(accounts[0], amount)
    ).to.be.revertedWith("disburse required")
  })

  it("Should SimpleEpochUpdate", async () => {
    let amount = parseEther("100")
    await supplyOrder(accounts[0], amount)
    expect(await tranche.totalSupply()).to.be.eq(amount)

    // 60 % fulfillment
    const supplyFulfillment_ = percentToBig(60)
    const redeemFulfillment_ = ONE
    const tokenPrice_ = ONE

    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)

    expect(await tranche.totalSupply()).to.be.eq(parseEther("40"))
    expect(await tranche.waitingForUpdate()).to.be.eq(false)
  })

  it("Should SimpleDisburse", async () => {
    let amount = parseEther("100")
    await supplyOrder(accounts[0], amount)

    // 60 % fulfillment
    let supplyFulfillment_ = percentToBig(60)
    let redeemFulfillment_ = ONE
    let tokenPrice_ = ONE

    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)

    // should receive 60% => 60 ether
    const firstMember = await accounts[0].getAddress()
    let res = await tranche["calcDisburse(address)"](firstMember)

    expect(res.payoutTokenAmount).to.be.eq(parseEther("60"))
    expect(res.remainingSupplyCurrency).to.be.eq(parseEther("40"))

    // 50 %
    supplyFulfillment_ = percentToBig(50)
    redeemFulfillment_ = ONE

    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)

    // should receive 80% => 80 ether
    res = await tranche["calcDisburse(address)"](firstMember)

    expect(res.payoutTokenAmount).to.be.eq(parseEther("80"))
    expect(res.remainingSupplyCurrency).to.be.eq(parseEther("20"))

    // execute disburse
    res = await tranche.callStatic["disburse(address)"](firstMember)
    await tranche["disburse(address)"](firstMember)

    expect(res.payoutTokenAmount).to.be.eq(parseEther("80"))
    expect(res.remainingSupplyCurrency).to.be.eq(parseEther("20"))

    expect(await token.balanceOf(firstMember)).to.be.eq(parseEther("80"))
  })

  it("Should RedeemDisburse", async () => {
    let amount = parseEther("100")
    await redeemOrder(accounts[0], amount)

    let padded = zeroPadEnd(toUtf8Bytes("balance"), 32)
    await reserve["setReturn(bytes32,uint256)"](padded, MAX_UINT256)

    let supplyFulfillment_ = BigNumber.from(0)
    let redeemFulfillment_ = percentToBig(50)
    let tokenPrice_ = percentToBig(15).mul(10)

    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)

    let firstMember = await accounts[0].getAddress()
    // execute disburse
    let res = await tranche.callStatic["disburse(address)"](firstMember)
    await tranche["disburse(address)"](firstMember)

    expect(res.payoutCurrencyAmount).to.be.eq(parseEther("75"))
  })

  it("Should ZeroEpochUpdate", async () => {
    let tokenPrice_ = percentToBig(15)

    await tranche.closeEpoch()
    await epochTicker.incCurrentEpoch(1)
    let epochID = await epochTicker.currentEpoch()
    await tranche.epochUpdate(epochID, 0, 0, tokenPrice_, 0, 0)
    await epochTicker.incLastEpochExecuted(1)

    await tranche.closeEpoch()
    await epochTicker.incCurrentEpoch(1)
    epochID = await epochTicker.currentEpoch()
    await tranche.epochUpdate(epochID, 0, 0, 0, 0, 0)
  })

  it("Should getTokenPriceByEpoch", async () => {
    let amount = parseEther("100")
    await redeemOrder(accounts[0], amount)

    let padded = zeroPadEnd(toUtf8Bytes("balance"), 32)
    await reserve["setReturn(bytes32,uint256)"](padded, MAX_UINT256)

    // 60 % fulfillment
    let supplyFulfillment_ = BigNumber.from(0)
    let redeemFulfillment_ = percentToBig(70)
    let tokenPrice_ = ONE

    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)
    let epochID = await epochTicker.currentEpoch()
    expect(await tranche.getTokenPriceByEpoch(epochID)).to.be.eq(BigNumber.from(0))

    epochID = epochID.sub(1)
    expect(await tranche.getTokenPriceByEpoch(epochID)).to.be.eq(tokenPrice_)

    epochID = epochID.add(1)
    expect(await tranche.getTokenPriceByEpoch(epochID)).to.be.eq(BigNumber.from(0))
  })

  it("Should MultipleRedeem", async () => {
    let amount = parseEther("100")
    await redeemOrder(accounts[0], amount)

    let padded = zeroPadEnd(toUtf8Bytes("balance"), 32)
    await reserve["setReturn(bytes32,uint256)"](padded, MAX_UINT256)

    // 60 % fulfillment
    let supplyFulfillment_ = BigNumber.from(0)
    let redeemFulfillment_ = percentToBig(70)
    let tokenPrice_ = ONE

    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)

    redeemFulfillment_ = percentToBig(50)
    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)

    let firstMember = await accounts[0].getAddress()
    // execute disburse
    let res = await tranche.callStatic["disburse(address)"](firstMember)
    await tranche["disburse(address)"](firstMember)

    expect(res.payoutCurrencyAmount).to.be.eq(parseEther("85"))
    expect(await currency.balanceOf(firstMember)).to.be.eq(parseEther("85"))

    expect(await token.balanceOf(firstMember)).to.be.eq(0)
    expect(await res.remainingRedeemToken).to.be.eq(parseEther("15"))

    amount = BigNumber.from(0)
    await redeemOrder(accounts[0], amount)
    expect(await token.balanceOf(firstMember)).to.be.eq(parseEther("15"))

    amount = parseEther("15")
    await redeemOrder(accounts[0], amount)

    redeemFulfillment_ = percentToBig(20)
    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)

    res = await tranche.callStatic["disburse(address)"](firstMember)
    await tranche["disburse(address)"](firstMember)

    expect(res.payoutCurrencyAmount).to.be.eq(parseEther("3"))
  })

  it("Should ChangeOrderAfterDisburse", async () => {
    let amount = parseEther("100")
    await supplyOrder(accounts[0], amount)

    // 60 % fulfillment
    let supplyFulfillment_ = percentToBig(60)
    let redeemFulfillment_ = ONE
    let tokenPrice_ = ONE

    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)

    let firstMember = await accounts[0].getAddress()
    await tranche["disburse(address)"](firstMember)
    await tranche.supplyOrder(firstMember, 0)

    expect(await currency.balanceOf(firstMember)).to.be.eq(parseEther("40"))
    expect(await token.balanceOf(firstMember)).to.be.eq(parseEther("60"))
  })

  it("Should Mint", async () => {
    let amount = parseEther("100")
    let firstMember = await accounts[0].getAddress()
    await tranche.mint(firstMember, amount)

    expect(await token.balanceOf(firstMember)).to.be.eq(amount)
  })

  it("Should DisburseEndEpoch", async () => {
    let amount = parseEther("100")
    await supplyOrder(accounts[0], amount)

    let supplyFulfillment_ = percentToBig(10)
    let redeemFulfillment_ = ONE
    let tokenPrice_ = ONE

    for (let i=0; i<3; i++) {
      await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)
    }

    const firstMember = await accounts[0].getAddress()
    // execute disburse
    let res = await tranche.callStatic["disburse(address)"](firstMember)
    await tranche["disburse(address)"](firstMember)

    expect(res.payoutTokenAmount).to.be.eq(parseEther("27.1"))
  })

  it("Should DisburseEndEpochMultiple", async () => {
    let amount = parseEther("100")
    await supplyOrder(accounts[0], amount)

    let supplyFulfillment_ = percentToBig(10)
    let redeemFulfillment_ = ONE
    let tokenPrice_ = ONE

    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, percentToBig(50))
    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)
    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)

    const firstMember = await accounts[0].getAddress()

    let res = await tranche.users(firstMember)
    const endEpoch = res.orderedInEpoch

    // execute disburse
    res = await tranche.callStatic["disburse(address,uint256)"](firstMember, endEpoch)
    await tranche["disburse(address,uint256)"](firstMember, endEpoch)

    expect(res.payoutTokenAmount).to.be.eq(parseEther("20"))
    expect(res.remainingSupplyCurrency).to.be.eq(parseEther("90"))

    res = await tranche.users(firstMember)
    expect(res.orderedInEpoch).to.be.eq(endEpoch.add(1))

    res = await tranche.callStatic["disburse(address,uint256)"](firstMember, endEpoch)
    await tranche["disburse(address,uint256)"](firstMember, endEpoch)

    expect(res.payoutTokenAmount).to.be.eq(0)

    res = await tranche.callStatic["disburse(address,uint256)"](firstMember, endEpoch.add(1))
    await tranche["disburse(address,uint256)"](firstMember, endEpoch.add(1))

    expect(res.payoutTokenAmount).to.be.eq(parseEther("9"))
  })

  it("Should EndEpochTooHigh", async () => {
    let amount = parseEther("100")
    await supplyOrder(accounts[0], amount)

    let supplyFulfillment_ = percentToBig(10)
    let redeemFulfillment_ = ONE
    let tokenPrice_ = ONE

    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)
    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)

    const firstMember = await accounts[0].getAddress()

    const endEpoch = 1000

    // execute disburse
    let res = await tranche.callStatic["disburse(address,uint256)"](firstMember, endEpoch)
    await tranche["disburse(address,uint256)"](firstMember, endEpoch)

    expect(res.payoutTokenAmount).to.be.eq(parseEther("19"))
  })

  it("Should FailNotDisburseAllEpochsAndSupply", async () => {
    let amount = parseEther("100")
    await supplyOrder(accounts[0], amount)

    let supplyFulfillment_ = percentToBig(10)
    let redeemFulfillment_ = ONE
    let tokenPrice_ = ONE

    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)
    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)

    const firstMember = await accounts[0].getAddress()

    let res = await tranche.users(firstMember)
    const endEpoch = res.orderedInEpoch

    // execute disburse
    await tranche["disburse(address,uint256)"](firstMember, endEpoch)

    await expect(
      supplyOrder(accounts[0], BigNumber.from(0))
    ).to.be.revertedWith("disburse required")
  })

  it("Should DisburseSupplyAndRedeem", async () => {
    let amount = parseEther("100")
    let redeemAmount = parseEther("50")
    await supplyOrder(accounts[0], amount)
    await redeemOrder(accounts[0], redeemAmount)

    let supplyFulfillment_ = percentToBig(60)
    let redeemFulfillment_ = percentToBig(80)
    let tokenPrice_ = ONE

    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)

    const firstMember = await accounts[0].getAddress()

    // execute disburse
    let res = await tranche.callStatic["disburse(address)"](firstMember)
    await tranche["disburse(address)"](firstMember)

    expect(res.payoutTokenAmount).to.be.eq(rmul(amount, supplyFulfillment_))
    expect(res.payoutCurrencyAmount).to.be.eq(rmul(redeemAmount, redeemFulfillment_))
  })

  it("Should RecoveryTransfer", async () => {
    let amount = parseEther("100")
    let recoverAddr = await accounts[1].getAddress()
    await supplyOrder(accounts[0], amount)

    expect(await currency.balanceOf(tranche.address)).to.be.eq(amount)
    await tranche.authTransfer(currency.address, recoverAddr, amount)
    expect(await currency.balanceOf(recoverAddr)).to.be.eq(amount)
    expect(await currency.balanceOf(tranche.address)).to.be.eq(0)
  })

  it("Should FailedRecoveryTransferNotAdmin", async () => {
    let amount = parseEther("100")
    let recoverAddr = await accounts[1].getAddress()
    await supplyOrder(accounts[0], amount)

    expect(await currency.balanceOf(tranche.address)).to.be.eq(amount)
    await expect(
      tranche.connect(accounts[1]).authTransfer(currency.address, recoverAddr, amount)
    ).to.be.revertedWith("")
  })

  it("Should CalcDisburseRoundingOff", async () => {
    let amount = parseEther("20")
    await supplyOrder(accounts[0], amount)

    let supplyFulfillment_ = ONE
    let redeemFulfillment_ = ONE
    let tokenPrice_ = ONE.mul(3)

    await closeAndUpdate(supplyFulfillment_, redeemFulfillment_, tokenPrice_)

    const firstMember = await accounts[0].getAddress()
    let res = await tranche["calcDisburse(address)"](firstMember)

    expect(rdiv(amount, tokenPrice_).sub(res.payoutTokenAmount)).to.be.eq(1)
  })
})