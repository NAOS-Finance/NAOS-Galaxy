import { ethers, run, network } from "hardhat"

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

const deployment = require(`../deployment/${network.name}.json`) || {}

export const addressBook: Record<string,any> = deployment

export const verifyContract = (address: string, params: Array<any>=[]) => {
  return run("verify:verify", {
    address: address,
    constructorArguments: params,
  })
}