import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber } from "ethers"
import { zeroPadEnd } from "./utils"
import { ShelfMock } from '../types/ShelfMock'
import { AssessorMock } from '../types/AssessorMock'
import { SimpleToken } from '../types/SimpleToken'
import { Reserve } from '../types/Reserve'
import { toUtf8Bytes, parseEther } from 'ethers/lib/utils'

describe("Reserve", function () {

  let accounts: Signer[]
  let shelf: Contract
  let reserve: Contract
  let token: Contract
  let assessor: Contract
  let memberlistValidity:number

  const fundReserve = async (addr: string, amount: BigNumber) => {
    await token.mint(addr, amount)
    await token.approve(reserve.address, amount)
    await reserve.deposit(amount)
  }

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    token = await (await ethers.getContractFactory("SimpleToken")).deploy("DAI", "DAI") as SimpleToken
    shelf = await (await ethers.getContractFactory("ShelfMock")).deploy() as ShelfMock
    assessor = await (await ethers.getContractFactory("AssessorMock")).deploy() as AssessorMock
    reserve = await (await ethers.getContractFactory("Reserve")).deploy(token.address) as Reserve
    
    let padded = zeroPadEnd(toUtf8Bytes("shelf"), 32)
    await reserve.depend(padded, shelf.address)

    padded = zeroPadEnd(toUtf8Bytes("assessor"), 32)
    await reserve.depend(padded, assessor.address)
  })

  it("Should ReserveBalanceBorrowFullReserve", async () => {
    const firstMember = await accounts[0].getAddress()
    const amount = parseEther("100")
    const requestWant = true
    await fundReserve(firstMember, amount)

    let padded = zeroPadEnd(toUtf8Bytes("balanceRequest"), 32)
    await shelf["setReturn(bytes32,bool,uint256)"](padded, requestWant, amount)
    
    const reserveBalance = await token.balanceOf(reserve.address)
    const shelfBalance = await token.balanceOf(shelf.address)

    padded = zeroPadEnd(toUtf8Bytes("currencyAvailable"), 32)
    await reserve["file(bytes32,uint256)"](padded, amount)
    const currencyAvailable = await reserve.currencyAvailable()

    await reserve.balance()

    expect(await token.balanceOf(reserve.address)).to.be.eq(reserveBalance.sub(amount))
    expect(await token.balanceOf(shelf.address)).to.be.eq(shelfBalance.add(amount))
    expect(await reserve.currencyAvailable()).to.be.eq(currencyAvailable.sub(amount))

    padded = zeroPadEnd(toUtf8Bytes("borrowUpdate_currencyAmount"), 32)
    expect(await assessor.values_uint(padded)).to.be.eq(amount)
  })

  it("Should ReserveBalanceBorrowPartialReserve", async () => {
    const firstMember = await accounts[0].getAddress()
    const amount = parseEther("100")
    const requestWant = true
    await fundReserve(firstMember, amount.mul(2))

    let padded = zeroPadEnd(toUtf8Bytes("balanceRequest"), 32)
    await shelf["setReturn(bytes32,bool,uint256)"](padded, requestWant, amount)
    
    const reserveBalance = await token.balanceOf(reserve.address)
    const shelfBalance = await token.balanceOf(shelf.address)

    padded = zeroPadEnd(toUtf8Bytes("currencyAvailable"), 32)
    await reserve["file(bytes32,uint256)"](padded, amount.mul(2))
    const currencyAvailable = await reserve.currencyAvailable()

    await reserve.balance()

    expect(await token.balanceOf(reserve.address)).to.be.eq(reserveBalance.sub(amount))
    expect(await token.balanceOf(shelf.address)).to.be.eq(shelfBalance.add(amount))
    expect(await reserve.currencyAvailable()).to.be.eq(currencyAvailable.sub(amount))

    padded = zeroPadEnd(toUtf8Bytes("borrowUpdate_currencyAmount"), 32)
    expect(await assessor.values_uint(padded)).to.be.eq(amount)
  })

  it("Should ReserveBalanceRepay", async () => {
    const amount = parseEther("100")
    const requestWant = false
    await token.mint(shelf.address, amount)

    let padded = zeroPadEnd(toUtf8Bytes("balanceRequest"), 32)
    await shelf["setReturn(bytes32,bool,uint256)"](padded, requestWant, amount)
    await shelf.doApprove(token.address, reserve.address, amount)
    
    const reserveBalance = await token.balanceOf(reserve.address)
    const shelfBalance = await token.balanceOf(shelf.address)
    const currencyAvailable = await reserve.currencyAvailable()

    await reserve.balance()

    expect(await token.balanceOf(reserve.address)).to.be.eq(reserveBalance.add(amount))
    expect(await token.balanceOf(shelf.address)).to.be.eq(shelfBalance.sub(amount))
    expect(await reserve.currencyAvailable()).to.be.eq(currencyAvailable)

    padded = zeroPadEnd(toUtf8Bytes("repaymentUpdate_currencyAmount"), 32)
    expect(await assessor.values_uint(padded)).to.be.eq(amount)
  })

  it("Should FailBalancePoolInactive", async () => {
    const firstMember = await accounts[0].getAddress()
    const amount = parseEther("100")
    const requestWant = true
    await fundReserve(firstMember, amount.mul(2))

    let padded = zeroPadEnd(toUtf8Bytes("balanceRequest"), 32)
    await shelf["setReturn(bytes32,bool,uint256)"](padded, requestWant, amount)

    padded = zeroPadEnd(toUtf8Bytes("currencyAvailable"), 32)
    await reserve["file(bytes32,uint256)"](padded, amount.mul(2))

    padded = zeroPadEnd(toUtf8Bytes("currencyAvailable"), 32)
    await reserve["file(bytes32,uint256)"](padded, 0)

    await expect(
      reserve.balance()
    ).to.be.revertedWith("")
  })

  it("Should FailBalanceBorrowAmountTooHigh", async () => {
    const firstMember = await accounts[0].getAddress()
    const amount = parseEther("100")
    const requestWant = true
    await fundReserve(firstMember, amount)

    let padded = zeroPadEnd(toUtf8Bytes("balanceRequest"), 32)
    await shelf["setReturn(bytes32,bool,uint256)"](padded, requestWant, amount.mul(2))

    padded = zeroPadEnd(toUtf8Bytes("currencyAvailable"), 32)
    await reserve["file(bytes32,uint256)"](padded, amount)

    await expect(
      reserve.balance()
    ).to.be.revertedWith("")
  })

  it("Should FailBalanceReserveUnderfunded", async () => {
    const firstMember = await accounts[0].getAddress()
    const amount = parseEther("100")
    const requestWant = true
    await fundReserve(firstMember, amount.sub(1))

    let padded = zeroPadEnd(toUtf8Bytes("balanceRequest"), 32)
    await shelf["setReturn(bytes32,bool,uint256)"](padded, requestWant, amount.mul(2))

    padded = zeroPadEnd(toUtf8Bytes("currencyAvailable"), 32)
    await reserve["file(bytes32,uint256)"](padded, amount)

    await expect(
      reserve.balance()
    ).to.be.revertedWith("")
  })

  it("Should FailBalanceShelfNotEnoughFunds", async () => {
    const amount = parseEther("100")
    const requestWant = false
    await token.mint(shelf.address, amount.sub(1))

    let padded = zeroPadEnd(toUtf8Bytes("balanceRequest"), 32)
    await shelf["setReturn(bytes32,bool,uint256)"](padded, requestWant, amount)
    await shelf.doApprove(token.address, reserve.address, amount)

    await expect(
      reserve.balance()
    ).to.be.revertedWith("")
  })

  it("Should DepositPayout", async () => {
    const firstMember = await accounts[0].getAddress()
    const amount = parseEther("100")
    await token.mint(firstMember, amount)
    expect(await reserve.totalBalance()).to.be.eq(0)
    await token.approve(reserve.address, amount)
    await reserve.deposit(amount)
    expect(await reserve.totalBalance()).to.be.eq(amount)
    expect(await token.balanceOf(reserve.address)).to.be.eq(amount)

    let paidAmount = parseEther("60")
    await reserve.payout(paidAmount)
    expect(await reserve.totalBalance()).to.be.eq(amount.sub(paidAmount))
    expect(await token.balanceOf(reserve.address)).to.be.eq(amount.sub(paidAmount))
    expect(await token.balanceOf(firstMember)).to.be.eq(paidAmount)
  })
})