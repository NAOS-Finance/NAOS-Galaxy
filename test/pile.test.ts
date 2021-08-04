import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { timeFly } from "./utils"
import { AbiCoder } from "ethers/lib/utils"

describe("Pile", function () {
  let accounts: Signer[]
  let pile: Contract

  beforeEach(async function () {
    accounts = await ethers.getSigners()
    pile = await (await ethers.getContractFactory('Pile')).deploy()
  })

  const setupLoan = async (loan: number, rate: BigNumber) => {
    let shuffle = utils.zeroPad([], 32)
    let data = utils.zeroPad(utils.toUtf8Bytes("rate"), 32)
    for (let i = 28; i < 32; i++) {
      shuffle[i - 28] = data[i]
    }
    await pile.file(shuffle, rate, rate)
    await pile.setRate(loan, rate)
  }

  const increaseDebt = async (loan: number, amount: BigNumber) => {
    await pile.incDebt(loan, amount)
    expect((await pile.total()).toString()).to.be.eq(amount.toString())
    expect((await pile.debt(loan)).toString()).to.be.eq(amount.toString())
  }

  it("Should accure", async function () {
    const loan = 1
    const amount = utils.parseEther('66')
    // 12 % per year compound in seconds
    const rate = BigNumber.from('1000000003593629043335673583')
    await setupLoan(loan, rate)
    await increaseDebt(loan, amount)
    await timeFly(365)
    await pile.accrue(loan)
    expect((await pile.debt(loan)).toString()).to.be.eq(utils.parseEther('73.92').toString())
  })
})
