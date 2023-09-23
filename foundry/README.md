# <h1 align="center"> Peer Grading smart contracts </h1>

**Peer Grading protocol using foundry and Hardhat**

![Github Actions](https://github.com/foundry-rs/forge-template/workflows/CI/badge.svg)

## Getting Started

If you are using vscode, change directory into the folder with `cd /foundry` of this file to use foundry properly.
Otherwise, linting and other aspects might fail.

## Writing tests

All you need is to `import forge-std/Test.sol` and then inherit it from your test contract. Forge-std's Test contract comes with a pre-instatiated [cheatcodes environment](https://book.getfoundry.sh/cheatcodes/), the `vm`. It also has support for [ds-test](https://book.getfoundry.sh/reference/ds-test.html)-style logs and assertions. Finally, it supports Hardhat's [console.log](https://github.com/brockelmore/forge-std/blob/master/src/console.sol). The logging functionalities require `-vvvv`.

```solidity
pragma solidity 0.8.10;

import "forge-std/Test.sol";

contract ContractTest is Test {
    function testExample() public {
        vm.roll(100);
        console.log(1);
        emit log("hi");
        assertTrue(true);
    }
}
```

## Development

This project uses [Foundry](https://getfoundry.sh). See the [book](https://book.getfoundry.sh/getting-started/installation.html) for instructions on how to install and use Foundry.

## Default contract addresses for testing on mumbai

The PeerGradingDeployer contract is deployed in the address `0x1C7E64bF2A366DCE4EFDEb671e9cc988ec625d7a`

## Running the scripts

Some scripts were left to help achieving a consistent state for testing purposes. They should be run in the following order:

1. `DeployDeployer.s.sol` to create a a new instance of the deployer. This is necessary so the subgraph can index the events of the subsequent contracts.
2. `CommitProcess.s.sol` necessary to generate randomness for the peer grading process
3. `Cycle.s.sol` necessary to cast votes and reach a consensus

Make sure to change all the addresses that must be changed in order for the scripts to work properly.

## Suggested extensions

https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity

https://marketplace.visualstudio.com/items?itemName=tintinweb.solidity-visual-auditor

https://marketplace.visualstudio.com/items?itemName=idrabenia.solidity-solhint
