const ActionTypes = {
  // transaction actions
  sendBTC: 'SEND_BTC',
  recieveBTC: 'RECIEVE_BTC',

  // currency actions
  currentPriceChecking: 'CURRENT_PRICE_CHECKING',
  currentPriceChecked: 'CURRENT_PRICE_CHECKED',
  getCurrentPrice: 'GET_CURRENT_PRICE',

  // wallet actions
  getAddress: 'GET_ADDRESS',
  checkingAddress: 'CHECKING_ADDRESS',
  checkedAddress: 'CHECKED_ADDRESS',
  setWalletObject: 'SET_WALLET_OBJECT',



};


export default ActionTypes;
