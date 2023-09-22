// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import "../src/CommitRevealRandomness.sol";

contract CycleCommitRevealRandomness is Script {
    function setUp() public {}

    function run() public{
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        CommitRevealRandomness crr = CommitRevealRandomness(address(0x679F75a4100Ac9bF4336EC559fbb5c6366EE5a43));
        crr.commit(keccak256(abi.encodePacked(uint256(1))));
        crr.commit(keccak256(abi.encodePacked(uint256(2))));

        console.log(crr.getSeed());
        console.log(crr.checkSeedVailidty());
    }
}