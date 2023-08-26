// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

/* solhint-disable no-global-import */
import "forge-std/Script.sol";

import "../src/PeerGrading.sol";

import "../src/CommitRevealRandomness.sol";

/* solhint-enable no-global-import */

contract Deploy is Script {
    address[] participants;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        participants.push(0xa1655dd4B230841E6782e03Dd1d718fd148eA6f8);
        CommitReveralRandomness cv = new CommitReveralRandomness(participants);
        PeerGrading pg = new PeerGrading(participants, address(cv));

        vm.stopBroadcast();
        console.log("contract address: ");
    }
}
