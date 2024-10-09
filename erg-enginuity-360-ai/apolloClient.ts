// apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const initializeApollo = (initialState = null) => {
  const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql', // Replace with your GraphQL API URL
    cache: new InMemoryCache().restore(initialState || {}),
  });

  return apolloClient;
};
