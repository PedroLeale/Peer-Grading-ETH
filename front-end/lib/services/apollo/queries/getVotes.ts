import { gql } from "@apollo/client";
import { type TypedDocumentNode } from "@apollo/client";

interface Voted {
  id: string;
  participant: string;
  consensusCounter: string; // or number if the consensusCounter is always numeric
  contract: string;
}

export interface Res {
  voteds: Voted[];
}

export interface Variables {
  first: number;
  skip: number;
  contract: string;
}

export const GET_VOTES: TypedDocumentNode<Res, Variables> = gql(/* GraphQL */ `
  query voteds($skip: Int, $first: Int, $contract: Bytes) {
    voteds(
      skip: $skip
      first: $first
      orderDirection: desc
      where: { contract: $contract }
    ) {
      id
      participant
      consensusCounter
      contract
    }
  }
`);
