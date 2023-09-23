import { gql } from "@apollo/client";
export const GET_PLACES_FROM_OWNER = gql(/* GraphQL */ `
  query AllConsensus($offset: Int, $address: String) {
    peerGradingDeployeds (
      offset: $offset
    ) {
      peerGradingAddress
      commitRevealAddr
    } consensuses {
      final
      vector
    }
  }
`);
