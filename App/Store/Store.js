'use strict';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../Reducers/rootReducer';

const logger = createLogger();
const middleware = [thunk, logger];


const store = compose(applyMiddleware(...middleware))(createStore)(rootReducer);

export default store;
