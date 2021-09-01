import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract } from "ethers"
import { zeroPadEnd, now, timeFly } from "./utils"
import { RestrictedToken } from '../types/RestrictedToken'
import { Memberlist } from '../types/Memberlist'
import { toUtf8Bytes, parseEther } from "ethers/lib/utils"

describe("RestrictedToken", function () {

  let accounts: Signer[]
  let memberlist: Contract
  let token: Contract
  let memberlistValidity:number

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    memberlistValidity = await now() + 8*86400
    memberlist = await (await ethers.getContractFactory("Memberlist")).deploy() as Memberlist
    token = await (await ethers.getContractFactory("RestrictedToken")).deploy("TAT", "TAT") as RestrictedToken

    let padded = zeroPadEnd(toUtf8Bytes("memberlist"), 32)
    await token.depend(padded, memberlist.address)

    const firstMember = await accounts[0].getAddress()
    await token.mint(firstMember, parseEther("100"))
  })

  it("Should ReceiveTokens", async () => {
    const firstMember = await accounts[0].getAddress()
    const secondMember = await accounts[1].getAddress()

    await memberlist.updateMember(secondMember, memberlistValidity)
    expect(await memberlist.members(secondMember)).to.be.eq(memberlistValidity)
    await token.transferFrom(firstMember, secondMember, parseEther("50"))

    expect(await token.balanceOf(secondMember)).to.be.eq(parseEther("50"))
  })

  it("Should FailReceiveTokensNotMember", async () => {
    const firstMember = await accounts[0].getAddress()
    const secondMember = await accounts[1].getAddress()

    await expect(
      token.transferFrom(firstMember, secondMember, parseEther("50"))
    ).to.be.revertedWith("not-allowed-to-hold-token")
  })

  it("Should FailReceiveTokensMembershipExpired", async () => {
    const firstMember = await accounts[0].getAddress()
    const secondMember = await accounts[1].getAddress()

    await memberlist.updateMember(secondMember, memberlistValidity)
    expect(await memberlist.members(secondMember)).to.be.eq(memberlistValidity)

    await timeFly(9, true)
    await expect(
      token.transferFrom(firstMember, secondMember, parseEther("50"))
    ).to.be.revertedWith("not-allowed-to-hold-token")
  })
})