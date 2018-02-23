import {
  LOAD_ANTS_REQUEST,
  LOAD_ANTS_SUCCESS,
  GENERATE_WIN_LIKELIHOOD_START,
  GENERATE_WIN_LIKELIHOOD_COMPLETE,
} from '../constants/AntActionConstants';
import {
  READY,
  IN_PROGRESS,
  COMPLETE,
} from '../constants/WinLikelihoodStatusConstants';

const initialState = {
  ants: [],
  isFetching: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ANTS_REQUEST:
      return initialState;
    case LOAD_ANTS_SUCCESS:
      return {
        ...state,
        isFetching: true,
        ants: action.ants.map(ant => {
          return {
            ...ant,
            winLikelihoodStatus: READY,
          };
        }),
      };
    case GENERATE_WIN_LIKELIHOOD_START:
      return {
        ...state,
        ants: state.ants.map(ant => {
          return {
            ...ant,
            winLikelihoodStatus: IN_PROGRESS,
            winLikelihood: null,
          };
        }),
      };
    case GENERATE_WIN_LIKELIHOOD_COMPLETE:
      return {
        ...state,
        ants: state.ants.map((ant, index) => {
          if (action.antIndex === index) {
            return {
              ...ant,
              winLikelihoodStatus: COMPLETE,
              winLikelihood: action.winLikelihood,
            };
          }
          return ant;
        }),
      };
    default:
      return state;
  }
}
