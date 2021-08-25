import { ethers, run } from "hardhat"
import { Contract, Signer, utils, BigNumber } from "ethers"

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
  const TENP25 = BigNumber.from(10).pow(25)
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
    erc20: '0x6897B9D65dB1c348C81c895551705bB3f9FD2301',
    root: '0x254fe9f22586C32d259fc581B616b8f928B35aa8',
    titleFab: '0xC832E5Aed1a5B14b86D86f9C5CC1B1E83b8b7720',
    shelfFab: '0xd053c7F92272233DfD8349a0Ce1c2681b284cCcB',
    pileFab: '0x7F6785EaF51F67b58c08B47cCa315aFd226aBf8b',
    collectorFab: '0x364A29a4eC35daf56a745FB667aEcD5f7885c9C8',
    navFeedFab: '0x7aBC54305d5a6fb2299cbAB56a688C10aB6df868',
    title: '0x483D22402E3f3361f9c29051F4DFf57B5286f3C6',
    shelf: '0xfA51964E9f0feA5b67F7d46dB5E37097E8941c5D',
    pile: '0x5c9bFa27A697B3A7Ac60Bb25AC0FB5C983897AA2',
    collector: '0x93e4DbD9a341014c475434129C0C0Ce2EaFd4c3d',
    navFeed: '0xD770cE25E027984B68a9CFea2B28Eba0259B4eb4',
    borrowerDeployer: '0x0AD0623dB96c77Fa946Fa5c87CB7aFed97bA9B2B',
    reserveFab: '0x3e5263F2b00585cf025397d233C9252b45187515',
    assessorFab: '0x8F89dBc3dd9EB009f6e707eAe97b31642dE1976d',
    trancheFab: '0xD220BdCA0487D41F28ff63cD30642B9BFa50eD3d',
    memberlistFab: '0x7dc5D2C8f55715c5734de995fdEfCc078cd2545A',
    restrictedTokenFab: '0x0F13F29060F6Fc0d3C0b6a1Ae48CD68a2e05B7e8',
    operatorFab: '0x11E94dC72259bD8bCE66a4416d76584305AbA7D7',
    coordinatorFab: '0xf33C748ea7Cb54007651143F649a8a7fBd295A63',
    reserve: '0x039d9989D93cC374203Ec7D089b877a419C62E26',
    assessor: '0x4ffb5e18361Ef45C2e71c7951C8D228e6b50Ad05',
    coordinator: '0x06BdE99A471e5BF1Cb3425955854424DC2c81822',
    juniorTranche: '0xAEFa643cEa8F99D4462FC97dDa5feD3FE673C96C',
    juniorMemberlist: '0x0235746Eaa42d69131306032d53034Bf48B37788',
    juniorToken: '0xaE48c97D32eFCef8a9bf648cF6B3bca31a60dF51',
    juniorOperator: '0x1dEa8dB16BF85123c92c89e02a5e4E7811baD37E',
    seniorTranche: '0xD84817da6a517bF8A1981b24B9c01f3b1C8Ec779',
    seniorMemberlist: '0xFB3c697320E10772aC36De174E6EB8E99da94306',
    seniorToken: '0x191427faaB0252607c2dDc68140154Ba4F32c99A',
    seniorOperator: '0x4746390Cb37Dd029850CA9538dc60b13d63b201E',
    lenderDeployer: '0xdcfC7a19bEF9fB4F87a77Da9D6f4D8177C5E5D9a',
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

  const minSeniorRate = BigNumber.from(0).mul(TENP25) // 0%
  const maxSeniorRate = BigNumber.from(100).mul(TENP25) // 100%
  const maxReserve = BigNumber.from('10000000000000000001')
  const maxSeniorInterestRate = BigNumber.from('1000000229200000000000000000')
  if (!lenderDeployed) {
    let tx = await lenderDeployer.init(minSeniorRate, maxSeniorRate, maxReserve, 60 * 60, maxSeniorInterestRate, "Alpha Token", "Alpha", "Beta Token", "Beta")
    await tx.wait()
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
  const ONE = BigNumber.from(10).pow(27)
  const registerInvestors = async (memberlist: Contract, users: Array<Signer>, validUntil: number) => {
    let count = 0
    for (let i = 0; i < users.length; i++) {
      const user = users[i]
      if (user.getAddress == undefined) {
        continue
      }
      const userAddr = await user.getAddress()
      await memberlist.updateMember(userAddr, validUntil)
      count += 1
    }
    return count
  }

  async function setupNFT(count: number, ) {
    const Title = await ethers.getContractFactory("Title")
    return await Title.deploy(`Collateral NFT ${count}`, `collateralNFT${count}`)
  }

  const setupLoan = async (count: number, borrower: Signer, nftPrice: BigNumber, riskGroup: number = 2, maturityDate: number = 1700000000) => {
    const nft = await setupNFT(count)
    const borrowerAddress = await borrower.getAddress()
    let tx
    tx = await nft.issue(borrowerAddress)
    await tx.wait()
    const tokenID = (await nft.count()).sub(1)
    const tokenKey = await navFeed.callStatic['nftID(address,uint256)'](nft.address, tokenID)
    // set nft price and risk
    console.log(`Borrow NFT identifier ${tokenKey} ${borrowerAddress}`)
    await navFeed['update(bytes32,uint256,uint256)'](tokenKey, nftPrice, riskGroup)
    await navFeed['file(bytes32,bytes32,uint256)']('0x' + Buffer.from("maturityDate").toString('hex').padEnd(64, '0'), tokenKey, maturityDate)
    console.log('Issue nft to: ', borrowerAddress)
    // issue nft
    const loan = await shelf.connect(borrower).callStatic.issue(nft.address, tokenID)
    await shelf.connect(borrower).issue(nft.address, tokenID)
    const ceiling = await navFeed.ceiling(loan)
    tx = await nft.connect(borrower).setApprovalForAll(shelf.address, true)
    await tx.wait()
    return {
      nft,
      tokenID,
      maturityDate,
      tokenKey,
      loan,
      ceiling
    }
  }

  const supplyOrder = async (erc20: Contract, tranche: Contract, operator: Contract, amount: BigNumber, users: Array<Signer>) => {
    const iAmount = amount.div(users.length)
    console.log(`Supply senior orders ${amount.toString()} / ${iAmount.toString()} each senior investor`)
    let count = 0
    
    for (let i = 0; i < users.length; i++) {
      let user = users[i]
      if (user.getAddress == undefined) {
        continue
      }
      const userAddress = await user.getAddress()
      let tx = await erc20.mint(userAddress, iAmount)
      await tx.wait()
      tx = await erc20.connect(user).approve(tranche.address, iAmount)
      await tx.wait()
      tx = await operator.connect(user).supplyOrder(iAmount)
      await tx.wait()
      count += 1
    }
    return count
  }
  const borrower1 = signers[1]
  const borrower2 = signers[2]
  const investor1 = signers[3]
  const investor2 = signers[4]
  console.log('Start to setup borrower/investors/debt')
  console.log('Borrowers:')
  console.log(await borrower1.getAddress())
  console.log(await borrower2.getAddress())

  console.log('Investors:')
  const validUntil = Math.floor((new Date).getTime() / 1000 + 30 * 86400)
  console.log(await investor1.getAddress())
  console.log(await investor2.getAddress())
  console.log("Register")
  await registerInvestors(seniorMemberlist, [investor1, investor2], validUntil)
  console.log("Registered")

  console.log('Setup 20 naos debt for borrower 1')
  const borrowRes1 = await setupLoan(1, borrower1, utils.parseEther('20'))
  console.log('Setup 30 naos debt for borrower 2')
  const borrowRes2 = await setupLoan(2, borrower2, utils.parseEther('30'))
  const totalCeiling = borrowRes1.ceiling.add(borrowRes2.ceiling)
  const investAmount = totalCeiling.mul(TENP25).mul(80).div(ONE)
  await supplyOrder(erc20, seniorTranche, seniorOperator, investAmount, [investor1, investor2])
}
  
main()
  .then(() => console.log('Integration setup successfully!'))
  .catch(console.error)
