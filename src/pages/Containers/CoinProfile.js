import { connect } from 'react-redux';
import CoinProfile from '../CoinProfile/Component';
import { coinProfileFetch, fetchCoinAggregate, fetchPriceHistory } from '../../actions/coinProfile';
import { fetchCoinSocials } from '../../actions/coinSocial';

const mapStateToProps = (state, ownProps) => ({
  coinProfile: state.coinProfile.profile,
  coinAggregate: state.coinProfile.aggregate,
  coinHistory: state.coinProfile.history,
  coinSocials: state.coinSocials,
  loading: state.activeCalls > 0,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: (id, callBack) => dispatch(coinProfileFetch(id, callBack)),
  fetchAggregate: (name, convertion, callBack) => dispatch(fetchCoinAggregate(name, convertion, callBack)),
  fetchSocials: (id, callBack) => dispatch(fetchCoinSocials(id, callBack)),
  fetchPriceHistory: (from, to, convertion, callBack) => dispatch(fetchPriceHistory(from, to, convertion, callBack)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinProfile);
