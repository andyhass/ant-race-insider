import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import merge from 'lodash.merge';
import winLikelihoods from './resolvers/winLikelihoods';

const cache = new InMemoryCache();
const stateLink = withClientState({ ...merge(winLikelihoods), cache });
const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({ uri: 'https://antserver-blocjgjbpw.now.sh/graphql' }),
  ]),
  cache,
});

export default client;
