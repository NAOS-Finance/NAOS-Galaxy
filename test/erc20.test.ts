import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract } from "ethers"
import { assert } from "console"

// Since erc20 is different with openzeppelin library, we migrate some test
describe("ERC20", function () {
  let accounts: Signer[]
  let erc20: Contract

  beforeEach(async function () {
    accounts = await ethers.getSigners()
    erc20 = await (await ethers.getContractFactory('ERC20')).deploy("NAOS", "NAOS")
  })

  it("Symbol and name should be NAOS", async function () {
    expect(await erc20.symbol()).to.eq("NAOS")
    expect(await erc20.name()).to.eq("NAOS")
  })

  it("Should mint token", async function () {
    const signerAddress = await accounts[0].getAddress()
    await erc20.mint(signerAddress, ethers.utils.parseEther("1"))
    expect((await erc20.balanceOf(signerAddress)).toString()).eq(ethers.utils.parseEther("1").toString())
  })

  it("Should revert because of authentication", async function () {
    const signer = accounts[1]
    const signerAddress = await signer.getAddress()
    try {
      await erc20.connect(signer).mint(signerAddress, ethers.utils.parseEther("1"))
      throw new Error("should not mint")
    } catch (err) {
      expect(err.message).to.be.eq("VM Exception while processing transaction: revert")
    }
  })

  it("Should authorize account and mint token", async function () {
    const signer = accounts[1]
    const signerAddress = await signer.getAddress()
    await erc20.rely(signerAddress)
    await erc20.connect(signer).mint(signerAddress, ethers.utils.parseEther("1"))
    expect((await erc20.balanceOf(signerAddress)).toString()).eq(ethers.utils.parseEther("1").toString())
  })
})
