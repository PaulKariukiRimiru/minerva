import { COIN_PROFILE_FETCHED, COIN_AGGREGATE_FETCHED, COIN_HISTORY_FETCHED } from '../constants/actions';
import { baseInstance, baseMiniInstance } from '../constants/axiosInstance';
import { fetching } from './calls';

const coinProfileAction = (payload) => ({
  type: COIN_PROFILE_FETCHED,
  payload,
});

const coinAggreagationAction = (payload) => ({
  type: COIN_AGGREGATE_FETCHED,
  payload,
});

const coinPriceHistoryAction = (payload) => {
  const data = payload.Data.map(item => {
    return ({
      x: item.time,
      y: item.close,
    });
  });

  return ({
    type: COIN_HISTORY_FETCHED,
    payload: {
      data,
      start: payload.TimeFrom,
      end: payload.TimeTo,
    },
  });
};

export const coinProfileFetch = (id, callBack) => dispatch => {
  dispatch(fetching());
  baseInstance.get('/api/data/coinsnapshotfullbyid', { params:{
    id,
  } })
  .then((resp) => dispatch(coinProfileAction(resp.data.Data)))
  .then(() => callBack())
  .catch((error) => {
    console.log(error);
  });
};

export const fetchCoinAggregate = (name, convertion, callBack) => dispatch => {
  dispatch(fetching());
  baseInstance.get('/api/data/coinsnapshot', { params: {
    fsym: name,
    tsym: convertion,
  },
  })
  .then((resp) => dispatch(coinAggreagationAction(resp.data.Data)))
  .then(() => callBack())
  .catch((error) => {
    console.log(error);
  });
};

export const fetchPriceHistory = (fsym, tsym, e, callBack) => dispatch => {
  dispatch(fetching());
  baseMiniInstance.get('/data/histohour', {
    params: {
      fsym,
      tsym,
      e,
      limit: 10,
      aggregate: 30,
    },
  })
  .then((resp) => dispatch(coinPriceHistoryAction(resp.data)))
  .then(() => callBack())
  .catch((error) => console.log(error));
};
