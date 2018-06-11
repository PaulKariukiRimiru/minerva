import { combineReducers } from 'redux';
import users from './users';
import coin from './coin';
import coinProfile from './coinProfile';
import activeCalls from './activeCalls';
import coinSocial from './coinSocial';

const rootReducer = combineReducers({
 users,
 coin,
 coinProfile,
 activeCalls,
 coinSocial
});

export default rootReducer;