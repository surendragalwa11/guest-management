import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import reducer from '../reducers';

const middleware = applyMiddleware(thunk, logger);
const compose = composeWithDevTools(middleware)
const store = createStore(reducer, compose);

export default store;
