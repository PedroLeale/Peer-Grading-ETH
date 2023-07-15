// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.13;

import "forge-std/console.sol";
import {RandomnessSource} from "./RandomnessSource.sol";

contract PeerGrading {
    mapping(address => Participant) public participants;
    uint8[] public assignments;

    uint256 number_participants;
    uint256[] entropies;

    RandomnessSource public randSrc;

    struct Participant {
        bytes32 commit;
        uint256 penalty;
        uint256 assignmentId;
        uint256[] assigned;
        uint256[] grading;
    }

    // TODO: verificar se é melhor fazer um contrato por vez ou um contravo
    // só que inicializa e controla mais de uma instância de PeerGrading

    constructor(address[] memory _participants, address _randSrc) {
        for (uint256 i = 0; i < _participants.length; i++) {
            participants[_participants[i]].assignmentId = i + 1;
        }
        randSrc = RandomnessSource(_randSrc);

        number_participants = _participants.length;
    }

    // Getter function for the Participant struct

    function getParticipant(address _address)
        public
        view
        returns (bytes32, uint256, uint256, uint256[] memory, uint256[] memory)
    {
        Participant memory participant = participants[_address];
        return (
            participant.commit, participant.penalty, participant.assignmentId, participant.assigned, participant.grading
        );
    }

    // TODO implementar a função de receber consenso

    function receiveConsensus() public {
        // Implementar
    }

    // TODO: implementar testes para a função calculatePenalties

    function calculatePenalties(uint256[] memory consensusArray, uint256[][] memory grading)
        public
        pure
        returns (uint256[] memory)
    {
        uint256[] memory finalPenalties = new uint256[](grading.length);

        for (uint256 auxIndex = 0; auxIndex < grading.length; auxIndex++) {
            uint256 penalty = 0;
            uint256 consensusPosition = 0;

            for (uint256 i = 0; i < grading[auxIndex].length; i++) {
                bool found = false;

                for (uint256 j = consensusPosition; j < consensusArray.length; j++) {
                    if (consensusArray[j] == grading[auxIndex][i]) {
                        consensusPosition = j;
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    penalty += 1;
                }
            }

            finalPenalties[auxIndex] = penalty;
        }

        return finalPenalties;
    }

    //TODO: comentei esse código porque ele precisa ser executado offchain e validado pelos participantes
    // offchain

    // function distributeAssignments() public view returns (uint256[] memory) {
    //     uint256 k = (number_participants + 1) / 2;
    //     bytes32 seed = globalSeed;
    //     uint256[] memory tasks;
    //     uint256 i = 0;

    //     console.log(k);
    //     // TODO: validar depois o tamanho desse k. Se ele é metade +1 quando ímpar ou metade quando par.
    //     // (precisa ser metade qunado par?)
    //     console.log(tasks.length);
    //     while (tasks.length < k) {
    //         seed = keccak256(abi.encode(seed));
    //         uint256 task = uint256(seed) % k;

    //         if (tasks[task] != participants[msg.sender].assignmentId) {
    //             tasks[i] = task;
    //             i++;
    //         }
    //     }

    //     return tasks;
    // }
}
