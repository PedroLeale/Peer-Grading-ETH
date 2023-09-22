
import {  AddedParticipant  as AddedParticipantEvent, ConsensusReached as ConsensusReachedEvent, NewConsensus, NewConsensus as NewConsensusEvent } from "../generated/templates/PeerGrading/PeerGrading"
import {Consensus, AddedParticipant} from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts";

export function handleConsensusReached(event: ConsensusReachedEvent){
    let entity = new Consensus(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )

    entity.vector = event.params.consensusVector.map(item => BigInt.fromI64(item))
    entity.final = true
    
    entity.save()
}

export function handleNewConsensus(event: NewConsensusEvent) {
    let entity = new Consensus(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )

    entity.vector = event.params.consensusVector.map(item => BigInt.fromI64(item))
    entity.index = event.params.consensusCounter
    entity.final = false

    entity.save()
}

export function handleAddedParticipant(event: AddedParticipantEvent){

    let entity = new AddedParticipant(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.participant = event.params.participant;

    entity.save()
}