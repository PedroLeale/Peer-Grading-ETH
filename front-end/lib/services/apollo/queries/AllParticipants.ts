import { type TypedDocumentNode, gql } from "@apollo/client";

interface AddedParticipant {
  id: string;
  participant: string;
  contract: string;
}

export interface AllParticipantsResponse {
  addedParticipants: AddedParticipant[];
}

// For Variables
export interface AllParticipantsVariables {
  first: number;
  skip: number;
  address: string;
}

export const GET_ALL_PARTICIPANTS: TypedDocumentNode<
  AllParticipantsResponse,
  AllParticipantsVariables
> = gql(/* GraphQL */ `
  query AllParticipants($first: Int, $skip: Int, $address: String) {
    addedParticipants(
      first: $first
      skip: $skip
      where: { contract: $address }
    ) {
      id
      participant
      contract
    }
  }
`);
