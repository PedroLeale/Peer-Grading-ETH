import { PeerGradingDeployed as PeerGradingDeployedEvent } from "../generated/PeerGradingDeployer/PeerGradingDeployer"
import { PeerGradingDeployed } from "../generated/schema"

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
}
