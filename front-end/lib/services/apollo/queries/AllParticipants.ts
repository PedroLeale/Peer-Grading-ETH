import { gql } from "@apollo/client";
export const GET_PLACES_FROM_OWNER = gql(/* GraphQL */ `
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
