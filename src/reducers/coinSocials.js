import { coinSocial } from '../constants/initialStates';
import { COIN_SOCIAL_FETCHED } from '../constants/actions';

const coinSocials = (state = coinSocial, action) => {
  switch (action.type) {
    case COIN_SOCIAL_FETCHED:
      return {...action.payload};
    default:
      return state;
  }
};

export default coinSocials;
