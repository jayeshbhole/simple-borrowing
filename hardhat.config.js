require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");
require("solidity-coverage");

require("hardhat-deploy");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.7",
  networks: {
    localhost: {
      allowUnlimitedContractSize: true,
      url: "http://localhost:8545",
      accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY2],
      saveDeployments: true,
    },
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
      forking: {
        enabled: true,
        url: process.env.MUMBAI_URL,
        blockNumber: 27004544,
      },
      mining: {
        auto: true,
        interval: 0,
      },
      accounts: [
        {
          privateKey: process.env.PRIVATE_KEY,
          balance: "10000000000000000000000000000000000000000000000000",
        },
        {
          privateKey: process.env.PRIVATE_KEY2,
          balance: "1000000000000000000000",
        },
      ],
    },
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      verify: {
        etherscan: {
          apiKey: process.env.ETHERSCAN_API_KEY,
        },
      },
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      verify: {
        etherscan: {
          apiKey: process.env.ETHERSCAN_API_KEY,
        },
      },
    },
    mumbai: {
      url: process.env.MUMBAI_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      verify: {
        etherscan: {
          apiKey: process.env.POLYSCAN_API_KEY,
        },
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      polygonMumbai: process.env.POLYSCAN_API_KEY,
      polygon: process.env.POLYSCAN_API_KEY,
    },
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
};
