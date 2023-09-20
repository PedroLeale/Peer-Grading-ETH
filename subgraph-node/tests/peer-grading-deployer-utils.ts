import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { PeerGradingDeployed } from "../generated/PeerGradingDeployer/PeerGradingDeployer"

export function createPeerGradingDeployedEvent(
  peerGradingAddress: Address,
  commitRevealAddr: Address
): PeerGradingDeployed {
  let peerGradingDeployedEvent = changetype<PeerGradingDeployed>(newMockEvent())

  peerGradingDeployedEvent.parameters = new Array()

  peerGradingDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "peerGradingAddress",
      ethereum.Value.fromAddress(peerGradingAddress)
    )
  )
  peerGradingDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "commitRevealAddr",
      ethereum.Value.fromAddress(commitRevealAddr)
    )
  )

  return peerGradingDeployedEvent
}
