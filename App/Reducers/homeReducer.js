'use strict';

import ActionTypes from '../Constants/ActionTypes';

const initialState = {
  btcPrice: null,

};

export function homeReducer(state = initialState, action) {
  let btcPrice;
  console.log(action);
  switch(action.type) {

    case ActionTypes.getAddress:
      return {
        ...state
      };


    case ActionTypes.getCurrentPrice:
      return {
        ...state,
        btcPrice: btcPrice,
      };
    default:
      return state;

    }
}
