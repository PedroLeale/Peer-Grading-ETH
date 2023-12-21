import { gql } from "@apollo/client";
export const GET_ALL_FINAL_CONSENSUS = gql(/* GraphQL */ `
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
