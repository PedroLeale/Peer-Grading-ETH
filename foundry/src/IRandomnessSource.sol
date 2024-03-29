// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRandomnessSource {
    function getSeed() external view returns (uint256);
    function checkSeedVailidty() external view returns (bool);

    event Commit(address indexed sender);
    event Revealed(address indexed sender);
}
