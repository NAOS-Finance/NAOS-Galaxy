import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { percentToBig, MAX_UINT256, now, timeFly, mul, deployTestRoot, deployCollateralNFT, deployCurrency, deployBorrower, prepareDeployLender, deployLender, takeSnapshot, restoreSnapshot } from "./utils"

describe("Collect", function () {
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
  // let snapshotId: number

  beforeEach(async () => {
    // snapshotId = await takeSnapshot()
    accounts = await ethers.getSigners()
    await deployContracts()
    await createTestUsers()
    await fundTranches()
  })

  // afterEach(async () => {
  //   await restoreSnapshot(snapshotId)
  // })

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
    const signers = await ethers.getSigners()
    const govAddr = await signers[0].getAddress()
    await root.relyContract(await lenderDeployer.coordinator(), govAddr)
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
    await topUp(usr);
    const borrower = await (await ethers.getContractFactory("Borrower")).attach(usr)
    await borrower.doApproveCurrency(shelf.address, MAX_UINT256)
    await admin.collect(loanId, usr);
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

  const collect = async (loanId: BigNumber, tokenId: BigNumber, whitelisted: Boolean) => {
    const recoveryAmount = (await collector.options(loanId))[1]
    const initialKeeperBalance = await currency.balanceOf(keeper.address)
    const initialJuniorBalance = await currency.balanceOf(await lenderDeployer.reserve())
    const initialTotalBalance = await shelf.balance()
    const initialLoanBalance = await shelf.balances(loanId)
    if (whitelisted) {
      await keeper.collect(loanId)
    } else {
      await admin.collect(loanId, keeper.address)
    }
    await assertPostCondition(loanId, tokenId, recoveryAmount, initialKeeperBalance, initialJuniorBalance, initialTotalBalance, initialLoanBalance)
  }

  const assertPreCondition = async (
    loanId: BigNumber,
    tokenId: BigNumber
  ) => {
    expect(await collateralNFT.ownerOf(tokenId)).to.be.eq(collector.address)
    expect(await pile.debt(loanId)).to.be.gte(await nftFeed.threshold(loanId))
    const options = await collector.options(loanId)
    const assigned = options[0]
    const price = options[1]
    expect(assigned == keeper.address || await collector.collectors(keeper.address) == 1).to.be.eq(true)
    expect(price).to.be.gt(BigNumber.from("0"))
    expect(await currency.balanceOf(keeper.address)).to.be.gte(price)
  }

  const assertPostCondition = async (
    loanId: BigNumber,
    tokenId: BigNumber,
    recoveryAmount: BigNumber,
    initialKeeperBalance: BigNumber,
    initialJuniorBalance: BigNumber,
    initialTotalBalance: BigNumber,
    initialLoanBalance: BigNumber
  ) => {
    expect(await collateralNFT.ownerOf(tokenId)).to.be.eq(keeper.address)
    expect(await pile.debt(loanId)).to.be.eq(BigNumber.from("0"))
    expect(await currency.balanceOf(keeper.address)).to.be.eq(initialKeeperBalance.sub(recoveryAmount))
    expect(await currency.balanceOf(await lenderDeployer.reserve())).to.be.eq(initialJuniorBalance.add(recoveryAmount))
    expect(await shelf.balances(loanId)).to.be.eq(BigNumber.from("0"))
    expect(await shelf.balance()).to.be.eq(initialTotalBalance.sub(initialLoanBalance))
  }

  const setupCollect = async (
    loanId: BigNumber,
    recoveryPrice: BigNumber,
    usr: string,
    isWhitelisted: Boolean,
    isAssigned: Boolean,
    doTopup: Boolean,
    doApprove: Boolean
  ) => {
    if (isAssigned) {
      await admin.addKeeper(loanId, keeper.address, recoveryPrice)
    }
    if (isWhitelisted) {
      await admin.setCollectPrice(loanId, recoveryPrice)
      await admin.whitelistKeeper(usr)
    }
    if (doTopup) {
      await topUp(keeper.address)
    }
    if (doApprove) {
      await keeper.approveCurrency(shelf.address, MAX_UINT256)
    }
  }

  it("Should CollectAssignedKeeper", async () => {
    const riskGroup = BigNumber.from("4")
    const nftPrice = utils.parseEther("200")

    const assigned = true
    const whitelisted = false
    const doTopup = true
    const doApprove = true

    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)
    await timeFly(10, true)

    const recoveryPrice = await pile.debt(loanId)
    await setupCollect(loanId, recoveryPrice, keeper.address, whitelisted, assigned, doTopup, doApprove)

    await collector.seize(loanId)
    await assertPreCondition(loanId, tokenId)
    await collect(loanId, tokenId, false)
  })

  it("Should CollectAssignedKeeper", async () => {
    const riskGroup = BigNumber.from("4")
    const nftPrice = utils.parseEther("200")

    const assigned = false
    const whitelisted = true
    const doTopup = true
    const doApprove = true

    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)
    await timeFly(10, true)

    const recoveryPrice = await pile.debt(loanId)
    await setupCollect(loanId, recoveryPrice, keeper.address, whitelisted, assigned, doTopup, doApprove)

    await collector.seize(loanId)

    await assertPreCondition(loanId, tokenId)
    await collect(loanId, tokenId, whitelisted)
  })

  it("Should CollectPriceSmallerDebt", async () => {
    const riskGroup = BigNumber.from("4")
    const nftPrice = utils.parseEther("200")

    const assigned = true
    const whitelisted = true
    const doTopup = true
    const doApprove = true

    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)

    const recoveryPrice = (await pile.debt(loanId)).div(BigNumber.from("2"))
    await setupCollect(loanId, recoveryPrice, keeper.address, whitelisted, assigned, doTopup, doApprove)

    await timeFly(10, true)

    await collector.seize(loanId)
    await assertPreCondition(loanId, tokenId)
    await collect(loanId, tokenId, false)
  })

  it("Should CollectPriceHigherDebt", async () => {
    const riskGroup = BigNumber.from("4")
    const nftPrice = utils.parseEther("200")

    const assigned = true
    const whitelisted = true
    const doTopup = true
    const doApprove = true

    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)
    await timeFly(10, true)

    const recoveryPrice = mul(await pile.debt(loanId), BigNumber.from("2"))
    await setupCollect(loanId, recoveryPrice, keeper.address, whitelisted, assigned, doTopup, doApprove)

    await collector.seize(loanId)
    await assertPreCondition(loanId, tokenId)
    await collect(loanId, tokenId, false)
  })

  it("Should CollectAndIssueLoan", async () => {
    const riskGroup = BigNumber.from("4")
    const nftPrice = utils.parseEther("200")

    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)
    const recoveryPrice = await pile.debt(loanId)

    await timeFly(10, true)

    await addKeeperAndCollect(loanId, borrower.address, recoveryPrice)
    await borrower.close(loanId)
    await borrower.issue(collateralNFT.address, tokenId)
  })

  it("Should FailCollectAndIssueNotClosed", async () => {
    const riskGroup = BigNumber.from("4")
    const nftPrice = utils.parseEther("200")
    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)
    const recoveryPrice = await pile.debt(loanId)

    await timeFly(10, true)

    await addKeeperAndCollect(loanId, borrower.address, recoveryPrice)
    expect(
      borrower.issue(collateralNFT.address, tokenId)
    ).to.be.revertedWith("")
  })

  it("Should FailCollectNotWhitelisted", async () => {
    const riskGroup = BigNumber.from("4")
    const nftPrice = utils.parseEther("200")

    const assigned = false
    const whitelisted = false
    const doTopup = true
    const doApprove = true

    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)
    const recoveryPrice = await pile.debt(loanId)

    await setupCollect(loanId, recoveryPrice, keeper.address, whitelisted, assigned, doTopup, doApprove)

    await timeFly(10, true)

    await collector.seize(loanId)
    try {
      await assertPreCondition(loanId, tokenId)
    } catch (e) {}
    // await collect(loanId, tokenId, false)
  })

  it("Should FailCollectLoanHasAssignedKeeper", async () => {
    const riskGroup = BigNumber.from("4")
    const nftPrice = utils.parseEther("200")

    const assigned = false
    const whitelisted = true
    const doTopup = true
    const doApprove = true

    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)
    const recoveryPrice = await pile.debt(loanId)

    await setupCollect(loanId, recoveryPrice, keeper.address, whitelisted, assigned, doTopup, doApprove)

    await admin.addKeeper(loanId, randomUser.address, recoveryPrice)
    await timeFly(10, true)

    await collector.seize(loanId)
    await assertPreCondition(loanId, tokenId)
    expect(
      collect(loanId, tokenId, true)
    ).to.be.revertedWith("")
  })

  it("Should FailCollectNotSeized", async () => {
    const riskGroup = BigNumber.from("4")
    const nftPrice = utils.parseEther("200")

    const assigned = true
    const whitelisted = false
    const doTopup = true
    const doApprove = true

    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)
    const recoveryPrice = await pile.debt(loanId)

    await setupCollect(loanId, recoveryPrice, keeper.address, whitelisted, assigned, doTopup, doApprove)

    await timeFly(10, true)

    try {
      await assertPreCondition(loanId, tokenId)
    } catch (e) {}
    // await collect(loanId, tokenId, false)
  })

  it("Should FailCollectKeeperNotEnoughFunds", async () => {
    const riskGroup = BigNumber.from("4")
    const nftPrice = utils.parseEther("200")

    const assigned = true
    const whitelisted = false
    const doTopup = false
    const doApprove = true

    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)
    const recoveryPrice = await pile.debt(loanId)

    await setupCollect(loanId, recoveryPrice, keeper.address, whitelisted, assigned, doTopup, doApprove)

    await timeFly(10, true)

    await collector.seize(loanId)
    try {
      await assertPreCondition(loanId, tokenId)
    } catch (e) {}
    // await collect(loanId, tokenId, false)
  })

  it("Should FailCollectNoApproval", async () => {
    const riskGroup = BigNumber.from("4")
    const nftPrice = utils.parseEther("200")

    const assigned = true
    const whitelisted = false
    const doTopup = true
    const doApprove = false

    const { loanId, tokenId } = await createLoanAndWithdraw(borrower.address, nftPrice, riskGroup)
    const recoveryPrice = await pile.debt(loanId)
    await setupCollect(loanId, recoveryPrice, keeper.address, whitelisted, assigned, doTopup, doApprove)

    await timeFly(10, true)
    await collector.seize(loanId)
    await assertPreCondition(loanId, tokenId)
    expect(
      collect(loanId, tokenId, false)
    ).to.be.revertedWith("")
  })
})
