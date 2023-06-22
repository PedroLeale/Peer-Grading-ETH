include .env

setup-foundry:
	curl -L https://foundry.paradigm.xyz | bash
	foundryup

install:
	forge install

test:
	forge test

deploy:
	forge script script/Deploy.s.sol:Deploy --fork-url ${RPC_URL}  --broadcast -vvvv