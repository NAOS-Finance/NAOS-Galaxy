import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { zeroPadEnd, percentToBig, timeFly, now } from "./utils"
import { NAVFeed } from '../types/NAVFeed'
import { ShelfMock } from '../types/ShelfMock'
import { PileMock } from '../types/PileMock'

describe("NAVFeed", function () {
  const defaultThresholdRatio = percentToBig(80)
  const defaultCeilingRatio = percentToBig(60)
  const defaultRate = BigNumber.from('1000000564701133626865910626')     // 5 % day
  const discountRate = BigNumber.from('1000000342100000000000000000')    // 3 % day
  const mockNFTRegistry = '0x' + '2a'.padStart(40, '0')
  let accounts: Signer[]
  let feed: Contract
  let pile: Contract
  let shelf: Contract

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    feed = await (await ethers.getContractFactory("NAVFeed")).deploy() as NAVFeed
    shelf = await (await ethers.getContractFactory("ShelfMock")).deploy() as ShelfMock
    pile = await (await ethers.getContractFactory("PileMock")).deploy() as PileMock
    
    let padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await feed.depend(padded, shelf.address)

    padded = zeroPadEnd(utils.toUtf8Bytes("pile"), 32)
    await feed.depend(padded, pile.address)

    padded = zeroPadEnd(utils.toUtf8Bytes("discountRate"), 32)
    await feed["file(bytes32,uint256)"](padded, discountRate)
    await feed.init()
  })

  const prepareNFT = async (tokenId: number, nftValue: BigNumber, risk: number) => {
    const nftID = feed["nftID(address,uint256)"](mockNFTRegistry, tokenId)
    await feed["update(bytes32,uint256,uint256)"](nftID, nftValue, risk)
    let padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await shelf['setReturn(bytes32,address,uint256)'](padded, mockNFTRegistry, tokenId)

    padded = zeroPadEnd(utils.toUtf8Bytes("debt_loan"), 32)
    await pile['setReturn(bytes32,uint256)'](padded, 0)

    padded = zeroPadEnd(utils.toUtf8Bytes("debt_loan"), 32)
    await pile['setReturn(bytes32,uint256)'](padded, defaultRate)
    return nftID
  }

  const borrow = async (tokenId: number, loan: number, nftValue: BigNumber, amount: BigNumber, maturityDate: number) => {
    const nftID = await prepareNFT(tokenId, nftValue, 0)
    let padded = zeroPadEnd(utils.toUtf8Bytes("maturityDate"), 32)
    await feed["file(bytes32,bytes32,uint256)"](padded, nftID, maturityDate)

    padded = zeroPadEnd(utils.toUtf8Bytes("rates_ratePerSecond"), 32)
    await pile['setReturn(bytes32,uint256)'](padded, defaultRate)

    const navIncreased = await feed.callStatic.borrow(loan, amount)
    await feed.borrow(loan, amount)
    return {
      nftID,
      loan,
      navIncreased
    }
  }

  it('Should SimpleBorrow', async () => {
    const nftValue = utils.parseEther("100")
    const tokenId = 1
    const dueDate = await now() + 86400 * 2
    const amount = utils.parseEther("50")
    const { nftID, loan, navIncreased } = await borrow(tokenId, tokenId, nftValue, amount, dueDate)

    const normalizedDueDate = await feed.uniqueDayTimestamp(dueDate)
    const FV = utils.parseEther('55.125') // 50 * 1.05 ^ 2 = 55.125
    expect(await feed.dateBucket(normalizedDueDate)).to.be.eq(FV)
    // FV/(1.03^2)
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther("51.960741582371777180"))
    expect(await feed.currentNAV()).to.be.eq(navIncreased)
    expect(await feed.totalValue()).to.be.eq(navIncreased)
    await timeFly(1, true)
    // FV/(1.03^1)
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther("53.519490652735515520"))
    expect(await feed.totalValue()).to.be.eq(utils.parseEther("53.519490652735515520"))
    await timeFly(1, true)
    // FV/(1.03^0)
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther("55.125"))
    expect(await feed.totalValue()).to.be.eq(utils.parseEther("55.125"))
  })

  it('Should BorrowWithFixedFee', async () => {
    const nftValue = utils.parseEther("100")
    const tokenId = 1
    const dueDate = await now() + 86400 * 2
    const amount = utils.parseEther("40")
    const fixedFeeRate = percentToBig(25)
    let padded = zeroPadEnd(utils.toUtf8Bytes("rates_fixedRate"), 32)
    await pile["setReturn(bytes32,uint256)"](padded, fixedFeeRate)
    const { nftID, loan, navIncreased } = await borrow(tokenId, tokenId, nftValue, amount, dueDate)

    const normalizedDueDate = await feed.uniqueDayTimestamp(dueDate)
    const FV = utils.parseEther('55.125') // 50 * 1.05 ^ 2 = 55.125
    expect(await feed.dateBucket(normalizedDueDate)).to.be.eq(FV)
    // FV/(1.03^2)
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther("51.960741582371777180"))
    expect(await feed.currentNAV()).to.be.eq(navIncreased)
    expect(await feed.totalValue()).to.be.eq(navIncreased)
    await timeFly(1, true)
    // FV/(1.03^1)
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther("53.519490652735515520"))
    expect(await feed.totalValue()).to.be.eq(utils.parseEther("53.519490652735515520"))
    await timeFly(1, true)
    // FV/(1.03^0)
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther("55.125"))
    expect(await feed.totalValue()).to.be.eq(utils.parseEther("55.125"))
  })
})
