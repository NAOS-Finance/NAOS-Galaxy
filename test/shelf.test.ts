import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { zeroPadEnd } from "./utils"

describe("Shelf", function () {
  const loan = BigNumber.from(1)
  const amount = BigNumber.from(100)
  const tokenId = BigNumber.from(55)
  let accounts: Signer[]
  let nft: Contract
  let title: Contract
  let currency: Contract
  let pile: Contract
  let ceiling: Contract
  let distributor: Contract
  let shelf: Contract

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    nft = await (await ethers.getContractFactory("NFTMock")).deploy()
    title = await (await ethers.getContractFactory("TitleMock")).deploy()
    currency = await (await ethers.getContractFactory("TokenMock")).deploy()
    pile = await (await ethers.getContractFactory("PileMock")).deploy()
    ceiling = await (await ethers.getContractFactory("CeilingMock")).deploy()
    distributor = await (await ethers.getContractFactory("src/lender/test/mock/distributor.sol:DistributorMock")).deploy()
    shelf = await (await ethers.getContractFactory("Shelf")).deploy(currency.address, title.address, pile.address, ceiling.address)
    const padded = zeroPadEnd(utils.toUtf8Bytes("distributor"), 32)
    await shelf.depend(padded, distributor.address)
  })

  const issue = async (address:string) => {
    let padded = zeroPadEnd(utils.toUtf8Bytes("issue"), 32)
    await title["setReturn(bytes32,uint256)"](padded, loan)

    padded = zeroPadEnd(utils.toUtf8Bytes("ownerOf"), 32)
    await title["setReturn(bytes32,address)"](padded, address)

    const loan2 = await shelf.callStatic.issue(nft.address, tokenId)
    await shelf.issue(nft.address, tokenId)
    expect(loan).to.be.eq(loan2)
  }

  const lock = async (address: string) => {
    await shelf.lock(loan)

    let padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom"), 32)
    expect(await nft.calls(padded)).to.be.eq(1)

    padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom_to"), 32)
    expect(await nft.values_address(padded)).to.be.eq(shelf.address)

    padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom_from"), 32)
    expect(await nft.values_address(padded)).to.be.eq(address)

    padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom_tokenId"), 32)
    expect(await nft.values_uint(padded)).to.be.eq(tokenId)
  }

  const testLock = async (address: string) => {
    const padded = zeroPadEnd(utils.toUtf8Bytes("ownerOf"), 32)
    await nft["setReturn(bytes32,address)"](padded, address)
    await issue(address)
    await lock(address)
  }

  const borrow = async () => {
    await shelf.borrow(loan, amount)

    let padded = zeroPadEnd(utils.toUtf8Bytes("borrow"), 32)
    expect(await ceiling.calls(padded)).to.be.eq(1)

    padded = zeroPadEnd(utils.toUtf8Bytes("accrue"), 32)
    expect(await pile.calls(padded)).to.be.eq(1)

    padded = zeroPadEnd(utils.toUtf8Bytes("incDebt"), 32)
    expect(await pile.calls(padded)).to.be.eq(1)
    expect(await shelf.balance()).to.be.eq(amount)
    expect(await shelf.balances(loan)).to.be.eq(amount)
  }

  const withdraw = async (address: string) => {
    const totalBalance = await shelf.balance()
    const loanBalance = await shelf.balances(loan)
    expect(totalBalance).to.be.eq(amount)
    expect(loanBalance).to.be.eq(amount)
    
    let padded = zeroPadEnd(utils.toUtf8Bytes("incDebt_currencyAmount"), 32)
    expect(await pile.values_uint(padded)).to.be.eq(amount)
    await currency.mint(shelf.address, amount)
    await shelf.withdraw(loan, amount, address)
    padded = zeroPadEnd(utils.toUtf8Bytes("balance"), 32)
    expect(await distributor.calls(padded)).to.be.eq(1)
    expect(totalBalance.sub(amount)).to.be.eq(await shelf.balance())
    expect(loanBalance.sub(amount)).to.be.eq(await shelf.balances(loan))

    padded = zeroPadEnd(utils.toUtf8Bytes("transfer"), 32)
    expect(await currency.calls(padded)).to.be.eq(1)

    padded = zeroPadEnd(utils.toUtf8Bytes("transfer_from"), 32)
    expect(await currency.values_address(padded)).to.be.eq(shelf.address)

    padded = zeroPadEnd(utils.toUtf8Bytes("transfer_to"), 32)
    expect(await currency.values_address(padded)).to.be.eq(address)

    padded = zeroPadEnd(utils.toUtf8Bytes("transfer_amount"), 32)
    expect(await currency.values_uint(padded)).to.be.eq(amount)
  }

  const repay = async (address: string) => {
    let padded = zeroPadEnd(utils.toUtf8Bytes("debt_loan"), 32)
    await pile["setReturn(bytes32,uint256)"](padded, amount)
    await shelf.repay(loan, amount)

    padded = zeroPadEnd(utils.toUtf8Bytes("balance"), 32)
    expect(await distributor.calls(padded)).to.be.eq(2)

    padded = zeroPadEnd(utils.toUtf8Bytes("accrue"), 32)
    expect(await pile.calls(padded)).to.be.eq(2)

    padded = zeroPadEnd(utils.toUtf8Bytes("decDebt"), 32)
    expect(await pile.calls(padded)).to.be.eq(1)

    expect(await shelf.balance()).to.be.eq(0)
    expect(await shelf.balances(loan)).to.be.eq(0)

    padded = zeroPadEnd(utils.toUtf8Bytes("repay"), 32)
    expect(await ceiling.calls(padded)).to.be.eq(1)

    padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom"), 32)
    expect(await currency.calls(padded)).to.be.eq(1)

    padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom_from"), 32)
    expect(await currency.values_address(padded)).to.be.eq(address)

    padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom_to"), 32)
    expect(await currency.values_address(padded)).to.be.eq(shelf.address)

    padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom_amount"), 32)
    expect(await currency.values_uint(padded)).to.be.eq(amount)
  }

  const recover = async (address: string, recoverAmount: BigNumber) => {
    let padded = zeroPadEnd(utils.toUtf8Bytes("debt_loan"), 32)
    await pile["setReturn(bytes32,uint256)"](padded, amount)
    await shelf.recover(loan, address, recoverAmount)

    padded = zeroPadEnd(utils.toUtf8Bytes("accrue"), 32)
    expect(await pile.calls(padded)).to.be.eq(2)

    padded = zeroPadEnd(utils.toUtf8Bytes("decDebt"), 32)
    expect(await pile.calls(padded)).to.be.eq(1)

    padded = zeroPadEnd(utils.toUtf8Bytes("transfer"), 32)
    expect(await currency.calls(padded)).to.be.eq(2)

    padded = zeroPadEnd(utils.toUtf8Bytes("transfer_from"), 32)
    expect(await currency.values_address(padded)).to.be.eq(address)

    padded = zeroPadEnd(utils.toUtf8Bytes("transfer_to"), 32)
    expect(await currency.values_address(padded)).to.be.eq(shelf.address)

    padded = zeroPadEnd(utils.toUtf8Bytes("transfer_amount"), 32)
    expect(await currency.values_uint(padded)).to.be.eq(recoverAmount)
  }

  it("Should borrow", async () => {
    const signerAddress = await accounts[0].getAddress()
    await testLock(signerAddress)
    await borrow()
  })

  it("Should FailBorrowCeilingReached", async () => {
    const signerAddress = await accounts[0].getAddress()
    await testLock(signerAddress)

    let padded = zeroPadEnd(utils.toUtf8Bytes("borrow"), 32)
    await ceiling.setFail(padded, true)
    
    await expect(
      borrow()
    ).to.be.revertedWith("")
  })

  it("Should FailBorrowNFTNotLocked", async () => {
    const signerAddress = await accounts[0].getAddress()
    let padded = zeroPadEnd(utils.toUtf8Bytes("ownerOf"), 32)
    await nft["setReturn(bytes32,address)"](padded, signerAddress)
    await issue(signerAddress)

    padded = zeroPadEnd(utils.toUtf8Bytes("borrow"), 32)
    await ceiling.setFail(padded, true)
    
    await expect(
      borrow()
    ).to.be.revertedWith("")
  })

  it("Should withdraw", async () => {
    const signerAddress = await accounts[0].getAddress()
    await testLock(signerAddress)
    await borrow()
    await withdraw(signerAddress)
  })

  it("Should FailWithdrawNFTNotLocked", async () => {
    const signerAddress = await accounts[0].getAddress()
    let padded = zeroPadEnd(utils.toUtf8Bytes("ownerOf"), 32)
    await nft["setReturn(bytes32,address)"](padded, signerAddress)
    await issue(signerAddress)
    await expect(
      borrow()
    ).to.be.revertedWith("nft-not-locked")
    await shelf.claim(loan, await accounts[1].getAddress())
    try {
      await withdraw(signerAddress)
    } catch (err) {
      expect(err.message).to.be.eq("Expected \"0\" to be equal 100")
    }
  })

  it("Should FailWithdrawNoBalance", async () => {
    const signerAddress = await accounts[0].getAddress()
    await testLock(signerAddress)
    try {
      await withdraw(signerAddress)
    } catch (err) {
      expect(err.message).to.be.eq("Expected \"0\" to be equal 100")
    }
  })

  it("Should repay", async () => {
    const signerAddress = await accounts[0].getAddress()
    await testLock(signerAddress)
    await borrow()
    await withdraw(signerAddress)
    await repay(signerAddress)
  })

  it("Should FailRepayNFTNotLocked", async () => {
    const signerAddress = await accounts[0].getAddress()
    let padded = zeroPadEnd(utils.toUtf8Bytes("ownerOf"), 32)
    await nft["setReturn(bytes32,address)"](padded, signerAddress)
    await issue(signerAddress)
    await expect(
      borrow()
    ).to.be.revertedWith("nft-not-locked")
    await shelf.claim(loan, await accounts[1].getAddress())
    await expect(
      repay(signerAddress)
    ).to.be.revertedWith("nft-not-locked")
  })

  it("Should FailRepayNFTNoWithdraw", async () => {
    const signerAddress = await accounts[0].getAddress()
    await testLock(signerAddress)
    await borrow()
    await expect(
      repay(signerAddress)
    ).to.be.revertedWith("withdraw-required-before-repay")
  })

  it("Should recover", async () => {
    try {
      const signerAddress = await accounts[0].getAddress()
      await testLock(signerAddress)
      await borrow()
      await withdraw(signerAddress)
      await recover(signerAddress, amount.sub(10))
    } catch (e) {}
  })

  it("Should MultipleIssue", async () => {
    const signerAddress = await accounts[0].getAddress()
    let padded = zeroPadEnd(utils.toUtf8Bytes("ownerOf"), 32)
    await nft["setReturn(bytes32,address)"](padded, signerAddress)
    await issue(signerAddress)
    await shelf.close(loan)

    let loan1 = 2

    padded = zeroPadEnd(utils.toUtf8Bytes("issue"), 32)
    await title["setReturn(bytes32,uint256)"](padded, loan1)

    padded = zeroPadEnd(utils.toUtf8Bytes("ownerOf"), 32)
    await title["setReturn(bytes32,address)"](padded, signerAddress)

    const loan2 = await shelf.callStatic.issue(nft.address, tokenId)
    await shelf.issue(nft.address, tokenId)
    expect(loan1).to.be.eq(loan2)
  })

  it("Should FailMultipleIssue", async () => {
    const signerAddress = await accounts[0].getAddress()
    let padded = zeroPadEnd(utils.toUtf8Bytes("ownerOf"), 32)
    await nft["setReturn(bytes32,address)"](padded, signerAddress)
    await issue(signerAddress)
    
    let loan1 = 2

    padded = zeroPadEnd(utils.toUtf8Bytes("issue"), 32)
    await title["setReturn(bytes32,uint256)"](padded, loan1)

    padded = zeroPadEnd(utils.toUtf8Bytes("ownerOf"), 32)
    await title["setReturn(bytes32,address)"](padded, signerAddress)

    await expect(
      shelf.issue(nft.address, tokenId)
    ).to.be.revertedWith("nft-in-use")
  })

  it("Should FailLockNoWhiteList", async () => {
    const signerAddress = await accounts[0].getAddress()
    await expect(
      lock(signerAddress)
    ).to.be.revertedWith("")
  })

  it("Should FailDepositNotNFTOwner", async () => {
    const signerAddress = await accounts[0].getAddress()
    const padded = zeroPadEnd(utils.toUtf8Bytes("ownerOf"), 32)
    await nft["setReturn(bytes32,address)"](padded, signerAddress)
    await expect(
      lock(signerAddress)
    ).to.be.revertedWith("")
  })

  it("Should unlock", async () => {
    const signerAddress = await accounts[0].getAddress()
    await testLock(signerAddress)

    let padded = zeroPadEnd(utils.toUtf8Bytes("debt_return"), 32)
    await nft["setReturn(bytes32,uint256)"](padded, 0)

    await shelf.unlock(loan)
    padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom"), 32)
    expect(await nft.calls(padded)).to.be.eq(2)

    padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom_to"), 32)
    expect(await nft.values_address(padded)).to.be.eq(signerAddress)

    padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom_from"), 32)
    expect(await nft.values_address(padded)).to.be.eq(shelf.address)

    padded = zeroPadEnd(utils.toUtf8Bytes("transferFrom_tokenId"), 32)
    expect(await nft.values_uint(padded)).to.be.eq(tokenId)
  })

  it("Should FailUnlock", async () => {
    let padded = zeroPadEnd(utils.toUtf8Bytes("debt_return"), 32)
    await nft["setReturn(bytes32,uint256)"](padded, 100)

    await expect(
      shelf.unlock(loan)
    ).to.be.revertedWith("")
  })

  it("Should EventSubscribe", async () => {
    const subscriber = await (await ethers.getContractFactory("SubscriberMock")).deploy()
    let padded = zeroPadEnd(utils.toUtf8Bytes("subscriber"), 32)
    await shelf.depend(padded, subscriber.address)

    const signerAddress = await accounts[0].getAddress()
    await testLock(signerAddress)
    await borrow()
    padded = zeroPadEnd(utils.toUtf8Bytes("borrowEvent"), 32)
    expect(await subscriber.calls(padded)).to.be.eq(1)
    expect(await subscriber.values_uint(padded)).to.be.eq(loan)
    await withdraw(signerAddress)
    padded = zeroPadEnd(utils.toUtf8Bytes("debt_return"), 32)
    await nft["setReturn(bytes32,uint256)"](padded, 0)
    await shelf.unlock(loan)
    padded = zeroPadEnd(utils.toUtf8Bytes("unlockEvent"), 32)
    expect(await subscriber.calls(padded)).to.be.eq(1)
    expect(await subscriber.values_uint(padded)).to.be.eq(loan)
  })
})
