
require("@nomicfoundation/hardhat-foundry");

import * as dotenv from 'dotenv';

import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

dotenv.config();

const {
  PRIVATE_KEY_TEST_0,
  PRIVATE_KEY_TEST_1,
  PRIVATE_KEY_TEST_2,
  PRIVATE_KEY_TEST_3,
  PRIVATE_KEY_TEST_4,
  PRIVATE_KEY, SCAN_KEY,
  MUMBAI_RPC_URL, 
  POLYGON_RPC_URL,
} = process.env;

const config: HardhatUserConfig = {
  paths:{
    sources: "./src",
    artifacts: "./artifacts"
  },
  solidity: {
    compilers: [
      {
        version: '0.8.13',
      },
      {
        version: '0.8.20',
      }
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    polygon: {
      url: String(POLYGON_RPC_URL),
      accounts: [
        String(PRIVATE_KEY), 
        String(PRIVATE_KEY_TEST_0),
        String(PRIVATE_KEY_TEST_1),
        String(PRIVATE_KEY_TEST_2),
        String(PRIVATE_KEY_TEST_3),
        String(PRIVATE_KEY_TEST_4),
    ],
      allowUnlimitedContractSize: true,
    },
    mumbai: {
      url: String(MUMBAI_RPC_URL),
      accounts: [
        String(PRIVATE_KEY), 
        String(PRIVATE_KEY_TEST_0),
        String(PRIVATE_KEY_TEST_1),
        String(PRIVATE_KEY_TEST_2),
        String(PRIVATE_KEY_TEST_3),
        String(PRIVATE_KEY_TEST_4),
    ],      
      allowUnlimitedContractSize: true,
    },
  },
  etherscan: {
    apiKey: String(SCAN_KEY),
  },
  typechain: {
    outDir: 'typechain-types',
    target: 'ethers-v5',
    // should overloads with full signatures like deposit(uint256) be generated always,
    // even if there are no overloads?
    alwaysGenerateOverloads: true,
  },
};

export default config;
