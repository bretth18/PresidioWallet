import { combineReducers } from 'redux';
import { homeReducer } from './homeReducer';
import { navReducer } from './navReducer';

const rootReducer = combineReducers({
  home: homeReducer
});

export default rootReducer;
