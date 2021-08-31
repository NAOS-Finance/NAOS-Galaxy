import { expect } from "chai"
import { ethers } from "hardhat"
import { Signer, Contract, BigNumber, utils } from "ethers"
import { zeroPadEnd, percentToBig, timeFly, now, ONE, MAX_UINT256, rdiv, rmul } from "./utils"
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

  const noOrder: Record<string,any> = {
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

  const defaultModel: Record<string,any> = {
    maxReserve: utils.parseEther("10000"),
    reserve: utils.parseEther("200"),
    maxSeniorRatio: percentToBig(85),
    minSeniorRatio: percentToBig(75),
    seniorDebt: utils.parseEther("700"),
    seniorBalance: utils.parseEther("100"),
    NAV: utils.parseEther("800"),
    seniorRedeemOrder: utils.parseEther("100"),
    seniorSupplyOrder: utils.parseEther("100"),
    juniorSupplyOrder: utils.parseEther("100"),
    juniorRedeemOrder: utils.parseEther("100")
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

  const calcNewSeniorRatio = (model: Record<string,any>, input: Record<string,any>) => {
    let currencyAvailable = model.reserve.add(input.seniorSupply).add(input.juniorSupply)
    let currencyOut = input.seniorRedeem.add(input.juniorRedeem)
    let seniorAsset = model.seniorBalance.add(model.seniorDebt).add(input.seniorSupply).sub(input.seniorRedeem)

    return rdiv(seniorAsset, model.NAV.add(currencyAvailable).sub(currencyOut))
  }

  const compareWithBest = async (model: Record<string,any>) => {
    const bestSubmission = await coordinator.bestSubmission()
    expect(bestSubmission.seniorRedeem).to.be.eq(model.seniorRedeem)
    expect(bestSubmission.juniorRedeem).to.be.eq(model.juniorRedeem)
    expect(bestSubmission.seniorSupply).to.be.eq(model.seniorSupply)
    expect(bestSubmission.juniorSupply).to.be.eq(model.juniorSupply)
  }

  const checkPoolPrecondition = async (model: Record<string,any>, currSeniorRatioInRange: boolean, reserveHealthy: boolean) => {
    // check if current ratio is healthy
    const currSeniorRatio = await coordinator.calcSeniorRatio(await coordinator.epochSeniorAsset(), await coordinator.epochNAV(), await coordinator.epochReserve())

    expect(await coordinator.checkRatioInRange({ value: currSeniorRatio }, { value: model.minSeniorRatio }, { value: model.maxSeniorRatio })).to.be.eq(currSeniorRatioInRange)
    expect(((await coordinator.epochReserve()).lte(await assessor.maxReserve()))).to.be.eq(reserveHealthy)
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

  describe("ExecuteEpoch", function () {
    const prepareExecute = async (model: Record<string,any>, input: Record<string,any>) => {
        await initTestConfig(model)
        await timeFly(1, true)
        expect(await coordinator.submissionPeriod()).to.be.eq(false)
        await coordinator.closeEpoch()
        expect(await coordinator.submissionPeriod()).to.be.eq(true)

        await seniorTranche.setEpochReturn(model.seniorSupplyOrder, model.seniorRedeemOrder)

        const result = await coordinator.callStatic.submitSolution(input.seniorRedeem, input.juniorRedeem, input.juniorSupply, input.seniorSupply)
        await coordinator.submitSolution(input.seniorRedeem, input.juniorRedeem, input.juniorSupply, input.seniorSupply)
        // new best solution
        expect(result).to.be.eq(await coordinator.SUCCESS())

        await timeFly(1)
    }

    const checkTrancheUpdates = async (model: Record<string,any>, input: Record<string,any>) => {
      let padded = zeroPadEnd(toUtf8Bytes("epochUpdate_supplyFulfillment"), 32)
      expect(await seniorTranche.values_uint(padded)).to.be.eq(rdiv(input.seniorSupply, model.seniorSupplyOrder))

      padded = zeroPadEnd(toUtf8Bytes("epochUpdate_redeemFulfillment"), 32)
      expect(await seniorTranche.values_uint(padded)).to.be.eq(rdiv(input.seniorRedeem, model.seniorRedeemOrder))

      padded = zeroPadEnd(toUtf8Bytes("epochUpdate_supplyFulfillment"), 32)
      expect(await juniorTranche.values_uint(padded)).to.be.eq(rdiv(input.juniorSupply, model.juniorSupplyOrder))

      padded = zeroPadEnd(toUtf8Bytes("epochUpdate_redeemFulfillment"), 32)
      expect(await juniorTranche.values_uint(padded)).to.be.eq(rdiv(input.juniorRedeem, model.juniorRedeemOrder))
    }

    beforeEach(async () => {
      let padded = zeroPadEnd(utils.toUtf8Bytes("currencyAvailable"), 32)
      await reserve["file(bytes32,uint256)"](padded, 1)
    })

    it("Should ExecuteEpoch", async () => {
      let m: Record<string,any> = defaultModel
      m.seniorSupplyOrder = utils.parseEther("300000")

        const input = {
          seniorSupply : utils.parseEther("1"),
          juniorSupply : utils.parseEther("2"),
          seniorRedeem : utils.parseEther("3"),
          juniorRedeem : utils.parseEther("4")
        }

        await prepareExecute(m, input)

        let lastEpochExecuted = await coordinator.lastEpochExecuted()
        await coordinator.executeEpoch()

        expect(await coordinator.lastEpochExecuted()).to.be.eq(lastEpochExecuted.add(1))
        expect(await coordinator.submissionPeriod()).to.be.eq(false)
        expect(await coordinator.minChallengePeriodEnd()).to.be.eq(0)
        expect(await coordinator.bestSubScore()).to.be.eq(0)
        await checkTrancheUpdates(m, input)

        // check for rebalancing
        let shouldNewReserve = m.reserve.add(input.seniorSupply).add(input.juniorSupply).sub(input.seniorRedeem.add(input.juniorRedeem))
        let seniorAsset = await coordinator.calcSeniorAssetValue(input.seniorRedeem, input.seniorSupply, m.seniorDebt.add(m.seniorBalance), shouldNewReserve, m.NAV)

        // change or orders delta = -2 ether
        let shouldSeniorAsset = m.seniorDebt.add(m.seniorBalance).sub(utils.parseEther("2"))

        expect(seniorAsset).to.be.eq(shouldSeniorAsset)

        let shouldRatio = rdiv(seniorAsset, shouldNewReserve.add(m.NAV))

        let currSeniorRatio = await coordinator.calcSeniorRatio(shouldSeniorAsset, m.NAV, shouldNewReserve)

        expect(currSeniorRatio).to.be.eq(shouldRatio)

        let padded = zeroPadEnd(utils.toUtf8Bytes("currency_available"), 32)
        expect(await reserve.values_uint(padded)).to.be.eq(shouldNewReserve)
    })

    it("Should CalcSeniorRatio", async () => {
      const seniorDebt = utils.parseEther("300")
      const seniorBalance = utils.parseEther("200")
      const NAV = utils.parseEther("1000")
      const reserve = utils.parseEther("1000")

      expect(await coordinator.calcAssets(NAV, reserve)).to.be.eq(utils.parseEther("2000"))
      // ratio 25%
      expect(await coordinator.calcSeniorRatio(seniorDebt.add(seniorBalance), NAV, reserve)).to.be.eq(percentToBig(25))
      expect(await coordinator.calcSeniorRatio(0, 0, 0)).to.be.eq(0)
    })

    it("Should CalcSeniorState", async () => {
      let model: Record<string,any> = defaultModel
      await initTestConfig(model)

      await timeFly(1, true)
      await coordinator.closeEpoch()
      let currSeniorAsset = BigNumber.from(0)
      let seniorRedeem = BigNumber.from(0)
      let seniorSupply = BigNumber.from(0)
      let seniorAsset = await coordinator.calcSeniorAssetValue(seniorRedeem, seniorSupply, currSeniorAsset, model.reserve, model.NAV)
      expect(seniorAsset).to.be.eq(0)

      currSeniorAsset = utils.parseEther("200")
      seniorRedeem = utils.parseEther("20")
      seniorSupply = utils.parseEther("30")

      let newReserve = await coordinator.calcNewReserve(seniorRedeem, 0, seniorSupply, 0)

      seniorAsset = await coordinator.calcSeniorAssetValue(seniorRedeem, seniorSupply, currSeniorAsset, newReserve, model.NAV)
      expect(seniorAsset).to.be.eq(utils.parseEther("210"))

      // currSeniorAsset = utils.parseEther("200")
      seniorRedeem = utils.parseEther("30")
      seniorSupply = utils.parseEther("20")

      newReserve = await coordinator.calcNewReserve(seniorRedeem, 0, seniorSupply, 0)

      seniorAsset = await coordinator.calcSeniorAssetValue(seniorRedeem, seniorSupply, currSeniorAsset, newReserve, model.NAV)
      expect(seniorAsset).to.be.eq(utils.parseEther("190"))

      seniorRedeem = utils.parseEther("120")
      seniorSupply = utils.parseEther("10")

      newReserve = await coordinator.calcNewReserve(seniorRedeem, 0, seniorSupply, 0)

      seniorAsset = await coordinator.calcSeniorAssetValue(seniorRedeem, seniorSupply, currSeniorAsset, newReserve, model.NAV)
      expect(seniorAsset).to.be.eq(utils.parseEther("90"))
    })
  })

  describe("ImprovementScore", function () {
    it("Should ScoreRatioImprovement", async () => {
      const model = defaultModel
      await initTestConfig(model)

      let newSeniorRatio = percentToBig(92)

      let score = await coordinator.scoreRatioImprovement({ value: newSeniorRatio })

      newSeniorRatio = percentToBig(91)
      let betterScore = await coordinator.scoreRatioImprovement({ value: newSeniorRatio })

      expect(betterScore).to.be.gt(score)

      // healthy
      newSeniorRatio = percentToBig(83)
      let healthyRatio = percentToBig(81)
      let healthyScore1 = await coordinator.scoreRatioImprovement({ value: newSeniorRatio })
      let healthyScore2 = await coordinator.scoreRatioImprovement({ value: healthyRatio })
      expect(healthyScore1).to.be.eq(healthyScore2)
    })

    it("Should ReserveImprovement", async () => {
      const model = defaultModel
      model.maxReserve = utils.parseEther("1000")
      await initTestConfig(model)

      let score = await coordinator.scoreReserveImprovement(utils.parseEther("1200"))
      let betterScore = await coordinator.scoreReserveImprovement(utils.parseEther("1100"))

      expect(betterScore).to.be.gt(score)

      let healthyScore1 = await coordinator.scoreReserveImprovement(utils.parseEther("1000"))
      let healthyScore2 = await coordinator.scoreReserveImprovement(utils.parseEther("900"))
      expect(healthyScore1).to.be.eq(healthyScore2)
    })

    it("Should ScoreImprovementRatio", async () => {
      const model = defaultModel
      model.seniorRedeemOrder = utils.parseEther("1000")
      model.maxReserve = utils.parseEther("1000")

      // sets ratio to 0.9230
      model.seniorBalance = utils.parseEther("500")
      model.reserve = utils.parseEther("500")
      await initTestConfig(model)
      await timeFly(1, true)
      await coordinator.closeEpoch()

      let seniorAsset = await coordinator.calcSeniorAssetValue(0, 0, model.seniorDebt.add(model.seniorBalance), model.reserve, model.NAV)
      let currRatio = await coordinator.calcSeniorRatio(seniorAsset, model.reserve, model.NAV)
      expect(currRatio).to.be.gt(model.maxSeniorRatio)

      let solution = {
        seniorRedeem : utils.parseEther("0"),
        juniorSupply : utils.parseEther("0"),
        seniorSupply : utils.parseEther("20"),
        juniorRedeem : utils.parseEther("0")
      }
      let newRatio = calcNewSeniorRatio(model, solution)
      expect(newRatio).to.be.gt(currRatio)

      let res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      expect(res).to.be.eq(await coordinator.ERR_NOT_NEW_BEST())
      expect(await coordinator.gotFullValidSolution()).to.be.eq(false)
      expect(await coordinator.bestSubScore()).to.be.eq(0)

      solution = {
        seniorRedeem : utils.parseEther("20"),
        juniorSupply : utils.parseEther("0"),
        seniorSupply : utils.parseEther("0"),
        juniorRedeem : utils.parseEther("0")
      }
      newRatio = calcNewSeniorRatio(model, solution)
      expect(newRatio).to.be.gt(model.maxSeniorRatio)

      res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      expect(res).to.be.eq(await coordinator.NEW_BEST())
      expect(await coordinator.gotFullValidSolution()).to.be.eq(false)
      expect(await coordinator.bestSubScore()).to.be.eq(0)

      solution = {
        seniorRedeem : utils.parseEther("80"),
        juniorSupply : utils.parseEther("0"),
        seniorSupply : utils.parseEther("0"),
        juniorRedeem : utils.parseEther("0")
      }
      newRatio = calcNewSeniorRatio(model, solution)
      expect(newRatio).to.be.gt(model.maxSeniorRatio)

      res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      expect(res).to.be.eq(await coordinator.NEW_BEST())
      expect(await coordinator.gotFullValidSolution()).to.be.eq(false)
      expect(await coordinator.bestSubScore()).to.be.eq(0)

      solution = {
        seniorRedeem : utils.parseEther("500"),
        juniorSupply : utils.parseEther("100"),
        seniorSupply : utils.parseEther("0"),
        juniorRedeem : utils.parseEther("0")
      }
      newRatio = calcNewSeniorRatio(model, solution)
      expect(newRatio).to.be.lte(currRatio)

      res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      expect(res).to.be.eq(await coordinator.NEW_BEST())
      expect(await coordinator.gotFullValidSolution()).to.be.eq(true)
      expect(await coordinator.bestSubScore()).not.be.eq(0)
    })

    // it("Should ScoreImprovementMaxReserve", async () => {
    //   const model = defaultModel
    //   model.maxReserve = utils.parseEther("200")
    //   model.reserve = utils.parseEther("210")
    //   model.seniorSupplyOrder = utils.parseEther("300")
    //   model.juniorRedeemOrder = utils.parseEther("300")
    //   await initTestConfig(model)
    //   await timeFly(1, true)
    //   await coordinator.closeEpoch()

    //   let seniorAsset = await coordinator.calcSeniorAssetValue(0, 0, model.seniorDebt.add(model.seniorBalance), model.reserve, model.NAV)
    //   let currRatio = await coordinator.calcSeniorRatio(seniorAsset, model.NAV, model.reserve)
    //   expect(currRatio).to.be.lte(model.maxSeniorRatio)
    //   expect(currRatio).to.be.gte(model.minSeniorRatio)

    //   let solution = {
    //     seniorRedeem : utils.parseEther("0"),
    //     juniorSupply : utils.parseEther("0"),
    //     seniorSupply : utils.parseEther("10"),
    //     juniorRedeem : utils.parseEther("0")
    //   }

    //   let res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.ERR_NOT_NEW_BEST())
    //   expect(await coordinator.gotFullValidSolution()).to.be.eq(false)

    //   solution = {
    //     seniorRedeem : utils.parseEther("0"),
    //     juniorSupply : utils.parseEther("0"),
    //     seniorSupply : utils.parseEther("0"),
    //     juniorRedeem : utils.parseEther("5")
    //   }

    //   res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.NEW_BEST())
    //   expect(await coordinator.gotFullValidSolution()).to.be.eq(false)

    //   solution = {
    //     seniorRedeem : utils.parseEther("0"),
    //     juniorSupply : utils.parseEther("0"),
    //     seniorSupply : utils.parseEther("270"),
    //     juniorRedeem : utils.parseEther("300")
    //   }
    //   let newRatio = calcNewSeniorRatio(model, solution)
    //   expect(newRatio).to.be.gt(model.maxSeniorRatio)

    //   res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.ERR_NOT_NEW_BEST())
    //   expect(await coordinator.gotFullValidSolution()).to.be.eq(false)

    //   solution = {
    //     seniorRedeem : utils.parseEther("0"),
    //     juniorSupply : utils.parseEther("0"),
    //     seniorSupply : utils.parseEther("0"),
    //     juniorRedeem : utils.parseEther("3")
    //   }

    //   res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.NEW_BEST())
    //   expect(await coordinator.gotFullValidSolution()).to.be.eq(true)
    // })
  })

  describe("SubmitEpoch", function () {
    it("Should MaxImprovementScore", async () => {
      const maxOrder = BigNumber.from(10).pow(36)
      const score = await coordinator.scoreSolution(maxOrder, maxOrder, maxOrder, maxOrder)
      expect(score).to.be.lte(MAX_UINT256)
      let maxDistancePoints = rmul(await coordinator.IMPROVEMENT_WEIGHT(), rdiv(ONE, BigNumber.from(1)))
      expect(await coordinator.BIG_NUMBER()).to.be.gt(maxDistancePoints)
      // maxDistancePoints = rmul(await coordinator.IMPROVEMENT_WEIGHT(), rdiv(ONE, BigNumber.from(1)))
      // expect(await coordinator.BIG_NUMBER()).to.be.gt(maxDistancePoints)
    })

    it("Should FailNoSubmission", async () => {
      await expect(
        coordinator.submitSolution(utils.parseEther("10"), utils.parseEther("10"), utils.parseEther("10"), utils.parseEther("10"))
      ).to.be.revertedWith("")
    })

    it("Should FailNoSubmissionLongTime", async () => {
      await timeFly(10, true)
      await expect(
        coordinator.submitSolution(utils.parseEther("10"), utils.parseEther("10"), utils.parseEther("10"), utils.parseEther("10"))
      ).to.be.revertedWith("")
    })

    it("Should FailNoSubmissionRequired", async () => {
      let model = defaultModel
      await initTestConfig(model)
      await timeFly(1, true)
      await coordinator.closeEpoch()
      await coordinator.submitSolution(utils.parseEther("10"), utils.parseEther("10"), utils.parseEther("10"), utils.parseEther("10"))
    })

    // it("Should SubmitSolution", async () => {
    //   const model = defaultModel
    //   model.seniorSupplyOrder = utils.parseEther("10000")
    //   await initTestConfig(model)
    //   await timeFly(1, true)
    //   await coordinator.closeEpoch()

    //   let solution = {
    //     seniorSupply : utils.parseEther("1"),
    //     juniorSupply : utils.parseEther("2"),
    //     seniorRedeem : utils.parseEther("3"),
    //     juniorRedeem : utils.parseEther("4")
    //   }

    //   let res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.ERR_NOT_NEW_BEST())
    //   await compareWithBest(solution)

    //   let challengeEnd = (await now()) + 3600
    //   expect(await coordinator.minChallengePeriodEnd()).to.be.eq(challengeEnd)
    //   await timeFly(1/12, true)

    //   let betterSolution = {
    //     seniorSupply : utils.parseEther("2"),
    //     juniorSupply : utils.parseEther("3"),
    //     seniorRedeem : utils.parseEther("4"),
    //     juniorRedeem : utils.parseEther("5")
    //   }

    //   res = await coordinator.callStatic.submitSolution(betterSolution.seniorRedeem, betterSolution.juniorRedeem, betterSolution.juniorSupply, betterSolution.seniorSupply)
    //   await coordinator.submitSolution(betterSolution.seniorRedeem, betterSolution.juniorRedeem, betterSolution.juniorSupply, betterSolution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.SUCCESS())
    //   await compareWithBest(betterSolution)

    //   expect(await coordinator.minChallengePeriodEnd()).to.be.eq(challengeEnd)
    //   await timeFly(1/12, true)

    //   res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.ERR_NOT_NEW_BEST())

    //   solution.seniorSupply = utils.parseEther("2")
    //   res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.ERR_NOT_NEW_BEST())

    //   solution.seniorSupply = utils.parseEther("100000000")
    //   res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.ERR_MAX_ORDER())
    // })

    it("Should SubmitEpochUnhealthyState", async () => {
      const model = defaultModel
      model.seniorSupplyOrder = utils.parseEther("10000")
      model.maxReserve = utils.parseEther("1000")
      model.reserve = utils.parseEther("1150")
      model.seniorBalance = utils.parseEther("850")
      await initTestConfig(model)
      await timeFly(1, true)
      await coordinator.closeEpoch()

      let currSeniorRatioInRange = true
      let reserveHealthy = false
      await checkPoolPrecondition(model, currSeniorRatioInRange, reserveHealthy)

      let solution = {
        seniorSupply : utils.parseEther("0"),
        juniorSupply : utils.parseEther("0"),
        seniorRedeem : utils.parseEther("100"),
        juniorRedeem : utils.parseEther("100")
      }

      let res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      expect(res).to.be.eq(await coordinator.SUCCESS())
      expect(await coordinator.gotFullValidSolution()).to.be.eq(true)
    })

    // it("Should SubmitImprovement", async () => {
    //   const model = defaultModel
    //   model.seniorSupplyOrder = utils.parseEther("10000")
    //   model.juniorRedeemOrder = utils.parseEther("10000")
    //   model.maxReserve = utils.parseEther("1000")
    //   model.reserve = utils.parseEther("1150")
    //   await initTestConfig(model)
    //   await timeFly(1, false)
    //   await coordinator.closeEpoch()

    //   let currSeniorRatioInRange = false
    //   let reserveHealthy = false
    //   await checkPoolPrecondition(model, currSeniorRatioInRange, reserveHealthy)

    //   let solution = {
    //     seniorSupply : utils.parseEther("800"),
    //     juniorSupply : utils.parseEther("0"),
    //     seniorRedeem : utils.parseEther("0"),
    //     juniorRedeem : utils.parseEther("0")
    //   }

    //   let res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.SUCCESS())
    //   expect(await coordinator.gotFullValidSolution()).to.be.eq(false)

    //   solution = {
    //     seniorSupply : utils.parseEther("800"),
    //     juniorSupply : utils.parseEther("0"),
    //     seniorRedeem : utils.parseEther("0"),
    //     juniorRedeem : utils.parseEther("500")
    //   }

    //   res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.SUCCESS())
    //   expect(await coordinator.gotFullValidSolution()).to.be.eq(false)

    //   solution = {
    //     seniorSupply : utils.parseEther("300"),
    //     juniorSupply : utils.parseEther("0"),
    //     seniorRedeem : utils.parseEther("0"),
    //     juniorRedeem : utils.parseEther("1000")
    //   }

    //   res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.SUCCESS())
    //   expect(await coordinator.gotFullValidSolution()).to.be.eq(false)

    //   solution = {
    //     seniorSupply : utils.parseEther("0"),
    //     juniorSupply : utils.parseEther("0"),
    //     seniorRedeem : utils.parseEther("0"),
    //     juniorRedeem : utils.parseEther("950")
    //   }

    //   res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.SUCCESS())
    //   expect(await coordinator.gotFullValidSolution()).to.be.eq(true)

    //   solution = {
    //     seniorSupply : utils.parseEther("300"),
    //     juniorSupply : utils.parseEther("0"),
    //     seniorRedeem : utils.parseEther("0"),
    //     juniorRedeem : utils.parseEther("1000")
    //   }

    //   res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.ERR_NOT_NEW_BEST())
    //   expect(await coordinator.gotFullValidSolution()).to.be.eq(true)

    //   solution = {
    //     seniorSupply : utils.parseEther("250"),
    //     juniorSupply : utils.parseEther("0"),
    //     seniorRedeem : utils.parseEther("50"),
    //     juniorRedeem : utils.parseEther("950")
    //   }

    //   res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
    //   expect(res).to.be.eq(await coordinator.SUCCESS())
    //   expect(await coordinator.gotFullValidSolution()).to.be.eq(true)
    // })

    it("Should NoImprovementPossibleReserveViolated", async () => {
      const model = defaultModel
      model.seniorRedeemOrder = 0
      model.juniorRedeemOrder = 0
      model.maxReserve = utils.parseEther("200")
      model.reserve = utils.parseEther("210")
      await initTestConfig(model)
      await timeFly(1, false)
      await coordinator.closeEpoch()

      // let currSeniorRatioInRange = true
      // let reserveHealthy = false
      // await checkPoolPrecondition(model, currSeniorRatioInRange, reserveHealthy)

      let solution = {
        seniorSupply : utils.parseEther("0"),
        juniorSupply : utils.parseEther("0"),
        seniorRedeem : utils.parseEther("0"),
        juniorRedeem : utils.parseEther("0")
      }
      expect(await coordinator.minChallengePeriodEnd()).to.be.eq(0)

      let res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      expect(res).to.be.eq(await coordinator.NEW_BEST())
      expect(await coordinator.minChallengePeriodEnd()).to.be.gt(0)

      solution = {
        seniorSupply : utils.parseEther("1"),
        juniorSupply : utils.parseEther("0"),
        seniorRedeem : utils.parseEther("0"),
        juniorRedeem : utils.parseEther("0")
      }

      res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      expect(res).to.be.eq(await coordinator.ERR_NOT_NEW_BEST())
    })

    it("Should NoImprovementPossibleRatioViolated", async () => {
      const model = defaultModel
      model.seniorRedeemOrder = 0
      model.juniorRedeemOrder = 0
      model.maxReserve = utils.parseEther("10000")
      model.reserve = utils.parseEther("1000")
      await initTestConfig(model)
      await timeFly(1, false)
      await coordinator.closeEpoch()

      let currSeniorRatioInRange = false
      let reserveHealthy = true
      await checkPoolPrecondition(model, currSeniorRatioInRange, reserveHealthy)

      let solution = {
        seniorSupply : utils.parseEther("0"),
        juniorSupply : utils.parseEther("0"),
        seniorRedeem : utils.parseEther("0"),
        juniorRedeem : utils.parseEther("0")
      }
      expect(await coordinator.minChallengePeriodEnd()).to.be.eq(0)

      let res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      expect(res).to.be.eq(await coordinator.NEW_BEST())
      expect(await coordinator.minChallengePeriodEnd()).to.be.gt(0)

      solution = {
        seniorSupply : utils.parseEther("0"),
        juniorSupply : utils.parseEther("1"),
        seniorRedeem : utils.parseEther("0"),
        juniorRedeem : utils.parseEther("0")
      }

      res = await coordinator.callStatic.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      await coordinator.submitSolution(solution.seniorRedeem, solution.juniorRedeem, solution.juniorSupply, solution.seniorSupply)
      expect(res).to.be.eq(await coordinator.NEW_BEST())
    })
  })
})