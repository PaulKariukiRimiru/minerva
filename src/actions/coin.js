import { baseInstance, baseMiniInstance } from '../constants/axiosInstance';
import { COIN_LIST_FETCHED, ERRORED, COIN_PRICE_FETCHED } from '../constants/actions';
import { fetching } from './calls';
const coinListFetchAction = (payload) => ({
  type: COIN_LIST_FETCHED,
  payload,
});
const errored = payload => ({
  type: ERRORED,
  payload,
});

export const coinPriceAction = (payload) => ({
  type: COIN_PRICE_FETCHED,
  payload,
});

export const fetchCoinPrices = (coinList, callBack) => dispatch => {
  const batchedCoinNames = batchProcessor(coinList, 63);
  batchedCoinNames.forEach(batchedList => {
    var fsyms = batchedList.join(',');
    dispatch(fetching);
    baseMiniInstance.get('/data/pricemulti', {
      params: {
        fsyms,
        tsyms:'USD',
      },
    })
    .then((cresp) => dispatch(coinPriceAction(cresp.data)))
    .then(() => callBack())
    .catch((error) => console.log(error));
  });
};

export const coinListFetch = callBack => (dispatch) => {
  let coinNames = [];
  dispatch(fetching());
  baseInstance.get('/api/data/coinlist/')
  .then((resp) => {
      const coins = resp.data.Data;
      let payload = [];
      for (const coin in coins) {
        coinNames.push(coin);
        payload.push(coins[coin]);
      }
      return (dispatch(coinListFetchAction(payload.sort((a, b) => parseInt(a.SortOrder, 10) - parseInt(b.SortOrder, 10)))));
    })
    .then(() => callBack(coinNames))
    .catch((error) => {
      return (
        dispatch(errored(error.message))
      );
    });
};
const batchProcessor = (array, batchSize) => {
  var index = 0;
  var arraySize = array.length;
  var myArray = [];

  for (var i = 0; i < arraySize; i += batchSize){
    myArray.push(array.slice(index, index + batchSize));
    index += batchSize;
  }
  return myArray;
};
