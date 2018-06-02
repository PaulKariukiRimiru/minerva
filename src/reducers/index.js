import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import users from './users';

const rootConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
 users
});

const persistedReducer = persistReducer(rootConfig, rootReducer);

export default persistedReducer;