import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { percentToBig, MAX_UINT256, now, timeFly, mul, deployTestRoot, deployCollateralNFT, deployCurrency, deployBorrower, prepareDeployLender, deployLender } from "./utils"

describe("PrincipalRepay", function () {
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
    await fundTranches()
  })

  // setup ======>

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

  const fundTranches = async () => {
    const defaultAmount = utils.parseEther("1000")
    await invest(defaultAmount)
    await timeFly(1, true)
    await coordinator.closeEpoch()
  }

  const repay = async (loanId: BigNumber, tokenId: BigNumber, amount: BigNumber, expectedDebt: BigNumber) => {
    const initialBorrowerBalance = await currency.balanceOf(borrower.address)
    const initialTrancheBalance = await currency.balanceOf(reserve.address)
    const initialCeiling = await nftFeed.ceiling(loanId)
    await borrower.repay(loanId, amount)
    await assertPostCondition(loanId, tokenId, amount, initialBorrowerBalance, initialTrancheBalance, expectedDebt, initialCeiling)
  }

  const assertPreCondition = async (
    loanId: BigNumber,
    tokenId: BigNumber,
    repayAmount: BigNumber,
    expectedDebt: BigNumber
  ) => {
    expect(await title.ownerOf(loanId)).to.be.eq(borrower.address)
    expect(await collateralNFT.ownerOf(tokenId)).to.be.eq(shelf.address)
    expect(await shelf.balances(loanId)).to.be.eq(BigNumber.from("0"))
    expect(await pile.debt(loanId)).to.be.gt(BigNumber.from("0"))

    expect((await pile.debt(loanId)).div(BigNumber.from("10"))).to.be.eq(expectedDebt.div(BigNumber.from("10")))

    expect(await currency.balanceOf(borrower.address)).to.be.gte(repayAmount)
  }

  const assertPostCondition = async (
    loanId: BigNumber,
    tokenId: BigNumber,
    repaidAmount: BigNumber,
    initialBorrowerBalance: BigNumber,
    initialTrancheBalance: BigNumber,
    expectedDebt: BigNumber,
    initialCeiling: BigNumber
  ) => {
    expect(await title.ownerOf(loanId)).to.be.eq(borrower.address)
    expect(await collateralNFT.ownerOf(tokenId)).to.be.eq(shelf.address)
    if (repaidAmount > expectedDebt) {
      repaidAmount = expectedDebt
    }
    const newBorrowerBalance = initialBorrowerBalance.sub(repaidAmount)
    expect(newBorrowerBalance.sub(await currency.balanceOf(borrower.address))).to.be.lte(1)

    const newTrancheBalance = initialTrancheBalance.add(repaidAmount)
    expect((await currency.balanceOf(reserve.address)).div(10)).to.be.eq(newTrancheBalance.div(BigNumber.from("10")))

    const newDebt = expectedDebt.sub(repaidAmount)
    expect((await pile.debt(loanId)).sub(newDebt)).to.be.lte(BigNumber.from("1"))

    expect(initialCeiling).to.be.eq(await nftFeed.ceiling(loanId))
  }

  const borrowAndRepay = async (usr: string, nftPrice: BigNumber, riskGroup: BigNumber, expectedDebt: BigNumber, repayAmount: BigNumber) => {
    const { loanId, tokenId } = await createLoanAndWithdraw(usr, nftPrice, riskGroup)
    await topUp(usr)
    const borrower = await (await ethers.getContractFactory("Borrower")).attach(usr)
    await borrower.doApproveCurrency(shelf.address, MAX_UINT256)
    await timeFly(365, true)
    await assertPreCondition(loanId, tokenId, repayAmount, expectedDebt)
  }

  it("Should RepayFullDebt", async () => {
    const nftPrice = utils.parseEther("200")
    const riskGroup = BigNumber.from("1")

    const expectedDebt = utils.parseEther("112")
    const repayAmount = expectedDebt
    await borrowAndRepay(borrower.address, nftPrice, riskGroup, expectedDebt, repayAmount)
  })

  it("Should RepayMaxLoanDebt", async () => {
    const nftPrice = utils.parseEther("200")
    const riskGroup = BigNumber.from("1")

    const expectedDebt = utils.parseEther("112")
    const repayAmount = mul(expectedDebt, BigNumber.from("2"))
    await borrowAndRepay(borrower.address, nftPrice, riskGroup, expectedDebt, repayAmount)
  })

  it("Should PartialRepay", async () => {
    const nftPrice = utils.parseEther("200")
    const riskGroup = BigNumber.from("1")

    const expectedDebt = utils.parseEther("112")
    const repayAmount = expectedDebt.div(BigNumber.from("2"))
    await borrowAndRepay(borrower.address, nftPrice, riskGroup, expectedDebt, repayAmount)
  })

  it("Should RepayDebtNoRate", async () => {
    const nftPrice = utils.parseEther("100")
    const riskGroup = BigNumber.from("0")

    const expectedDebt = utils.parseEther("60")
    const repayAmount = expectedDebt
    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)

    await borrower.doApproveCurrency(shelf.address, MAX_UINT256)

    await timeFly(365, true)
    await assertPreCondition(loanId, tokenId, repayAmount, expectedDebt)
    await repay(loanId, tokenId, repayAmount, expectedDebt)
  })

  it("Should FailRepayNotLoanOwner", async () => {
    const nftPrice = utils.parseEther("200")
    const riskGroup = BigNumber.from("1")

    const expectedDebt = utils.parseEther("112")
    const repayAmount = expectedDebt

    await topUp(borrower.address)
    try {
      await borrowAndRepay(randomUser.address, nftPrice, riskGroup, expectedDebt, repayAmount)
    } catch (e) {}
  })

  it("Should FailRepayNotEnoughFunds", async () => {
    const nftPrice = utils.parseEther("200")
    const riskGroup = BigNumber.from("1")

    const expectedDebt = utils.parseEther("112")
    const repayAmount = expectedDebt
    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)

    await timeFly(365, true)

    await borrower.doApproveCurrency(shelf.address, MAX_UINT256)
    await expect(
      repay(loanId, tokenId, repayAmount, expectedDebt)
    ).to.be.revertedWith("")
  })

  it("Should FailRepayLoanNotFullyWithdrawn", async () => {
    const nftPrice = utils.parseEther("200")
    const riskGroup = BigNumber.from("1")

    const ceiling = await computeCeiling(riskGroup, nftPrice)
    const borrowAmount = ceiling
    const withdrawAmount = ceiling.sub(BigNumber.from("2"))
    const repayAmount = ceiling
    const expectedDebt = utils.parseEther("56")

    const { loanId, tokenId } = await issueNFTAndCreateLoan(borrower.address)
    await lockNFT(loanId, borrower.address)
    await priceNFTandSetRisk(tokenId, nftPrice, riskGroup)
    await borrower.borrow(loanId, borrowAmount)
    await borrower.withdraw(loanId, withdrawAmount, borrower.address)
    await timeFly(365, true)

    await topUp(borrower.address)

    await borrower.doApproveCurrency(shelf.address, MAX_UINT256)
    await expect(
      repay(loanId, tokenId, repayAmount, expectedDebt)
    ).to.be.revertedWith("")
  })

  it("Should FailRepayZeroDebt", async () => {
    const nftPrice = utils.parseEther("200")
    const riskGroup = BigNumber.from("1")

    const expectedDebt = utils.parseEther("112")
    const repayAmount = expectedDebt
    const { loanId, tokenId } = await issueNFTAndCreateLoan(borrower.address)

    await lockNFT(loanId, borrower.address)
    await priceNFTandSetRisk(tokenId, nftPrice, riskGroup)

    await topUp(borrower.address)

    await borrower.doApproveCurrency(shelf.address, MAX_UINT256)
    try {
      await repay(loanId, tokenId, repayAmount, expectedDebt)
    } catch (e) {}
  })

  it("Should FailRepayCurrencyNotApproved", async () => {
    const nftPrice = utils.parseEther("200")
    const riskGroup = BigNumber.from("1")

    const expectedDebt = utils.parseEther("112")
    const repayAmount = expectedDebt
    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)

    await timeFly(365, true)

    await topUp(borrower.address)
    await expect(
      repay(loanId, tokenId, repayAmount, expectedDebt)
    ).to.be.revertedWith("")
  })

  it("Should FailBorowFullAmountTwice", async () => {
    const nftPrice = utils.parseEther("200")
    const riskGroup = BigNumber.from("1")

    const ceiling = await computeCeiling(riskGroup, nftPrice)

    const expectedDebt = utils.parseEther("112")
    const repayAmount = expectedDebt

    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)
    await topUp(borrower.address)

    await borrower.doApproveCurrency(shelf.address, MAX_UINT256)

    await timeFly(365, true)
    await assertPreCondition(loanId, tokenId, repayAmount, expectedDebt)
    await repay(loanId, tokenId, repayAmount, expectedDebt)

    await expect(
      borrower.borrow(loanId, ceiling)
    ).to.be.revertedWith("")
  })
})
