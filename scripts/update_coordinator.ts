import { ethers } from "hardhat"
import { Contract } from "ethers"
import { zeroPadEnd } from "../test/utils"
import { toUtf8Bytes } from "ethers/lib/utils"
import { addressBook } from "./utils"

async function main() {
  let Coordinator = await ethers.getContractFactory("EpochCoordinator")
  let coordinator: Contract

  if (addressBook.coordinator) {
    coordinator = Coordinator.attach(addressBook.coordinator)
    let padded = zeroPadEnd(toUtf8Bytes("minimumEpochTime"), 32)
    let tx = await coordinator["file(bytes32,uint256)"](padded, 300)
    await tx.wait()

    padded = zeroPadEnd(toUtf8Bytes("challengeTime"), 32)
    tx = await coordinator["file(bytes32,uint256)"](padded, 300)
    await tx.wait()

    return 'Update coordinator successfully!'
  }
  throw new Error('Please setup valid coordinator address')
}
  
main()
  .then(console.log)
  .catch(console.error)
