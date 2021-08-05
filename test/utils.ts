import { ethers } from "hardhat"
import { utils } from "ethers"

export const timeFly = async (days:number) => {
  await ethers.provider.send('evm_increaseTime', [ Math.floor(days * 86400) ])
  return await ethers.provider.send('evm_mine', [])
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