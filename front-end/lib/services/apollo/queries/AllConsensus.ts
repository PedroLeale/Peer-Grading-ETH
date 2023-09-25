import { gql } from "@apollo/client";
export const GET_ALL_CONSENSUS = gql(/* GraphQL */ `
  query AllConsensus($offset: Int, $address: String) {
    peerGradingDeployeds(offset: $offset) {
      peerGradingAddress
      commitRevealAddr
    }
    consensuses {
      final
      vector
    }
  }
`);
