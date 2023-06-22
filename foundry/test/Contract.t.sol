// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/PeerGradingContract.sol";

contract TestPeerGrading is Test {
    PeerGradingContract c;

    address[] participants;
    uint8[][] assignemnts;

    function setUp() public {
        participants = [address(1), address(2), address(3), address(4), address(5)];

        assignemnts = [[2, 3, 4], [1, 3, 5], [1, 2, 4], [2, 3, 5], [1, 3, 4]];
        c = new PeerGradingContract(participants, assignemnts);
    }

    //it should generate am entropy value for each particiapnt and
    //then generate the global seed
    function test_GenerateEntropy(uint256 _entropy) public {
        uint256[] memory numbers = new uint256[](participants.length);

        for (uint256 i = 0; i < participants.length; i++) {
            _entropy = uint256(keccak256(abi.encode(_entropy))); // Generate a new _entropy using the previous _entropy
            numbers[i] = _entropy % 100; // Generate a number between 0 and 99 using modular arithmetic
        }

        for (uint256 i = 0; i < participants.length; i++) {
            vm.prank(participants[i]);
            c.generateEntropy(numbers[i]);
        }

        c.generateSeed();
    }
}
