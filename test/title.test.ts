import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"

describe("Title", function () {
  let accounts: Signer[]
  let title: Contract

  beforeEach(async function () {
    accounts = await ethers.getSigners()
    title = await (await ethers.getContractFactory('Title')).deploy("Title", "TLD")
  })

  it("Should setup precondition", async function () {
    expect((await title.count()).toString()).to.be.eq('1')
  })

  it("Should issue title", async function () {
    const signerAddress = await accounts[1].getAddress()
    await title.connect(accounts[0]).rely(signerAddress)
    await title.connect(accounts[0]).issue(signerAddress)
    expect((await title.count()).toString()).to.be.eq('2')
    await title.connect(accounts[0]).issue(signerAddress)
    expect((await title.count()).toString()).to.be.eq('3')
    await title.connect(accounts[0]).issue(signerAddress)
    expect((await title.count()).toString()).to.be.eq('4')
  })

  it("Should close title", async function () {
    const signerAddress = await accounts[1].getAddress()
    await title.connect(accounts[0]).rely(signerAddress)
    await title.connect(accounts[0]).issue(signerAddress)
    expect((await title.count()).toString()).to.be.eq('2')
    await title.connect(accounts[1]).close(1)
  })
})
