'use strict';

import ActionTypes from '../Constants/ActionTypes';

const initialState = {
  btcPrice: null,

};

export function homeReducer(state = initialState, action) {

  console.log(action);
  switch(action.type) {

    case ActionTypes.getAddress:
      return { ...state };



    default:
      return state;

    }
}
