import { PeerGradingDeployed as PeerGradingDeployedEvent } from "../generated/PeerGradingDeployer/PeerGradingDeployer"
import { PeerGradingDeployed } from "../generated/schema"
import {PeerGrading, IRandomnessSource} from "../generated/templates"

export function handlePeerGradingDeployed(
  event: PeerGradingDeployedEvent
): void {
  let entity = new PeerGradingDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.peerGradingAddress = event.params.peerGradingAddress
  entity.commitRevealAddr = event.params.commitRevealAddr

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save() 
  PeerGrading.create(event.params.peerGradingAddress)
  IRandomnessSource.create(event.params.commitRevealAddr)
}
