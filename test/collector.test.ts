import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { zeroPadEnd } from "./utils"

describe("Collector", function () {
  const loan = BigNumber.from(1)
  const amount = BigNumber.from(100)
  const tokenId = BigNumber.from(123)
  let accounts: Signer[]
  let nft: Contract
  let pile: Contract
  let distributor: Contract
  let shelf: Contract
  let collector: Contract

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    nft = await (await ethers.getContractFactory("NFTMock")).deploy()
    shelf = await (await ethers.getContractFactory("ShelfMock")).deploy()
    pile = await (await ethers.getContractFactory("PileMock")).deploy()
    distributor = await (await ethers.getContractFactory("src/borrower/test/mock/distributor.sol:DistributorMock")).deploy()
    collector = await (await ethers.getContractFactory("Collector")).deploy(shelf.address, pile.address, nft.address)
    const padded = zeroPadEnd(utils.toUtf8Bytes("distributor"), 32)
    await collector.depend(padded, distributor.address)
  })

  const collect = async (address: string, price: BigNumber) => {
    await collector["collect(uint256,address)"](loan, address)

    let padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom"), 32)
    expect(await nft.calls(padded)).to.be.eq(1)

    padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom_to"), 32)
    expect(await nft.values_address(padded)).to.be.eq(address)

    padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom_tokenId"), 32)
    expect(await nft.values_uint(padded)).to.be.eq(tokenId)

    padded = zeroPadEnd(utils.toUtf8Bytes("recover"), 32)
    expect(await shelf.calls(padded)).to.be.eq(1)

    padded = zeroPadEnd(utils.toUtf8Bytes("recover_currencyAmount"), 32)
    expect(await shelf.values_uint(padded)).to.be.eq(price)

    padded = zeroPadEnd(utils.toUtf8Bytes("recover_usr"), 32)
    expect(await shelf.values_address(padded)).to.be.eq(address)
  }

  const seize = async () => {
    await collector.seize(loan)

    let padded = zeroPadEnd(utils.toUtf8Bytes("claim"), 32)
    expect(await shelf.calls(padded)).to.be.eq(1)

    padded = zeroPadEnd(utils.toUtf8Bytes("claim_loan"), 32)
    expect(await shelf.values_uint(padded)).to.be.eq(1)

    padded = zeroPadEnd(utils.toUtf8Bytes("claim_usr"), 32)
    expect(await shelf.values_address(padded)).to.be.eq(collector.address)
  }

  const setupLoan = async () => {
    let padded = zeroPadEnd(utils.toUtf8Bytes("token"), 32)
    await shelf["setReturn(bytes32,address,uint256)"](padded, nft.address, tokenId)
    padded = zeroPadEnd(utils.toUtf8Bytes("debt_loan"), 32)
    await pile["setReturn(bytes32,uint256)"](padded, amount)
  }

  it("Should SeizeCollect", async () => {
    const signerAddress = collector.address
    await collector.relyCollector(signerAddress)
    const price = amount.sub(1)
    await setupLoan()
    await nft.setThreshold(loan, price)
    let padded = zeroPadEnd(utils.toUtf8Bytes("loan"), 32)
    await collector.file(padded, loan, signerAddress, price)
    await seize()
    await collect(signerAddress, price)
  })

  it("Should SeizeCollectAnyUser", async () => {
    const signerAddress = collector.address
    const signerAddress2 = '0x0000000000000000000000000000000000000000'
    await collector.relyCollector(signerAddress)
    const price = amount.sub(1)
    await setupLoan()
    let padded = zeroPadEnd(utils.toUtf8Bytes("loan"), 32)
    await collector.file(padded, loan, signerAddress2, price)
    await nft.setThreshold(loan, price)
    await seize()
    await collect(signerAddress, price)
  })

  it("Should FailSeizeThresholdNotReached", async () => {
    const signerAddress = collector.address
    await collector.relyCollector(signerAddress)
    const price = amount.add(1)
    await setupLoan()
    await nft.setThreshold(loan, price)
    let padded = zeroPadEnd(utils.toUtf8Bytes("loan"), 32)
    await collector.file(padded, loan, signerAddress, price)
    await expect(
      seize()
    ).to.be.revertedWith("threshold-not-reached")
  })

  it("Should FailSeizeCollectUnauthorizedUser", async () => {
    const signerAddress = collector.address
    const signerAddress2 = '0x0000000000000000000000000000000000000001'
    await collector.relyCollector(signerAddress)
    const price = amount.sub(1)
    await setupLoan()
    await nft.setThreshold(loan, price)
    let padded = zeroPadEnd(utils.toUtf8Bytes("loan"), 32)
    await collector.file(padded, loan, signerAddress2, price)
    await seize()
    await expect(
      collect(signerAddress, price)
    ).to.be.revertedWith("not-allowed-to-collect")
  })

  it("Should FailNoPriceDefined", async () => {
    const signerAddress = collector.address
    await collector.relyCollector(signerAddress)
    const price = BigNumber.from(0)
    await setupLoan()
    await nft.setThreshold(loan, price)
    seize()
    await expect(
      collect(signerAddress, price)
    ).to.be.revertedWith("no-nft-price-defined")
  })
})