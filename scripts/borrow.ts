import { ethers } from "hardhat"
import { addressBook, borrow } from "./utils"

async function main() {

  const Shelf = await ethers.getContractFactory("Shelf")
  const NAVFeed = await ethers.getContractFactory("NAVFeed")
  const signers = await ethers.getSigners()
  if (signers.length <= 0) {
    throw new Error("Couldn't find any signer")
  }

  if (addressBook.navFeed && addressBook.shelf) {
    const shelf = Shelf.attach(addressBook.shelf)
    const navFeed = NAVFeed.attach(addressBook.navFeed)
    const borrower1 = signers[1]
    const borrower2 = signers[2]
    console.log('Start to setup borrower/investors/debt')
    console.log('Borrowers:')
    console.log(await borrower1.getAddress())
    console.log(await borrower2.getAddress())

    console.log('Borrow 20 naos debt from borrower 1')
    const borrowRes1 = await borrow(navFeed, shelf, 1, borrower1)
    console.log('Borrow 30 naos debt from borrower 2')
    const borrowRes2 = await borrow(navFeed, shelf, 2, borrower2)
  }
}
  
main()
  .then(() => console.log('Borrow successfully!'))
  .catch(console.error)
