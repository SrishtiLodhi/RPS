require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",

  networks: {
    sepolia: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY1, process.env.PRIVATE_KEY2]
    },
  },


  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },

  sourcify: {
    enabled: true
  }
};
