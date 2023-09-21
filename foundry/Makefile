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

cycle-deployer:
	forge script scripts/Cycle.s.sol:Cycle --fork-url ${RPC_URL}  --broadcast -vvvv


deploy-grading:
	forge script scripts/Deploy.s.sol:Deploy --fork-url ${RPC_URL}  --broadcast -vvvv

deploy-deployer:
	forge script scripts/DeployDeployer.s.sol:Deploy --fork-url ${RPC_URL}  --broadcast -vvvv

verify-deployer:
	forge verify-contract --verifier-url https://api-testnet.polygonscan.com/api/  0xB18a3Db7548584CC6499F49c538CA7fF4786BdE7 ./src/PeerGradingDeployer.sol:PeerGradingDeployer   --etherscan-api-key  ${MUMBAI_SCAN_KEY} --chain mumbai
