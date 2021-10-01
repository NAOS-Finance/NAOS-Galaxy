import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { percentToBig, zeroPadEnd, MAX_UINT256, now, ONE, timeFly, div, mul, prepareDeployLender, deployCurrency } from "./utils"

describe("Integration", function () {
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
  // let lastSnapshotId: number

  beforeEach(async () => {
    // lastSnapshotId = await takeSnapshot()
    accounts = await ethers.getSigners()
    await deployLenderMockBorrower(await accounts[0].getAddress())
    await createInvestorUser()
  })

  // afterEach(async () => {
  //   await restoreSnapshot(lastSnapshotId)
  // })

  // setup ======>

  const deployLenderMockBorrower = async (rootAddr: string) => {
    currency = await deployCurrency()
    lenderDeployer = await prepareDeployLender(rootAddr, currency.address)
    await deployLender(lenderDeployer)

    let shelf_ = await (await ethers.getContractFactory("ShelfMock")).deploy()
    let nav = await (await ethers.getContractFactory("NAVFeedMock")).deploy()

    let padded = zeroPadEnd(utils.toUtf8Bytes("navFeed"), 32)
    assessor.depend(padded, nav.address)
    padded = zeroPadEnd(utils.toUtf8Bytes("shelf"), 32)
    reserve.depend(padded, shelf_.address)
  }

  const createInvestorUser = async () => {
    seniorInvestor = await (await ethers.getContractFactory("Investor")).deploy(seniorOperator.address, seniorTranche.address, currency.address, seniorToken.address)
    juniorInvestor = await (await ethers.getContractFactory("Investor")).deploy(juniorOperator.address, juniorTranche.address, currency.address, juniorToken.address)
  }

  const deployLender = async (lenderDeployer: Contract) => {
    let seniorInterestRate = BigNumber.from("1000000229200000000000000000")
    let maxReserve = MAX_UINT256
    let maxSeniorRatio = percentToBig(85)
    let minSeniorRatio = percentToBig(75)
    let challengeTime = 60 * 60
    let seniorTokenName = "ALPHA Token"
    let seniorTokenSymbol = "ALPHA"
    let juniorTokenName = "BETA Token"
    let juniorTokenSymbol = "BETA"
    await lenderDeployer.init(minSeniorRatio, maxSeniorRatio, maxReserve, challengeTime, seniorInterestRate, seniorTokenName, seniorTokenSymbol, juniorTokenName, juniorTokenSymbol)
    await lenderDeployer.deployJunior()
    await lenderDeployer.deploySenior()
    await lenderDeployer.deployReserve()
    await lenderDeployer.deployAssessor()
    await lenderDeployer.deployCoordinator()
    await lenderDeployer.deploy()

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

  const priceNFTandSetRisk = async (tokenId: BigNumber, nftPrice: BigNumber, riskGroup: BigNumber) => {
    const maturityDate = await now() + 600 * 86400
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

  // testCase ======>

  const seniorSupply = async (currencyAmount: BigNumber, investor: Contract = seniorInvestor) => {
    await seniorMemberlist.updateMember(seniorInvestor.address, BigNumber.from(await now() + 8 * 86400))
    await currency.mint(seniorInvestor.address, currencyAmount)
    await investor.supplyOrder(currencyAmount)
    const supplyAmount = (await seniorTranche.users(investor.address))[1]
    expect(supplyAmount).to.be.eq(currencyAmount)
  }

  const juniorSupply = async (currencyAmount: BigNumber) => {
    await juniorMemberlist.updateMember(juniorInvestor.address, BigNumber.from(await now() + 8 * 86400))
    await currency.mint(juniorInvestor.address, currencyAmount)
    await juniorInvestor.supplyOrder(currencyAmount)
    const supplyAmount = (await juniorTranche.users(juniorInvestor.address))[1]
    expect(supplyAmount).to.be.eq(currencyAmount)
  }

  it("Should SimpleSeniorOrder", async () => {
    const amount = utils.parseEther("100")
    await currency.mint(seniorInvestor.address, amount)
    await seniorMemberlist.updateMember(seniorInvestor.address, BigNumber.from(await now() + 8 * 86400))
    await seniorInvestor.supplyOrder(amount)
    let supplyAmount = (await seniorTranche.users(seniorInvestor.address))[1]
    expect(supplyAmount).to.be.eq(amount)

    await seniorInvestor.supplyOrder(amount.div(BigNumber.from("2")))
    supplyAmount = (await seniorTranche.users(seniorInvestor.address))[1]

    expect(supplyAmount).to.be.eq(amount.div(BigNumber.from("2")))
  })

  it("Should ExecuteSimpleEpoch", async () => {
    const seniorAmount = utils.parseEther("82")
    const juniorAmount = utils.parseEther("18")
    await seniorSupply(seniorAmount)
    await juniorSupply(juniorAmount)
    await timeFly(1, true)

    await coordinator.closeEpoch()
    expect(await coordinator.submissionPeriod()).to.be.eq(false)

    const seniorInvestorResult = await seniorInvestor.callStatic.disburse()
    await seniorInvestor.disburse()
    let payoutCurrencyAmount = seniorInvestorResult[0]
    let payoutTokenAmount = seniorInvestorResult[1]
    let remainingSupplyCurrency = seniorInvestorResult[2]
    let remainingRedeemToken = seniorInvestorResult[3]

    expect(payoutCurrencyAmount).to.be.eq(BigNumber.from("0"))
    expect(payoutTokenAmount).to.be.eq(seniorAmount)
    expect(await seniorToken.balanceOf(seniorInvestor.address)).to.be.eq(seniorAmount)
    expect(remainingSupplyCurrency).to.be.eq(BigNumber.from("0"))
    expect(remainingRedeemToken).to.be.eq(BigNumber.from("0"))

    const juniorInvestorResult = await juniorInvestor.callStatic.disburse()
    await juniorInvestor.disburse()
    payoutCurrencyAmount = juniorInvestorResult[0]
    payoutTokenAmount = juniorInvestorResult[1]
    remainingSupplyCurrency = juniorInvestorResult[2]
    remainingRedeemToken = juniorInvestorResult[3]
    expect(payoutCurrencyAmount).to.be.eq(BigNumber.from("0"))
    expect(payoutTokenAmount).to.be.eq(juniorAmount)
    expect(await juniorToken.balanceOf(juniorInvestor.address)).to.be.eq(juniorAmount)
  })
})
