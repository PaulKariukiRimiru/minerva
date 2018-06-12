import { COIN_PROFILE_FETCHED } from '../constants/actions';
import { baseInstance } from '../constants/axiosInstance';
import { fetching } from './calls';

const coinProfileAction = (payload) => ({
  type: COIN_PROFILE_FETCHED,
  payload,
});

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
