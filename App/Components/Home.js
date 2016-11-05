import {
 View,
 Text,
 ListView,
 TextInput,
 AsyncStorage,
 Alert,
 NetInfo } from 'react-native';

 import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { Header, Footer, Title, Icon, Button} from 'native-base';

/*btc*/
import '../../shim';
import Bitcoin from 'react-native-bitcoinjs-lib';

class Home extends Component {
  constructor(props) {
    super(props);
  }


  componentWillMount(){

  }

  componentDidMount() {

  }

  render() {
    let bitcoinPrice = null;
    const keypair = Bitcoin.ECPair.makeRandom();
    let bitcoinAddress = keypair.getAddress();
    return (
      <View >
        <Text> This is the home Component </Text>
        <Text> {bitcoinPrice} </Text>
        <Text> Address: {bitcoinAddress} </Text>
        <Button small block > Send BTC </Button>
        <Button small block > Recieve BTC </Button>

      </View>
    );
  }
}
