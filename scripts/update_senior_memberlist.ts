import { ethers } from "hardhat"
import { Contract } from "ethers"
import { addressBook } from "./utils"

async function main() {
  const signers = await ethers.getSigners()
  if (signers.length <= 0) {
    throw new Error("Couldn't find a signer")
  }
  const Memberlist = await ethers.getContractFactory("Memberlist")
  let seniorMemberlist: Contract

  if (addressBook.seniorMemberlist) {
    seniorMemberlist = Memberlist.attach(addressBook.seniorMemberlist)

    const validUntil = Math.floor((new Date).getTime() / 1000 + 30 * 86400)
    await seniorMemberlist.updateMember('0x75ebD59631b174b31E4B72D8B1A52A897E9B0515', validUntil)
    return 'Update senior memberlist successfully!'
  }
  throw new Error('Please set senior memberlist address in deployments!')
}
  
main()
  .then(console.log)
  .catch(console.error)
