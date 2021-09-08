import { ethers, network } from "hardhat"
import { BigNumber, utils } from "ethers"

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