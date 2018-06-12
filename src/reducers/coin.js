import { coins } from '../constants/initialStates';
import { COIN_LIST_FETCHED } from '../constants/actions';

const coin = (state = coins, action) => {
  switch (action.type) {
    case COIN_LIST_FETCHED:
      return {...state,
        coinList: [...action.payload],
      };
    default:
      return state;
  }
};

export default coin;
