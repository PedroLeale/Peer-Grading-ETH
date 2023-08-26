// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import {IRandomnessSource} from "./IRandomnessSource.sol";
import {CommitUtils} from "./CommitUtils.sol";

contract CommitReveralRandomness is IRandomnessSource {
    mapping(address => bytes32) public participants;
    uint256 public requiredCommits;
    bytes32 public globalSeed;

    error AlreadyScrambled();
    error NotAParticipant();
    error WaitingCommits();
    error InvalidReveal();

    constructor(address[] memory _participants) {
        for (uint256 i = 0; i < _participants.length; i++) {
            participants[_participants[i]] = keccak256(abi.encodePacked(uint256(1)));
        }
        requiredCommits = _participants.length;
    }

    function commit(bytes32 _commit) public {
        bytes32 preCommit = participants[msg.sender];

        if (preCommit == 0) revert NotAParticipant();
        if (preCommit != keccak256(abi.encodePacked(uint256(1)))) revert AlreadyScrambled();

        participants[msg.sender] = _commit;
        requiredCommits -= 1;
        emit Commit(msg.sender);
    }

    function reveal(uint256 _rand) public {
        if (requiredCommits > 0) revert WaitingCommits();
        bool check = CommitUtils.reveal(_rand, participants[msg.sender]);
        if (!check) revert InvalidReveal();

        // TODO: verificar com o professor se isso aqui dá no mesmo do que a etapa
        // descrita de todos influenciarem o seed.
        // A ideia disso daqui é economizar gás para evitar de ter uma etapa
        // onde é preciso rodar a hash de cada um dos commits.

        globalSeed = keccak256(abi.encode(globalSeed, _rand));
        emit Revealed(msg.sender);
    }

    function getSeed() external view returns (uint256) {
        return uint256(globalSeed);
    }

    function checkSeedVailidty() external view returns (bool) {
        if (requiredCommits == 0) return true;
        return false;
    }
}
