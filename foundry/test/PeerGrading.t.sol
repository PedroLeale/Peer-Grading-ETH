// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/PeerGradingContract.sol";
import {CommitUtils} from "src/CommitUtils.sol";

contract PeerGradingTest is Test {
    PeerGrading c;

    address[] participants;
    uint8[] assignemnts;

    error NotAParticipant();

    function setUp() public {
        participants = [address(1), address(2), address(3), address(4), address(5)];

        c = new PeerGrading(participants);
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
        c.commit(com);

        for (uint256 i = 0; i < participants.length; i++) {
            vm.prank(participants[i]);
            com = CommitUtils.createCommitment(participants[i], numbers[i]);
            vm.prank(participants[i]);
            c.commit(com);
        }

        for (uint256 i = 0; i < participants.length; i++) {
            vm.prank(participants[i]);
            c.reveal(numbers[i]);
        }

        //Para testar a função de distribuição de assignments
        //veja se o assigmentId do participante n é igual ao id dos assigments presentes em seu array de assigments
        for (uint256 i = 0; i < participants.length; i++) {
            for (uint256 j = 0; j < participants.length; j++) {
                if (participants[i].assigmentId == participants[i].assigned[j]) {
                    //dar erro
                }
            }
        }

        uint256 test = participants.length / 2;
        console.log("test %d", test);

    }
}
