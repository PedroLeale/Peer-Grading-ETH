// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/* solhint-disable no-global-import */
import "forge-std/Script.sol";

import "../src/PeerGrading.sol";

import "../src/CommitRevealRandomness.sol";

import "../src/PeerGradingDeployer.sol";

/* solhint-enable no-global-import */

contract indexerReceiveconsensus is Script {
    address peer_grading_address = address(0xc8dCBf47D039609B9EF32dFC7B261eD369122f44);
    address[] participants;
    uint8[] consensusVector = new uint8[](5);

    function setUp() public {
        uint8 cont = 5;
        for (uint8 i = 0; i < 5; i++) {
            consensusVector[i] = cont;
            cont -= 1;
        }
    }

    function run() public {
        uint256 pk = vm.envUint("PRIVATE_KEY_TEST_0");
        vm.startBroadcast(pk);
        PeerGrading pg = PeerGrading(peer_grading_address);
        pg.receiveConsensus(consensusVector);
        vm.stopBroadcast();
    }
}
