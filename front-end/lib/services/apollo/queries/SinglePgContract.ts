import { type TypedDocumentNode, gql } from "@apollo/client";

interface peerGradings {
  id: string;
  peerGradingAddress: string;
  commitRevealAddr: string;
  ipfsHash: string;
}

export interface SinplePgRes {
  peerGradings: peerGradings[];
}

// For Variables
export interface SinglePgVars {
  first: number;
  skip: number;
  contract: string;
}

export const GET_SINGLE_PG_CONTRACT: TypedDocumentNode<
  SinplePgRes,
  SinglePgVars
> = gql(/* GraphQL */ `
  query singlePeerGrading($skip: Int, $first: Int, $contract: Bytes) {
    peerGradings(
      skip: $skip
      first: $first
      orderDirection: desc
      where: { peerGradingAddress: $contract }
    ) {
      id
      peerGradingAddress
      commitRevealAddr
      ipfsHash
    }
  }
`);
