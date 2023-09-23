import { gql } from "@apollo/client";
export const GET_PLACES_FROM_OWNER = gql(/* GraphQL */ `
  query AllContracts($offset: Int, $address: String) {
    peerGradingDeployeds(
      offset: $offset
    ) {
      peerGradingAddress
      commitRevealAddr
    }
  }
`);
