// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/* solhint-disable no-global-import */
import "forge-std/Script.sol";

import "../src/PeerGradingDeployer.sol";

/* solhint-enable no-global-import */

contract Deploy is Script {
    address[] participants;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
   
        vm.startBroadcast(deployerPrivateKey);

        PeerGradingDeployer pd = new PeerGradingDeployer();

        vm.stopBroadcast();
        console.log("contract address: ", address(pd));
    }
}
