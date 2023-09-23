
import {  
    Deployed as DeployedEvent,     
    AddedParticipant  as AddedParticipantEvent,
    ConsensusReached as ConsensusReachedEvent,
    NewConsensus as NewConsensusEvent,
    Voted as VotedEvent
    } from "../generated/templates/PeerGrading/PeerGrading"
import {Consensus, AddedParticipant,  Voted, PeerGrading} from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts";



export function handleDeployed(event: DeployedEvent): void {
    let entity = new PeerGrading(
            event.address
        )
    entity.peerGradingAddress = event.address
    entity.commitRevealAddr = event.params.randSrc
    entity.ipfsHash = event.params.ipfsHash

    entity.save()
}


export function handleConsensusReached(event: ConsensusReachedEvent): void{
    let entity = new Consensus(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )

    entity.vector = event.params.consensusVector.map<BigInt>((item:i32) => BigInt.fromI64(item))
    entity.contract = event.address
    entity.final = true
    
    entity.save()
}

export function handleNewConsensus(event: NewConsensusEvent):void {
    let entity = new Consensus(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )

    entity.vector = event.params.consensusVector.map<BigInt>((item: i32) => BigInt.fromI64(item))
    entity.index = event.params.consensusCounter
    entity.contract = event.address
    entity.final = false

    entity.save()
}

export function handleAddedParticipant(event: AddedParticipantEvent):void{

    let entity = new AddedParticipant(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.participant = event.params.participant
    entity.contract = event.address

    entity.save()
}

export function handleVoted(event: VotedEvent):void{

    let entity = new Voted(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.consensusCounter = event.params.consensusCounter;
    entity.participant = event.params.participant   
    entity.contract = event.address

    entity.save()
}