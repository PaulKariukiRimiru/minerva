import { baseInstance } from '../constants/axiosInstance';
import { COIN_LIST_FETCHED, ERRORED } from '../constants/actions';
import { fetching } from './calls';
const coinListFetchAction = (payload) => ({
  type: COIN_LIST_FETCHED,
  payload,
});
const errored = payload => ({
  type: ERRORED,
  payload,
});

export const coinListFetch = callBack => (dispatch) => {
  dispatch(fetching());
  baseInstance.get('/api/data/coinlist/')
  .then((resp) => {
      const coins = resp.data.Data;
      let payload = [];
      for (const coin in coins) {
        payload.push(coins[coin]);
      }
      return (dispatch(coinListFetchAction(payload)));
    })
    .then(() => callBack())
    .catch((error) => {
      return (
        dispatch(errored(error.message))
      );
    });
};
