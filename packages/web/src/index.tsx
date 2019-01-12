import * as React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';
import App from './App';

const GRAPHQL_API_URL = 'http://localhost:8080/graphql';

// https://www.apollographql.com/docs/react/advanced/fragments.html#webpack-importing-fragments
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
