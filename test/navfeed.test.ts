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

    padded = zeroPadEnd(utils.toUtf8Bytes("rates_ratePerSecond"), 32)
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

  const setupLinkedListBuckets = async () => {
    const nftValue = utils.parseEther('100')
    let tokenId = 1
    let dueDate = await now() + 2 * 86400
    let amount = utils.parseEther('50')
    let loan = 1

    await borrow(tokenId, loan,  nftValue, amount, dueDate)
    let normalizedDueDate = await feed.uniqueDayTimestamp(dueDate)


    const FV = utils.parseEther('55.125') // 50 * 1.05 ^ 2 ~= 55.125
    expect(await feed.dateBucket(normalizedDueDate)).to.be.eq(FV)

    // FV/(1.03^2)
    // list: [2 days]
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther('51.960741582371777180'))

    // insert next bucket after last bucket
    dueDate = await now() + 5 * 86400
    tokenId = 2
    loan = 2
    await borrow(tokenId, loan, nftValue, amount, dueDate)

    // list : [2 days] -> [5 days]
    // 50*1.05^2/(1.03^2) + 50*1.05^5/(1.03^5) ~= 107.00
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther('107.007702266903241118'))

    // insert between two buckets
    // current list: [2 days] -> [5 days]
    dueDate = await now() + 4 * 86400
    tokenId = 3
    loan = 3
    await borrow(tokenId, loan, nftValue, amount, dueDate)

    // list : [2 days] ->[4 days] -> [5 days]
    // 50*1.05^2/(1.03^2) + 50*1.05^4/(1.03^4) + 50*1.05^5/(1.03^5)   ~= 161.00
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther('161.006075582703631092'))

    // insert at the beginning
    // current list: bucket[now+2days]-> bucket[now+4days] -> bucket[now+5days]
    dueDate = await now() + 1 * 86400
    tokenId = 4
    loan = 4
    await borrow(tokenId, loan, nftValue, amount, dueDate)

    // list : [1 days] -> [2 days] -> [4 days] -> [5 days]
    // (50*1.05^1)/(1.03^1) + 50*1.05^2/(1.03^2) + 50*1.05^4/(1.03^4) + 50*1.05^5/(1.03^5) ~= 211.977
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther('211.977019061499360158'))

    // add amount to existing bucket
    dueDate = await now() + 4 * 86400
    tokenId = 5
    loan = 5
    await borrow(tokenId, loan, nftValue, amount, dueDate)
    // list : [1 days] -> [2 days] -> [4 days] -> [5 days]
    // (50*1.05^1)/(1.03^1) + 50*1.05^2/(1.03^2) + 100*1.05^4/(1.03^4) + 50*1.05^5/(1.03^5)  ~= 265.97
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther('265.975392377299750133'))

  }

  const listLen = async () => {
    let normalizedDay = await feed.uniqueDayTimestamp(await now())
    let len = 0
    let currDate = normalizedDay.toNumber()

    if (currDate > await feed.lastBucket()) {
      return len
    }

    let buckets = await feed.buckets(currDate)
    while (buckets.next.toNumber() == 0) {
      currDate += 86400
      buckets = await feed.buckets(currDate)
    }

    while(currDate != (await feed.NullDate()).toNumber())
    {
        buckets = await feed.buckets(currDate)
        currDate = buckets.next.toNumber()
        len++
    }
    return len
  }

  const repay = async () => {
    let amount = utils.parseEther('50')
    await setupLinkedListBuckets()
    
    // due date + 5 days for loan 2
    let tokenId = 2
    let loan = 2
    let padded = zeroPadEnd(utils.toUtf8Bytes("debt_loan"), 32)
    await pile["setReturn(bytes32,uint256)"](padded, amount)
    padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await shelf["setReturn(bytes32,address,uint256)"](padded, mockNFTRegistry, tokenId)
    const nftID = feed["nftID(uint256)"](loan)
    let maturityDate = await feed.maturityDate(nftID)
    let navBefore = await feed.currentNAV()

    // loan id doesn't matter because shelf is mocked
    // repay not full amount
    let navDecrease = await feed.callStatic.repay(loan, utils.parseEther('30'))
    await feed.repay(loan, utils.parseEther('30'))

    await listLen()

    // list : [1 days] -> [2 days] -> [4 days] -> [5 days]
    // (50*1.05^1)/(1.03^1) + (50*1.05^2) /(1.03^2)  + 100*1.05^4/(1.03^4) + (50-30)*1.05^5/(1.03^5)  ~= 232.94 eth
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther('232.947215966580871770'))
    expect(await feed.currentNAV()).to.be.eq(navBefore.sub(navDecrease))

    // newFV = (loan.debt - repayment)*interest^timeLeft
    // newFV = (50-30)*1.05^5
    let newFV = utils.parseEther('25.52563125')
    expect(await feed.dateBucket(maturityDate)).to.be.eq(newFV)

    amount = utils.parseEther('20')
    padded = zeroPadEnd(utils.toUtf8Bytes("debt_loan"), 32)
    await pile["setReturn(bytes32,uint256)"](padded, amount)
    await feed.repay(loan, amount)
    expect(await feed.dateBucket(maturityDate)).to.be.eq(0)

    // (50*1.05^1)/(1.03^1) + 100*1.05^4/(1.03^4) + 50*1.05^5/(1.03^5)  ~= 214.014
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther('210.928431692768286195'))
    // loan fully repaid -> future value = 0
    expect(await feed.futureValue(nftID)).to.be.eq(0)
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

  it('Should LinkedListBucket', async () => {
    await setupLinkedListBuckets()
    await timeFly(1, true)

    // list : [0 days] -> [1 days] -> [3 days] -> [4 days]
    // (50*1.05^1)/(1.03^0) + 50*1.05^2/(1.03^1) + 100*1.05^4/(1.03^3) + 50*1.05^5/(1.03^4)  ~= 273.95
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther("273.954279571404002939"))

    await timeFly(1, true)

    // list : [0 days] -> [2 days] -> [3 days]
    // 50*1.05^2/(1.03^0) + 100*1.05^4/(1.03^2) + 50*1.05^5/(1.03^3) ~= 228.09
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther("228.097596081095759604"))
  })

  it('Should TimeOverBuckets', async () => {
    const nftValue = utils.parseEther('100')
    const tokenId = 1
    const dueDate = await now() + 2 * 86400
    const amount = utils.parseEther('50')
    const loan = 1

    await borrow(tokenId, loan,  nftValue, amount, dueDate)

    // 50 * 1.05^2/(1.03^2)
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther('51.960741582371777180'))

    await timeFly(3, true)

    expect(await feed.currentNAV()).to.be.eq(0)
  })

  it('Should NormalizeDate', async () => {
    let randomUnixTimestamp = 1586977096 // 04/15/2020 @ 6:58pm (UTC)
    const dayTimestamp = await feed.uniqueDayTimestamp(randomUnixTimestamp)
    expect(await feed.uniqueDayTimestamp(randomUnixTimestamp)).to.not.eq(randomUnixTimestamp);
    
    const delta = randomUnixTimestamp - dayTimestamp

    expect(delta).to.be.lt(24 * 60 * 60)
    randomUnixTimestamp += 3 * 60 * 60
    expect(await feed.uniqueDayTimestamp(randomUnixTimestamp)).to.be.eq(dayTimestamp)
  })

  it('Should Repay', async () => {
    await repay()
  })

  it('Should FailChangeMaturityDateLoanOngoing', async () => {
    let nftValue = utils.parseEther('100')
    let amount = utils.parseEther('50')
    let tokenId = 2
    let loan = 2
    let dueDate = await now() + 2 * 86400

    const nftID = await prepareNFT(tokenId, nftValue, 0)
    await borrow(tokenId, loan, nftValue, amount, dueDate)
    
    // should fail switching to new date after borrowing
    dueDate += 2 * 86400
    let padded = zeroPadEnd(utils.toUtf8Bytes("maturityDate"), 32)
    await expect(
      feed["file(bytes32,bytes32,uint256)"](padded, nftID, dueDate)
    ).to.be.revertedWith("can-not-change-maturityDate-outstanding-debt")
  })

  it('Should ChangeMaturityDateNoDebt', async () => {
    let nftValue = utils.parseEther('100')
    let amount = utils.parseEther('50')
    let tokenId = 2
    let loan = 2
    let dueDate = await now() + 2 * 86400

    const nftID = await prepareNFT(tokenId, nftValue, 0)
    let padded = zeroPadEnd(utils.toUtf8Bytes("maturityDate"), 32)
    await feed["file(bytes32,bytes32,uint256)"](padded, nftID, dueDate)
    
    dueDate = dueDate + 2 * 86400
    await feed["file(bytes32,bytes32,uint256)"](padded, nftID, dueDate)
    expect(await feed.maturityDate(nftID)).to.be.eq(await feed.uniqueDayTimestamp(dueDate))
  })

  it('Should ChangeMaturityDebtRepaid', async () => {
    await repay()
    let tokenId = 2
    const nftID = feed["nftID(uint256)"](tokenId)
    let dueDate = (await feed.maturityDate(nftID)).toNumber() + 2 * 86400
    let padded = zeroPadEnd(utils.toUtf8Bytes("maturityDate"), 32)
    await feed["file(bytes32,bytes32,uint256)"](padded, nftID, dueDate)
    expect(await feed.maturityDate(nftID)).to.be.eq(await feed.uniqueDayTimestamp(dueDate))
  })

  it('Should RepayAfterMaturityDate', async () => {
    await setupLinkedListBuckets()
    let amount = utils.parseEther('50')
    let tokenId = 2
    let loan = 2
    let repayAmount = utils.parseEther('30')
    const nftID = feed["nftID(uint256)"](tokenId)
    // let dueDate = (await feed.maturityDate(nftID)).toNumber()
    const nav = await feed.currentNAV()
    const approximatedNav = await feed.approximatedNAV()
    const FV = await feed.futureValue(nftID)
    expect(FV).to.be.gt(0)

    // repayment has to happen after maturity date
    await timeFly(6, true)

    // // make repayment for overdue loan
    let navDecrease = await feed.callStatic.repay(loan, repayAmount)
    await feed.repay(loan, repayAmount)

    expect(await feed.approximatedNAV()).to.be.eq(approximatedNav.sub(repayAmount))
    expect(navDecrease).to.be.eq(repayAmount)
  })

  it('Should RemoveBuckets', async () => {
    const buckets = [
      BigNumber.from('52500000000000000000'),
      BigNumber.from('55125000000000000000'),
      BigNumber.from('121550625000000000000'),
      BigNumber.from('63814078125000000000')
    ]
    const tokenIdForBuckets = [
      BigNumber.from('4'),
      BigNumber.from('1'),
      BigNumber.from('3'),
      BigNumber.from('2')
    ]
    await setupLinkedListBuckets()

    let idx = 1
    let padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await shelf["setReturn(bytes32,address,uint256)"](padded, mockNFTRegistry, tokenIdForBuckets[idx])

    padded = zeroPadEnd(utils.toUtf8Bytes("debt_loan"), 32)
    await pile["setReturn(bytes32,uint256)"](padded, buckets[idx])
    await feed.repay(tokenIdForBuckets[idx], buckets[idx])
    expect(await listLen()).to.be.eq(3)

    idx = 0
    padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await shelf["setReturn(bytes32,address,uint256)"](padded, mockNFTRegistry, tokenIdForBuckets[idx])
    padded = zeroPadEnd(utils.toUtf8Bytes("debt_loan"), 32)
    await pile["setReturn(bytes32,uint256)"](padded, buckets[idx])
    await feed.repay(tokenIdForBuckets[idx], buckets[idx])
    expect(await listLen()).to.be.eq(2)

    idx = 3
    padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    await shelf["setReturn(bytes32,address,uint256)"](padded, mockNFTRegistry, tokenIdForBuckets[idx])
    padded = zeroPadEnd(utils.toUtf8Bytes("debt_loan"), 32)
    await pile["setReturn(bytes32,uint256)"](padded, buckets[idx])
    await feed.repay(tokenIdForBuckets[idx], buckets[idx])
    expect(await listLen()).to.be.eq(1)
  })

  it('Should WriteOffs', async () => {
    let amount = utils.parseEther('100')
    let padded = zeroPadEnd(utils.toUtf8Bytes("rate_debt"), 32)
    await pile['setReturn(bytes32,uint256)'](padded, amount)
    expect(await feed.currentNAV()).to.be.eq(utils.parseEther('140'))
  })

  it('Should RecoveryRatePD', async () => {
    let nftValue = utils.parseEther('100')
    let amount = utils.parseEther('50')
    let tokenId = 1
    let loan = 1
    let dueDate = await now() + 2 * 86400
    const risk = 1
    const nftID = prepareNFT(tokenId, nftValue, risk)

    let padded = zeroPadEnd(utils.toUtf8Bytes("maturityDate"), 32)
    await feed['file(bytes32,bytes32,uint256)'](padded, nftID, dueDate)

    const rate = BigNumber.from('1000000564701133626865910626')
    padded = zeroPadEnd(utils.toUtf8Bytes("loanRates"), 32)
    await pile['setReturn(bytes32,uint256)'](padded, rate)

    await feed.borrow(loan, amount)

    const normalizedDueDate = await feed.uniqueDayTimestamp(dueDate)
    const FV = utils.parseEther('49.6125')
    expect(await feed.dateBucket(normalizedDueDate)).to.be.eq(FV)
  })

  it('Should ChangeRiskGroup', async () => {
    let nftValue = utils.parseEther('100')
    let amount = utils.parseEther('50')
    let tokenId = 2
    let loan = 2
    let dueDate = await now() + 2 * 86400
    const nftID = feed["nftID(address,uint256)"](mockNFTRegistry, tokenId)
    await borrow(tokenId, loan, nftValue, amount, dueDate)

    let padded = zeroPadEnd(utils.toUtf8Bytes("nftlookup"), 32)
    await shelf['setReturn(bytes32,uint256)'](padded, loan)

    padded = zeroPadEnd(utils.toUtf8Bytes("debt_loan"), 32)
    await pile['setReturn(bytes32,uint256)'](padded, amount)

    const normalizedDueDate = await feed.uniqueDayTimestamp(dueDate)
    const FV = utils.parseEther('55.125') // 50 * 1.05 ^ 2 = 55.125
    expect(await feed.dateBucket(normalizedDueDate)).to.be.eq(FV)

    let risk = 0
    await feed["update(bytes32,uint256,uint256)"](nftID, nftValue, risk)
    expect(await feed.dateBucket(normalizedDueDate)).to.be.eq(FV)

    risk = 1
    await feed["update(bytes32,uint256,uint256)"](nftID, nftValue, risk)
    //  55.125 * 0.9
    expect(await feed.dateBucket(normalizedDueDate)).to.be.eq(utils.parseEther('49.6125'))
  })
})
