import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract } from "ethers"
import { zeroPadEnd, now } from "./utils"
import { TrancheMock } from '../types/TrancheMock'
import { RestrictedToken } from '../types/RestrictedToken'
import { Memberlist } from '../types/Memberlist'
import { Operator } from '../types/Operator'
import { toUtf8Bytes } from "ethers/lib/utils"

describe("Operator", function () {

  let accounts: Signer[]
  let memberlist: Contract
  let tranche: Contract
  let token: Contract
  let operator: Contract
  let memberlistValidity:number

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    memberlistValidity = await now() + 8*86400
    tranche = await (await ethers.getContractFactory("TrancheMock")).deploy() as TrancheMock
    memberlist = await (await ethers.getContractFactory("Memberlist")).deploy() as Memberlist
    token = await (await ethers.getContractFactory("RestrictedToken")).deploy("TAT", "TAT") as RestrictedToken

    let padded = zeroPadEnd(toUtf8Bytes("memberlist"), 32)
    await token.depend(padded, memberlist.address)

    operator = await (await ethers.getContractFactory("Operator")).deploy(tranche.address) as Operator

    padded = zeroPadEnd(toUtf8Bytes("token"), 32)
    await operator.depend(padded, memberlist.address)
  })

  it("Should SupplyOrder", async () => {
    const amount = 10
    const firstMember = await accounts[0].getAddress()
    await tranche.rely(operator.address)
    await memberlist.updateMember(firstMember, memberlistValidity)
    await operator.supplyOrder(amount)

    let padded = zeroPadEnd(toUtf8Bytes("supplyOrder"), 32)
    expect(await tranche.calls(padded)).to.be.eq(1)

    padded = zeroPadEnd(toUtf8Bytes("supply_usr"), 32)
    expect(await tranche.values_address(padded)).to.be.eq(firstMember)

    padded = zeroPadEnd(toUtf8Bytes("supplyAmount"), 32)
    expect(await tranche.values_uint(padded)).to.be.eq(amount)
  })

  it("Should FailSupplyOrderNotMember", async () => {
    const amount = 10
    await tranche.rely(operator.address)
    await expect(
      operator.supplyOrder(amount)
    ).to.be.revertedWith("user-not-allowed-to-hold-token")
  })

  it("Should FailSupplyOrderOperatorNotWard", async () => {
    const amount = 10
    const firstMember = await accounts[0].getAddress()
    await memberlist.updateMember(firstMember, memberlistValidity)
    await expect(
      operator.supplyOrder(amount)
    ).to.be.revertedWith("")
  })

  it("Should RedeemOrder", async () => {
    const amount = 10
    const firstMember = await accounts[0].getAddress()
    await tranche.rely(operator.address)
    await memberlist.updateMember(firstMember, memberlistValidity)
    await operator.redeemOrder(amount)

    let padded = zeroPadEnd(toUtf8Bytes("redeemOrder"), 32)
    expect(await tranche.calls(padded)).to.be.eq(1)

    padded = zeroPadEnd(toUtf8Bytes("redeem_usr"), 32)
    expect(await tranche.values_address(padded)).to.be.eq(firstMember)

    padded = zeroPadEnd(toUtf8Bytes("redeemAmount"), 32)
    expect(await tranche.values_uint(padded)).to.be.eq(amount)
  })

  it("Should FailRedeemOrderNotMember", async () => {
    const amount = 10
    await tranche.rely(operator.address)
    await expect(
      operator.redeemOrder(amount)
    ).to.be.revertedWith("user-not-allowed-to-hold-token")
  })

  it("Should FailRedeemOrderOperatorNotWard", async () => {
    const amount = 10
    const firstMember = await accounts[0].getAddress()
    await memberlist.updateMember(firstMember, memberlistValidity)
    await expect(
      operator.redeemOrder(amount)
    ).to.be.revertedWith("")
  })

  it("Should Disburse", async () => {
    const firstMember = await accounts[0].getAddress()
    await tranche.rely(operator.address)
    await memberlist.updateMember(firstMember, memberlistValidity)
    await operator["disburse()"]()

    let padded = zeroPadEnd(toUtf8Bytes("disburse"), 32)
    expect(await tranche.calls(padded)).to.be.eq(1)

    padded = zeroPadEnd(toUtf8Bytes("disburse_usr"), 32)
    expect(await tranche.values_address(padded)).to.be.eq(firstMember)
  })

  it("Should FailDisburseNotMember", async () => {
    await tranche.rely(operator.address)
    await expect(
      operator["disburse()"]()
    ).to.be.revertedWith("user-not-allowed-to-hold-token")
  })

  it("Should FailDisburseOperatorNotWard", async () => {
    const firstMember = await accounts[0].getAddress()
    await memberlist.updateMember(firstMember, memberlistValidity)
    await expect(
      operator["disburse()"]()
    ).to.be.revertedWith("")
  })
})