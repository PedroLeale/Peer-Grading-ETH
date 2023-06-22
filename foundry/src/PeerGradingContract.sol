// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract PeerGradingContract {
    mapping(address => Participant) public participants;

    uint256 globalSeed;
    uint256 num_participants;
    uint256[] entropies;

    error AlreadyScrambled();

    struct Participant {
        uint256 entropy;
        uint256[] assigned;
        uint256[] grading;
    }

    // TODO: verificar se é melhor fazer um contrato por vez
    // ou um contravo só que inicializa e controla mais de uma instância de PeerGrading

    constructor(address[] memory _participants, uint8[][] memory _assignments) {
        for (uint256 i = 0; i < _participants.length; i++) {
            Participant storage participant = participants[_participants[i]];
            participant.assigned = _assignments[i];
        }
        num_participants = _participants.length;
    }

    function generateEntropy(uint256 _entropy) public {
        Participant storage participant = participants[msg.sender];

        if (participant.entropy != 0) revert AlreadyScrambled();
        participant.entropy = _entropy;
        entropies.push(_entropy);
    }

    function generateSeed() public {
        globalSeed = uint256(keccak256(abi.encodePacked(entropies)));
    }
}
