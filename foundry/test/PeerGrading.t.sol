// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/PeerGrading.sol";
import "src/CommitRevealRandomness.sol";
import {CommitUtils} from "src/CommitUtils.sol";

contract PeerGradingTest is Test {
    PeerGrading c;
    CommitRevealRandomness randSrc;

    address[] participants;
    uint256[] assignemnts;

    error NotAParticipant();

    enum CurrentState {
        WAITING_CONSENSUS,
        REACHED_CONSESUS
    }

    function setUp() public {
        participants = [address(1), address(2), address(3), address(4), address(5)];
        randSrc = new CommitRevealRandomness(participants);
        c = new PeerGrading(participants, address(randSrc), participants.length - 1, "IPFS HASH TEST");
    }

    /*
    * @notice  we will use this to validate off-chain code execution
    */

    function test_checkFfi() public {
        string[] memory inputs = new string[](3);
        inputs[0] = "echo";
        inputs[1] = "-n";
        // ABI encoded "gm", as a hex string
        inputs[2] =
            "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002676d000000000000000000000000000000000000000000000000000000000000";

        bytes memory res = vm.ffi(inputs);
        string memory output = abi.decode(res, (string));
        assertEq(output, "gm");
    }

    // tests the complete logic as we intend it to work
    function test_full_logic(uint256 _entropy) public {
        uint256[] memory numbers = new uint256[](participants.length);

        for (uint256 i = 0; i < participants.length; i++) {
            _entropy = uint256(keccak256(abi.encode(_entropy))); // Generate a new _entropy using the previous _entropy
            numbers[i] = _entropy % 100; // Generate a number between 0 and 99 using modular arithmetic
        }

        bytes32 com = CommitUtils.createCommitment(participants[0], numbers[0]);
        vm.expectRevert(abi.encodeWithSelector(NotAParticipant.selector));
        randSrc.commit(com);

        for (uint256 i = 0; i < participants.length; i++) {
            vm.prank(participants[i]);
            com = CommitUtils.createCommitment(participants[i], numbers[i]);
            vm.prank(participants[i]);
            randSrc.commit(com);
        }

        for (uint256 i = 0; i < participants.length; i++) {
            vm.prank(participants[i]);
            randSrc.reveal(numbers[i]);
        }

        // Testing distribute assignments function
        // checking if the assignmentId from the participant "n" is equal to the id of the assignments present in his array of assignments
        // if it is, it means that the assignments were NOT distributed correctly
        for (uint256 i = 0; i < participants.length; i++) {
            (,, uint256 assignmentId,,) = c.getParticipant(participants[i]);
            vm.prank(participants[i]);
            uint256[] memory distdAssignments = c.distributeAssignments(participants[i]);

            console.log("distributed assignments length:");
            console.log(distdAssignments.length);
            for (uint256 j = 0; j < distdAssignments.length; j++) {
                assertTrue(distdAssignments[j] != assignmentId);
            }

            console.log("distributed assignments for participant:");
            console.log("participant: ", participants[i]);
            for (uint256 j = 0; j < distdAssignments.length; j++) {
                console.log(distdAssignments[j]);
            }
            console.log("-----------------------");
        }

        for (uint256 i = 0; i < participants.length; i++) {
            vm.prank(participants[i]);
            c.vote();
        }

        c.finalizeConsensus();
        assert(1 == uint256(c.currentState()));
    }

    function test_calcPenalties() public {
        uint8[] memory dynamicConsensusVector = new uint8[](5);

        uint8 cont = 5;

        for (uint8 i = 0; i < 5; i++) {
            dynamicConsensusVector[i] = cont;
            cont -= 1;
        }

        // uint8[][] memory gradings = [[4, 3, 2], [5, 3, 1], [4, 1, 2], [5, 2, 3], [4, 3, 1]];

        uint8[][] memory gradings = new uint8[][](5);

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

        uint8[5] memory penalties;
        for (uint8 i = 0; i < 5; i++) {
            if (i == 2 || i == 3) {
                penalties[i] = 1;
            } else {
                penalties[i] = 0;
            }
        }

        uint8[] memory result = c.calculatePenalties(dynamicConsensusVector, gradings);

        for (uint8 i = 0; i < 5; i++) {
            assertEq(result[i], penalties[i]);
        }
    }

    function test_Grading() public {
        // First: this will send an empty array to the grading function
        // and it should revert

        uint256[] memory grading = new uint256[](0);
        vm.prank(participants[1]);
        vm.expectRevert();
        c.setGrading(grading);

        // Second: this will send an enormous array to the grading function
        // and it should revert

        grading = new uint256[](participants.length + 1);
        vm.prank(participants[0]);
        vm.expectRevert();
        c.setGrading(grading);
    }
}
