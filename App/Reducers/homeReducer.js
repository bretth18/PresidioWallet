'use strict';

import ActionTypes from '../Constants/ActionTypes';

const initialState = {
  btcPrice: null,
  currentAddress: null,

};

export function homeReducer(state = initialState, action) {
  let btcPrice, currentAddress;
  console.log(action);
  switch(action.type) {

    case ActionTypes.getAddress:
      currentAddress = action.currentAddress;
      return {
        ...state,
        currentAddress: currentAddress
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
