import { gql } from "@apollo/client";
export const GET_ALL_COMMITS_REVEAL = gql(/* GraphQL */ `
  query AllCommits($offset: Int, $address: String) {
    peerGradingDeployeds(offset: $offset) {
      peerGradingAddress
      commitRevealAddr
    }
    commits {
      contract
      sender
    }
  }
`);
