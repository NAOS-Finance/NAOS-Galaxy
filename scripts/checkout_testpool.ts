import { ethers } from "hardhat"
import { Contract } from "ethers"
import { zeroPadEnd } from "../test/utils"
import { toUtf8Bytes } from "ethers/lib/utils"
import { addressBook } from "./utils"
import fetch from "node-fetch"

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
    let diff = redeemOrderCount.sub(redeemOrderListPendingIndex)
    if (diff.lt(150)) {
      if (diff.eq(0)) {
        console.log('Empty redeem orders')
        return
      }
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
      console.log('Call wesley on slack')
      const msg = '@wesley @yan @jacklee @sc0vu update epoch exceeds limit: 150, please take a look!'
      const body = JSON.stringify({
        text: msg
      })
      fetch(
        `https://hooks.slack.com/services/T01RKD4PX8F/${process.env.NAOS_SLACK_APP_TOKEN}`,{
        body,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        }
      })
    }
  } else {
    console.log('Please setup valid coordinator/galaxyStakingPool address')
  }
}
  
main()
  .then(() => console.log('Checkout testpool successfully!'))
  .catch(console.error)
