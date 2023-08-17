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


deploy:
	forge script script/Deploy.s.sol:Deploy --fork-url ${RPC_URL}  --broadcast -vvvv