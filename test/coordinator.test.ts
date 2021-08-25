import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { zeroPadEnd, percentToBig, timeFly, now, ONE } from "./utils"
import { NAVFeedMock } from '../types/NAVFeedMock'
import { TrancheMock } from '../types/TrancheMock'
import { AssessorMock } from '../types/AssessorMock'
import { ReserveMock } from '../types/ReserveMock'
import { EpochCoordinator } from '../types/EpochCoordinator'
import { toUtf8Bytes } from "ethers/lib/utils"

describe("Coordinator", function () {

  let accounts: Signer[]
  let assessor: Contract
  let seniorTranche: Contract
  let juniorTranche: Contract
  let coordinator: Contract
  let reserve: Contract

  const noOrder = {
    maxReserve: utils.parseEther("10000"),
    reserve: utils.parseEther("200"),
    maxSeniorRatio: percentToBig(80),
    minSeniorRatio: percentToBig(75),
    seniorDebt: utils.parseEther("700"),
    seniorBalance: utils.parseEther("100"),
    NAV: utils.parseEther("800"),
    seniorRedeemOrder: 0,
    seniorSupplyOrder: 0,
    juniorSupplyOrder: 0,
    juniorRedeemOrder: 0
  }

  const initTestConfig = async (model: Record<string,any>) => {
    let padded = zeroPadEnd(utils.toUtf8Bytes("maxReserve"), 32)
    await assessor["setReturn(bytes32,uint256)"](padded, model.maxReserve)
    
    padded = zeroPadEnd(utils.toUtf8Bytes("calcJuniorTokenPrice"), 32)
    await assessor["setReturn(bytes32,uint256)"](padded, ONE)

    padded = zeroPadEnd(utils.toUtf8Bytes("calcSeniorTokenPrice"), 32)
    await assessor["setReturn(bytes32,uint256)"](padded, ONE)
    
    padded = zeroPadEnd(utils.toUtf8Bytes("calcUpdateNAV"), 32)
    await assessor["setReturn(bytes32,uint256)"](padded, model.NAV)

    padded = zeroPadEnd(utils.toUtf8Bytes("balance"), 32)
    await reserve["setReturn(bytes32,uint256)"](padded, model.reserve)

    padded = zeroPadEnd(utils.toUtf8Bytes("seniorDebt"), 32)
    await assessor["setReturn(bytes32,uint256)"](padded, model.seniorDebt)

    padded = zeroPadEnd(utils.toUtf8Bytes("seniorBalance"), 32)
    await assessor["setReturn(bytes32,uint256)"](padded, model.seniorBalance)

    padded = zeroPadEnd(utils.toUtf8Bytes("minSeniorRatio"), 32)
    await assessor["setReturn(bytes32,uint256)"](padded, model.minSeniorRatio)

    padded = zeroPadEnd(utils.toUtf8Bytes("maxSeniorRatio"), 32)
    await assessor["setReturn(bytes32,uint256)"](padded, model.maxSeniorRatio)

    await juniorTranche["setEpochReturn(uint256,uint256)"](model.juniorSupplyOrder, model.juniorRedeemOrder)
    await seniorTranche["setEpochReturn(uint256,uint256)"](model.seniorSupplyOrder, model.seniorRedeemOrder)
  }

  const calcNextEpochIn = async () => {
    return 86400 - (await now() - (await coordinator.lastEpochClosed()).toNumber())
  }

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    seniorTranche = await (await ethers.getContractFactory("TrancheMock")).deploy() as TrancheMock
    juniorTranche = await (await ethers.getContractFactory("TrancheMock")).deploy() as TrancheMock
    assessor = await (await ethers.getContractFactory("AssessorMock")).deploy() as AssessorMock
    reserve = await (await ethers.getContractFactory("ReserveMock")).deploy("0".padStart(40, "0")) as ReserveMock

    coordinator = await (await ethers.getContractFactory("EpochCoordinator")).deploy(3600) as EpochCoordinator
    
    let padded = zeroPadEnd(utils.toUtf8Bytes("juniorTranche"), 32)
    await coordinator.depend(padded, juniorTranche.address)

    padded = zeroPadEnd(utils.toUtf8Bytes("seniorTranche"), 32)
    await coordinator.depend(padded, seniorTranche.address)

    padded = zeroPadEnd(utils.toUtf8Bytes("reserve"), 32)
    await coordinator.depend(padded, reserve.address)

    padded = zeroPadEnd(utils.toUtf8Bytes("assessor"), 32)
    await coordinator.depend(padded, assessor.address)

    await reserve.rely(coordinator.address)
    await initTestConfig(noOrder)
  })

  describe("CloseEpoch", function () {
    beforeEach(async () => {
      let padded = zeroPadEnd(utils.toUtf8Bytes("currencyAvailable"), 32)
      await reserve["file(bytes32,uint256)"](padded, 1)
    })

    it("Should MinimumEpochTime", async () => {
      expect(await coordinator.lastEpochExecuted()).to.be.eq(0)
      expect(await coordinator.currentEpoch()).to.be.eq(1)
      await timeFly(1, true)
      // close and execute because no submissions
      await coordinator.closeEpoch()
      expect(await coordinator.lastEpochExecuted()).to.be.eq(1)
      expect(await coordinator.currentEpoch()).to.be.eq(2)
    })

    it("Should FailCloseEpochTooEarly", async () => {
      await timeFly(25/86400, true)
      let secsForNextDay = await calcNextEpochIn()
      expect(await coordinator.lastEpochExecuted()).to.be.eq(0)
      expect(await coordinator.currentEpoch()).to.be.eq(1)

      await timeFly((secsForNextDay-1)/86400, true)
      await expect(
        coordinator.closeEpoch()
      ).to.be.revertedWith("")
    })

    it("Should CloseEpochEdgeCase", async () => {
      let secsForNextDay = await calcNextEpochIn()
      expect(await coordinator.currentEpoch()).to.be.eq(1)
      await timeFly(secsForNextDay/86400, true)

      await coordinator.closeEpoch()
      expect(await coordinator.currentEpoch()).to.be.eq(2)
    })

    it("Should CloseEpochAfterLongerTime", async () => {
      expect(await coordinator.currentEpoch()).to.be.eq(1)
      await timeFly(300, true)

      await coordinator.closeEpoch()
      expect(await coordinator.lastEpochExecuted()).to.be.eq(1)
      expect(await coordinator.currentEpoch()).to.be.eq(2)
    })

    it("Should CloseEpochTime", async () => {
      expect(await coordinator.lastEpochExecuted()).to.be.eq(0)
      expect(await coordinator.currentEpoch()).to.be.eq(1)
      await timeFly(1, true)

      expect(await coordinator.currentEpoch()).to.be.eq(1)

      await coordinator.closeEpoch()
      expect(await coordinator.lastEpochExecuted()).to.be.eq(1)

      await timeFly(20, true)
      expect(await coordinator.currentEpoch()).to.be.eq(2)

      for (let i=1; i<=10; i++) {
        await coordinator.closeEpoch()
        await timeFly(i, true)
        expect(await coordinator.currentEpoch()).to.be.eq(i+2)
      }
    })

    it("Should CloseEpochNoSubmission", async () => {
      expect(await coordinator.lastEpochExecuted()).to.be.eq(0)
      expect(await coordinator.currentEpoch()).to.be.eq(1)
      await timeFly(1, true)

      expect(await coordinator.currentEpoch()).to.be.eq(1)

      await coordinator.closeEpoch()
      expect(await coordinator.lastEpochExecuted()).to.be.eq(1)
      expect(await coordinator.submissionPeriod()).to.be.eq(false)
    })

    it("Should CloseEpochSubmissionPeriod", async () => {
      await juniorTranche.setEpochReturn(utils.parseEther("1000000000000"), 0)
      expect(await coordinator.lastEpochExecuted()).to.be.eq(0)
      expect(await coordinator.currentEpoch()).to.be.eq(1)
      await timeFly(1, true)

      await coordinator.closeEpoch()
      expect(await coordinator.lastEpochExecuted()).to.be.eq(0)
      expect(await coordinator.submissionPeriod()).to.be.eq(true)

      let padded = zeroPadEnd(utils.toUtf8Bytes("currency_available"), 32)
      expect(await reserve.values_uint(padded)).to.be.eq(0)
    })
  })
})