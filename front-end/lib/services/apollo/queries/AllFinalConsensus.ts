import { gql } from "@apollo/client";
export const GET_PLACES_FROM_OWNER = gql(/* GraphQL */ `
query AllFinalConsensus($offset: Int, $address: String) {
    peerGradingDeployeds(offset: $offset) {
      peerGradingAddress
      commitRevealAddr
    }
    consensuses(where: {final: true}) {
      final
      vector
    }
  }
`);