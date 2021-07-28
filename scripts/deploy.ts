import { ethers } from "hardhat"

async function main() {
  const { BigNumber } = ethers
  const discountRate = BigNumber.from('1000000342100000000000000000')
  const tokenName = "NAOS Loan Token"
  const tokenSymbol = "naos"
  const signers = await ethers.getSigners()
  if (signers.length <= 0) {
    throw new Error("Couldn't find a signer")
  }
  const signer = signers[0]
  console.log(`Deployer address: ${await signer.getAddress()}`)
  const ERC20 = await ethers.getContractFactory("ERC20")
  const erc20 = await ERC20.deploy(tokenName, tokenSymbol)
  console.log("NAOS deployed at:", erc20.address)

  const Root = await ethers.getContractFactory("GalaxyRoot")
  const root = await Root.deploy(signer.address)
  console.log("Root deployed at:", root.address)

  // deploy borrower
  const TitleFab = await ethers.getContractFactory("TitleFab")
  const titleFab = await TitleFab.deploy()
  console.log("Title fab deployed at:", titleFab.address)

  const ShelfFab = await ethers.getContractFactory("ShelfFab")
  const shelfFab = await ShelfFab.deploy()
  console.log("Shelf fab deployed at:", shelfFab.address)

  const PileFab = await ethers.getContractFactory("PileFab")
  const pileFab = await PileFab.deploy()
  console.log("Pile fab deployed at:", pileFab.address)

  const CollectorFab = await ethers.getContractFactory("CollectorFab")
  const collectorFab = await CollectorFab.deploy()
  console.log("Collector fab deployed at:", collectorFab.address)

  const NAVFeedFab = await ethers.getContractFactory("NAVFeedFab")
  const navFeedFab = await NAVFeedFab.deploy()
  console.log("NAV Feed fab deployed at:", navFeedFab.address)

  const BorrowerDeployer = await ethers.getContractFactory("BorrowerDeployer")
  const borrower = await BorrowerDeployer.deploy(root.address, titleFab.address, shelfFab.address, pileFab.address, collectorFab.address, navFeedFab.address, erc20.address, tokenName, tokenSymbol, discountRate)
  console.log("Borrower deployed at:", borrower.address)

  let tx = await borrower.deployTitle()
  await tx.wait()
  tx = await borrower.deployPile()
  await tx.wait()
  tx = await borrower.deployFeed()
  await tx.wait()
  tx = await borrower.deployShelf()
  await tx.wait()
  tx = await borrower.deployCollector()
  await tx.wait()
  tx = await borrower.deploy()
  await tx.wait()

  // deploy lender
  const ReserveFab = await ethers.getContractFactory("ReserveFab")
  const reserveFab = await ReserveFab.deploy()
  console.log("reserve fab deployed at:", reserveFab.address)

  const AssessorFab = await ethers.getContractFactory("AssessorFab")
  const assessorFab = await AssessorFab.deploy()
  console.log("Assessor fab deployed at:", assessorFab.address)

  const TrancheFab = await ethers.getContractFactory("TrancheFab")
  const trancheFab = await TrancheFab.deploy()
  console.log("Tranche fab deployed at:", trancheFab.address)

  const MemberlistFab = await ethers.getContractFactory("MemberlistFab")
  const memberlistFab = await MemberlistFab.deploy()
  console.log("Memberlist fab deployed at:", memberlistFab.address)

  const RestrictedTokenFab = await ethers.getContractFactory("RestrictedTokenFab")
  const restrictedTokenFab = await RestrictedTokenFab.deploy()
  console.log("Restricted Token fab deployed at:", restrictedTokenFab.address)

  const OperatorFab = await ethers.getContractFactory("OperatorFab")
  const operatorFab = await OperatorFab.deploy()
  console.log("Operator fab deployed at:", operatorFab.address)

  const CoordinatorFab = await ethers.getContractFactory("CoordinatorFab")
  const coordinatorFab = await CoordinatorFab.deploy()
  console.log("Coordinator fab deployed at:", coordinatorFab.address)

  const LenderDeployer = await ethers.getContractFactory("LenderDeployer")
  const lender = await LenderDeployer.deploy(root.address, erc20.address, trancheFab.address, memberlistFab.address, restrictedTokenFab.address, reserveFab.address, assessorFab.address, coordinatorFab.address, operatorFab.address)
  console.log("Lender deployed at:", lender.address)
  const tenp25 = BigNumber.from(10).pow(25)
  tx = await lender.init(BigNumber.from(75).mul(tenp25), BigNumber.from(85).mul(tenp25), 10, 60*60, BigNumber.from('1000000229200000000000000000'), "Alpha Token", "Alpha", "Beta Token", "Beta")
  await tx.wait()
  tx = await lender.deployJunior()
  await tx.wait()
  tx = await lender.deploySenior()
  await tx.wait()
  tx = await lender.deployReserve()
  await tx.wait()
  tx = await lender.deployAssessor()
  await tx.wait()
  tx = await lender.deployCoordinator()
  await tx.wait()
  tx = await lender.deploy()
  await tx.wait()

  tx = await root.prepare(lender.address, borrower.address, signer.address)
  await tx.wait()
  tx = await root.deploy()
  await tx.wait()
  console.log('All the contract was deployed!')
}
  
main()
  .then(() => console.log('Contract deployed'))
  .catch(console.error)
