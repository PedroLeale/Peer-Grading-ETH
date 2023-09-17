// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "./PeerGrading.sol";  // Importing the PeerGrading contract

/**
 * @title PeerGradingDeployer
 * @notice This contract deploys instances of the PeerGrading contract
 */
contract PeerGradingDeployer {
    event PeerGradingDeployed(address indexed peerGradingAddress, address indexed creator);

    /**
     * @notice Deploy a new PeerGrading contract
     * @param _participants The list of participants for the PeerGrading contract
     * @param _randSrc The randomness source contract address for the PeerGrading contract
     * @param _workload The number of assignments for each participant in the PeerGrading contract
     * @param _IPFS_hash The IPFS hash of the file/document associated with the PeerGrading contract
     * @return address The address of the deployed PeerGrading contract
     */
    function deployPeerGrading(
        address[] memory _participants,
        address _randSrc,
        uint256 _workload,
        string memory _IPFS_hash
    ) public returns (address) {
        // Deploy a new PeerGrading contract
        PeerGrading newPeerGrading = new PeerGrading(_participants, _randSrc, _workload, _IPFS_hash);

        // Save the address of the deployed contract
        address newPeerGradingAddress = address(newPeerGrading);
        // Emit the deployment event
        emit PeerGradingDeployed(newPeerGradingAddress, msg.sender);

        // Return the address of the deployed PeerGrading contract
        return newPeerGradingAddress;
    }

}