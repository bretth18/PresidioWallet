'use strict';

import ActionTypes from '../Constants/ActionTypes';

const initialState = {
  currentBTCPrice: null,
  currentAddress: null,
  walletObject: null,

};

export function homeReducer(state = initialState, action) {
  let currentBTCPrice, currentAddress, walletObject, currentBalance;
  console.log(action);
  switch(action.type) {

    case ActionTypes.getAddress:
      currentAddress = action.currentAddress;
      return {
        ...state,
        currentAddress: currentAddress
      };


    case ActionTypes.setCurrentPrice:
      currentBTCPrice = action.currentBTCPrice;
      return {
        ...state,
        currentBTCPrice: currentBTCPrice,
      };

    case ActionTypes.setWalletObject:
      walletObject = action.walletObject;
      return {
        ...state,
        walletObject: walletObject
      };

    case ActionTypes.setBalance:
      currentBalance= action.currentBalance;
      return {
        ...state,
        currentBalance: currentBalance
      };

    default:
      return state;

    }
}
