include .env

setup-foundry:
	curl -L https://foundry.paradigm.xyz | bash
	foundryup

install:
	forge install

test:
	forge test

gen-snapshot: 
	    forge snapshot --snap ./snapshots/.gas-snapshot-$(shell date +'%Y-%m-%d_%H:%m') --ffi


deploy-grading:
	forge script script/Deploy.s.sol:Deploy --fork-url ${RPC_URL}  --broadcast -vvvv

deploy-deployer:
	forge script script/DeployDeployer.s.sol:Deploy --fork-url ${RPC_URL}  --broadcast -vvvv

verify-deployer:
	forge verify-contract --verifier-url https://api-testnet.polygonscan.com/api/  0xe3ccd97F3448d53E07bfdBf9E5eA542CAC228C22 ./src/PeerGradingDeployer.sol:PeerGradingDeployer   --etherscan-api-key  ${MUMBAI_SCAN_KEY} --chain mumbai
