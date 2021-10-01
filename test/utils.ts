import { ethers, network } from "hardhat"
import { BigNumber, utils, Contract, Signer } from "ethers"

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// There are some issues with ganache increase time, have
// to fix this later.
export const timeFly = async (days:number, mine:boolean=false) => {
  const blockNow = await now()
  const dateNow = Math.round((new Date()).getTime() / 1000)
  const timeDiff = Math.round(days * 86400)
  await ethers.provider.send('evm_increaseTime', [ timeDiff + (blockNow - dateNow) ])
  if (mine) {
    return await ethers.provider.send('evm_mine', [ blockNow + timeDiff ])
  }
  return true
}

export const now = async () => {
  const currentBlock = await ethers.provider.getBlock('latest')
  return currentBlock.timestamp
}

export const zeroPadEnd = (src: Uint8Array, length:number): Uint8Array => {
  if (src.length >= length) {
    return src
  }
  let padded = utils.zeroPad([], length)
  let data = utils.zeroPad(src, length)
  for (let i = length - src.length; i < length; i++) {
    padded[i - length + src.length] = data[i]
  }
  return padded
}

export const ONE = BigNumber.from('1000000000000000000000000000')

export const MAX_UINT256 = BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

export const percentToBig = (percent: number): BigNumber => {
  if (percent <= 0 || percent >= 100) {
    throw new Error('invalid percent value')
  }
  const bigPercent = BigNumber.from(percent)
  return bigPercent.mul(ONE).div(100)
}

export const div = (x:BigNumber, y:BigNumber): BigNumber => {
  return x.div(y)
}

export const mul = (x:BigNumber, y:BigNumber): BigNumber => {
  return x.mul(y).div(ONE)
}

export const rdiv = (x:BigNumber, y:BigNumber): BigNumber => {
  return x.mul(ONE).add(y.div(2)).div(y)
}

export const rmul = (x:BigNumber, y:BigNumber): BigNumber => {
  return x.mul(y).div(ONE)
}

export const takeSnapshot = async (): Promise<number> => {
	const result = await ethers.provider.send('evm_snapshot', [])
  await ethers.provider.send('evm_mine', [])
	return BigNumber.from(result).toNumber()
}

export const restoreSnapshot = async (id: number) => {
  await ethers.provider.send('evm_revert', [ id ])
  await ethers.provider.send('evm_mine', [])
}

let titleFab: Contract
let shelfFab: Contract
let pileFab: Contract 
let collectorFab: Contract
let navFeedFab: Contract

export const deployTestRoot = async (accounts: Signer[]) => {
  return await (await ethers.getContractFactory("TestRoot")).deploy(accounts[0].getAddress())
}

export const deployCollateralNFT = async () => {
  return await (await ethers.getContractFactory("Title")).deploy("Collateral NFT", "collateralNFT")
}

export const deployCurrency = async () => {
  return await (await ethers.getContractFactory("SimpleToken")).deploy("CUR", "Currency")
}

export const deployBorrower = async (rootAddr: string, currencyAddr: string) => {
  if (!titleFab) {
    titleFab = await (await ethers.getContractFactory("TitleFab")).deploy()
  }
  if (!shelfFab) {
    shelfFab = await (await ethers.getContractFactory("ShelfFab")).deploy()
  }
  if (!pileFab) {
    pileFab = await (await ethers.getContractFactory("PileFab")).deploy()
  }
  if (!collectorFab) {
    collectorFab = await (await ethers.getContractFactory("CollectorFab")).deploy()
  } 
  if (!navFeedFab) {
    navFeedFab = await (await ethers.getContractFactory("NAVFeedFab")).deploy()
  }

  let discountRate = BigNumber.from("1000000342100000000000000000")
  let borrowerDeployer = await (await ethers.getContractFactory("BorrowerDeployer")).deploy(rootAddr, titleFab.address, shelfFab.address, pileFab.address, collectorFab.address, navFeedFab.address, currencyAddr, "Galaxy Loan Token", "TLNT", discountRate)
  await borrowerDeployer.deployTitle()
  await borrowerDeployer.deployPile()
  await borrowerDeployer.deployFeed()
  await borrowerDeployer.deployShelf()
  await borrowerDeployer.deployCollector()
  await borrowerDeployer.deploy()
  return borrowerDeployer 
}

let reserveFab: Contract
let assessorFab: Contract
let trancheFab: Contract
let memberlistFab: Contract
let restrictedTokenFab: Contract
let operatorFab: Contract
let coordinatorFab: Contract

export const prepareDeployLender = async (rootAddr: string, currencyAddr: string) => {
  if (!reserveFab) {
    reserveFab = await (await ethers.getContractFactory("ReserveFab")).deploy()
  }
  if (!assessorFab) {
    assessorFab = await (await ethers.getContractFactory("AssessorFab")).deploy()
  }
  if (!trancheFab) {
    trancheFab = await (await ethers.getContractFactory("TrancheFab")).deploy()
  }
  if (!memberlistFab) {
    memberlistFab = await (await ethers.getContractFactory("MemberlistFab")).deploy()
  }
  if (!restrictedTokenFab) {
    restrictedTokenFab = await (await ethers.getContractFactory("RestrictedTokenFab")).deploy()
  }
  if (!operatorFab) {
    operatorFab = await (await ethers.getContractFactory("OperatorFab")).deploy()
  }
  if (!coordinatorFab) {
    coordinatorFab = await (await ethers.getContractFactory("CoordinatorFab")).deploy()
  }
  return await (await ethers.getContractFactory("LenderDeployer")).deploy(rootAddr, currencyAddr, trancheFab.address, memberlistFab.address, restrictedTokenFab.address, reserveFab.address, assessorFab.address, coordinatorFab.address, operatorFab.address)
}

export const deployLender = async (lenderDeployer: Contract) => {
  let seniorInterestRate = BigNumber.from("1000000229200000000000000000")
  let maxReserve = MAX_UINT256
  let maxSeniorRatio = percentToBig(85)
  let minSeniorRatio = percentToBig(75)
  let challengeTime = 60 * 60
  let seniorTokenName = "Alpha Token"
  let seniorTokenSymbol = "Alpha"
  let juniorTokenName = "Beta Token"
  let juniorTokenSymbol = "Beta"
  await lenderDeployer.init(minSeniorRatio, maxSeniorRatio, maxReserve, challengeTime, seniorInterestRate, seniorTokenName, seniorTokenSymbol, juniorTokenName, juniorTokenSymbol)
  await lenderDeployer.deployJunior()
  await lenderDeployer.deploySenior()
  await lenderDeployer.deployReserve()
  await lenderDeployer.deployAssessor()
  await lenderDeployer.deployCoordinator()
  await lenderDeployer.deploy()
}