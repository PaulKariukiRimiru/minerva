import { combineReducers } from 'redux';
import users from './users';
import coin from './coin';


const rootReducer = combineReducers({
 users,
 coin
});

export default rootReducer;