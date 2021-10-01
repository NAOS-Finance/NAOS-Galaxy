import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { percentToBig, zeroPadEnd, MAX_UINT256, now, ONE, timeFly, div, mul, rmul, deployTestRoot, deployCollateralNFT, deployCurrency, deployBorrower, prepareDeployLender, deployLender } from "./utils"

describe("LenderScenarios", function () {
  let accounts: Signer[]
  let root: Contract
  let collateralNFT: Contract
  let currency: Contract
  let borrowerDeployer: Contract
  let shelf: Contract
  let pile: Contract
  let title: Contract
  let collector: Contract
  let nftFeed: Contract
  let lenderDeployer: Contract
  let assessor: Contract
  let reserve: Contract
  let coordinator: Contract
  let seniorTranche: Contract
  let juniorTranche: Contract
  let juniorOperator: Contract
  let seniorOperator: Contract
  let seniorToken: Contract
  let juniorToken: Contract
  let juniorMemberlist: Contract
  let seniorMemberlist: Contract
  let borrower: Contract
  let randomUser: Contract
  let keeper: Contract
  let admin: Contract
  let seniorInvestor: Contract
  let juniorInvestor: Contract
  let TWO_DECIMAL_PRECISION = BigNumber.from("10000000000000000")
  let FIXED27_TWO_DECIMAL_PRECISION = BigNumber.from("10000000000000000000000000")

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    await deployContracts()
    await createTestUsers()
  })

  const deployContracts = async () => {
    root = await deployTestRoot(accounts)
    collateralNFT = await deployCollateralNFT()
    currency = await deployCurrency()
    borrowerDeployer = await deployBorrower(root.address, currency.address)
    shelf = await (await ethers.getContractFactory("Shelf")).attach(await borrowerDeployer.shelf())
    pile = await (await ethers.getContractFactory("Pile")).attach(await borrowerDeployer.pile())
    title = await (await ethers.getContractFactory("Title")).attach(await borrowerDeployer.title())
    collector = await (await ethers.getContractFactory("Collector")).attach(await borrowerDeployer.collector())
    nftFeed = await (await ethers.getContractFactory("NAVFeed")).attach(await borrowerDeployer.feed())

    lenderDeployer = await prepareDeployLender(root.address, currency.address)
    await deployLender(lenderDeployer)
    assessor = await (await ethers.getContractFactory("Assessor")).attach(await lenderDeployer.assessor())
    reserve = await (await ethers.getContractFactory("Reserve")).attach(await lenderDeployer.reserve())
    coordinator = await (await ethers.getContractFactory("EpochCoordinator")).attach(await lenderDeployer.coordinator())
    seniorTranche = await (await ethers.getContractFactory("Tranche")).attach(await lenderDeployer.seniorTranche())
    juniorTranche = await (await ethers.getContractFactory("Tranche")).attach(await lenderDeployer.juniorTranche())
    juniorOperator = await (await ethers.getContractFactory("Operator")).attach(await lenderDeployer.juniorOperator())
    seniorOperator = await (await ethers.getContractFactory("Operator")).attach(await lenderDeployer.seniorOperator())
    seniorToken = await (await ethers.getContractFactory("RestrictedToken")).attach(await lenderDeployer.seniorToken())
    juniorToken = await (await ethers.getContractFactory("RestrictedToken")).attach(await lenderDeployer.juniorToken())
    juniorMemberlist = await (await ethers.getContractFactory("Memberlist")).attach(await lenderDeployer.juniorMemberlist())
    seniorMemberlist = await (await ethers.getContractFactory("Memberlist")).attach(await lenderDeployer.seniorMemberlist())

    await root.prepare(lenderDeployer.address, borrowerDeployer.address, accounts[0].getAddress())
    await root.deploy()
  }

  const createTestUsers = async () => {
    borrower = await (await ethers.getContractFactory("Borrower")).deploy(shelf.address, reserve.address, currency.address, pile.address)
    randomUser = await (await ethers.getContractFactory("Borrower")).deploy(shelf.address, reserve.address, currency.address, pile.address)
    keeper = await (await ethers.getContractFactory("Keeper")).deploy(collector.address,currency.address)
    admin = await (await ethers.getContractFactory("AdminUser")).deploy(shelf.address, pile.address, nftFeed.address, title.address, reserve.address, collector.address, juniorMemberlist.address, seniorMemberlist.address)
    await root.relyBorrowerAdmin(admin.address)
    await root.relyLenderAdmin(admin.address)
    await createInvestorUser()
  }

  const createInvestorUser = async () => {
    seniorInvestor = await (await ethers.getContractFactory("Investor")).deploy(seniorOperator.address, seniorTranche.address, currency.address, seniorToken.address)
    juniorInvestor = await (await ethers.getContractFactory("Investor")).deploy(juniorOperator.address, juniorTranche.address, currency.address, juniorToken.address)
  }

  // base ======>

  const createLoanAndBorrow = async (usr: string, nftPrice: BigNumber, riskGroup: BigNumber) => {
    const { tokenId, loanId } = await issueNFTAndCreateLoan(usr)
    await priceNFTandSetRisk(tokenId, nftPrice, riskGroup)
    await lockNFT(loanId, usr)

    const ceiling = await computeCeiling(riskGroup, nftPrice)
    const borrower = await (await ethers.getContractFactory("Borrower")).attach(usr)
    await borrower.borrow(loanId, ceiling)
    return { loanId, tokenId }
  }

  const createLoanAndWithdraw = async (usr: string, nftPrice: BigNumber, riskGroup: BigNumber) => {
    const { loanId, tokenId } = await createLoanAndBorrow(usr, nftPrice, riskGroup)
    const ceiling = computeCeiling(riskGroup, nftPrice)
    const borrower = await (await ethers.getContractFactory("Borrower")).attach(usr)
    await borrower.withdraw(loanId, ceiling, borrower.address)
    return { loanId, tokenId }
  }

  const repayLoan = async (usr: string, loanId: BigNumber, currencyAmount: BigNumber) => {
    await topUp(usr)
    const borrowerUsr = await (await ethers.getContractFactory("Borrower")).attach(usr)
    await borrowerUsr.doApproveCurrency(shelf.address, MAX_UINT256)
    await borrower.repay(loanId, currencyAmount)
  }

  const invest = async (currencyAmount: BigNumber) => {
    const validUntil = await now() + 8 * 86400
    await admin.makeJuniorTokenMember(juniorInvestor.address, validUntil)
    await admin.makeSeniorTokenMember(seniorInvestor.address, validUntil)

    const amountSenior = mul(currencyAmount, percentToBig(82))
    const amountJunior = mul(currencyAmount, percentToBig(18))

    await currency.mint(seniorInvestor.address, amountSenior)
    await currency.mint(juniorInvestor.address, amountJunior)

    await seniorInvestor.supplyOrder(amountSenior)
    await juniorInvestor.supplyOrder(amountJunior)
  }

  const seize = async (loanId: BigNumber) => {
    await collector.seize(loanId)
  }

  const addKeeperAndCollect = async (loanId: BigNumber, usr: string, recoveryPrice: BigNumber) => {
    await seize(loanId)
    await admin.addKeeper(loanId, usr, recoveryPrice)
    await topUp(usr)
    const borrower = await (await ethers.getContractFactory("Borrower")).attach(usr)
    await borrower.doApproveCurrency(shelf.address, MAX_UINT256)
    await admin.collect(loanId, usr)
  }


  const lockNFT = async (loanId: BigNumber, usr: string) => {
    const borrower = await (await ethers.getContractFactory("Borrower")).attach(usr)
    await borrower.approveNFT(collateralNFT.address, shelf.address)
    await borrower.lock(loanId)
  }

  const issueNFT = async (usr: string) => {
    const tokenId = await collateralNFT.callStatic.issue(usr)
    await collateralNFT.issue(usr)
    const lookupId = await nftFeed.callStatic['nftID(address,uint256)'](collateralNFT.address, tokenId)
    return { tokenId, lookupId }
  }

  const issueNFTAndCreateLoan = async (usr: string) => {
    const { tokenId } = await issueNFT(usr)
    const borrower = await (await ethers.getContractFactory("Borrower")).attach(usr)
    const loanId = await borrower.callStatic.issue(collateralNFT.address, tokenId)
    await borrower.issue(collateralNFT.address, tokenId)
    return { tokenId, loanId }
  }

  const priceNFTandSetRisk = async (tokenId: BigNumber, nftPrice: BigNumber, riskGroup: BigNumber, maturityDate: number = 0) => {
    maturityDate = (maturityDate) ? maturityDate : await now() + 600 * 86400
    const lookupId = await nftFeed.callStatic['nftID(address,uint256)'](collateralNFT.address, tokenId)
    await admin.priceNFTAndSetRiskGroup(lookupId, nftPrice, riskGroup, maturityDate)
  }

  const priceNFT = async (tokenId: BigNumber, nftPrice: BigNumber) => {
    const lookupId = await nftFeed.callStatic['nftID(address,uint256)'](collateralNFT.address, tokenId)
    await admin.priceNFT(lookupId, nftPrice)
  }

  const computeCeiling = async (riskGroup: BigNumber, nftPrice: BigNumber) => {
    const ceilingRatio = await nftFeed.callStatic.ceilingRatio(riskGroup)
    return mul(ceilingRatio, nftPrice)
  }

  const supplyFunds = async (amount: BigNumber, addr: string) => {
    await currency.mint(addr, amount)
  }

  const topUp = async (usr: string) => {
    await currency.mint(usr, utils.parseEther("1000"))
  }

  const fundLender = async (amount: BigNumber) => {
    await invest(amount)
    await timeFly(1, true)
    await coordinator.closeEpoch()
  }

  const borrow = async (loanId: BigNumber, tokenId: BigNumber, borrowAmount: BigNumber, fundLenderRequired: Boolean) => {
    await borrower.approveNFT(collateralNFT.address, shelf.address)
    if (fundLenderRequired) {
      await fundLender(borrowAmount)
    }
    await borrower.borrowAction(loanId, borrowAmount)
  }

  const setupOngoingLoan = async (nftPrice: BigNumber, borrowAmount: BigNumber, lenderFundingRequired: Boolean, maturityDate: number) => {
    const riskGroup = BigNumber.from("3")
    const tokenId = await collateralNFT.callStatic.issue(borrower.address)
    await collateralNFT.issue(borrower.address)
    const loan = await setupLoan(tokenId, collateralNFT.address, nftPrice, riskGroup, maturityDate)
    await borrow(loan, tokenId, borrowAmount, lenderFundingRequired)
    return { loan, tokenId }
  }

  const setupLoan = async (tokenId: BigNumber, collateralNFT_: string, nftPrice: BigNumber, riskGroup: BigNumber, maturityDate: number) => {
    const loan = await borrower.callStatic.issue(collateralNFT_, tokenId)
    await borrower.issue(collateralNFT_, tokenId)
    await priceNFTandSetRisk(tokenId, nftPrice, riskGroup, maturityDate)
    return loan
  }

  // testCase ======>

  const seniorSupply = async (currencyAmount: BigNumber, investor: Contract = seniorInvestor) => {
    await admin.makeSeniorTokenMember(investor.address, await now() + 8 * 86400)
    await currency.mint(investor.address, currencyAmount)
    await investor.supplyOrder(currencyAmount)
    const supplyAmount = (await seniorTranche.users(investor.address))[1]
    expect(supplyAmount).to.be.eq(currencyAmount)
  }

  const juniorSupply = async (currencyAmount: BigNumber) => {
    await currency.mint(juniorInvestor.address, currencyAmount)
    await admin.makeJuniorTokenMember(juniorInvestor.address, await now() + 8 * 86400)
    await juniorInvestor.supplyOrder(currencyAmount)
    const supplyAmount = (await juniorTranche.users(juniorInvestor.address))[1]
    expect(supplyAmount).to.be.eq(currencyAmount)
  }

  const closeEpoch = async (closeWithExecute: Boolean) => {
    const currentEpoch = await coordinator.currentEpoch()
    let lastEpochExecuted = await coordinator.lastEpochExecuted()

    await coordinator.closeEpoch()
    expect(await coordinator.currentEpoch()).to.be.eq(currentEpoch.add(BigNumber.from("1")))
    if (closeWithExecute == true) {
      lastEpochExecuted = lastEpochExecuted.add(BigNumber.from("1"))
    }
    expect(await coordinator.lastEpochExecuted()).to.be.eq(lastEpochExecuted)
  }

  const supplyAndBorrowFirstLoan = async (
    seniorSupplyAmount: BigNumber,
    juniorSupplyAmount: BigNumber,
    nftPrice: BigNumber,
    borrowAmount: BigNumber,
    maturityDate: BigNumber,
    submission: any
  ) => {
    await seniorSupply(seniorSupplyAmount)
    await juniorSupply(juniorSupplyAmount)

    await timeFly(1, true)

    await closeEpoch(false)
    expect(await coordinator.submissionPeriod()).to.be.eq(true)

    const valid = await coordinator.callStatic.submitSolution(submission.seniorRedeem, submission.juniorRedeem, submission.juniorSupply, submission.seniorSupply)
    await coordinator.submitSolution(submission.seniorRedeem, submission.juniorRedeem, submission.juniorSupply, submission.seniorSupply)
    expect(valid).to.be.eq(await coordinator.NEW_BEST())

    await timeFly(2 / 24, true)

    await coordinator.executeEpoch()

    expect(await reserve.totalBalance()).to.be.eq(submission.seniorSupply.add(submission.juniorSupply))

    const seniorInvestorResult = await seniorInvestor.callStatic.disburse()
    await seniorInvestor.disburse()
    let payoutCurrencyAmount = seniorInvestorResult[0]
    let payoutTokenAmount = seniorInvestorResult[1]
    let remainingSupplyCurrency = seniorInvestorResult[2]
    let remainingRedeemToken = seniorInvestorResult[3]
    expect(payoutTokenAmount).to.be.eq(submission.seniorSupply)
    expect(remainingSupplyCurrency).to.be.eq(seniorSupplyAmount.sub(submission.seniorSupply))

    const juniorInvestorResult = await juniorInvestor.callStatic.disburse()
    await juniorInvestor.disburse()
    payoutCurrencyAmount = juniorInvestorResult[0]
    payoutTokenAmount = juniorInvestorResult[1]
    remainingSupplyCurrency = juniorInvestorResult[2]
    remainingRedeemToken = juniorInvestorResult[3]
    expect(payoutTokenAmount).to.be.eq(submission.juniorSupply)
    expect(remainingSupplyCurrency).to.be.eq(juniorSupplyAmount.sub(submission.juniorSupply))

    expect(await seniorToken.balanceOf(seniorInvestor.address)).to.be.eq(submission.seniorSupply)
    expect(await juniorToken.balanceOf(juniorInvestor.address)).to.be.eq(submission.juniorSupply)

    const { loan, tokenId } = await setupOngoingLoan(nftPrice, borrowAmount, false, maturityDate.toNumber())
    expect(await currency.balanceOf(borrower.address)).to.be.eq(borrowAmount)

    const nav = await nftFeed.calcUpdateNAV()
    const fv = await nftFeed.futureValue(await nftFeed['nftID(uint256)'](loan))

    expect(fv).to.be.eq(utils.parseEther("127.62815625"))
    expect(nav).to.be.eq(utils.parseEther("110.093921369062927876"))
    expect(await assessor.seniorDebt()).to.be.eq(rmul(submission.seniorSupply.add(submission.juniorSupply), await assessor.seniorRatio()))

    const seniorTokenPrice = await assessor.calcSeniorTokenPrice(nav, 0)
    expect(seniorTokenPrice).to.be.eq(ONE)

    return { loan, tokenId }
  }

  const calcInterest = async (amount: BigNumber, time: BigNumber, ratePerSecond: BigNumber) => {
    return rmul(ratePerSecond.pow(time), amount)
  }

  const juniorWithLosses = async () => {
    const seniorSupplyAmount = utils.parseEther("1000")
    const juniorSupplyAmount = utils.parseEther("1000")
    const nftPrice = utils.parseEther("1000")
    const borrowAmount = utils.parseEther("1000")

    const submission = {
      seniorSupply: utils.parseEther("80"),
      juniorSupply: utils.parseEther("20"),
      seniorRedeem: utils.parseEther("0"),
      juniorRedeem: utils.parseEther("0")
    }

    const { loan, tokenId } = await supplyAndBorrowFirstLoan(seniorSupplyAmount, juniorSupplyAmount, nftPrice, borrowAmount, BigNumber.from((await now() + 5 * 86400).toString()), submission)
    await root.relyContract(assessor.address, await accounts[0].getAddress())
    const highRate = BigNumber.from("1000001103100000000000000000")
    let padded = zeroPadEnd(utils.toUtf8Bytes("seniorInterestRate"), 32)
    await assessor.file(padded, highRate)

    await seniorSupply(BigNumber.from("0"))

    await timeFly(3, true)

    await assessor.calcSeniorTokenPrice()

    let juniorTokenPrice = await assessor.calcJuniorTokenPrice()

    expect(juniorTokenPrice < ONE).to.be.eq(true)

    await timeFly(3, true)

    const nav = await nftFeed.currentNAV()

    expect(nav).to.be.eq(BigNumber.from("0"))
    await root.relyContract(pile.address, await accounts[0].getAddress())

    await pile.changeRate(loan, await nftFeed.WRITE_OFF_PHASE_A())
    expect(await nftFeed.currentNAV()).to.be.eq(mul(await pile.debt(loan), percentToBig(60)))

    juniorTokenPrice = await assessor.calcJuniorTokenPrice()

    expect(await assessor.seniorDebt() > await nftFeed.currentNAV()).to.be.eq(true)

    expect(juniorTokenPrice).to.be.eq(BigNumber.from("0"))

    return { loan, tokenId }
  }

  it("Should SupplyClose", async () => {
    const seniorSupplyAmount = utils.parseEther("82")
    const juniorSupplyAmount = utils.parseEther("18")
    await seniorSupply(seniorSupplyAmount)
    await juniorSupply(juniorSupplyAmount)
    await timeFly(1, true)
    await closeEpoch(true)
  })

  it("Should SupplyAndBorrow", async () => {
    const seniorSupplyAmount = utils.parseEther("500")
    const juniorSupplyAmount = utils.parseEther("20")
    const nftPrice = utils.parseEther("200")

    const borrowAmount = utils.parseEther("100")
    const maturityDate = BigNumber.from((await now() + 5 * 86400).toString())

    const submission = {
      seniorSupply: utils.parseEther("82"),
      juniorSupply: utils.parseEther("18"),
      seniorRedeem: utils.parseEther("0"),
      juniorRedeem: utils.parseEther("0")
    }

    await supplyAndBorrowFirstLoan(seniorSupplyAmount, juniorSupplyAmount, nftPrice, borrowAmount, maturityDate, submission)
  })

  it("Should LenderScenarioA", async () => {
    let seniorSupplyAmount = utils.parseEther("500")
    let juniorSupplyAmount = utils.parseEther("20")
    const nftPrice = utils.parseEther("200")

    const borrowAmount = utils.parseEther("100")
    const maturityDate = BigNumber.from((await now() + 5 * 86400).toString())

    const submission = {
      seniorSupply: utils.parseEther("82"),
      juniorSupply: utils.parseEther("18"),
      seniorRedeem: utils.parseEther("0"),
      juniorRedeem: utils.parseEther("0")
    }

    await supplyAndBorrowFirstLoan(seniorSupplyAmount, juniorSupplyAmount, nftPrice, borrowAmount, maturityDate, submission)
    await timeFly(1, true)

    expect(await assessor.seniorDebt()).to.be.eq(await calcInterest(submission.seniorSupply, BigNumber.from(await now() + 24 * 86400), await assessor.seniorInterestRate()))

    let nav = await nftFeed.calcUpdateNAV()

    expect(nav.div(TWO_DECIMAL_PRECISION)).to.be.eq(utils.parseEther("113.39").div(TWO_DECIMAL_PRECISION))

    const seniorTokenPrice = await assessor.calcSeniorTokenPrice(nav, BigNumber.from("0"))
    expect(seniorTokenPrice.div(FIXED27_TWO_DECIMAL_PRECISION)).to.be.eq(utils.parseEther("1.02").mul(BigNumber.from("1000000000")).div(FIXED27_TWO_DECIMAL_PRECISION))

    expect(await assessor.seniorRatio()).to.be.eq(utils.parseEther("0.82").mul(BigNumber.from("1000000000")))

    seniorSupplyAmount = utils.parseEther("80")
    juniorSupplyAmount = utils.parseEther("20")
    await seniorSupply(seniorSupplyAmount)
    await juniorSupply(juniorSupplyAmount)

    await coordinator.closeEpoch()

    expect(await coordinator.submissionPeriod()).to.be.eq(false)

    expect(reserve.totalBalance()).to.be.eq(utils.parseEther("100"))

    const preNAV = await nftFeed.calcUpdateNAV()
    nav = await nftFeed.calcUpdateNAV()

    expect(nav).to.be.eq(preNAV)

    const shouldSeniorRatio = div(await assessor.seniorDebt().add(await assessor.seniorBalance()), nav.add(await reserve.totalBalance()))

    expect((await coordinator.epochNAV()).div(TWO_DECIMAL_PRECISION)).to.be.eq(nav.div(TWO_DECIMAL_PRECISION))

    expect((await coordinator.epochSeniorAsset()).div(TWO_DECIMAL_PRECISION)).to.be.eq(utils.parseEther("83.64").div(TWO_DECIMAL_PRECISION))

    expect(await assessor.seniorRatio()).to.be.eq(shouldSeniorRatio)
    expect((await assessor.seniorRatio()).div(FIXED27_TWO_DECIMAL_PRECISION)).to.be.eq(utils.parseEther("0.76").mul(BigNumber.from("1000000000")).div(FIXED27_TWO_DECIMAL_PRECISION))

    expect(await assessor.seniorDebt()).to.be.eq(rmul(nav, shouldSeniorRatio))
    expect(await assessor.seniorBalance()).to.be.eq((await coordinator.epochSeniorAsset()).add(seniorSupplyAmount).sub(rmul(nav, shouldSeniorRatio)))
  })

  it("Should AutomaticReSupply", async () => {
    let seniorSupplyAmount = utils.parseEther("1000")
    let juniorSupplyAmount = utils.parseEther("20")
    const nftPrice = utils.parseEther("200")

    const borrowAmount = utils.parseEther("100")
    const maturityDate = BigNumber.from((await now() + 5 * 86400).toString())

    const submission = {
      seniorSupply: utils.parseEther("80"),
      juniorSupply: utils.parseEther("20"),
      seniorRedeem: utils.parseEther("0"),
      juniorRedeem: utils.parseEther("0")
    }

    await supplyAndBorrowFirstLoan(seniorSupplyAmount, juniorSupplyAmount, nftPrice, borrowAmount, maturityDate, submission)

    await timeFly(1, true)
    juniorSupplyAmount = utils.parseEther("180")

    await juniorSupply(juniorSupplyAmount)

    await coordinator.closeEpoch()
    expect(await coordinator.submissionPeriod()).to.be.eq(false)

    expect(await seniorToken.balanceOf(seniorInvestor.address)).to.be.eq(utils.parseEther("80"))

    const seniorTrancheResult = await seniorTranche.calcDisburse(seniorInvestor.address)
    let payoutCurrencyAmount = seniorTrancheResult[0]
    let payoutTokenAmount = seniorTrancheResult[1]
    let remainingSupplyCurrency = seniorTrancheResult[2]
    let remainingRedeemToken = seniorTrancheResult[3]
    expect(payoutTokenAmount).to.be.eq(await seniorToken.balanceOf(seniorTranche.address))
    expect(remainingSupplyCurrency).to.be.eq(BigNumber.from("0"))

    const seniorInvestorResult = await seniorInvestor.disburse()
    payoutCurrencyAmount = seniorInvestorResult[0]
    payoutTokenAmount = seniorInvestorResult[1]
    remainingSupplyCurrency = seniorInvestorResult[2]
    remainingRedeemToken = seniorInvestorResult[3]
    expect(await seniorToken.balanceOf(seniorInvestor.address)).to.be.eq(payoutTokenAmount.add(utils.parseEther("80")))

    const seniorTokenPrice = await assessor.calcSeniorTokenPrice(await nftFeed.approximatedNAV(), await reserve.totalBalance())
    const juniorTokenPrice = await assessor.calcJuniorTokenPrice(await nftFeed.approximatedNAV(), await reserve.totalBalance())

    expect(juniorTokenPrice).to.be.gt(seniorTokenPrice)

    const ex1 = (await nftFeed.approximatedNAV()).add(await reserve.totalBalance())
    const ex2 = rmul(await seniorTranche.tokenSupply(), seniorTokenPrice).add(rmul(await juniorTranche.tokenSupply(), juniorTokenPrice))
    const deviation = BigNumber.from("10")
    expect(ex1.div(deviation)).to.be.eq(ex2.div(deviation))
  })

  it("Should LoanRepayments", async () => {
    let seniorSupplyAmount = utils.parseEther("1000")
    let juniorSupplyAmount = utils.parseEther("20")
    const nftPrice = utils.parseEther("200")

    const borrowAmount = utils.parseEther("100")
    const maturityDate = BigNumber.from((await now() + 5 * 86400).toString())

    const submission = {
      seniorSupply: utils.parseEther("80"),
      juniorSupply: utils.parseEther("20"),
      seniorRedeem: utils.parseEther("0"),
      juniorRedeem: utils.parseEther("0")
    }

    const { loan } = await supplyAndBorrowFirstLoan(seniorSupplyAmount, juniorSupplyAmount, nftPrice, borrowAmount, maturityDate, submission)

    await seniorSupply(BigNumber.from("0"))

    await timeFly(1, true)

    let nav = await nftFeed.calcUpdateNAV()

    expect(nav.div(TWO_DECIMAL_PRECISION)).to.be.eq(utils.parseEther("113.39").div(TWO_DECIMAL_PRECISION))

    expect(await reserve.totalBalance()).to.be.eq(BigNumber.from("0"))

    const loanDebt = await pile.debt(loan)
    await repayLoan(borrower.address, loan, loanDebt)

    expect(await reserve.totalBalance()).to.be.eq(loanDebt)
    expect(await nftFeed.approximatedNAV()).to.be.eq(BigNumber.from("0"))

    await seniorInvestor.redeemOrder(await seniorToken.balanceOf(seniorInvestor.address))
    await juniorInvestor.redeemOrder(await juniorToken.balanceOf(juniorInvestor.address))

    await coordinator.closeEpoch()
    expect(await coordinator.submissionPeriod()).to.be.eq(false)

    const seniorInvestorResult = await seniorInvestor.disburse()
    let payoutCurrencyAmount = seniorInvestorResult[0]
    let payoutTokenAmount = seniorInvestorResult[1]
    let remainingSupplyCurrency = seniorInvestorResult[2]
    let remainingRedeemToken = seniorInvestorResult[3]
    expect(payoutCurrencyAmount).to.be.eq(rmul(utils.parseEther("80"), await coordinator.epochSeniorTokenPrice()))

    const juniorInvestorResult = await juniorInvestor.disburse()
    payoutCurrencyAmount = juniorInvestorResult[0]
    payoutTokenAmount = juniorInvestorResult[1]
    remainingSupplyCurrency = juniorInvestorResult[2]
    remainingRedeemToken = juniorInvestorResult[3]
    expect(payoutCurrencyAmount).to.be.eq(rmul(utils.parseEther("20"), await coordinator.epochSeniorTokenPrice()))
  })

  it("Should JuniorLosses", async () => {
    await juniorWithLosses()
  })

  it("Should DisburseAfterJuniorLost", async () => {
    const { loan } = await juniorWithLosses()

    expect(await assessor.calcJuniorTokenPrice()).to.be.eq(BigNumber.from("0"))

    const loanDebt = await pile.debt(loan)
    repayLoan(borrower.address, loan, loanDebt)

    expect(await reserve.totalBalance()).to.be.eq(loanDebt)
    expect(await nftFeed.approximatedNAV()).to.be.eq(BigNumber.from("0"))

    await seniorInvestor.redeemOrder(await seniorToken.balanceOf(seniorInvestor.address))
    await juniorInvestor.redeemOrder(await juniorToken.balanceOf(juniorInvestor.address))

    expect(await seniorToken.balanceOf(seniorInvestor.address)).to.be.eq(BigNumber.from("0"))
    expect(await juniorToken.balanceOf(juniorInvestor.address)).to.be.eq(BigNumber.from("0"))

    await coordinator.closeEpoch()
    expect(await coordinator.submissionPeriod()).to.be.eq(false)

    const seniorInvestorResult = await seniorInvestor.disburse()
    let payoutCurrencyAmount = seniorInvestorResult[0]
    let payoutTokenAmount = seniorInvestorResult[1]
    let remainingSupplyCurrency = seniorInvestorResult[2]
    let remainingRedeemToken = seniorInvestorResult[3]
    expect(payoutCurrencyAmount).to.be.eq(rmul(utils.parseEther("80"), await coordinator.epochSeniorTokenPrice()))
    expect(remainingRedeemToken).to.be.eq(BigNumber.from("0"))
    expect(remainingSupplyCurrency).to.be.eq(BigNumber.from("0"))

    const juniorInvestorResult = await juniorInvestor.disburse()
    payoutCurrencyAmount = juniorInvestorResult[0]
    payoutTokenAmount = juniorInvestorResult[1]
    remainingSupplyCurrency = juniorInvestorResult[2]
    remainingRedeemToken = juniorInvestorResult[3]
    expect(payoutCurrencyAmount).to.be.eq(BigNumber.from("0"))
    expect(remainingSupplyCurrency).to.be.eq(BigNumber.from("0"))
    expect(remainingRedeemToken).to.be.eq(utils.parseEther("20"))

    await juniorInvestor.redeemOrder(BigNumber.from("0"))
    expect(await juniorToken.balanceOf(juniorInvestor.address)).to.be.eq(utils.parseEther("20"))
  })

  it("Should PoolClosingScenarioB", async () => {
    let seniorInvestorB = await (await ethers.getContractFactory("Investor")).deploy(seniorOperator.address, seniorTranche.address, currency.address, seniorToken.address)
    const seniorAmount = utils.parseEther("40")

    await seniorSupply(seniorAmount, seniorInvestor)
    await seniorSupply(seniorAmount, seniorInvestorB)

    await juniorSupply(utils.parseEther("20"))
    await timeFly(1, true)
    await coordinator.closeEpoch()
    expect(await coordinator.submissionPeriod()).to.be.eq(false)

    const borrowAmount = utils.parseEther("100")
    const nftPrice = utils.parseEther("200")
    const maturityDate = BigNumber.from((await now() + 5 * 86400).toString())
    const { loan } = await setupOngoingLoan(nftPrice, borrowAmount, false, (await nftFeed.uniqueDayTimestamp(BigNumber.from((await now()).toString()))).add(maturityDate))
    const highRate = BigNumber.from("1000001103100000000000000000")
    await root.relyContract(assessor.address, await accounts[0].getAddress())
    let padded = zeroPadEnd(utils.toUtf8Bytes("seniorInterestRate"), 32)
    await assessor.file(padded, highRate)

    await timeFly(6, true)

    expect(await assessor.seniorDebt()).to.be.gt(await nftFeed.currentNAV())

    const loanDebt = await pile.debt(loan)
    await repayLoan(borrower.address, loan, loanDebt)

    await seniorInvestor.disburse();
    await seniorInvestorB.disburse();

    await seniorInvestor.redeemOrder(seniorAmount);

    await coordinator.closeEpoch();
    expect(await coordinator.poolClosing()).to.be.eq(true);

    expect(await coordinator.submissionPeriod()).to.be.eq(false);

    const seniorInvestorResult = await seniorInvestor.disburse()
    let payoutCurrencyAmount = seniorInvestorResult[0]
    let remainingRedeemToken = seniorInvestorResult[3]

    expect(payoutCurrencyAmount).to.be.gt(BigNumber.from("0"));
    expect(remainingRedeemToken).to.be.eq(BigNumber.from("0"));
  })
})
