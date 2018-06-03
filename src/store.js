import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../src/reducers/index' //Import the reducer
 
// Connect our store to the reducers
export const store = createStore(reducers, applyMiddleware(thunk));