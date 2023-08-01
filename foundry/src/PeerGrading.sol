// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.13;

import "forge-std/console.sol";
import {IRandomnessSource} from "./IRandomnessSource.sol";

/**
 * !SECTION
 * @title PeerGrading contract
 * @notice this contract handles the logic of a single peer grading process
 * This contract is single suer per PeeGrading process, so you might user the other
 * implementation for reutilization.
 */

contract PeerGrading {
    mapping(address => Participant) public participants;
    mapping(uint256 => address) participantsIndex;

    uint256 gradesAmount;

    address currentIssuer;
    uint256 numberParticipants;
    uint8 nextIssuerIndex = 0;
    uint8[] ConsensusVector;

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
        REACHED_CONSENSUS,
        FINAL_CONSENSUS
    }

    /**
     * @param _participants both the addresses and the assignments. The assignemnts are
     * the positions of each of the addresses in the array
     * @param _randSrc A randomness source. A contract interface that will outsource the
     * randmoness generation logic/process to another contract, but allowing this contract to
     * access a random number.
     * @dev the randomness source is here to allow other implementations of randomness without
     * changing this base contract. For example, the interface could be used to integrate a
     * Chainlink VRF into the randomness source.
     * @notice the first currentIssuer is the first one to submit a consensus vector.
     * It will round-robin through all participant addresses until the final consensus is reached.
     */
    constructor(address[] memory _participants, address _randSrc) {
        for (uint256 i = 0; i < _participants.length; i++) {
            participants[_participants[i]].assignmentId = i + 1;
            participantsIndex[i] = _participants[i];
        }
        randSrc = IRandomnessSource(_randSrc);
        currentIssuer = _participants[0];
        numberParticipants = _participants.length;
    }

    //TODO: check alternatives in this function to mitigate the problem
    // of a participant not issuing a new consesnus vector.
    /**
     * @param _consensusVector the next consensus verctor issue by the current chosen participant
     * @notice each participant has to issue the next consensus.
     */
    function receiveConsensus(uint8[] memory _consensusVector) public {
        ConsensusVector = _consensusVector;
        nextIssuerIndex += 1;
        if (nextIssuerIndex == numberParticipants) nextIssuerIndex = 0;
        currentIssuer = participantsIndex[nextIssuerIndex];
    }

    /**
     * @param consensusArray the given consensus array to compare against the gradings
     * @param grading the matrix of gradings given by the participants to compare
     * @notice this function will be used only to calculate the penalties off-chain
     * for each participant in the current consensus vector.
     */
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
    //     uint256 k = (numberParticipants + 1) / 2;
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
