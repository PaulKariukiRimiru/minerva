import { coinProfile } from '../constants/initialStates';
import { COIN_PROFILE_FETCHED } from '../constants/actions';

const coinProfileReducer = (state = coinProfile, action) => {
  switch (action.type) {
    case COIN_PROFILE_FETCHED:
      return {...action.payload};
    default:
      return state;
  }
};

export default coinProfileReducer;
