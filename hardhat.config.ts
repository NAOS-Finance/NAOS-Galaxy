/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import "dotenv/config"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-ganache"

const infuraToken = process.env.INFURA_TOKEN
const pvStr = process.env.PV

module.exports = {
  defaultNetwork: "ganache",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraToken}`,
      accounts: [ pvStr ]
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${infuraToken}`,
      accounts: [ pvStr ]
    },
    ganache: {
      gasLimit: 10000000,
      defaultBalanceEther: 100,
      url: "http://localhost:8545",
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
