import { fetching } from './calls';
import { baseInstance } from '../constants/axiosInstance';
import { COIN_SOCIAL_FETCHED } from '../constants/actions';
const coinSocialsAction = (payload) => ({
  type: COIN_SOCIAL_FETCHED,
  payload: payload,
});

export const fetchCoinSocials = (id, callBack) => dispatch => {
  dispatch(fetching());
  baseInstance.get('/api/data/socialstats/', {
    params: {
      id,
    },
  })
  .then((resp) => dispatch(coinSocialsAction(resp.data.Data)))
  .then(() => callBack())
  .catch((error) => console.log(error));
};
