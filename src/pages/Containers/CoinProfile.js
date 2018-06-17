import { connect } from 'react-redux';
import CoinProfile from '../CoinProfile/Component';
import { coinProfileFetch, fetchCoinAggregate } from '../../actions/coinProfile';
import { fetchCoinSocials } from '../../actions/coinSocial';

const mapStateToProps = (state, ownProps) => ({
  coinProfile: state.coinProfile.profile,
  coinAggregate: state.coinProfile.aggregate,
  coinSocials: state.coinSocials,
  loading: state.activeCalls > 0,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: (id, callBack) => dispatch(coinProfileFetch(id, callBack)),
  fetchAggregate: (name, convertion, callBack) => dispatch(fetchCoinAggregate(name, convertion, callBack)),
  fetchSocials: (id, callBack) => dispatch(fetchCoinSocials(id, callBack)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinProfile);
