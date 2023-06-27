// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/PeerGradingContract.sol";
import {CommitUtils} from "src/CommitUtils.sol";
import "forge-std/console.sol";

contract PeerGradingTest is Test {
    PeerGrading c;

    address[] participants;
    uint8[] assignemnts;

    function setUp() public {
        participants = [address(1), address(2), address(3), address(4), address(5)];

        assignemnts = [1, 2, 3, 4, 5];
        c = new PeerGrading(participants, assignemnts);
    }

    function test_commit_and_reveal(uint256 _entropy) public {
        uint256[] memory numbers = new uint256[](participants.length);

        for (uint256 i = 0; i < participants.length; i++) {
            _entropy = uint256(keccak256(abi.encode(_entropy))); // Generate a new _entropy using the previous _entropy
            numbers[i] = _entropy % 100; // Generate a number between 0 and 99 using modular arithmetic
        }

        for (uint256 i = 0; i < participants.length; i++) {
            vm.prank(participants[i]);
            bytes32 com = CommitUtils.createCommitment(participants[i], numbers[i]);
            vm.prank(participants[i]);
            c.commit(com);
        }
    }
}