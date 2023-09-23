// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import "../src/CommitRevealRandomness.sol";
import "../src/CommitUtils.sol";

contract CommitProcess is Script {
    uint256[] participants;
    address RAND_ADDRESS;

    function setUp() public {
        RAND_ADDRESS = 0xdb4e784caaAE34FEA02a60C022739BD64A2b570A;
    }

    function run() public {
        participants.push(vm.envUint("PRIVATE_KEY_TEST_0"));
        participants.push(vm.envUint("PRIVATE_KEY_TEST_1"));
        participants.push(vm.envUint("PRIVATE_KEY_TEST_2"));
        participants.push(vm.envUint("PRIVATE_KEY_TEST_3"));
        participants.push(vm.envUint("PRIVATE_KEY_TEST_4"));

        CommitRevealRandomness crr = CommitRevealRandomness(RAND_ADDRESS);

        for (uint256 i; i < participants.length; i += 1) {
            vm.startBroadcast(participants[i]);

            // step below copied directly from CommitUtils so we don't have to deploy it.
            bytes32 commit = keccak256(abi.encode(vm.addr(participants[i]), i));

            crr.commit(commit);
            vm.stopBroadcast();
        }

        console.log(crr.getSeed());
        console.log(crr.checkSeedVailidty());
    }
}
