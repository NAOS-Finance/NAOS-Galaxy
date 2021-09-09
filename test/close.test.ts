import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { percentToBig, MAX_UINT256, now, mul } from "./utils"

describe("Close", function () {
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

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    await baseSetup()
    await createTestUsers()
  })

  // setup ======>

  const baseSetup = async () => {
    await deployContracts()
  }

  const createTestUsers = async () => {
    borrower = await (await ethers.getContractFactory("Borrower")).deploy(shelf.address, reserve.address, currency.address, pile.address)
    randomUser = await (await ethers.getContractFactory("Borrower")).deploy(shelf.address, reserve.address, currency.address, pile.address)
    keeper = await (await ethers.getContractFactory("Keeper")).deploy(collector.address, currency.address)
    admin = await (await ethers.getContractFactory("AdminUser")).deploy(shelf.address, pile.address, nftFeed.address, title.address, reserve.address, collector.address, juniorMemberlist.address, seniorMemberlist.address)
    await root.relyBorrowerAdmin(admin.address)
    await root.relyLenderAdmin(admin.address)
    await createInvestorUser()
  }

  const createInvestorUser = async () => {
    seniorInvestor = await (await ethers.getContractFactory("Investor")).deploy(seniorOperator.address, seniorTranche.address, currency.address, seniorToken.address)
    juniorInvestor = await (await ethers.getContractFactory("Investor")).deploy(juniorOperator.address, juniorTranche.address, currency.address, juniorToken.address)
  }

  const deployContracts = async () => {
    await deployTestRoot()
    await deployCollateralNFT()
    await deployCurrency()
    await deployBorrower()

    await prepareDeployLender(root.address)
    await deployLender()

    await root.prepare(lenderDeployer.address, borrowerDeployer.address, await accounts[0].getAddress())
    await root.deploy()
  }

  const deployTestRoot = async () => {
    root = await (await ethers.getContractFactory("TestRoot")).deploy(await accounts[0].getAddress())
  }

  const deployCollateralNFT = async () => {
    collateralNFT = await (await ethers.getContractFactory("Title")).deploy("Collateral NFT", "collateralNFT")
  }

  const deployCurrency = async () => {
    currency = await (await ethers.getContractFactory("SimpleToken")).deploy("C", "Currency")
  }

  const deployBorrower = async () => {
    let titlefab = await (await ethers.getContractFactory("TitleFab")).deploy()
    let shelffab = await (await ethers.getContractFactory("ShelfFab")).deploy()
    let pileFab = await (await ethers.getContractFactory("PileFab")).deploy()
    let collectorFab = await (await ethers.getContractFactory("CollectorFab")).deploy()
    let nftFeedFab = await (await ethers.getContractFactory("NAVFeedFab")).deploy()

    let discountRate = BigNumber.from("1000000342100000000000000000")
    borrowerDeployer = await (await ethers.getContractFactory("BorrowerDeployer")).deploy(root.address, titlefab.address, shelffab.address, pileFab.address, collectorFab.address, nftFeedFab.address, currency.address, "Galaxy Loan Token", "TLNT", discountRate)
    await borrowerDeployer.deployTitle()
    await borrowerDeployer.deployPile()
    await borrowerDeployer.deployFeed()
    await borrowerDeployer.deployShelf()
    await borrowerDeployer.deployCollector()
    await borrowerDeployer.deploy()

    shelf = await (await ethers.getContractFactory("Shelf")).attach(await borrowerDeployer.shelf())
    pile = await (await ethers.getContractFactory("Pile")).attach(await borrowerDeployer.pile())
    title = await (await ethers.getContractFactory("Title")).attach(await borrowerDeployer.title())
    collector = await (await ethers.getContractFactory("Collector")).attach(await borrowerDeployer.collector())
    nftFeed = await (await ethers.getContractFactory("NAVFeed")).attach(await borrowerDeployer.feed())
  }

  const prepareDeployLender = async (rootAddr: string) => {
    let reserveFab = await (await ethers.getContractFactory("ReserveFab")).deploy()
    let assessorFab = await (await ethers.getContractFactory("AssessorFab")).deploy()
    let trancheFab = await (await ethers.getContractFactory("TrancheFab")).deploy()
    let memberlistFab = await (await ethers.getContractFactory("MemberlistFab")).deploy()
    let restrictedTokenFab = await (await ethers.getContractFactory("RestrictedTokenFab")).deploy()
    let operatorFab = await (await ethers.getContractFactory("OperatorFab")).deploy()
    let coordinatorFab = await (await ethers.getContractFactory("CoordinatorFab")).deploy()

    lenderDeployer = await (await ethers.getContractFactory("LenderDeployer")).deploy(rootAddr, currency.address, trancheFab.address, memberlistFab.address, restrictedTokenFab.address, reserveFab.address, assessorFab.address, coordinatorFab.address, operatorFab.address)
  }

  const deployLender = async () => {
    let seniorInterestRate = BigNumber.from("1000000229200000000000000000")
    let maxReserve = MAX_UINT256
    let maxSeniorRatio = percentToBig(85)
    let minSeniorRatio = percentToBig(75)
    let challengeTime = 3 * 60 * 60
    let seniorTokenName = "DROP Token"
    let seniorTokenSymbol = "DROP"
    let juniorTokenName = "TIN Token"
    let juniorTokenSymbol = "TIN"
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

  const computeCeiling = async (riskGroup: BigNumber, nftPrice: BigNumber) => {
    const ceilingRatio = await nftFeed.callStatic.ceilingRatio(riskGroup)
    return mul(ceilingRatio, nftPrice)
  }

  const topUp = async (usr: string) => {
    await currency.mint(usr, utils.parseEther("1000"))
  }

  // testCase ======>

  const closeLoan = async (loanId: BigNumber, lookupId: string) => {
    await borrower.close(loanId)
    await assertPostCondition(lookupId)
  }

  const assertPreCondition = async (
    loanId: BigNumber,
    tokenId: BigNumber,
    lookupId: string,
  ) => {
    expect((await title.ownerOf(loanId) == borrower.address) || await collateralNFT.ownerOf(tokenId) == borrower.address).to.be.eq(true)
    expect(await shelf.nftlookup(lookupId)).to.be.gt(BigNumber.from("0"))
    expect(await shelf.nftLocked(loanId)).to.be.eq(false)
    expect(await pile.debt(loanId)).to.be.eq(BigNumber.from("0"))
  }

  const assertPostCondition = async (
    lookupId: string
  ) => {
    expect(await shelf.nftlookup(lookupId)).to.be.eq(BigNumber.from("0"))
  }

  it("Should CloseLoanOwner", async () => {
    const { tokenId, lookupId } = await issueNFT(borrower.address)
    const loanId = await borrower.callStatic.issue(collateralNFT.address, tokenId)
    await borrower.issue(collateralNFT.address, tokenId)
    await borrower.approveNFT(collateralNFT.address, await accounts[0].getAddress())
    await collateralNFT.transferFrom(borrower.address, randomUser.address, tokenId)
    await assertPreCondition(loanId, tokenId, lookupId)
    await closeLoan(loanId, lookupId)
  })

  it("Should CloseLoanNFTOwner", async () => {
    const { tokenId, lookupId } = await issueNFT(randomUser.address)
    const loanId = await randomUser.callStatic.issue(collateralNFT.address, tokenId)
    await randomUser.issue(collateralNFT.address, tokenId)
    await randomUser.approveNFT(collateralNFT.address, await accounts[0].getAddress())
    await collateralNFT.transferFrom(randomUser.address, borrower.address, tokenId)
    await closeLoan(loanId, lookupId)
  })

  it("Should FailCloseLoanNoPermissions", async () => {
    const { tokenId, lookupId } = await issueNFT(randomUser.address)
    expect(
      shelf.issue(collateralNFT.address, tokenId)
    ).to.be.revertedWith("")
    // await closeLoan(BigNumber.from("123"), lookupId)
  })

  it("Should FailCloseLoanNotExisting", async () => {
    const { tokenId, lookupId } = await issueNFT(randomUser.address)
    const loanId = BigNumber.from("10")
    expect(
      closeLoan(loanId, lookupId)
    ).to.be.revertedWith("")
  })

  it("Should FailCloseNFTLocked", async () => {
    const { tokenId, lookupId } = await issueNFT(borrower.address)
    const loanId = await borrower.callStatic.issue(collateralNFT.address, tokenId)
    await borrower.issue(collateralNFT.address, tokenId)
    expect(
      borrower.lock(loanId)
    ).to.be.revertedWith("")
    // await closeLoan(loanId, lookupId)
  })

  it("Should FailCloseLoanHasDebt", async () => {
    const nftPrice = utils.parseEther("200")
    const riskGroup = BigNumber.from("1")
    expect(
      createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)
    ).to.be.revertedWith("")
    // const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)
    // const lookupId = await nftFeed.callStatic['nftID(address,uint256)'](collateralNFT.address, tokenId)
    // await closeLoan(loanId, lookupId)
  })
})
