import { gql } from "@apollo/client";
import { type TypedDocumentNode } from "@apollo/client";

export interface Res {
  consensuses: Array<{
    id: string;
    vector: string[];
    index: string;
    final: boolean;
  }>;
}

// For Variables
export interface Variables {
  first: number;
  skip: number;
  contract: string;
}

export const GET_CONSENSUSES: TypedDocumentNode<Res, Variables> =
  gql(/* GraphQL */ `
    query getConsensus($skip: Int, $first: Int, $contract: Bytes) {
      consensuses(
        skip: $skip
        first: $first
        orderDirection: desc
        where: { contract: $contract }
      ) {
        id
        vector
        index
        final
      }
    }
  `);
