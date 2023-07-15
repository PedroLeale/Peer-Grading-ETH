// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface RandomnessSource {
    function getSeed() external view returns (uint256);
    function checkSeedVailidty() external view returns (bool);
}
