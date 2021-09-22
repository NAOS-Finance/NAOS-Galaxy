import { ethers } from "hardhat"
import { Contract, Signer, utils, BigNumber } from "ethers"
import { addressBook, verifyContract, ZERO_ADDRESS } from "./utils"

async function main() {
  const { BigNumber } = ethers
  const discountRate = BigNumber.from('1000000342100000000000000000')
  const tokenName = "NAOS Mock Token"
  const tokenSymbol = "naos-mock"
  const TENP25 = BigNumber.from(10).pow(25)
  const signers = await ethers.getSigners()
  if (signers.length <= 0) {
    throw new Error("Couldn't find any signer")
  }
  const d = []
  for (let i=0; i<signers.length; i++) {
    const s = signers[i]
    const addr = await s.getAddress()
    d.push({
      address: addr,
      balance: ethers.utils.formatEther(await ethers.provider.getBalance(addr))
    })
  }
  const signer = signers[0]
  const ERC20 = await ethers.getContractFactory("ERC20")
  const Root = await ethers.getContractFactory("GalaxyRoot")
  let erc20: Contract
  let root: Contract
  if (addressBook.erc20) {
    erc20 = ERC20.attach(addressBook.erc20)
  } else {
    console.log(`Deployer address: ${await signer.getAddress()}`)
    
    erc20 = await ERC20.deploy(tokenName, tokenSymbol)
    await erc20.deployTransaction.wait()
    await verifyContract(erc20.address, [
      tokenName,
      tokenSymbol
    ])
    console.log("NAOS deployed at:", erc20.address)
  }
  console.log('Start to deploy Galaxy')
  if (addressBook.root) {
    root = Root.attach(addressBook.root)
  } else {
    root = await Root.deploy(signer.address)
    await root.deployTransaction.wait()
    await verifyContract(root.address, [
      signer.address
    ])
    console.log("Root deployed at:", root.address)
  }

  const TitleFab = await ethers.getContractFactory("TitleFab")
  const ShelfFab = await ethers.getContractFactory("ShelfFab")
  const PileFab = await ethers.getContractFactory("PileFab")
  const CollectorFab = await ethers.getContractFactory("CollectorFab")
  const NAVFeedFab = await ethers.getContractFactory("NAVFeedFab")
  const BorrowerDeployer = await ethers.getContractFactory("BorrowerDeployer")

  console.log('Start to deploy Borrower')
  // deploy borrower
  let titleFab: Contract
  let shelfFab: Contract
  let pileFab: Contract 
  let collectorFab: Contract
  let navFeedFab: Contract
  let borrowerDeployer: Contract

  if (addressBook.titleFab) {
    titleFab = TitleFab.attach(addressBook.titleFab)
  } else {
    titleFab = await TitleFab.deploy()
    await titleFab.deployTransaction.wait()
    // maybe verify
    // await verifyContract(titleFab.address)
    console.log("Title fab deployed at:", titleFab.address)
  }
  
  if (addressBook.shelfFab) {
    shelfFab = ShelfFab.attach(addressBook.shelfFab)
  } else {
    shelfFab = await ShelfFab.deploy()
    await shelfFab.deployTransaction.wait()
    // maybe verify
    // await verifyContract(shelfFab.address)
    console.log("Shelf fab deployed at:", shelfFab.address)
  }
  
  if (addressBook.pileFab) {
    pileFab = PileFab.attach(addressBook.pileFab)
  } else {
    pileFab = await PileFab.deploy()
    await pileFab.deployTransaction.wait()
    // maybe verify
    // await verifyContract(pileFab.address)
    console.log("Pile fab deployed at:", pileFab.address)
  }

  if (addressBook.collectorFab) {
    collectorFab = CollectorFab.attach(addressBook.collectorFab)
  } else {
    collectorFab = await CollectorFab.deploy()
    await collectorFab.deployTransaction.wait()
    // maybe verify
    // await verifyContract(collectorFab.address)
    console.log("Collector fab deployed at:", collectorFab.address)
  }

  if (addressBook.navFeedFab) {
    navFeedFab = NAVFeedFab.attach(addressBook.navFeedFab)
  } else {
    navFeedFab = await NAVFeedFab.deploy()
    await navFeedFab.deployTransaction.wait()
    // maybe verify
    // await verifyContract(navFeedFab.address)
    console.log("NAV feed fab deployed at:", navFeedFab.address)
  }

  if (addressBook.borrowerDeployer) {
    borrowerDeployer = BorrowerDeployer.attach(addressBook.borrowerDeployer)
  } else {
    borrowerDeployer = await BorrowerDeployer.deploy(root.address, titleFab.address, shelfFab.address, pileFab.address, collectorFab.address, navFeedFab.address, erc20.address, tokenName, tokenSymbol, discountRate)
    await borrowerDeployer.deployTransaction.wait()
    await verifyContract(borrowerDeployer.address, [
      root.address,
      titleFab.address,
      shelfFab.address,
      pileFab.address,
      collectorFab.address,
      navFeedFab.address,
      erc20.address,
      tokenName,
      tokenSymbol,
      discountRate
    ])
    console.log("Borrower deployer deployed at:", borrowerDeployer.address)
  }

  const Shelf = await ethers.getContractFactory("Shelf")
  const Pile = await ethers.getContractFactory("Pile")
  const Title = await ethers.getContractFactory("Title")
  const Collector = await ethers.getContractFactory("Collector")
  const NAVFeed = await ethers.getContractFactory("NAVFeed")
  let shelf: Contract
  let pile: Contract
  let title: Contract
  let collector: Contract
  let navFeed: Contract

  if (addressBook.title) {
    title = Title.attach(addressBook.title)
  } else {
    let tx = await borrowerDeployer.deployTitle()
    await tx.wait()
    console.log('Title address: ', await borrowerDeployer.title())
    title = Title.attach(await borrowerDeployer.title())
  }

  if (addressBook.pile) {
    pile = Pile.attach(addressBook.pile)
  } else {
    let tx = await borrowerDeployer.deployPile()
    await tx.wait()
    console.log('Pile address: ', await borrowerDeployer.pile())
    pile = Pile.attach(await borrowerDeployer.pile())
  }

  if (addressBook.navFeed) {
    navFeed = NAVFeed.attach(addressBook.navFeed)
  } else {
    let tx = await borrowerDeployer.deployFeed()
    await tx.wait()
    console.log('NAVFeed address: ', await borrowerDeployer.feed())
    navFeed = NAVFeed.attach(await borrowerDeployer.feed())
  }

  if (addressBook.shelf) {
    shelf = Shelf.attach(addressBook.shelf)
  } else {
    let tx = await borrowerDeployer.deployShelf()
    await tx.wait()
    console.log('Shelf address: ', await borrowerDeployer.shelf())
    shelf = Shelf.attach(await borrowerDeployer.shelf())
  }

  if (addressBook.collector) {
    collector = Collector.attach(addressBook.collector)
  } else {
    let tx = await borrowerDeployer.deployCollector()
    await tx.wait()
    console.log('Collector address: ', await borrowerDeployer.collector())
    collector = Collector.attach(await borrowerDeployer.collector())
  }
  let borrowerDeployed = (await borrowerDeployer.shelf()).toString() != ZERO_ADDRESS && (await borrowerDeployer.collector()).toString() != ZERO_ADDRESS

  if (!borrowerDeployed) {
    let tx = await borrowerDeployer.deploy()
    await tx.wait()
    console.log('Borrower deployed')
  }

  console.log('Start to deploy lender')
  // deploy lender
  const ReserveFab = await ethers.getContractFactory("ReserveFab")
  const AssessorFab = await ethers.getContractFactory("AssessorFab")
  const TrancheFab = await ethers.getContractFactory("TrancheFab")
  const MemberlistFab = await ethers.getContractFactory("MemberlistFab")
  const RestrictedTokenFab = await ethers.getContractFactory("RestrictedTokenFab")
  const OperatorFab = await ethers.getContractFactory("OperatorFab")
  const CoordinatorFab = await ethers.getContractFactory("CoordinatorFab")
  const LenderDeployer = await ethers.getContractFactory("LenderDeployer")
  let reserveFab: Contract
  let assessorFab: Contract
  let trancheFab: Contract
  let memberlistFab: Contract
  let restrictedTokenFab: Contract
  let operatorFab: Contract
  let coordinatorFab: Contract
  let lenderDeployer: Contract

  if (addressBook.reserveFab) {
    reserveFab = ReserveFab.attach(addressBook.reserveFab)
  } else {
    reserveFab = await ReserveFab.deploy()
    await reserveFab.deployTransaction.wait()
    // maybe verify
    // await verifyContract(reserveFab.address)
    console.log("Reserve fab deployed at:", reserveFab.address)
  }

  if (addressBook.assessorFab) {
    assessorFab = AssessorFab.attach(addressBook.assessorFab)
  } else {
    assessorFab = await AssessorFab.deploy()
    await assessorFab.deployTransaction.wait()
    // maybe verify
    // await verifyContract(assessorFab.address)
    console.log("Assessor fab deployed at:", assessorFab.address)
  }
  
  if (addressBook.trancheFab) {
    trancheFab = TrancheFab.attach(addressBook.trancheFab)
  } else {
    trancheFab = await TrancheFab.deploy()
    await trancheFab.deployTransaction.wait()
    // maybe verify
    // await verifyContract(trancheFab.address)
    console.log("Tranche fab deployed at:", trancheFab.address)
  }

  if (addressBook.memberlistFab) {
    memberlistFab = MemberlistFab.attach(addressBook.memberlistFab)
  } else {
    memberlistFab = await MemberlistFab.deploy()
    await memberlistFab.deployTransaction.wait()
    // maybe verify
    // await verifyContract(memberlistFab.address)
    console.log("Memberlist fab deployed at:", memberlistFab.address)
  }

  if (addressBook.restrictedTokenFab) {
    restrictedTokenFab = RestrictedTokenFab.attach(addressBook.restrictedTokenFab)
  } else {
    restrictedTokenFab = await RestrictedTokenFab.deploy()
    await restrictedTokenFab.deployTransaction.wait()
    // maybe verify
    // await verifyContract(restrictedTokenFab.address)
    console.log("RestrictedToken fab deployed at:", restrictedTokenFab.address)
  }

  if (addressBook.operatorFab) {
    operatorFab = OperatorFab.attach(addressBook.operatorFab)
  } else {
    operatorFab = await OperatorFab.deploy()
    await operatorFab.deployTransaction.wait()
    // maybe verify
    // await verifyContract(operatorFab.address)
    console.log("Operator fab deployed at:", operatorFab.address)
  }
  
  if (addressBook.coordinatorFab) {
    coordinatorFab = CoordinatorFab.attach(addressBook.coordinatorFab)
  } else {
    coordinatorFab = await CoordinatorFab.deploy()
    await coordinatorFab.deployTransaction.wait()
    // maybe verify
    // await verifyContract(coordinatorFab.address)
    console.log("Coordinator fab deployed at:", coordinatorFab.address)
  }

  if (addressBook.lenderDeployer) {
    lenderDeployer = LenderDeployer.attach(addressBook.lenderDeployer)
  } else {
    lenderDeployer = await LenderDeployer.deploy(root.address, erc20.address, trancheFab.address, memberlistFab.address, restrictedTokenFab.address, reserveFab.address, assessorFab.address, coordinatorFab.address, operatorFab.address)
    await lenderDeployer.deployTransaction.wait()
    // maybe verify
    await verifyContract(lenderDeployer.address, [
      root.address, erc20.address, trancheFab.address, memberlistFab.address, restrictedTokenFab.address, reserveFab.address, assessorFab.address, coordinatorFab.address, operatorFab.address
    ])
    console.log("Lender deployer deployed at:", lenderDeployer.address)
  }

  const Assessor = await ethers.getContractFactory("Assessor")
  const Reserve = await ethers.getContractFactory("Reserve")
  const Coordinator = await ethers.getContractFactory("EpochCoordinator")
  const Tranche = await ethers.getContractFactory("Tranche")
  const Memberlist = await ethers.getContractFactory("Memberlist")
  const RestrictedToken = await ethers.getContractFactory("RestrictedToken")
  const Operator = await ethers.getContractFactory("Operator")
  let reserve: Contract
  let assessor: Contract
  let coordinator: Contract
  let juniorTranche: Contract
  let juniorMemberlist: Contract
  let juniorToken: Contract
  let juniorOperator: Contract
  let seniorTranche: Contract
  let seniorMemberlist: Contract
  let seniorToken: Contract
  let seniorOperator: Contract
  let lenderDeployed = (await lenderDeployer.coordinator()).toString() != ZERO_ADDRESS && (await lenderDeployer.assessor()).toString() != ZERO_ADDRESS && (await lenderDeployer.reserve()).toString() != ZERO_ADDRESS && (await lenderDeployer.seniorTranche()).toString() != ZERO_ADDRESS

  const minSeniorRate = BigNumber.from(0).mul(TENP25) // 0%
  const maxSeniorRate = BigNumber.from(100).mul(TENP25) // 100%
  // max reserve: 10 B
  const maxReserve = utils.parseEther('1000000000')
  const maxSeniorInterestRate = BigNumber.from('1000000229200000000000000000')
  if (!lenderDeployed) {
    let tx = await lenderDeployer.init(minSeniorRate, maxSeniorRate, maxReserve, 60 * 60, maxSeniorInterestRate, "Alpha Token", "Alpha", "Beta Token", "Beta")
    await tx.wait()
    console.log('Lender inited')
  }

  if (addressBook.juniorToken) {
    juniorTranche = Tranche.attach(addressBook.juniorTranche)
    juniorOperator = Operator.attach(addressBook.juniorOperator)
    juniorToken = RestrictedToken.attach(addressBook.juniorToken)
    juniorMemberlist = Memberlist.attach(addressBook.juniorMemberlist)
  } else {
    let tx = await lenderDeployer.deployJunior()
    await tx.wait()
    juniorTranche = Tranche.attach(await lenderDeployer.juniorTranche())
    juniorOperator = Operator.attach(await lenderDeployer.juniorOperator())
    juniorToken = RestrictedToken.attach(await lenderDeployer.juniorToken())
    juniorMemberlist = Memberlist.attach(await lenderDeployer.juniorMemberlist())
    console.log('Junior tranche address: ', await lenderDeployer.juniorTranche())
    console.log('Junior operator address: ', await lenderDeployer.juniorOperator())
    console.log('Junior token address: ', await lenderDeployer.juniorToken())
    console.log('Junior memberlist address: ', await lenderDeployer.juniorMemberlist())
  }

  if (addressBook.seniorToken) {
    seniorTranche = Tranche.attach(addressBook.seniorTranche)
    seniorOperator = Operator.attach(addressBook.seniorOperator)
    seniorToken = RestrictedToken.attach(addressBook.seniorToken)
    seniorMemberlist = Memberlist.attach(addressBook.seniorMemberlist)
  } else {
    let tx = await lenderDeployer.deploySenior()
    await tx.wait()
    seniorTranche = Tranche.attach(await lenderDeployer.seniorTranche())
    seniorOperator = Operator.attach(await lenderDeployer.seniorOperator())
    seniorToken = RestrictedToken.attach(await lenderDeployer.seniorToken())
    seniorMemberlist = Memberlist.attach(await lenderDeployer.seniorMemberlist())
    console.log('Senior tranche address: ', await lenderDeployer.seniorTranche())
    console.log('Senior operator address: ', await lenderDeployer.seniorOperator())
    console.log('Senior token address: ', await lenderDeployer.seniorToken())
    console.log('Senior memberlist address: ', await lenderDeployer.seniorMemberlist())
  }

  if (addressBook.reserve) {
    reserve = Reserve.attach(addressBook.reserve)
  } else {
    let tx = await lenderDeployer.deployReserve()
    await tx.wait()
    console.log('Reserve address: ', await lenderDeployer.reserve())
    reserve = Reserve.attach(await lenderDeployer.reserve())
  }
  
  if (addressBook.assessor) {
    assessor = Assessor.attach(addressBook.assessor)
  } else {
    let tx = await lenderDeployer.deployAssessor()
    await tx.wait()
    console.log('Assessor address: ', await lenderDeployer.assessor())
    assessor = Assessor.attach(await lenderDeployer.assessor())
  }

  if (addressBook.coordinator) {
    coordinator = Coordinator.attach(addressBook.coordinator)
  } else {
    let tx = await lenderDeployer.deployCoordinator()
    await tx.wait()
    console.log('Coordinator address: ', await lenderDeployer.coordinator())
    coordinator = Coordinator.attach(await lenderDeployer.coordinator())
  }
  
  if (!lenderDeployed) {
    let tx = await lenderDeployer.deploy()
    await tx.wait()

    tx = await root.prepare(lenderDeployer.address, borrowerDeployer.address, signer.address)
    await tx.wait()
    tx = await root.deploy()
    await tx.wait()

    // set first user as admin
    let promises = []
    tx = await root.relyContract(shelf.address, signer.address)
    promises.push(tx.wait())
    tx = await root.relyContract(pile.address, signer.address)
    promises.push(tx.wait())
    tx = await root.relyContract(title.address, signer.address)
    promises.push(tx.wait())
    tx = await root.relyContract(collector.address, signer.address)
    promises.push(tx.wait())
    tx = await root.relyContract(navFeed.address, signer.address)    
    promises.push(tx.wait())
    // to payout left money, assign signer to reserve
    tx = await root.relyContract(assessor.address, signer.address)
    promises.push(tx.wait())

    // authorize first user to update investors
    tx = await root.relyContract(juniorMemberlist.address, signer.address)
    promises.push(tx.wait())
    tx = await root.relyContract(seniorMemberlist.address, signer.address)
    promises.push(tx.wait())
    await Promise.all(promises)
  }
}
  
main()
  .then(() => console.log('Contract deployed successfully!'))
  .catch(console.error)
