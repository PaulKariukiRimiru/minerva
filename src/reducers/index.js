import { combineReducers } from 'redux';
import users from './users';
import coin from './coin';
import coinProfile from './coinProfile';
import activeCalls from './activeCalls';

const rootReducer = combineReducers({
 users,
 coin,
 coinProfile,
 activeCalls
});

export default rootReducer;