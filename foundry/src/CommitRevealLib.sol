// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

library CommitReveal {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    /**
     * @notice creates a commitment
     * @dev notice that an untrusted source might know what was your rand uint depending
     * on how you execute this function. For example, if you execute it against an RPC node,
     * it is possible for it behave against your interests since it knows your rand.
     * @param commiter the address of the creator of the commit
     * @param rand a random number to increase entropy
     * @return the hash of the commitment
     */
    function createCommitment(address commiter, uint256 rand) public pure returns (bytes32) {
        return keccak256(abi.encode(commiter, rand));
    }

    /**
     * @notice reveals the commitment
     * @param rand the uint256 used in the commit
     * @param commitment the commitment created before
     * @return a boolean stating if it's valid or not
     */
    function reveal(uint256 rand, bytes32 commitment) public view returns (bool) {
        bytes32 hash = createCommitment(msg.sender, rand);
        if (hash == commitment) return true;
        return false;

        //TODO: isso aqui pode ser feito para ir atualizando a seed no PeerGradindgContract
        // para termos a seed global de maneira performática.
        // seed = keccak256(abi.encode(seed, rand));
    }
}
