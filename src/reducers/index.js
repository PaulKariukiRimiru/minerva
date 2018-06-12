import { combineReducers } from 'redux';
import users from './users';
import coin from './coin';
import coinProfile from './coinProfile';
import activeCalls from './activeCalls';
import coinSocials from './coinSocials';

const rootReducer = combineReducers({
 users,
 coin,
 coinProfile,
 activeCalls,
 coinSocials,
});

export default rootReducer;
