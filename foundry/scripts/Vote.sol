// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/* solhint-disable no-global-import */
import "forge-std/Script.sol";

import "../src/PeerGrading.sol";

import "../src/CommitRevealRandomness.sol";

import "../src/PeerGradingDeployer.sol";

/* solhint-enable no-global-import */

contract Vote is Script {
    address peer_grading_address = address(0xc8dCBf47D039609B9EF32dFC7B261eD369122f44);

    function setUp() public {}

    function run() public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY_TEST_0"));
        PeerGrading pg = PeerGrading(peer_grading_address);
        pg.vote();
        vm.stopBroadcast();

        vm.startBroadcast(vm.envUint("PRIVATE_KEY_TEST_1"));
        pg.vote();
        vm.stopBroadcast();
    }
}
