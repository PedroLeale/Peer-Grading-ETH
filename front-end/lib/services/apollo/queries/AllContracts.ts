import { type TypedDocumentNode, gql } from "@apollo/client";

export interface AllContractsResponse {
  peerGradingDeployeds: PeerGradingDeployed[];
}

interface PeerGradingDeployed {
  id: string;
  peerGradingAddress: string;
  commitRevealAddr: string;
  blockTimestamp: number;
}

export const GET_ALL_CONTRACTS: TypedDocumentNode<AllContractsResponse> =
  gql(/* GraphQL */ `
    query AllContracts($skip: Int, $first: Int) {
      peerGradingDeployeds(
        skip: $skip
        first: $first
        orderBy: blockTimestamp
        orderDirection: desc
      ) {
        id
        peerGradingAddress
        commitRevealAddr
        blockTimestamp
      }
    }
  `);
