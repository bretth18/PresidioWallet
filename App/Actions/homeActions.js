'use strict';

import ActionTypes from '../Constants/ActionTypes';

// * New */
export function getAddress() {
  return {
    type: ActionTypes.getAddress
  };
}
