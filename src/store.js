import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
 
import reducers from '../src/reducers/index' //Import the reducer
 
// Connect our store to the reducers
export const store = createStore(reducers, applyMiddleware(thunk));
export const perstor = persistStore(store)