import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { zeroPadEnd } from "./utils"

describe("Shelf", function () {
  const loan = BigNumber.from(1)
  const amount = BigNumber.from(100)
  const tokenId = BigNumber.from(55)
  let accounts: Signer[]
  let nft: Contract
  let title: Contract
  let currency: Contract
  let pile: Contract
  let ceiling: Contract
  let distributor: Contract
  let shelf: Contract

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    nft = await (await ethers.getContractFactory("NFTMock")).deploy()
    title = await (await ethers.getContractFactory("TitleMock")).deploy()
    currency = await (await ethers.getContractFactory("TokenMock")).deploy()
    pile = await (await ethers.getContractFactory("PileMock")).deploy()
    ceiling = await (await ethers.getContractFactory("CeilingMock")).deploy()
    distributor = await (await ethers.getContractFactory("src/borrower/test/mock/distributor.sol:DistributorMock")).deploy()
    shelf = await (await ethers.getContractFactory("Shelf")).deploy(currency.address, title.address, pile.address, ceiling.address)
    const padded = zeroPadEnd(utils.toUtf8Bytes("distributor"), 32)
    await shelf.depend(padded, distributor.address)
  })

  const issue = async (address:string) => {
    let padded = zeroPadEnd(utils.toUtf8Bytes("issue"), 32)
    await title["setReturn(bytes32,uint256)"](padded, loan)
    padded = zeroPadEnd(utils.toUtf8Bytes("ownerOf"), 32)
    await title["setReturn(bytes32,address)"](padded, address);
    const loan2 = await shelf.callStatic.issue(nft.address, tokenId)
    await shelf.issue(nft.address, tokenId)
    expect(loan).to.be.eq(loan2)
  }

  const lock = async (address: string) => {
    await shelf.lock(loan)

    expect(await nft.calls("transferFrom")).to.be.eq(1)
    expect(await nft.values_address("transferFrom_to")).to.be.eq(shelf.address)
    expect(await nft.values_address("transferFrom_from")).to.be.eq(address)
    expect(await nft.values_uint("transferFrom_tokenId")).to.be.eq(tokenId)
  }

  const testLock = async (address: string) => {
    const padded = zeroPadEnd(utils.toUtf8Bytes("ownerOf"), 32)
    await nft["setReturn(bytes32,address)"](padded, address)
    issue(address)
    lock(address)
  }

  const borrow = async () => {
    await shelf.borrow(loan, amount)

    expect(await ceiling.calls("borrow")).to.be.eq(1)
    expect(await pile.calls("accrue")).to.be.eq(1)
    expect(await pile.calls("incDebt")).to.be.eq(1)
    expect(await shelf.balance()).to.be.eq(amount)
    expect(await shelf.balances(loan)).to.be.eq(amount)
  }

  it("Should borrow", async () => {
    const signerAddress = await accounts[0].getAddress()
    await testLock(signerAddress)
    await borrow()
  })
})
