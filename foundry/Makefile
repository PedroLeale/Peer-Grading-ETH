include .env

setup-foundry:
	curl -L https://foundry.paradigm.xyz | bash
	foundryup

install:
	forge install

test:
	forge test

test-coverage:
	forge coverage

gen-snapshot: 
	forge snapshot --snap ./snapshots/.gas-snapshot-$(shell date +'%Y-%m-%d_%H:%m') --ffi

cycle-transaction-tester:
	forge script scripts/Cycle.s.sol:Cycle --fork-url ${RPC_URL}  --broadcast -vvvv

cycle-CommitRevealRandomness:
	forge script scripts/Cycle.s.sol:CommitRevealRandomness --fork-url ${RPC_URL}  --broadcast -vvvv

deploy-grading:
	forge script scripts/Deploy.s.sol:Deploy --fork-url ${RPC_URL}  --broadcast -vvvv

deploy-deployer:
	forge script scripts/DeployDeployer.s.sol:Deploy --fork-url ${RPC_URL}  --broadcast -vvvv

deploy-from-deployer:
	forge script scripts/DeployFromDeployer.s.sol:Deploy --fork-url ${RPC_URL}  --broadcast -vvvv

verify-deployer:
	forge verify-contract --verifier-url https://api-testnet.polygonscan.com/api/  0x1C7E64bF2A366DCE4EFDEb671e9cc988ec625d7a ./src/PeerGradingDeployer.sol:PeerGradingDeployer   --etherscan-api-key  ${MUMBAI_SCAN_KEY} --chain mumbai


# commands to run scripts here
# .PHONY: test-subgraph-vote test-subgraph-receive test-subgraph-finalize test-subgraph


run-commit:
	forge script scripts/CommitProcess.sol --fork-url ${RPC_URL} --broadcast -vvvv

# reveal script stil needs to be implemented
run-reveal:
	forge script scripts/Vote.s.sol --fork-url ${RPC_URL} --broadcast -vvvv

run-vote:
	forge script scripts/Vote.s.sol --fork-url ${RPC_URL} --broadcast -vvvv

run-receive:
	forge script scripts/Receiveconsensus.s.sol --fork-url ${RPC_URL} --broadcast -vvvv

run-finalize:
	forge script scripts/Finalizeconsensus.s.sol --fork-url ${RPC_URL} --broadcast -vvvv

test-subgraph: test-subgraph-vote test-subgraph-receive test-subgraph-finalize

