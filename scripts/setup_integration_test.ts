import { ethers, run } from "hardhat"
import { Contract } from "ethers"

async function main() {
  const verifyContract = (address: string, params: Array<any>=[]) => {
    return run("verify:verify", {
      address: address,
      constructorArguments: params,
    })
  }
  const { BigNumber } = ethers
  const discountRate = BigNumber.from('1000000342100000000000000000')
  const tokenName = "NAOS Loan Token"
  const tokenSymbol = "naos"
  const tenp25 = BigNumber.from(10).pow(25)
  const signers = await ethers.getSigners()
  if (signers.length <= 0) {
    throw new Error("Couldn't find a signer")
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
  const addressBook = {
    erc20: '0xdcc5e988c4523bd405135fc299ba9027d0c28a77',
    root: '0x178966821b198fd5a09b5c47969430c62753fd97',
    titleFab: '0xD59CC4bE93de411055bFf07458229fa9c9315d36',
    shelfFab: '0x4619b39FcedA14a53b00ebAE1Cebe73eD595850B',
    pileFab: '0xE79397B44b91fD987B37D90913f308FA439f6E33',
    collectorFab: '0x80CC228Abd5CFA61C914A3bcc67a2df21a080dc6',
    navFeedFab: '0x811982F4CDF707fdE23Fe6Ef1cf83176faaDc263',
    title: '0x3671cdEc7244C4FcB8B282641d0F913E5AF16C75',
    shelf: '0x4a6087Ea8Ed46773971C675b1019C7Fe293b24f6',
    pile: '0x7f87bF6f6431DeD22a915c85Aeb9C08F6BEb56A2',
    collector: '0x42263E16d438267ccd16C4014de00c25eEAaB672',
    navFeed: '0xec53C20E492cb5eA5D44552d05c44B7157b0d189',
    borrowerDeployer: '0x52f1774e0CD908FC187aC118e43A313C3a7eb131',
    reserveFab: '0x69546a97b30Dce1Ed0e9a33a3202Fd97636EC7c1',
    assessorFab: '0x9e8BcF5B2D558361393f1FF89950780f3CFF3Ca0',
    trancheFab: '0x3b7EE471971E8E9D70c97d6ba18535A999d4fa3f',
    memberlistFab: '0xEd5374208A99519272e74A20fB6Ff29bf8a858ce',
    restrictedTokenFab: '0x2f430AFf21EcCf7C85C2475f1c01E8BA195364d0',
    operatorFab: '0x2Ea881b1BB1ec14bf2aCedae500854F077a504cD',
    coordinatorFab: '0x8aEb37342390A64242a7D1d54cA2345F06a052F0',
    reserve: '0xcEF6D8C6c6d631dB4f9c570b6D430b7602aeeEBb',
    assessor: '0x29fC94A2980a46cbBC460DBF076732C70CA639b2',
    coordinator: '0x30478210E8fD149f964D228E1D24693b29658ACb',
    juniorTranche: '0xAd53AbA0A64D7B8fccbf2d6dc694cdEAf9cF5516',
    juniorMemberlist: '0xdFC4859C02395198DdEE37659F210310392370A8',
    juniorToken: '0x4D138e4B6971a094e1F920D8d5Ec4F6B557E1C8a',
    juniorOperator: '0xBf5f2Ee4EC1d04d02EB313Bd0536aD9E29D4211f',
    seniorTranche: '0xD781246f1d5f10a054956A9aC247a6c23BA4Bd97',
    seniorMemberlist: '0x3b1B42f9130fC3D1B5f53b5e60B68CB677F81d9a',
    seniorToken: '0x387d803850451AfcCEb5Cf6321DB2924479B3483',
    seniorOperator: '0x811A46d1004047118f1b6f8319F3d0Fc10Ad62b1',
    lenderDeployer: '0x0f6A726717481061ceD89b8f9bD9cEbB08544644',
  }
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
  let borrowerDeployed = true

  if (!borrowerDeployed) {
    let tx = await borrowerDeployer.deploy()
    await tx.wait()
  }

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
  let lenderDeployed = true

  const minSeniorRate = BigNumber.from(0).mul(tenp25) // 0%
  const maxSeniorRate = BigNumber.from(100).mul(tenp25) // 100%
  const maxReserve = BigNumber.from('10000000000000000001')
  const maxSeniorInterestRate = BigNumber.from('1000000229200000000000000000')
  if (!lenderDeployed) {
    await lenderDeployer.init(minSeniorRate, maxSeniorRate, maxReserve, 60 * 60, maxSeniorInterestRate, "Alpha Token", "Alpha", "Beta Token", "Beta")
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
    await root.relyContract(shelf.address, signer.address)
    await root.relyContract(pile.address, signer.address)
    await root.relyContract(title.address, signer.address)
    await root.relyContract(collector.address, signer.address)
    await root.relyContract(navFeed.address, signer.address)    
    // to payout left money, assign signer to reserve
    await root.relyContract(assessor.address, signer.address)

    // authorize first user to update investors
    await root.relyContract(juniorMemberlist.address, signer.address)
    await root.relyContract(seniorMemberlist.address, signer.address)
  }

  console.log('All the contract was deployed!')
}
  
main()
  .then(() => console.log('Contract deployed'))
  .catch(console.error)
