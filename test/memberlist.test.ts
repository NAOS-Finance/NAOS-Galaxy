import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract } from "ethers"
import { now } from "./utils"
import { Memberlist } from '../types/Memberlist'

describe("Memberlist", function () {

  let accounts: Signer[]
  let memberlist: Contract
  let testMemberlist1: Contract
  let testMemberlist2: Contract
  let memberlistValidity:number

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    memberlistValidity = await now() + 8*86400
    memberlist = await (await ethers.getContractFactory("Memberlist")).deploy() as Memberlist
  })

  it("Should AddMember", async () => {
    const firstMember = await accounts[0].getAddress()
    await memberlist.updateMember(firstMember, memberlistValidity)
    expect(await memberlist.members(firstMember)).to.be.eq(memberlistValidity)
  })

  it("Should AddMembers", async () => {
    const members = [
      await accounts[0].getAddress(),
      await accounts[1].getAddress(),
      await accounts[2].getAddress()
    ]
    await memberlist.updateMembers(members, memberlistValidity)
    expect(await memberlist.members(members[0])).to.be.eq(memberlistValidity)
    expect(await memberlist.members(members[1])).to.be.eq(memberlistValidity)
    expect(await memberlist.members(members[2])).to.be.eq(memberlistValidity)
  })

  it("Should FailAddMemberPeriodTooShort", async () => {
    const firstMember = await accounts[0].getAddress()
    memberlistValidity -= 86400
    await expect(
      memberlist.updateMember(firstMember, memberlistValidity)
    ).to.be.revertedWith("")
  })

  it("Should Update", async () => {
    const firstMember = await accounts[0].getAddress()
    await memberlist.updateMember(firstMember, memberlistValidity)
    expect(await memberlist.members(firstMember)).to.be.eq(memberlistValidity)
    memberlistValidity += 86400
    await memberlist.updateMember(firstMember, memberlistValidity)
    expect(await memberlist.members(firstMember)).to.be.eq(memberlistValidity)
  })

  it("Should IsMember", async () => {
    const firstMember = await accounts[0].getAddress()
    await memberlist.updateMember(firstMember, memberlistValidity)
    await memberlist.member(firstMember)
    expect(await memberlist.hasMember(firstMember)).to.be.eq(true)
  })

  it("Should FailIsMemberNotAdded", async () => {
    const firstMember = await accounts[0].getAddress()
    await expect(
      memberlist.member(firstMember)
    ).to.be.revertedWith("")
  })

  it("Should FailHasMemberNotAdded", async () => {
    const firstMember = await accounts[0].getAddress()
    expect(await memberlist.hasMember(firstMember)).to.be.eq(false)
  })
})