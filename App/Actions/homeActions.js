'use strict';

import ActionTypes from '../Constants/ActionTypes';

// * New */
export function getAddress(addressData) {
  return {
    type: ActionTypes.getAddress,
    currentAddress: addressData
  };
}

export function setCurrentPrice(currentBTCPrice) {
  return {
    type: ActionTypes.setCurrentPrice,
    currentBTCPrice: currentBTCPrice
  };
}

export function setWalletObject(walletObject) {
  return {
    type: ActionTypes.setWalletObject,
    walletObject: walletObject,
  };
}

export function setBalance(currentBalance) {
  return {
    type: ActionTypes.setBalance,
    currentBalance: currentBalance,
  };
}
