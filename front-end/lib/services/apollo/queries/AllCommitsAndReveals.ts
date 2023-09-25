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

export const GET_ALL_COMMITS_AND_REVEALS: TypedDocumentNode<
  AllParticipantsResponse,
  AllParticipantsVariables
> = gql(/* GraphQL */ `
  query AllCommitsAndReveals($first: Int, $skip: Int, $address: String) {
    commits(first: $first, skip: $skip, where: { contract: $address }) {
      id
      sender
    }
    revealeds(first: $first, skip: $skip, where: { contract: $address }) {
      id
      sender
    }
  }
`);
