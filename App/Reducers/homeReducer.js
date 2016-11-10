'use strict';

import ActionTypes from '../Constants/ActionTypes';

const initialState = {
  btcPrice: null,
  currentAddress: null,
  walletObject: null,

};

export function homeReducer(state = initialState, action) {
  let btcPrice, currentAddress, walletObject;
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

    case ActionTypes.setWalletObject:
      walletObject = action.walletObject;
      return {
        ...state,
        walletObject: walletObject
      };
      
    default:
      return state;

    }
}
