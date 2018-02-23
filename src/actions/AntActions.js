import ApolloClient from '../client';
import {
  LOAD_ANTS_REQUEST,
  LOAD_ANTS_SUCCESS,
  GENERATE_WIN_LIKELIHOOD_START,
  GENERATE_WIN_LIKELIHOOD_COMPLETE,
} from '../constants/AntActionConstants';
import { AntsQuery } from '../graphql/AntsQuery';
import generateAntWinLikelihoodCalculator from '../generateAntWinLikelihoodCalculator';

export const fetchAnts = () => {
  return async dispatch => {
    dispatch({
      type: LOAD_ANTS_REQUEST,
    });

    const { data: { ants } } = await ApolloClient.query({ query: AntsQuery });

    return dispatch({
      type: LOAD_ANTS_SUCCESS,
      ants,
    });
  };
};

export const generateWinLikelihood = ants => {
  return dispatch => {
    dispatch({
      type: GENERATE_WIN_LIKELIHOOD_START,
    });

    ants.forEach((ant, index) => {
      generateAntWinLikelihoodCalculator(winLikelihood => {
        dispatch({
          type: GENERATE_WIN_LIKELIHOOD_COMPLETE,
          antIndex: index,
          winLikelihood,
        });
      });
    });
  };
};
