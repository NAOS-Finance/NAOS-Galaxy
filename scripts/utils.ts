import { ethers, run, network } from "hardhat"
import { Contract, Signer, utils, BigNumber } from "ethers"

export const ZERO = BigNumber.from(0)
export const ONE = BigNumber.from(10).pow(27)

export const ONE_ADDRESS = '0x1111111111111111111111111111111111111111'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

const deployment = require(`../deployment/${network.name}.json`) || {}

export const addressBook: Record<string,any> = deployment

export const verifyContract = (address: string, params: Array<any>=[]) => {
  return true
  // return run("verify:verify", {
  //   address: address,
  //   constructorArguments: params,
  // })
}

export const supplyOrder = async (erc20: Contract, tranche: Contract, operator: Contract, amount: BigNumber, users: Array<Signer>) => {
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

export async function setupNFT(count: number) {
  const Title = await ethers.getContractFactory("Title")
  return await Title.deploy(`Collateral NFT ${count}`, `collateralNFT${count}`)
}

export const setupLoan = async (navFeed: Contract, shelf: Contract, count: number, borrower: Signer, nftPrice: BigNumber, riskGroup: number = 2, maturityDate: number = 1700000000) => {
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

export const borrow = async (navFeed: Contract, shelf: Contract, loan: number, borrower: Signer) => {
  const ceiling = await navFeed.ceiling(loan)
  const lockTx = await shelf.connect(borrower).lock(loan)
  await lockTx.wait()
  console.log('Borrow: ', ceiling.toString())
  const borrowTx = await shelf.connect(borrower).borrow(loan, ceiling)
  await borrowTx.wait()
  const borrowerAddress = await borrower.getAddress()
  const wTx = await shelf.connect(borrower).withdraw(loan, ceiling, borrowerAddress)
  await wTx.wait()
}

export const repay = async (shelf: Contract, loan: number, borrower: Signer, debt: BigNumber) => {
  const tx = await shelf.connect(borrower).repay(loan, debt)
  await tx.wait()
}

export const registerInvestors = async (memberlist: Contract, users: Array<Signer>, validUntil: number) => {
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