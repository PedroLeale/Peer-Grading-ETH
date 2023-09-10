import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const private_key_test_0 = process.env.PRIVATE_KEY_TEST_0;
  const private_key_test_1 = process.env.PRIVATE_KEY_TEST_1;
  const private_key_test_2 = process.env.PRIVATE_KEY_TEST_2;
  const private_key_test_3 = process.env.PRIVATE_KEY_TEST_3;
  const private_key_test_4 = process.env.PRIVATE_KEY_TEST_4;

  console.log("Deploying contracts with the account:", private_key_test_0);
  console.log("Deploying contracts with the account:", private_key_test_1);
  console.log("Deploying contracts with the account:", private_key_test_2);
  console.log("Deploying contracts with the account:", private_key_test_3);
  console.log("Deploying contracts with the account:", private_key_test_4);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
