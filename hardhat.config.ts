/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import "dotenv/config"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-ganache"

const INFURA_TOKEN = process.env.INFURA_TOKEN ? process.env.INFURA_TOKEN : ''
const pvStr = process.env.PV ? process.env.PV : ''

module.exports = {
  defaultNetwork: "ganache",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_TOKEN}`,
      accounts: [ pvStr ]
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_TOKEN}`,
      accounts: [ pvStr ]
    },
    ganache: {
      gasLimit: 10000000,
      defaultBalanceEther: 100,
      url: "http://localhost:8545",
      hardfork: "istanbul"
    }
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
    timeout: 20000
  }
};
