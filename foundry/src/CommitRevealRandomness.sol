// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import {RandomnessSource} from "./RandomnessSource.sol";
import {CommitUtils} from "./CommitUtils.sol";

contract CommitReveralRandomness is RandomnessSource {
    mapping(address => bytes32) public participants;
    uint256 required_commits;
    bytes32 globalSeed;

    error AlreadyScrambled();
    error NotAParticipant();
    error WaitingCommits();
    error InvalidReveal();

    constructor(address[] memory _participants) {
        for (uint256 i = 0; i < _participants.length; i++) {
            participants[_participants[i]] = keccak256(abi.encodePacked(uint256(1)));
        }
        required_commits = _participants.length;
    }

    function commit(bytes32 _commit) public {
        bytes32 preCommit = participants[msg.sender];

        if (preCommit == 0) revert NotAParticipant();
        if (preCommit != keccak256(abi.encodePacked(uint256(1)))) revert AlreadyScrambled();

        participants[msg.sender] = _commit;
        required_commits -= 1;
    }

    function reveal(uint256 _rand) public {
        if (required_commits > 0) revert WaitingCommits();
        bool check = CommitUtils.reveal(_rand, participants[msg.sender]);
        if (!check) revert InvalidReveal();

        // TODO: verificar com o professor se isso aqui dá no mesmo do que a etapa
        // descrita de todos influenciarem o seed.
        // A ideia disso daqui é economizar gás para evitar de ter uma etapa
        // onde é preciso rodar a hash de cada um dos commits.

        globalSeed = keccak256(abi.encode(globalSeed, _rand));
    }

    function getSeed() external view returns (uint256) {
        return uint256(globalSeed);
    }

    function checkSeedVailidty() external view returns (bool) {
        if (required_commits == 0) return true;
        return false;
    }
}
