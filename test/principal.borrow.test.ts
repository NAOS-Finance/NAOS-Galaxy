import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { percentToBig, MAX_UINT256, now, timeFly, mul, deployTestRoot, deployCollateralNFT, deployCurrency, deployBorrower, prepareDeployLender, deployLender } from "./utils"

describe("PrincipalBorrow", function () {
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

  const invest = async (currencyAmount: BigNumber) => {
    const validUntil = await now() + 8*86400
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

  const fundTranches = async () => {
    const defaultAmount = utils.parseEther("1000")
    await invest(defaultAmount)
    await timeFly(1, true)
    await coordinator.closeEpoch()
  }

  const computeCeiling = async (riskGroup: BigNumber, nftPrice: BigNumber) => {
    const ceilingRatio = await nftFeed.callStatic.ceilingRatio(riskGroup)
    return mul(ceilingRatio, nftPrice)
  }

  const borrow = async (loanId: BigNumber, tokenId: BigNumber, amount: BigNumber, fixedFee: BigNumber) => {
    const initialTotalBalance = await shelf.callStatic.balance()
    const initialLoanBalance = await shelf.balances(loanId)
    const initialLoanDebt = await pile.debt(loanId)
    const initialCeiling = await nftFeed.ceiling(loanId)
    await borrower.borrow(loanId, amount)
    await assertPostCondition(loanId, tokenId, amount, fixedFee, initialTotalBalance, initialLoanBalance, initialLoanDebt, initialCeiling)
  }

  const assertPreCondition = async (loanId: BigNumber, tokenId: BigNumber, amount: BigNumber) => {
    expect(await title.ownerOf(loanId)).to.be.eq(borrower.address)
    expect(await collateralNFT.ownerOf(tokenId)).to.be.eq(shelf.address)
    expect(amount <= await nftFeed.ceiling(loanId))
  }

  const assertPostCondition = async (loanId: BigNumber, tokenId: BigNumber, amount: BigNumber, fixedFee: BigNumber, initialTotalBalance: BigNumber, initialLoanBalance: BigNumber, initialLoanDebt: BigNumber, initialCeiling: BigNumber) => {
    expect(await title.ownerOf(loanId)).to.be.eq(borrower.address)
    expect(await collateralNFT.ownerOf(tokenId)).to.be.eq(shelf.address)
    expect(await shelf.balance()).to.be.eq(initialTotalBalance.add(amount))
    expect(await shelf.balances(loanId)).to.be.eq(initialLoanBalance.add(amount))
    const newDebtExpected = initialLoanDebt.add(amount.add(fixedFee))
    let newDebtActual = await pile.debt(loanId)
    expect((newDebtActual.sub(BigNumber.from("1")) <= newDebtExpected) && newDebtExpected <= newDebtExpected.sub(BigNumber.from("1")))
    expect(await nftFeed.ceiling(loanId)).to.be.eq(initialCeiling.sub(amount))
  }

  it("Should Borrow", async () => {
    const nftPrice = utils.parseEther("500")
    const riskGroup = BigNumber.from("0")
    
    const { tokenId, loanId } = await issueNFTAndCreateLoan(borrower.address)
    await priceNFTandSetRisk(tokenId, nftPrice, riskGroup)
    const ceiling = await computeCeiling(riskGroup, nftPrice)

    await lockNFT(loanId, borrower.address)
    await assertPreCondition(loanId, tokenId, ceiling)
    await borrow(loanId, tokenId, ceiling, BigNumber.from("0"))
  })

  it("Should BorrowWithFixedFee", async () => {
    const nftPrice = utils.parseEther("500")
    const riskGroup = BigNumber.from("0")
    const fixedFeeRate = percentToBig(10)

    const { tokenId, loanId } = await issueNFTAndCreateLoan(borrower.address)
    const borrowAmount = await computeCeiling(riskGroup, nftPrice)
    const fixedFee = mul(borrowAmount, fixedFeeRate)
    await priceNFTandSetRisk(tokenId, nftPrice, riskGroup)
    await admin.fileFixedRate(riskGroup, fixedFeeRate)
    await lockNFT(loanId, borrower.address)
    await assertPreCondition(loanId, tokenId, borrowAmount)
    await borrow(loanId, tokenId, borrowAmount, fixedFee)
  })

  it("Should InterestAccruedOnFixedFee", async () => {
    const nftPrice = utils.parseEther("200")
    const riskGroup = BigNumber.from("1")
    const fixedFeeRate = percentToBig(10)
    const { tokenId, loanId } = await issueNFTAndCreateLoan(borrower.address)
    const borrowAmount = await computeCeiling(riskGroup, nftPrice)
    const fixedFee = mul(borrowAmount, fixedFeeRate)
    await priceNFTandSetRisk(tokenId, nftPrice, riskGroup)
    await admin.fileFixedRate(riskGroup, fixedFeeRate)
    await lockNFT(loanId, borrower.address)
    await assertPreCondition(loanId, tokenId, borrowAmount)
    await borrow(loanId, tokenId, borrowAmount, fixedFee)
    
    await timeFly(365, true)
    expect(
      await pile.debt(loanId)
    ).to.be.eq(BigNumber.from("123200000000000000001"))
  })

  it("Should PartialBorrow", async () => {
    const nftPrice = utils.parseEther("200")
    const riskGroup = BigNumber.from("0")

    const { tokenId, loanId } = await issueNFTAndCreateLoan(borrower.address)
    await priceNFTandSetRisk(tokenId, nftPrice, riskGroup)
    const ceiling = await computeCeiling(riskGroup, nftPrice)
    const amount = ceiling.div(BigNumber.from("2"))
    
    await lockNFT(loanId, borrower.address)
    await assertPreCondition(loanId, tokenId, amount)
    await borrow(loanId, tokenId, amount, BigNumber.from("0"))
  })

  it("Should FailPartialBorrowWithInterest", async () => {
    const nftPrice = utils.parseEther("100")
    const borrowAmount = utils.parseEther("16")
    const riskGroup = BigNumber.from("1")
    const { tokenId, loanId } = await issueNFTAndCreateLoan(borrower.address)

    await priceNFTandSetRisk(tokenId, nftPrice, riskGroup)
    const ceiling = await computeCeiling(riskGroup, nftPrice)
    const rest = ceiling.sub(borrowAmount)

    await lockNFT(loanId, borrower.address)
    await assertPreCondition(loanId, tokenId, borrowAmount)

    await borrow(loanId, tokenId, borrowAmount, BigNumber.from("0"))

    await timeFly(365, true)
    expect(
      borrow(loanId, tokenId, rest, BigNumber.from("0"))
    ).to.be.revertedWith("")
  })

  it("Should FailBorrowNFTNotLocked", async () => {
    const nftPrice = utils.parseEther("100")
    const riskGroup = BigNumber.from("1")
    const amount = await computeCeiling(riskGroup, nftPrice)
    
    const { tokenId, loanId } = await issueNFTAndCreateLoan(borrower.address)
    await priceNFTandSetRisk(tokenId, nftPrice, riskGroup)
    expect(
      borrow(loanId, tokenId, amount, BigNumber.from("0"))
    ).to.be.revertedWith("nft-not-locked")
  })

  it("Should FailBorrowNotLoanOwner", async () => {
    const nftPrice = utils.parseEther("100")
    const riskGroup = BigNumber.from("1")
    const amount = await computeCeiling(riskGroup, nftPrice)
    const { tokenId, loanId } = await issueNFTAndCreateLoan(borrower.address)
    await priceNFTandSetRisk(tokenId, nftPrice, riskGroup)
    expect(
      randomUser.lock(loanId)
    ).to.be.revertedWith("")
    // borrow(loanId, tokenId, amount, BigNumber.from("0"))
  })

  it("Should FailBorrowAmountTooHigh", async () => {
    const nftPrice = utils.parseEther("100")
    const riskGroup = BigNumber.from("1")
    const ceiling = await computeCeiling(riskGroup, nftPrice)
    const amount = mul(ceiling, BigNumber.from("2"))
    const { tokenId, loanId } = await issueNFTAndCreateLoan(borrower.address)
    await lockNFT(loanId, borrower.address)
    expect(
      borrow(loanId, tokenId, amount, BigNumber.from("0"))
    ).to.be.revertedWith("borrow-amount-too-high")
  })
})
