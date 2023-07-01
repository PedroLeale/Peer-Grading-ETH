// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

/* solhint-disable no-global-import */
import "forge-std/Script.sol";
import "../src/PeerGrading.sol";

/* solhint-enable no-global-import */

contract Deploy is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.stopBroadcast();
        console.log("contract address: ");
    }
}
