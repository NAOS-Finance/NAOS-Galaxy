import { ethers } from "hardhat"
import { addressBook, repay } from "./utils"

async function main() {
  const Shelf = await ethers.getContractFactory("Shelf")
  const ERC20 = await ethers.getContractFactory("ERC20")
  const signers = await ethers.getSigners()
  if (signers.length <= 0) {
    throw new Error("Couldn't find any signer")
  }

  if (addressBook.erc20 && addressBook.shelf) {
    const erc20 = ERC20.attach(addressBook.erc20)
    const shelf = Shelf.attach(addressBook.shelf)
    const borrower1 = signers[1]
    const borrower2 = signers[2]
    const repayAmount = ethers.utils.parseEther('1')
    console.log('Start to repay borrower debt')
    let tx = await erc20.mint(borrower1.address, repayAmount)
    await tx.wait()
    tx = await erc20.connect(borrower1).approve(shelf.address, repayAmount)
    await tx.wait()
    console.log('Borrowers:')
    console.log(await borrower1.getAddress())
    console.log(await borrower2.getAddress())

    console.log('Repay 1 naos debt from borrower 1')
    const repayRes1 = await repay(shelf, 1, borrower1, repayAmount)
  }
}
  
main()
  .then(() => console.log('Repay successfully!'))
  .catch(console.error)
