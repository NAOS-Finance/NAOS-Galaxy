import { ethers } from "hardhat"
import { Contract } from "ethers"
import { zeroPadEnd } from "../test/utils"
import { toUtf8Bytes } from "ethers/lib/utils"
import { addressBook } from "./utils"

async function main() {
  let Coordinator = await ethers.getContractFactory("EpochCoordinator")
  let coordinator: Contract
  let galaxyStakingPool: Contract

  if (addressBook.coordinator && addressBook.galaxyStakingPool) {
    coordinator = Coordinator.attach(addressBook.coordinator)
    galaxyStakingPool = new Contract(addressBook.galaxyStakingPool, [
      'function updateEpoch()',
      'function redeemOrderCount() returns (uint256)',
      'function redeemOrderListPendingIndex() returns (uint256)'
    ], coordinator.provider)
    let redeemOrderCount = await galaxyStakingPool.callStatic.redeemOrderCount()
    let redeemOrderListPendingIndex = await galaxyStakingPool.callStatic.redeemOrderListPendingIndex()
    if (redeemOrderCount.sub(redeemOrderListPendingIndex).lt(150)) {
      let signers = await ethers.getSigners()
      console.log(`Start to closeEpoch/updateEpoch ${new Date()}, signer: ${await signers[0].getAddress()}`)
      let tx
      let receipt
      tx = await coordinator.closeEpoch({
        gasLimit: 5000000
      })
      console.log(`Close epoch tx hash: ${tx.hash}`)
      receipt = await tx.wait()
      if (receipt.status <= 0) {
        throw new Error('Failed to close epoch')
      }
      let submissionPeriod = await coordinator.submissionPeriod()
      if (submissionPeriod == true) {
        throw new Error('Start submission period')
      }
      tx = await galaxyStakingPool.connect(signers[0]).updateEpoch({
        gasLimit: 5000000
      })
      console.log(`Update epoch tx hash: ${tx.hash}`)
      receipt = await tx.wait()
      if (receipt.status <= 0) {
        throw new Error('Failed to update epoch')
      }
    } else {
      console.log('Call wesley')
    }
  } else {
    console.log('Please setup valid coordinator/galaxyStakingPool address')
  }
}
  
main()
  .then(() => console.log('Checkout testpool successfully!'))
  .catch(console.error)
