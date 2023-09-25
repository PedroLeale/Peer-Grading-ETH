import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/proxy/53131/peer-grading-subgraph/v0.0.10",
  cache: new InMemoryCache(),
});
