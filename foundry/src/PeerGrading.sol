// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.13;

import "forge-std/console.sol";
import {IRandomnessSource} from "./IRandomnessSource.sol";

/**
 * @title PeerGrading contract
 * @notice this contract handles the logic of a single peer grading process
 * This contract is single suer per PeeGrading process, so you might user the other
 * implementation for reutilization.
 */

contract PeerGrading {
    mapping(address => Participant) public participants;
    mapping(uint256 => address) participantsIndex;

    uint256 votes;

    address currentIssuer;
    uint256 numberParticipants;
    uint8 nextIssuerIndex = 0;
    uint8[] ConsensusVector;

    CurrentState public currentState = CurrentState.WAITING_CONSENSUS;

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
        REACHED_CONSESUS
    }

    event ConsensusReached(uint8[] consensusVector);
    event NewConsensus(uint8[] consensusVector, address indexed sender);
    event AddedParticipant(address indexed participant, uint256 indexed assignmentId);
    event Voted(address indexed participant);

    /**
     * @param _participants both the addresses and the assignments. The assignemnts are
     * the positions of each of the addresses in the array
     * @param _randSrc A randomness source. A ce that will outsource the
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
            emit AddedParticipant(_participants[i], i + 1);
            participantsIndex[i] = _participants[i];
        }
        randSrc = IRandomnessSource(_randSrc);
        currentIssuer = _participants[0];
        numberParticipants = _participants.length;
    }
    /**
     * @dev Ut's not possible to set an assignmentId as 0, so the intention in
     * this modifier is that checking the existence of a participant
     * by validating if the msg.sender has a valid assignmentId
     */

    modifier onlyParticipant() {
        require(participants[msg.sender].assignmentId != 0, "Not a participant");
        _;
    }

    //TODO: check alternatives in this function to mitigate the problem
    // of a participant not issuing a new consensus vector.
    /**
     * @param _consensusVector the next consensus verctor issue by the current chosen participant
     * @notice any participant can issue a new consesnus at any time. The commented code is another
     * alternative where users issued in a round-robin style but we thought about not doing that now
     */
    function receiveConsensus(uint8[] memory _consensusVector) public onlyParticipant {
        ConsensusVector = _consensusVector;
        votes = 0;
        // nextIssuerIndex += 1;
        // if (nextIssuerIndex == numberParticipants) nextIssuerIndex = 0;
        // currentIssuer = participantsIndex[nextIssuerIndex];
        emit NewConsensus(_consensusVector, msg.sender);
    }

    function vote() public onlyParticipant {
        votes += 1;
        emit Voted(msg.sender);
    }

    /**
     * @notice this function sets the state to consensus reached.]
     * this consensus depends on the votes cast by the participants
     */
    function finalizeConsensus() public {
        if (votes > (numberParticipants / 2)) {
            currentState = CurrentState.REACHED_CONSESUS;
            emit ConsensusReached(ConsensusVector);
        }
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

    /**
     * @param _address the participant address
     * @notice this function is inteded to use to gather further information on the participant
     * directly from the contract
     */
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

    /**
     * @return arr the shuffled array of assignments.
     * @param _participant the participant address. It's used to generate entropy
     * and tie this data to the participant at the same time. This means that
     * addres will generate the assignment distribution for that specific participant
     * @dev this shuffling has to ensure that the resulting array is does not have
     * any index equal the same value. For exaxmple, index 0 cannot be of value 1.
     * this is done in order to assure that some of the participants doesn't get it's own
     * assignment. The shuffling algorithm being used is a version of the Knuth's shuffle
     */
    function distributeAssignments(address _participant) public view returns (uint256[] memory arr) {
        arr = new uint256[](numberParticipants);
        uint256 n = arr.length;

        for (uint256 i = 0; i < n; i++) {
            arr[i] = i + 1;
        }

        for (uint256 i = n - 1; i > 0; i--) {
            uint256 j = uint256((randSrc.getSeed() + uint160(_participant) + i) % (i + 1));

            // Ensure that the index of the array won't be the same as the value of the index
            while (arr[j] == i + 1) {
                j = (j + 1) % n; // Incrementally adjust the index
            }

            // Swap arr[i] with the element at random index j
            uint256 temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}
