/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers")
require('dotenv').config()

const infuraToken = process.env.INFURA_TOKEN
const pvStr = process.env.PV

module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraToken}`,
      accounts: [ pvStr ]
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${infuraToken}`,
      accounts: [ pvStr ]
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
