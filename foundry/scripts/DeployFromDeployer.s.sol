// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/* solhint-disable no-global-import */
import "forge-std/Script.sol";

import "../src/PeerGradingDeployer.sol";

/* solhint-enable no-global-import */

contract Deploy is Script {
    address[] participants;
    address DEPLOYER;
    address[]  _participants; 

    function setUp() public {
        DEPLOYER = 0x1C7E64bF2A366DCE4EFDEb671e9cc988ec625d7a;
    }

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        _participants.push(vm.addr(vm.envUint("PRIVATE_KEY_TEST_0")));
        _participants.push(vm.addr(vm.envUint("PRIVATE_KEY_TEST_1")));
        _participants.push(vm.addr(vm.envUint("PRIVATE_KEY_TEST_2")));
        _participants.push(vm.addr(vm.envUint("PRIVATE_KEY_TEST_3")));
        _participants.push(vm.addr(vm.envUint("PRIVATE_KEY_TEST_4")));

        for (uint i; i < _participants.length; i +=1){
            console.log("addres ", i , ": ", _participants[i]);
        }

        vm.startBroadcast(deployerPrivateKey);

        PeerGradingDeployer pd  = PeerGradingDeployer(DEPLOYER);

        pd.deployPeerGrading(_participants, 3, "ipfsHash");

        vm.stopBroadcast();
        console.log("contract address: ", address(pd));
    }
}
