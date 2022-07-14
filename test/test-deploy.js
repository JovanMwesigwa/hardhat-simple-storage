const { assert } = require('chai')
const { ethers } = require('hardhat')

describe('SimpleStorage', function () {
  let simpleStorageFactory, simpleStorage

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it('Should return a favourite number of 0', async function () {
    const current = await simpleStorage.retrieve()
    const expected = '0'

    assert.equal(current.toString(), expected)
  })

  it('Should update the favourite number to 10', async function () {
    const newNumber = '0'
    const tx = await simpleStorage.store(newNumber)
    await tx.wait(1)

    const currentNum = await simpleStorage.retrieve()
    assert.equal(currentNum.toString(), newNumber)
  })
})
