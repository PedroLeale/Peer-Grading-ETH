import { type TypedDocumentNode, gql } from "@apollo/client";

export interface SearchParticipanResponse {
  peerGradingDeployeds: PeerGradingDeployed[];
}

interface PeerGradingDeployed {
  id: string;
  peerGradingAddress: string;
  commitRevealAddr: string;
  blockTimestamp: number;
}

export const GET_ALL_CONTRACTS: TypedDocumentNode<SearchParticipanResponse> =
  gql(/* GraphQL */ `
    query SearchParticipant($participant: String) {
      peerGradingDeployeds(orderBy: blockTimestamp, orderDirection: desc) {
        id
        peerGradingAddress
        commitRevealAddr
        blockTimestamp
      }
    }
  `);
