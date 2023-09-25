import { gql } from "@apollo/client";
export const GET_ALL_PARTICIPANTS = gql(/* GraphQL */ `
  query AllParticipants($first: Int, $offset: Int, $address: String) {
    addedParticipants(
      first: $first
      offset: $offset
      where: { contract: $address }
    ) {
      id
      participant
      contract
    }
  }
`);
