'use strict';


import Bitcoin from 'react-native-bitcoinjs-lib';


// api to handle external requests


// TODO: fix with params
async getWalletBalance(currentAddress) {
  // ugly
  try {
    const apiUrl = 'https://api.blockcypher.com/v1/btc/main/addrs/' + currentAddress + '/balance';
    let response = await fetch(apiUrl);
    let responseJson = await response.json();
    console.log('balance data for: ' + currentAddress, responseJson);
    // update store
    // this.props.setBalance(responseJson.balance);

    return responseJson;
  } catch(error) {
    console.error(error);
  }
}

// pulls latest BTC/USD PRICE
/* TODO: Implement ALL curreny */
// param currency must be implemented in caps
async getBTCPrice(currency) {
  try {
    const apirUrl = 'https://blockchain.info/ticker';
    let response = await fetch(apirUrl);
    let responseJson = await response.json();
    // refactor syntax checking
    console.log(currency + ' PRICE:', responseJson.currency.last);
    // this.props.setCurrentPrice(responseJson.USD.last);
  } catch(error) {
    console.warn(error);
  }
}
