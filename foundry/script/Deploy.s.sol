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
        participants.push(0x9dB3a915dFdc6f6975769657fE2194d661bA536f);
        participants.push(0x6E10679Eaf9Cc4733274a0F85148F4126364C2b5);
        participants.push(0x793591f2569B27208Df6ed3CEB396E1C89f4c630);
        vm.startBroadcast(deployerPrivateKey);

        CommitReveralRandomness cv = new CommitReveralRandomness(participants);
        PeerGrading pg = new PeerGrading(participants, address(cv));

        vm.stopBroadcast();
        console.log("contract address: ", address(pg));
    }
}
