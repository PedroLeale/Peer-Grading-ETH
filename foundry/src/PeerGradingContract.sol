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
        uint256 rand;
        uint256[] assigned;
        uint256[] grading;
    }

    // TODO: verificar se é melhor fazer um contrato por vez
    // ou um contravo só que inicializa e controla mais de uma instância de PeerGrading
    constructor(address[] memory _participants, uint8[] memory _assignments) {
        for (uint256 i = 0; i < _participants.length; i++) {
            //TODO: inicializa em 1 só para marcar o partiicpant. Talvez refatorar
            // para usar um bool, mas idealmente gastar o mínimo de memória possível
            participants[_participants[i]].rand = 1;
        }

        for (uint256 i = 0; i < _assignments.length; i++) {
            assignments.push(_assignments[i]);
        }

        awaiting_commits = _participants.length;
    }

    function commit(bytes32 _commit) public {
        Participant storage participant = participants[msg.sender];

        if (participant.rand != 1) revert NotAParticipant();
        if (participant.commit != 0) revert AlreadyScrambled();
        participant.commit = _commit;
        awaiting_commits = awaiting_commits - 1;
    }

    function reveal(uint256 _rand) public {
        Participant storage participant = participants[msg.sender];
        if (awaiting_commits > 0) revert WaitingCommits();
        bool check = CommitUtils.reveal(_rand, participant.commit);
        if (!check) revert InvalidReveal();
        participant.rand = _rand;

        // TODO: verificar com o professor se isso aqui dá no mesmo do que a etapa
        // descrita de todos influenciarem o seed.
        // A ideia disso daqui é economizar gás para evitar de ter uma etapa
        // onde é preciso rodar a hash de cada um dos commits.
        globalSeed = keccak256(abi.encode(globalSeed, _rand));
    }
}
