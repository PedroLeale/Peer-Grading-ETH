import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as"
import { Address } from "@graphprotocol/graph-ts"
import { PeerGradingDeployed } from "../generated/schema"
import { PeerGradingDeployed as PeerGradingDeployedEvent } from "../generated/PeerGradingDeployer/PeerGradingDeployer"
import { handlePeerGradingDeployed } from "../src/peer-grading-deployer"
import { createPeerGradingDeployedEvent } from "./peer-grading-deployer-utils"
import { log } from "matchstick-as/assembly/log";


var id: string;
// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let peerGradingAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let commitRevealAddr = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newPeerGradingDeployedEvent = createPeerGradingDeployedEvent(
      peerGradingAddress,
      commitRevealAddr
    )
    log.info("id do peer grading abaixo. O teste padrão veio errado, então eu alterei" ,[])
    id = newPeerGradingDeployedEvent.transaction.hash.concatI32(newPeerGradingDeployedEvent.logIndex.toI32()).toHexString();
    log.info(id,[])
    handlePeerGradingDeployed(newPeerGradingDeployedEvent)


  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("PeerGradingDeployed created and stored", () => {
    assert.entityCount("PeerGradingDeployed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "PeerGradingDeployed",
      id,
      "peerGradingAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "PeerGradingDeployed",
      id,
      "commitRevealAddr",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
