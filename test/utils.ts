import { ethers } from "hardhat"

export const timeFly = async (days:number) => {
  await ethers.provider.send('evm_increaseTime', [ Math.floor(days * 86400) ])
  return await ethers.provider.send('evm_mine', [])
}