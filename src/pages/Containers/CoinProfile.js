import { connect } from 'react-redux';
import CoinProfile from '../CoinProfile';
import { coinProfileFetch } from '../../actions/coinProfile';
import { fetchCoinSocial } from '../../actions/coinSocial';

const mapStateToProps = (state, ownProps) => ({
  coinProfile: state.coinProfile,
  coinSocials: state.coinSocial,
  loading: state.activeCalls > 0
})

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: (id, callBack) => dispatch(coinProfileFetch(id, callBack)),
  fetchSocials: (id, callBack) => dispatch(fetchCoinSocial(id, callBack))
})

export default connect(mapStateToProps, mapDispatchToProps)(CoinProfile)
