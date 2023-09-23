
import {  Commit as CommitEvent, Revealed as RevealedEvent } from "../generated/templates/IRandomnessSource/IRandomnessSource"
import {Commit, Revealed} from "../generated/schema"

export function handleCommit(event: CommitEvent):void{
    let entity = new Commit(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.sender = event.params.sender
    entity.contract = event.address
    entity.save()
}

export function handleReveal(event: RevealedEvent):void {
    let entity = new Revealed(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity.sender = event.params.sender
    entity.contract = event.address
    entity.save()
}