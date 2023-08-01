// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.13;

import "forge-std/console.sol";
import {IRandomnessSource} from "./IRandomnessSource.sol";

contract PeerGrading {
    mapping(address => Participant) public participants;
    uint256[] public assignments;

    uint256 number_participants;
    uint256[] entropies;

    IRandomnessSource public randSrc;

    struct Participant {
        bytes32 commit;
        uint256 penalty;
        uint256 assignmentId;
        uint256[] assigned;
        uint256[] grading;
    }

    enum CurrentState {
        WAITING_CONSENSUS,
        REACHED_CONSENSUS
    }

    // TODO: verificar se é melhor fazer um contrato por vez ou um contravo
    // só que inicializa e controla mais de uma instância de PeerGrading

    constructor(address[] memory _participants, address _randSrc) {
        for (uint256 i = 0; i < _participants.length; i++) {
            participants[_participants[i]].assignmentId = i + 1;
        }
        randSrc = IRandomnessSource(_randSrc);

        number_participants = _participants.length;
    }

    // TODO implementar a função de receber consenso

    function receiveConsensus() public {
        // Implementar
    }

    // TODO: implementar testes para a função calculatePenalties

    function calculatePenalties(uint8[] memory consensusArray, uint8[][] memory grading)
        public
        pure
        returns (uint8[] memory)
    {
        uint8[] memory finalPenalties = new uint8[](grading.length);

        for (uint8 auxIndex = 0; auxIndex < grading.length; auxIndex++) {
            uint8 penalty = 0;
            uint8 consensusPosition = 0;

            for (uint8 i = 0; i < grading[auxIndex].length; i++) {
                bool found = false;

                for (uint8 j = consensusPosition; j < consensusArray.length; j++) {
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
