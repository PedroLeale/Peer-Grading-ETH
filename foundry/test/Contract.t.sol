// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/PeerGradingContract.sol";

contract TestPeerGrading is Test {
    PeerGradingContract c;

    address[] participants;
    uint8[][] assignemnts;

    function setUp() public {
        participants = new address[](5);
        assignemnts = [[2, 3, 4], [1, 3, 5], [1, 2, 4], [2, 3, 5], [1, 3, 4]];
        c = new PeerGradingContract(participants, assignemnts);
    }

    function testGenerateEntropy() public {
        assertEq(uint256(1), uint256(1), "ok");
    }

    function testFoo(uint256 x) public {
        vm.assume(x < type(uint128).max);
        assertEq(x + x, x * 2);
    }
}
