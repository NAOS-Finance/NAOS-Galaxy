/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import "dotenv/config"
import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ganache"
import "@nomiclabs/hardhat-etherscan"

const INFURA_TOKEN = process.env.INFURA_TOKEN ? process.env.INFURA_TOKEN : ''
const accounts = process.env.PVS ? process.env.PVS.split(',') : []
const ETHERSCAN_TOKEN = process.env.ETHERSCAN_TOKEN ? process.env.ETHERSCAN_TOKEN : ''

module.exports = {
  defaultNetwork: "ganache",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_TOKEN}`,
      accounts
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_TOKEN}`,
      accounts
    },
    ganache: {
      gasLimit: 10000000,
      defaultBalanceEther: 100,
      url: "http://localhost:8545",
      hardfork: "istanbul"
    }
  },
  typechain: {
    outDir: './types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false,
    // externalArtifacts: [],
  },
  etherscan: {
    apiKey: ETHERSCAN_TOKEN
  },
  solidity: {
    version: "0.5.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: './src',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  },
  mocha: {
    timeout: 200000
  }
};
