import { coinProfile } from '../constants/initialStates';
import { COIN_PROFILE_FETCHED, COIN_AGGREGATE_FETCHED } from '../constants/actions';

const coinProfileReducer = (state = coinProfile, action) => {
  switch (action.type) {
    case COIN_PROFILE_FETCHED:
      return { ...state, profile: {...state.profile, ...action.payload}};
    case COIN_AGGREGATE_FETCHED:
      return { ...state, aggregate: {...state.aggregate, ...action.payload}};
    default:
      return state;
  }
};

export default coinProfileReducer;
