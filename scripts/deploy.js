const { ethers, run, network } = require('hardhat')
require('dotenv').config()

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying contract.......')
  const simpleStorage = await simpleStorageFactory.deploy()
  await simpleStorage.deployed()

  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log('Initiating etherscan verification.....')
    await simpleStorage.deployTransaction.wait(1)
    await verify(simpleStorage.address, [])
  }

  console.log(`Deployed at: ${simpleStorage.address}`)
}

async function verify(contractAddress, args) {
  try {
    console.log('Verfying on etherscan')
    await run('verify:verify', {
      address: contractAddress,
      arguments: args,
    })
  } catch (error) {
    if (error.message.includes('already verified')) {
      console.log('Contract was already verified')
    } else {
      console.log(error)
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
