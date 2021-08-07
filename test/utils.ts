import { ethers } from "hardhat"
import { BigNumber, utils } from "ethers"

export const timeFly = async (days:number,mine:boolean=false) => {
  await ethers.provider.send('evm_increaseTime', [ Math.round(days * 86400) ])
  if (mine) {
    return await ethers.provider.send('evm_mine', [])
  }
  return true
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

export const div = (x:BigNumber, y:BigNumber): BigNumber => {
  return x.div(y)
}

export const mul = (x:BigNumber, y:BigNumber): BigNumber => {
  return x.mul(y).div(ONE)
}