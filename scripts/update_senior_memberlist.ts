import { ethers } from "hardhat"
import { Contract, BigNumber } from "ethers"
import { addressBook } from "./utils"

async function main() {
  const signers = await ethers.getSigners()
  if (signers.length <= 0) {
    throw new Error("Couldn't find a signer")
  }

  const ERC20 = await ethers.getContractFactory("ERC20")
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
  let seniorTranche: Contract
  let seniorMemberlist: Contract
  let seniorToken: Contract
  let seniorOperator: Contract
  let erc20: Contract

  if (addressBook.erc20 && addressBook.seniorToken) {
    erc20 = ERC20.attach(addressBook.erc20)
    seniorTranche = Tranche.attach(addressBook.seniorTranche)
    seniorOperator = Operator.attach(addressBook.seniorOperator)
    seniorToken = RestrictedToken.attach(addressBook.seniorToken)
    seniorMemberlist = Memberlist.attach(addressBook.seniorMemberlist)

    const validUntil = Math.floor((new Date).getTime() / 1000 + 30 * 86400)
    await seniorMemberlist.updateMember('0x75ebD59631b174b31E4B72D8B1A52A897E9B0515', validUntil)
  }
  console.log('Update senior memberlist')
}
  
main()
  .then(() => console.log('Invest successfully!'))
  .catch(console.error)
