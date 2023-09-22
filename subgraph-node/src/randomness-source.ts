
import {  Commit as CommitEvent, Revealed as RevealedEvent } from "../generated/templates/IRandomnessSource/IRandomnessSource"
import {Commit, Revealed} from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts";

export function handleCommit(event: CommitEvent){
    let entity = new Commit(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.sender = event.params.sender
        
    entity.save()
}

export function handleReveal(event: RevealedEvent) {
    let entity = new Revealed(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.sender = event.params.sender

    entity.save()
}