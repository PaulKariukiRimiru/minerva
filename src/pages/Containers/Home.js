import { connect } from 'react-redux';
import Home from '../Home';
import {
  coinListFetch, fetchCoinPrices,
} from '../../actions/coin';

const mapStateToProps = (state, ownProps) => ({
  coin: state.coin,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoinList: (callBack) => {
    dispatch(coinListFetch(callBack));
  },
  fetchPrices: (coinList, callBack) => {
    dispatch(fetchCoinPrices(coinList, callBack));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
