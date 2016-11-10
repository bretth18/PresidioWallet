'use strict';

import ActionTypes from '../Constants/ActionTypes';

// * New */
export function getAddress(addressData) {
  return {
    type: ActionTypes.getAddress,
    currentAddress: addressData
  };
}

export function getCurrentPrice() {
  return {
    type: ActionTypes.getCurrentPrice
  };
}

export function setWalletObject(walletObject) {
  return {
    type: ActionTypes.setWalletObject,
    walletObject: walletObject,
  };
}
