import { expect } from "chai"
import { ethers } from "hardhat"
import { Contract, utils } from "ethers"

describe("BucketList", function () {
  let buckets: Contract

  beforeEach(async () => {
    buckets = await (await ethers.getContractFactory("BucketList")).deploy()
  })

  const addBuckets = async () => {
    expect(await buckets.firstBucket()).to.be.eq(0)
    expect(await buckets.lastBucket()).to.be.eq(0)

    const amount = utils.parseEther('100')
    const now = Math.floor((new Date()).getTime() / 1000)

    await buckets.add(now + 86400 * 5, amount)
    expect(await buckets.calcSum()).to.be.eq(utils.parseEther('100'))
    expect(await buckets.firstBucket()).to.be.eq(await buckets.uniqueDayTimestamp(now +  86400 * 5))
    expect(await buckets.lastBucket()).to.be.eq(await buckets.uniqueDayTimestamp(now +  86400 * 5))

    await buckets.add(now + 86400 * 10, amount)
    expect(await buckets.calcSum()).to.be.eq(utils.parseEther('200'))
    expect(await buckets.firstBucket()).to.be.eq(await buckets.uniqueDayTimestamp(now +  86400 * 5))
    expect(await buckets.lastBucket()).to.be.eq(await buckets.uniqueDayTimestamp(now +  86400 * 10))

    await buckets.add(now + 86400 * 3, amount)
    expect(await buckets.calcSum()).to.be.eq(utils.parseEther('300'))
    expect(await buckets.firstBucket()).to.be.eq(await buckets.uniqueDayTimestamp(now +  86400 * 3))
    expect(await buckets.lastBucket()).to.be.eq(await buckets.uniqueDayTimestamp(now +  86400 * 10))
    return now
  }

  it('Should addBuckets', async () => {
    await addBuckets()
  })

  it('Should RemoveMiddleBucket', async () => {
    const now = await addBuckets()

    await buckets.remove(now + 86400 * 5)
    expect(await buckets.calcSum()).to.be.eq(utils.parseEther('200'))
    expect(await buckets.firstBucket()).to.be.eq(await buckets.uniqueDayTimestamp(now +  86400 * 3))
    expect(await buckets.lastBucket()).to.be.eq(await buckets.uniqueDayTimestamp(now +  86400 * 10))
  })

  it('Should RemoveLastBucket', async () => {
    const now = await addBuckets()

    await buckets.remove(now + 86400 * 10)
    expect(await buckets.calcSum()).to.be.eq(utils.parseEther('200'))
    expect(await buckets.firstBucket()).to.be.eq(await buckets.uniqueDayTimestamp(now +  86400 * 3))
    expect(await buckets.lastBucket()).to.be.eq(await buckets.uniqueDayTimestamp(now +  86400 * 5))
  })

  it('Should RemoveFirstBucket', async () => {
    const now = await addBuckets()

    await buckets.remove(now + 86400 * 3)
    expect(await buckets.calcSum()).to.be.eq(utils.parseEther('200'))
    expect(await buckets.firstBucket()).to.be.eq(await buckets.uniqueDayTimestamp(now +  86400 * 5))
    expect(await buckets.lastBucket()).to.be.eq(await buckets.uniqueDayTimestamp(now +  86400 * 10))
  })

  it('Should RemoveAllBucket', async () => {
    const now = await addBuckets()

    await buckets.remove(now + 86400 * 3)
    await buckets.remove(now + 86400 * 5)
    expect(await buckets.calcSum()).to.be.eq(utils.parseEther('100'))
    expect(await buckets.firstBucket()).to.be.eq(await buckets.uniqueDayTimestamp(now +  86400 * 10))
    expect(await buckets.lastBucket()).to.be.eq(await buckets.uniqueDayTimestamp(now +  86400 * 10))

    await buckets.remove(now + 86400 * 10)
    expect(await buckets.calcSum()).to.be.eq(0)
    expect(await buckets.firstBucket()).to.be.eq(0)
    expect(await buckets.lastBucket()).to.be.eq(0)

    await buckets.add(now + 86400 * 21, utils.parseEther('3'))
    await buckets.add(now + 86400 * 22, utils.parseEther('3'))
    expect(await buckets.calcSum()).to.be.eq(utils.parseEther('6'))
  })
})
