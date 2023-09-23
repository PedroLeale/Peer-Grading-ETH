// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/* solhint-disable no-global-import */
import "forge-std/Script.sol";

import "../src/PeerGradingDeployer.sol";
import "../src/PeerGrading.sol";

/* solhint-enable no-global-import */

contract Deploy is Script {
    address DEPLOYER;
    address[] participants;

    function setUp() public {
        DEPLOYER = 0x1C7E64bF2A366DCE4EFDEb671e9cc988ec625d7a;
    }

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        participants.push(vm.addr(vm.envUint("PRIVATE_KEY_TEST_0")));
        participants.push(vm.addr(vm.envUint("PRIVATE_KEY_TEST_1")));
        participants.push(vm.addr(vm.envUint("PRIVATE_KEY_TEST_2")));
        participants.push(vm.addr(vm.envUint("PRIVATE_KEY_TEST_3")));
        participants.push(vm.addr(vm.envUint("PRIVATE_KEY_TEST_4")));

        for (uint256 i; i < participants.length; i += 1) {
            console.log("addres ", i, ": ", participants[i]);
        }

        vm.startBroadcast(deployerPrivateKey);

        PeerGradingDeployer pd = PeerGradingDeployer(DEPLOYER);

        address pg = pd.deployPeerGrading(participants, 3, "ipfsHash");

        vm.stopBroadcast();
        console.log("Peer Grading address: ", address(pg));
        console.log("Randomness source address: ", PeerGrading(pg).randSrc.address);
    }
}
