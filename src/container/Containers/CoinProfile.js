import { connect } from 'react-redux';
import CoinProfile from '../CoinProfile';
import { coinProfileFetch } from '../../actions/coinProfile';

const mapStateToProps = (state, ownProps) => ({
  coinProfile: state.coinProfile,
  loading: state.activeCalls > 0
})

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: (id, callBack) => dispatch(coinProfileFetch(id, callBack))
})

export default connect(mapStateToProps, mapDispatchToProps)(CoinProfile)
