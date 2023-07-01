// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import {CommitUtils} from "./CommitUtils.sol";
import "forge-std/console.sol";

contract PeerGrading {
    mapping(address => Participant) public participants;
    uint8[] public assignments;

    bytes32 globalSeed;
    uint256 awaiting_commits;
    uint256[] entropies;

    error AlreadyScrambled();
    error WaitingCommits();
    error InvalidReveal();
    error NotAParticipant();

    struct Participant {
        bytes32 commit;
        uint256 penalty;
        uint256 assigmentId;
        uint256[] assigned;
        uint256[] grading;
    }

    // TODO: verificar se é melhor fazer um contrato por vez
    // ou um contravo só que inicializa e controla mais de uma instância de PeerGrading
    constructor(address[] memory _participants) {
        for (uint256 i = 0; i < _participants.length; i++) {
            participants[_participants[i]].assigmentId = i+1;
        }

        awaiting_commits = _participants.length;
    }

    function commit(bytes32 _commit) public {
        Participant storage participant = participants[msg.sender];

        if (participant.assigmentId == 0) revert NotAParticipant();
        if (participant.commit != 0) revert AlreadyScrambled();
        participant.commit = _commit;
        awaiting_commits = awaiting_commits - 1;
    }

    function reveal(uint256 _rand) public {
        Participant storage participant = participants[msg.sender];
        if (awaiting_commits > 0) revert WaitingCommits();
        bool check = CommitUtils.reveal(_rand, participant.commit);
        if (!check) revert InvalidReveal();

        // TODO: verificar com o professor se isso aqui dá no mesmo do que a etapa
        // descrita de todos influenciarem o seed.
        // A ideia disso daqui é economizar gás para evitar de ter uma etapa
        // onde é preciso rodar a hash de cada um dos commits.
        globalSeed = keccak256(abi.encode(globalSeed, _rand));
    }

    function distributeAssignments() public view returns (uint256[] memory) {
        uint256 k = assignments.length/2;
        bytes32 seed = globalSeed;
        uint256[] memory tasks;
        uint256 i = 0;
        participants[msg.sender].assigmentId;

        while (tasks.length < k) {
            seed = keccak256(abi.encode(seed));
            uint256 task = uint256(seed) % k;
            if (tasks[task] != participants[msg.sender].assigmentId) {
                tasks[i] = task;
                i++;
            }
        }
        return tasks;
    }

    //TODO implementar a função de receber consenso
}
