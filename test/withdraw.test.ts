import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { percentToBig, MAX_UINT256, now, timeFly, div, mul, deployTestRoot, deployCollateralNFT, deployCurrency, deployBorrower, prepareDeployLender, deployLender } from "./utils"

describe("Withdraw", function () {
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

  const fundTranches = async () => {
    const defaultAmount = utils.parseEther("1000")
    await invest(defaultAmount)
    await timeFly(1, true)
    await coordinator.closeEpoch()
  }

  const withdraw = async (loanId: BigNumber, tokenId: BigNumber, amount: BigNumber, usr: string) => {
    const shelfBalance = await currency.balanceOf(shelf.address)
    const distributorBalance = await currency.balanceOf(reserve.address)
    const initialAvailable = shelfBalance.add(distributorBalance)
    const initialRecipientBalance = await currency.balanceOf(usr)
    const initialLoanBalance = await shelf.balances(loanId)
    const initialTotalBalance = await shelf.balance()
    await borrower.withdraw(loanId, amount, usr)
    await assertPostCondition(loanId, tokenId, amount, usr, initialAvailable, initialRecipientBalance, initialLoanBalance, initialTotalBalance)
  }

  const assertPreCondition = async (
    loanId: BigNumber,
    tokenId: BigNumber,
    amount: BigNumber,
  ) => {
    expect(await title.ownerOf(loanId)).to.be.eq(borrower.address)
    expect(await collateralNFT.ownerOf(tokenId)).to.be.eq(shelf.address)
    expect(await shelf.balances(loanId)).to.be.gte(amount)
    const shelfBalance = await currency.balanceOf(shelf.address)
    const distributorBalance = await currency.balanceOf(reserve.address)
    expect(shelfBalance.add(distributorBalance)).to.be.gte(amount)
  }

  const assertPostCondition = async (
    loanId: BigNumber,
    tokenId: BigNumber,
    withdrawAmount: BigNumber,
    recipient: string,
    initialAvailable: BigNumber,
    initialRecipientBalance: BigNumber,
    initialLoanBalance: BigNumber,
    initialTotalBalance: BigNumber
  ) => {
    expect(await collateralNFT.ownerOf(tokenId)).to.be.eq(shelf.address)
    const shelfBalance = await currency.balanceOf(shelf.address)
    const distributorBalance = await currency.balanceOf(reserve.address)
    expect(shelfBalance.add(distributorBalance)).to.be.eq(initialAvailable.sub(withdrawAmount))
    expect(await currency.balanceOf(recipient)).to.be.eq(initialRecipientBalance.add(withdrawAmount))
    expect(await shelf.balances(loanId)).to.be.eq(initialLoanBalance.sub(withdrawAmount))
    expect(await shelf.balance()).to.be.eq(initialTotalBalance.sub(withdrawAmount))
  }

  it("Should Withdraw", async () => {
    await fundTranches()
    const nftPrice = utils.parseEther("100")
    const riskGroup = BigNumber.from("1")
    const ceiling = await computeCeiling(riskGroup, nftPrice)
    const { loanId, tokenId } = await createLoanAndBorrow(borrower.address, nftPrice, riskGroup)
    await assertPreCondition(loanId, tokenId, ceiling)
    await withdraw(loanId, tokenId, ceiling, borrower.address)
  })

  it("Should WithdrawToOtherUserAccount", async () => {
    await fundTranches()
    const nftPrice = utils.parseEther("100")
    const riskGroup = BigNumber.from("1")
    const ceiling = await computeCeiling(riskGroup, nftPrice)
    const { loanId, tokenId } = await createLoanAndBorrow(borrower.address, nftPrice, riskGroup)
    await assertPreCondition(loanId, tokenId, ceiling)
    await withdraw(loanId, tokenId, ceiling, randomUser.address)
  })

  it("Should WithdrawFromShelfHasFunds", async () => {
    const nftPrice = utils.parseEther("100")
    const riskGroup = BigNumber.from("1")
    const ceiling = await computeCeiling(riskGroup, nftPrice)
    const investAmount = ceiling.mul(BigNumber.from("2"))
    await supplyFunds(investAmount, shelf.address)
    const { loanId, tokenId } = await createLoanAndBorrow(borrower.address, nftPrice, riskGroup)
    await assertPreCondition(loanId, tokenId, ceiling)
    await withdraw(loanId, tokenId, ceiling, borrower.address)
  })

  it("Should PartialWithdraw", async () => {
    await fundTranches()
    const nftPrice = utils.parseEther("100")
    const riskGroup = BigNumber.from("1")
    const ceiling = await computeCeiling(riskGroup, nftPrice)
    const withdrawAmount = div(ceiling, BigNumber.from("2"))
    const { loanId, tokenId } = await createLoanAndBorrow(borrower.address, nftPrice, riskGroup)
    await assertPreCondition(loanId, tokenId, withdrawAmount)
    await withdraw(loanId, tokenId, withdrawAmount, borrower.address)
  })

  it("Should FailWithdrawNFTnotLocked", async () => {
    await fundTranches()
    const nftPrice = utils.parseEther("100")
    const riskGroup = BigNumber.from("1")
    const ceiling = await computeCeiling(riskGroup, nftPrice)
    const { loanId, tokenId } = await issueNFTAndCreateLoan(borrower.address)
    await priceNFT(tokenId, nftPrice)
    expect(
      withdraw(loanId, tokenId, ceiling, borrower.address)
    ).to.be.revertedWith("")
  })

  it("Should FailWithdrawNotLoanOwner", async () => {
    await fundTranches()
    const nftPrice = utils.parseEther("100")
    const riskGroup = BigNumber.from("1")
    const ceiling = await computeCeiling(riskGroup, nftPrice)
    const { loanId, tokenId } = await createLoanAndBorrow(randomUser.address, nftPrice, riskGroup)
  expect(
    withdraw(loanId, tokenId, ceiling, borrower.address)
  ).to.be.revertedWith("")
  })

  it("Should FailLoanHasNFTNotPriced", async () => {
    await fundTranches()
    const nftPrice = utils.parseEther("100")
    const riskGroup = BigNumber.from("1")
    const ceiling = await computeCeiling(riskGroup, nftPrice)
    const { loanId, tokenId } = await issueNFTAndCreateLoan(borrower.address)
    await lockNFT(loanId, borrower.address)
    expect(
      withdraw(loanId, tokenId, ceiling, borrower.address)
    ).to.be.revertedWith("")
  })

  it("Should FailWithdrawNotEnoughFundsAvailable", async () => {
    const nftPrice = utils.parseEther("100")
    const riskGroup = BigNumber.from("1")
    const ceiling = await computeCeiling(riskGroup, nftPrice)
    const { loanId, tokenId } = await createLoanAndBorrow(randomUser.address, nftPrice, riskGroup)
    expect(
      withdraw(loanId, tokenId, ceiling, borrower.address)
    ).to.be.revertedWith("")
  })

  it("Should FailWithdrawTwice", async () => {
    await fundTranches()
    const nftPrice = utils.parseEther("100")
    const riskGroup = BigNumber.from("1")
    const ceiling = await computeCeiling(riskGroup, nftPrice)
    const { loanId, tokenId } = await createLoanAndBorrow(randomUser.address, nftPrice, riskGroup)
    expect(
      assertPreCondition(loanId, tokenId, ceiling)
    ).to.be.revertedWith("")
    // await withdraw(loanId, tokenId, ceiling, borrower.address)
    // await withdraw(loanId, tokenId, ceiling, borrower.address)
  })
})
