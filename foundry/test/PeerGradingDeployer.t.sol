// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/PeerGradingDeployer.sol";
import "src/PeerGrading.sol";
import "src/CommitRevealRandomness.sol";
import {CommitUtils} from "src/CommitUtils.sol";

contract PeerGradingDeployerTest is Test {
    PeerGrading c;
    CommitRevealRandomness randSrc;

    PeerGradingDeployer pgd;

    address[] participants;
    uint256[] assignemnts;

    error NotAParticipant();

    enum CurrentState {
        WAITING_CONSENSUS,
        REACHED_CONSESUS
    }

    function setUp() public {
        pgd = new PeerGradingDeployer();
    }

    /*
    * @notice  we will use this to validate off-chain code execution
    */

    function test_checkFfi() public {
        participants = [address(1), address(2), address(3), address(4), address(5)];

        
        pgd.deployPeerGrading(participants, 3, "IPFS_HASH");
    }



    
}
