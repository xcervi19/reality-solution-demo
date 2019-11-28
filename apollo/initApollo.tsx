import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { NextPageContext } from 'next';
import get from 'lodash/get';
import isomorphicFetch from 'isomorphic-unfetch';

type TApolloInitialState = null | NormalizedCacheObject;

// Polyfill fetch() on the server (used by apollo-client)
// if (!process.browser) {
//   global.fetch = isomorphicFetch;
// }

const ApolloLinkUri: string = "http://localhost:4000/graphql";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

function create(initialState: TApolloInitialState, context?: NextPageContext) {
  const req = get(context, 'req', undefined);
  let headers = req && req.headers ? req.headers : {};

  const httpLink = new BatchHttpLink({
    uri: ApolloLinkUri,
    credentials: 'same-origin',
    headers,
    batchMax: 20,
    fetch: isomorphicFetch
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: httpLink,
    cache: new InMemoryCache().restore(initialState || {}),
  });
}


function initApollo(initialState: TApolloInitialState, ctx?: NextPageContext): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, ctx);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, ctx);
  }

  return apolloClient;
};

export {
  initApollo
};
