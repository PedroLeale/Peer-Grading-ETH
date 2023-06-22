// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract PeerGradingContract {
    mapping(address => Participant) public participants;

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
    }

    function generateEntropy(uint256 _entropy) public {}
}
