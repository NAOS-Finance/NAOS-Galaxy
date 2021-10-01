import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { percentToBig, zeroPadEnd, MAX_UINT256, now, ONE, timeFly, div, mul, deployTestRoot, deployCollateralNFT, deployCurrency, deployBorrower, prepareDeployLender, deployLender } from "./utils"

describe("Scenarios", function () {
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

  const defaultCollateral = async () => {
    const nftPrice = utils.parseEther("100")
    const riskGroup = BigNumber.from("2")
    return { nftPrice, riskGroup }
  }

  const fundLender = async (amount: BigNumber) => {
    await invest(amount)
    await timeFly(1, true)
    await coordinator.closeEpoch()
  }

  const checkAfterBorrow = async (tokenId: BigNumber, tBalance: BigNumber) => {
    expect(await currency.balanceOf(borrower.address)).to.be.eq(tBalance)
    expect(await collateralNFT.ownerOf(tokenId)).to.be.eq(shelf.address)
  }

  const checkAfterRepay = async (loan: BigNumber, tokenId: BigNumber, tTotal: BigNumber, tLender: BigNumber) => {
    expect(await collateralNFT.ownerOf(tokenId)).to.be.eq(borrower.address)
    expect(await pile.debt(loan)).to.be.eq(BigNumber.from("0"))
    // expect(await currency.balanceOf(borrower.address)).to.be.eq(tTotal.sub(tLender))
    expect(await currency.balanceOf(pile.address)).to.be.eq(BigNumber.from("0"))
  }

  const borrowRepay = async (nftPrice: BigNumber, riskGroup: BigNumber) => {
    const tokenId = await collateralNFT.callStatic.issue(borrower.address)
    await collateralNFT.issue(borrower.address)
    const loan = await setupLoan(tokenId, collateralNFT.address, nftPrice, riskGroup)
    const ceiling = await nftFeed.ceiling(loan)

    expect(await nftFeed.ceiling(loan)).to.be.eq(ceiling)
    await borrow(loan, tokenId, ceiling)
    expect(await nftFeed.ceiling(loan)).to.be.eq(BigNumber.from("0"))

    await timeFly(10, true)
    await setupRepayReq()

    const distributorShould = (await pile.debt(loan)).add(await currdistributorBal())
    // close without defined amount
    await borrower.doClose(loan)
    const totalT = await currency.totalSupply()
    await checkAfterRepay(loan, tokenId, totalT, distributorShould)
  }

  const setupOngoingLoan = async () => {
    const { nftPrice, riskGroup } = await defaultCollateral()
    const tokenId = await collateralNFT.callStatic.issue(borrower.address)
    await collateralNFT.issue(borrower.address)
    const loan = await setupLoan(tokenId, collateralNFT.address, nftPrice, riskGroup)
    const ceiling = await nftFeed.ceiling(loan)
    await borrow(loan, tokenId, ceiling)
    return { loan, tokenId, ceiling }
  }

  const setupLoan = async (tokenId: BigNumber, collateralNFT_: string, nftPrice: BigNumber, riskGroup: BigNumber) => {
    const loan = await borrower.callStatic.issue(collateralNFT_, tokenId)
    await borrower.issue(collateralNFT_, tokenId)
    await priceNFTandSetRisk(tokenId, nftPrice, riskGroup)
    return loan
  }

  const borrow = async (loan: BigNumber, tokenId: BigNumber, borrowAmount: BigNumber, fundLenderRequired: Boolean = true) => {
    await borrower.approveNFT(collateralNFT.address, shelf.address)
    if (fundLenderRequired) {
      await fundLender(borrowAmount)
    }
    await borrower.borrowAction(loan, borrowAmount)
    await checkAfterBorrow(tokenId, borrowAmount)
  }

  const setupRepayReq = async () => {
    const extra = utils.parseEther("100000000000")
    await currency.mint(borrower.address, extra)
    await borrower.doApproveCurrency(shelf.address, MAX_UINT256)
    return extra
  }

  const currdistributorBal = async () => {
    return await currency.balanceOf(reserve.address)
  }

  // testCase ======>

  it("Should BorrowTransaction", async () => {
    const { nftPrice, riskGroup } = await defaultCollateral()
    const tokenId = await collateralNFT.callStatic.issue(borrower.address)
    await collateralNFT.issue(borrower.address)
    await priceNFTandSetRisk(tokenId, nftPrice, riskGroup)
    const loan = await borrower.callStatic.issue(collateralNFT.address, tokenId)
    await borrower.issue(collateralNFT.address, tokenId)
    const ceiling = await nftFeed.ceiling(loan)

    await borrower.approveNFT(collateralNFT.address, shelf.address)
    await fundLender(ceiling)
    await borrower.borrowAction(loan, ceiling)
    await checkAfterBorrow(tokenId, ceiling)
  })

  it("Should BorrowAndRepay", async () => {
    const { nftPrice, riskGroup } = await defaultCollateral()
    await borrowRepay(nftPrice, riskGroup)
  })

  it("Should MediumSizeLoans", async () => {
    const { riskGroup } = await defaultCollateral()
    const nftPrice = utils.parseEther("20000")
    await borrowRepay(nftPrice, riskGroup)
  })

  it("Should HighSizeLoans", async () => {
    const { riskGroup } = await defaultCollateral()
    const nftPrice = utils.parseEther("20000000")
    await borrowRepay(nftPrice, riskGroup)
  })

  it("Should RepayFullAmount", async () => {
    const { loan, tokenId } = await setupOngoingLoan()

    await timeFly(1, true)

    await setupRepayReq()
    const distributorShould = (await pile.debt(loan)).add(await currdistributorBal())
    await borrower.doClose(loan)
    const totalT = await currency.totalSupply()
    await checkAfterRepay(loan, tokenId, totalT, distributorShould)
  })

  it("Should MultipleBorrowAndRepay", async () => {
    let nftPrice = utils.parseEther("10")
    const riskGroup = BigNumber.from("2")

    await fundLender(utils.parseEther("1000"))
    let tBorrower = BigNumber.from("0")

    for (let i = 1; i <= 10; i++) {
      nftPrice = BigNumber.from((i * 100).toString())
      const tokenId = await collateralNFT.callStatic.issue(borrower.address)
      await collateralNFT.issue(borrower.address)
      const loan = await setupLoan(tokenId, collateralNFT.address, nftPrice, riskGroup)
      const ceiling = await nftFeed.ceiling(BigNumber.from(i.toString()))
      await borrower.approveNFT(collateralNFT.address, shelf.address)
      await borrower.borrowAction(loan, ceiling)
      tBorrower = tBorrower.add(ceiling)
      await checkAfterBorrow(BigNumber.from(i.toString()), tBorrower)
    }

    const tTotal = await currency.totalSupply()

    await borrower.doApproveCurrency(shelf.address, MAX_UINT256)

    let distributorBalance = await currency.balanceOf(reserve.address)

    for (let i = 1; i <= 10; i++) {
      nftPrice = BigNumber.from((i * 100).toString())
      const ceiling = await computeCeiling(riskGroup, nftPrice)
      await borrower.repayAction(BigNumber.from(i.toString()), ceiling)
      distributorBalance = distributorBalance.add(ceiling)
      await checkAfterRepay(BigNumber.from(i.toString()), BigNumber.from(i.toString()), tTotal, distributorBalance)
    }
  })

  it("Should FailBorrowSameTokenIdTwice", async () => {
    const { nftPrice, riskGroup } = await defaultCollateral()
    const tokenId = await collateralNFT.callStatic.issue(borrower.address)
    await collateralNFT.issue(borrower.address)
    await priceNFTandSetRisk(tokenId, nftPrice, riskGroup)
    const loan = await borrower.callStatic.issue(collateralNFT.address, tokenId)
    await borrower.issue(collateralNFT.address, tokenId)
    const ceiling = await nftFeed.ceiling(loan)

    await borrower.approveNFT(collateralNFT.address, shelf.address)
    expect(
      borrower.borrowAction(loan, ceiling)
    ).to.be.revertedWith("")
    // await checkAfterBorrow(tokenId, ceiling)
    // await borrower.borrowAction(loan, ceiling)
  })

  it("Should FailBorrowNonExistingToken", async () => {
    expect(
      borrower.borrowAction(BigNumber.from("42"), BigNumber.from("100"))
    ).to.be.revertedWith("")
  })

  it("Should FailBorrowNotWhitelisted", async () => {
    await collateralNFT.issue(borrower.address)
    expect(
      borrower.borrowAction(BigNumber.from("1"), BigNumber.from("100"))
    ).to.be.revertedWith("")
  })

  it("Should FailAdmitNonExistingcollateralNFT", async () => {
    expect(
      borrower.issue(collateralNFT.address, BigNumber.from("123"))
    ).to.be.revertedWith("")
    // const loan = await borrower.callStatic.issue(collateralNFT.address, BigNumber.from("123"))
    // await borrower.issue(collateralNFT.address, BigNumber.from("123"))
    // const { nftPrice, riskGroup } = await defaultCollateral()
    // await priceNFTandSetRisk(BigNumber.from("20"), nftPrice, riskGroup)
    // const ceiling = await computeCeiling(riskGroup, nftPrice)
    // await borrower.borrowAction(loan, ceiling)
  })

  it("Should FailAdmitNonExistingcollateralNFT", async () => {
    await defaultCollateral()
    const tokenId = await collateralNFT.callStatic.issue(borrower.address)
    await collateralNFT.issue(borrower.address)

    expect(
      borrower.issue(collateralNFT.address, BigNumber.from("123"))
    ).to.be.revertedWith("")
    // const loan = await borrower.callStatic.issue(collateralNFT.address, BigNumber.from("123"))
    // await borrower.issue(collateralNFT.address, BigNumber.from("123"))
    // const ceiling = await nftFeed.ceiling(loan)
    // await borrower.borrowAction(loan, ceiling)
  })
})
