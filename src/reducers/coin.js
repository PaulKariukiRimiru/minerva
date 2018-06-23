import { coins } from '../constants/initialStates';
import { COIN_LIST_FETCHED, COIN_PRICE_FETCHED } from '../constants/actions';

const coin = (state = coins, action) => {
  switch (action.type) {
    case COIN_LIST_FETCHED:
      return {...state,
        coinList: [...action.payload],
      };
    case COIN_PRICE_FETCHED:
      const prices = action.payload;
      var coinList  = [];
      for (const price in prices) {
        coinList.push(prices[price]);
      }
      return { ...state,
        coinPrices: [...coinList],
      };
    default:
      return state;
  }
};

export default coin;
