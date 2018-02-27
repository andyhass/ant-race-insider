import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  IN_PROGRESS,
  COMPLETE,
} from '../constants/WinLikelihoodStatusConstants';
import generateAntWinLikelihoodCalculator from '../generateAntWinLikelihoodCalculator';

const winLikelihoods = {
  defaults: {
    winLikelihoods: [],
  },
  resolvers: {
    Mutation: {
      resetWinLikelihoods: (_, { winLikelihoods }, { cache }) => {
        cache.writeData({ data: { winLikelihoods } });
        return null;
      },
      updateWinLikelihood: (_, variables, { cache }) => {
        const id = `WinLikelihood:${variables.id}`;
        const fragment = gql`
          fragment winLikelihood on WinLikelihood {
            winLikelihoodStatus
            winLikelihood
          }
        `;
        const winLikelihood = cache.readFragment({ fragment, id });
        const data = {
          ...winLikelihood,
          winLikelihood: variables.winLikelihood,
          winLikelihoodStatus: variables.winLikelihoodStatus,
        };
        cache.writeData({ id, data });
        return null;
      },
    },
  },
};

export const withWinLikelihoods = graphql(
  gql`
    query WinLikelihoodQuery {
      winLikelihoods @client {
        winLikelihoodStatus
        winLikelihood
        id
      }
    }
  `,
  {
    props: ({ ownProps, data: { winLikelihoods } }) => ({
      winLikelihoods: winLikelihoods,
    }),
  }
);

export const resetWinLikelihoods = graphql(
  gql`
    mutation updateWinLikelihoods($winLikelihoods: [Object!]) {
      resetWinLikelihoods(winLikelihoods: $winLikelihoods) @client {
        winLikelihoods
      }
    }
  `,
  {
    props: ({ ownProps, mutate }) => ({
      resetWinLikelihoods: players => {
        return mutate({
          variables: {
            winLikelihoods: players.map((racer, index) => ({
              id: index,
              winLikelihoodStatus: IN_PROGRESS,
              winLikelihood: null,
              __typename: 'WinLikelihood',
            })),
          },
        });
      },
    }),
  }
);

export const calculateWinLikelihood = graphql(
  gql`
    mutation updateWinLikelihood(
      $id: Int!
      $winLikelihood: Float!
      $winLikelihoodStatus: String!
    ) {
      updateWinLikelihood(
        id: $id
        winLikelihood: $winLikelihood
        winLikelihoodStatus: $winLikelihoodStatus
      ) @client
    }
  `,
  {
    props: ({ mutate, ownProps }) => ({
      calculateWinLikelihood: () => {
        ownProps.winLikelihoods.forEach(async (racer, index) => {
          const winLikelihood = await generateAntWinLikelihoodCalculator();
          mutate({
            variables: {
              id: index,
              winLikelihoodStatus: COMPLETE,
              winLikelihood,
              __typename: 'WinLikelihood',
            },
          });
        });
      },
    }),
  }
);

export default winLikelihoods;
