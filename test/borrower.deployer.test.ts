import { expect } from "chai"
import { ethers } from "hardhat"
import { BigNumber } from "ethers"
import { ZERO_ADDRESS } from "./utils"

describe("Borrower deployer", function () {
  it("Should deploy borrower", async () => {
    const erc20 = await (await ethers.getContractFactory("ERC20")).deploy("nUSD", "nUSD")
    const titleFab = await (await ethers.getContractFactory("TitleFab")).deploy()
    const shelfFab = await (await ethers.getContractFactory("ShelfFab")).deploy()
    const pileFab = await (await ethers.getContractFactory("PileFab")).deploy()
    const collectorFab = await (await ethers.getContractFactory("CollectorFab")).deploy()
    const feedFab = await (await ethers.getContractFactory("NAVFeedFab")).deploy()
    const discountRate = BigNumber.from("1000000342100000000000000000")
    const deployer = await (await ethers.getContractFactory("BorrowerDeployer")).deploy(
      ZERO_ADDRESS,
      titleFab.address,
      shelfFab.address,
      pileFab.address,
      collectorFab.address,
      feedFab.address,
      erc20.address,
      "Test",
      "Test",
      discountRate
    )

    await deployer.deployTitle()
    await deployer.deployPile()
    await deployer.deployFeed()
    await deployer.deployShelf()
    await deployer.deployCollector()
    await deployer.deploy()
    expect(await deployer.titleName()).to.be.eq("Test")
    expect(await deployer.titleSymbol()).to.be.eq("Test")
    expect(await deployer.discountRate()).to.be.eq(discountRate)
    expect(await deployer.title()).not.be.eq(ZERO_ADDRESS)
    expect(await deployer.shelf()).not.be.eq(ZERO_ADDRESS)
    expect(await deployer.pile()).not.be.eq(ZERO_ADDRESS)
    expect(await deployer.collector()).not.be.eq(ZERO_ADDRESS)
    expect(await deployer.feed()).not.be.eq(ZERO_ADDRESS)
  })
})
