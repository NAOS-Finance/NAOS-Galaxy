import { ethers } from "hardhat"
import { Contract, utils } from "ethers"
import { addressBook } from "./utils"

async function main() {
  let Assessor = await ethers.getContractFactory("Assessor")
  let Coordinator = await ethers.getContractFactory("EpochCoordinator")
  let assessor: Contract
  let coordinator: Contract
  if (addressBook.coordinator && addressBook.assessor) {
    assessor = Assessor.attach(addressBook.assessor)
    coordinator = Coordinator.attach(addressBook.coordinator)
    const order = await coordinator.order()
    console.log('Senior supply: ', utils.formatEther(order.seniorSupply))
    const maxReserve = await assessor.maxReserve()
    const epochReserve = await coordinator.epochReserve()
    console.log('Max reserve: ', utils.formatEther(maxReserve), 'Epoch reserve: ', utils.formatEther(epochReserve), 'Order supply: ', utils.formatEther(order.seniorSupply))
    let seniorSupply = maxReserve.sub(epochReserve)
    if (order.seniorSupply.lt(seniorSupply)) {
      seniorSupply = order.seniorSupply
    }
    console.log('Supply: ', utils.formatEther(seniorSupply))
    const chalengePeriod = (await coordinator.minChallengePeriodEnd()).toNumber()
    let tx
    let res
    const now = Math.floor((new Date).getTime() / 1000)
    if (now > chalengePeriod) {
      // res = await coordinator.callStatic.executeEpoch({
      //   gasLimit: 6000000
      // })
      // console.log(res.toString())
      // tx = await coordinator.executeEpoch({
      //   gasLimit: 5000000
      // })
      // await tx.wait()
      console.log('Should execute epoch')
      return
    }
    res = await coordinator.callStatic.submitSolution(order.seniorRedeem, order.juniorRedeem, order.juniorSupply, seniorSupply)
    if (res.eq(0)) {
      tx = await coordinator.submitSolution(order.seniorRedeem, order.juniorRedeem, order.juniorSupply, seniorSupply)
      await tx.wait()
      console.log('Success')
    } else {
      console.log('Failed', res.toString())
    }
  } else {
    console.log('Please setup valid coordinator address')
  }
}
  
main()
  .then(() => console.log('Submit epoch successfully!'))
  .catch(console.error)
