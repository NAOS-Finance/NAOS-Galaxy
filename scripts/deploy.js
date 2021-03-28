const hardhat = require('hardhat')

async function main() {
  const { BigNumber } = hardhat.ethers
  const discountRate = BigNumber.from('1000000342100000000000000000')
  const tokenName = "NAOS Loan Token"
  const tokenSymbol = "naos"
  const signer = await hardhat.ethers.getSigner()
  const ERC20 = await hardhat.ethers.getContractFactory("ERC20")
  const erc20 = await ERC20.deploy(tokenName, tokenSymbol)
  console.log("NAOS deployed at:", erc20.address)

  const Root = await hardhat.ethers.getContractFactory("TinlakeRoot")
  const root = await Root.deploy(signer.address)
  console.log("Root deployed at:", root.address)

  // deploy borrower
  const TitleFab = await hardhat.ethers.getContractFactory("TitleFab")
  const titleFab = await TitleFab.deploy()
  console.log("Title fab deployed at:", titleFab.address)

  const ShelfFab = await hardhat.ethers.getContractFactory("ShelfFab")
  const shelfFab = await ShelfFab.deploy()
  console.log("Shelf fab deployed at:", shelfFab.address)

  const PileFab = await hardhat.ethers.getContractFactory("PileFab")
  const pileFab = await PileFab.deploy()
  console.log("Pile fab deployed at:", pileFab.address)

  const CollectorFab = await hardhat.ethers.getContractFactory("CollectorFab")
  const collectorFab = await CollectorFab.deploy()
  console.log("Collector fab deployed at:", collectorFab.address)

  const NAVFeedFab = await hardhat.ethers.getContractFactory("NAVFeedFab")
  const navFeedFab = await NAVFeedFab.deploy()
  console.log("NAV Feed fab deployed at:", navFeedFab.address)

  const BorrowerDeployer = await hardhat.ethers.getContractFactory("BorrowerDeployer")
  const borrower = await BorrowerDeployer.deploy(root.address, titleFab.address, shelfFab.address, pileFab.address, collectorFab.address, navFeedFab.address, erc20.address, tokenName, tokenSymbol, discountRate)
  console.log("Borrower deployed at:", borrower.address)

  await borrower.deployTitle()
  await borrower.deployPile()
  await borrower.deployFeed()
  await borrower.deployShelf()
  await borrower.deployCollector()
  await borrower.deploy()

  // deploy lender
  const ReserveFab = await hardhat.ethers.getContractFactory("ReserveFab")
  const reserveFab = await ReserveFab.deploy()
  console.log("reserve fab deployed at:", reserveFab.address)

  const AssessorFab = await hardhat.ethers.getContractFactory("AssessorFab")
  const assessorFab = await AssessorFab.deploy()
  console.log("Assessor fab deployed at:", assessorFab.address)

  const TrancheFab = await hardhat.ethers.getContractFactory("TrancheFab")
  const trancheFab = await TrancheFab.deploy()
  console.log("Tranche fab deployed at:", trancheFab.address)

  const MemberlistFab = await hardhat.ethers.getContractFactory("MemberlistFab")
  const memberlistFab = await MemberlistFab.deploy()
  console.log("Memberlist fab deployed at:", memberlistFab.address)

  const RestrictedTokenFab = await hardhat.ethers.getContractFactory("RestrictedTokenFab")
  const restrictedTokenFab = await RestrictedTokenFab.deploy()
  console.log("Restricted Token fab deployed at:", restrictedTokenFab.address)

  const OperatorFab = await hardhat.ethers.getContractFactory("OperatorFab")
  const operatorFab = await OperatorFab.deploy()
  console.log("Operator fab deployed at:", operatorFab.address)

  const CoordinatorFab = await hardhat.ethers.getContractFactory("CoordinatorFab")
  const coordinatorFab = await CoordinatorFab.deploy()
  console.log("Coordinator fab deployed at:", coordinatorFab.address)

  const LenderDeployer = await hardhat.ethers.getContractFactory("LenderDeployer")
  const lender = await LenderDeployer.deploy(root.address, erc20.address, trancheFab.address, memberlistFab.address, restrictedTokenFab.address, reserveFab.address, assessorFab.address, coordinatorFab.address, operatorFab.address)
  console.log("Lender deployed at:", lender.address)
  const tenp25 = BigNumber.from(10).pow(25)
  await lender.init(BigNumber.from(75).mul(tenp25), BigNumber.from(85).mul(tenp25), 10, 60*60, BigNumber.from('1000000229200000000000000000'), "Drop Token", "Drop", "Tin Token", "Tin")
  await lender.deployJunior()
  await lender.deploySenior()
  await lender.deployAssessor()
  await lender.deployCoordinator()
  await lender.deploy()
  console.log('deployed!!!')

  await root.prepare(lender.address, borrower.address, signer.address)
  await root.deploy()
  console.log('All the contract was deployed!')
}
  
main()
  .then(() => console.log('Contract deployed'))
  .catch(console.error)