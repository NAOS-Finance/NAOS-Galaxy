import { ethers } from "hardhat"
import { Contract } from "ethers"
import { addressBook } from "./utils"

async function main() {
  let Coordinator = await ethers.getContractFactory("EpochCoordinator")
  let coordinator: Contract

  if (addressBook.coordinator) {
    coordinator = Coordinator.attach(addressBook.coordinator)

    let tx = await coordinator.closeEpoch({
      gasLimit: 6000000
    })
    await tx.wait()
    // should not start the challenge period
    if (await coordinator.submissionPeriod() == true) {
      console.log('Start challenge period')
    } else {
      console.log('Success')
    }
  } else {
    console.log('Please setup valid coordinator address')
  }
}
  
main()
  .then(() => console.log('Close epoch successfully!'))
  .catch(console.error)
