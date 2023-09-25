import { type TypedDocumentNode, gql } from "@apollo/client";

interface Commit {
  id: string;
  sender: string;
}

interface Revealed {
  id: string;
  sender: string;
}

export interface AllCommitsAndRevealsResponse {
  commits: Commit[];
  revealeds: Revealed[];
}

// For Variables
export interface AllCommitsAndRevealsVariables {
  first: number;
  skip: number;
  address: string;
}

export const GET_ALL_COMMITS_AND_REVEALS: TypedDocumentNode<
  AllCommitsAndRevealsResponse,
  AllCommitsAndRevealsVariables
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
