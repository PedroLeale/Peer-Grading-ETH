// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/* solhint-disable no-global-import */
import "forge-std/Script.sol";

import "../src/PeerGrading.sol";

import "../src/CommitRevealRandomness.sol";

/* solhint-enable no-global-import */

contract Test is Script {
    address contract_address = address(0x821dC5CC6692544CdC6F8F619E41f3cb7F662aEd);
    address[] participants;
    uint8[][] gradings = new uint8[][](5);

    function setUp() public {
        console.log("Private key test: ", vm.envUint("PRIVATE_KEY_TEST_0"));
        console.log("Private key test: ", vm.envUint("PRIVATE_KEY_TEST_1"));
        console.log("Private key test: ", vm.envUint("PRIVATE_KEY_TEST_2"));
        console.log("Private key test: ", vm.envUint("PRIVATE_KEY_TEST_3"));
        console.log("Private key test: ", vm.envUint("PRIVATE_KEY_TEST_4"));

        gradings[0] = new uint8[](3);
        gradings[0][0] = 4;
        gradings[0][1] = 3;
        gradings[0][2] = 2;

        gradings[1] = new uint8[](3);
        gradings[1][0] = 5;
        gradings[1][1] = 3;
        gradings[1][2] = 1;

        gradings[2] = new uint8[](3);
        gradings[2][0] = 4;
        gradings[2][1] = 1;
        gradings[2][2] = 2;

        gradings[3] = new uint8[](3);
        gradings[3][0] = 5;
        gradings[3][1] = 2;
        gradings[3][2] = 3;

        gradings[4] = new uint8[](3);
        gradings[4][0] = 4;
        gradings[4][1] = 3;
        gradings[4][2] = 1;
    }

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        participants.push(0x9dB3a915dFdc6f6975769657fE2194d661bA536f);
        participants.push(0x6E10679Eaf9Cc4733274a0F85148F4126364C2b5);
        participants.push(0x793591f2569B27208Df6ed3CEB396E1C89f4c630);
        vm.startBroadcast(deployerPrivateKey);

        CommitReveralRandomness cv = new CommitReveralRandomness(participants);
        PeerGrading pg = new PeerGrading(participants, address(cv), participants.length - 1);

        // send a consenus vector to PeerGrading
        uint8[] memory consensusVector = new uint8[](5);

        uint8 cont = 5;

        for (uint8 i = 0; i < 5; i++) {
            consensusVector[i] = cont;
            cont -= 1;
        }

        pg.receiveConsensus(consensusVector);
        uint256[] memory assignments = pg.distributeAssignments(0x9dB3a915dFdc6f6975769657fE2194d661bA536f);
        uint8[] memory penalties = pg.calculatePenalties(consensusVector, gradings);
        pg.vote();
        pg.finalizeConsensus();

        consensusVector[0] = 3;
        consensusVector[1] = 1;
        consensusVector[2] = 2;
        consensusVector[3] = 4;
        consensusVector[4] = 5;

        penalties = pg.calculatePenalties(consensusVector, gradings);

        pg.receiveConsensus(consensusVector);
        assignments = pg.distributeAssignments(0x6E10679Eaf9Cc4733274a0F85148F4126364C2b5);
        pg.vote();
        pg.finalizeConsensus();

        vm.stopBroadcast();
        console.log("contract address: ", address(pg));
    }
}
