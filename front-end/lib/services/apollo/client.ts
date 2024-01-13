import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/53131/peer-grading-subgraph/v0.0.12",
  cache: new InMemoryCache(),
});
