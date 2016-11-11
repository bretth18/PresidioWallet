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
import { Container, Content,  Header, Footer, FooterTab, Title, Icon, Button} from 'native-base';
import QRCode from 'react-native-qrcode';

/*btc*/
import Bitcoin from 'react-native-bitcoinjs-lib';
import * as BitcoinHandler from '../Bitcoin/BitcoinHandler';

class Home extends Component {
  constructor(props) {
    super(props);
  }


  componentWillMount(){
    this.getWalletData();

    // this.testTransaction();
  }





  async getWalletData() {
    try {
      const walletData = await AsyncStorage.getItem('walletData');
      if (walletData === null) {
        // create a wallet
        /* NOTE: THIS SHOULD TRIGGER USER DISPLAY OF PASSPHRASE -- METHOD WILL CHANGE */
        let walletObject = BitcoinHandler.createWallet();
        let keyAddress = walletObject.privateKey.getAddress();
        // update redux store
        this.props.getAddress(keyAddress);
        this.props.setWalletObject(walletObject);
        // store in async

        AsyncStorage.setItem('walletData', JSON.stringify(walletObject), (error) => {
          if (error) {
            console.log('failed to update Async with new wallet data:', error);
          } else {
            console.log('new wallet data set in Async:', walletObject);
          }
        });
      } else if (walletData != null) {
        let asyncWalletData = JSON.parse(walletData);
        console.log(asyncWalletData.wif);
        this.props.getAddress(asyncWalletData.wif.getAddress());
        console.log('updated address based on async', this.props.currentAddress);
      }
    } catch (error) {
      console.log('ERROR RETRIEVING FROM ASYNC', error);
    }
  }

  componentDidMount() {
    // this.displayPassphrase();
    this.getBTCPrice().done();
    // console.log('reached');
    // this.getWalletData().done();
  }

// requests wallet transaction/balance data
  async getWalletBalance() {
    // ugly
    try {
      const apiUrl = 'https://api.blockcypher.com/v1/btc/main/addrs/' + this.props.currentAddress + '/balance';
      let response = await fetch(apiUrl);
      let responseJson = await response.json();
      console.log('balance data for: ' + this.props.currentAddress, responseJson);
      // update store
      this.props.setBalance(responseJson.balance);

      return responseJson;
    } catch(error) {
      console.error(error);
    }
  }

// pulls latest BTC/USD PRICE
/* TODO: Implement ALL curreny */
  async getBTCPrice() {
    try {
      const apirUrl = 'https://blockchain.info/ticker';
      let response = await fetch(apirUrl);
      let responseJson = await response.json();
      console.log('USD PRICE:', responseJson.USD.last);
      this.props.setCurrentPrice(responseJson.USD.last);
    } catch(error) {
      console.warn(error);
    }
  }



  displayPassphrase() {
    let phraseArray = this.props.walletObject.passphrase.split(' ');
    Actions.PassphraseModal({passphrase: phraseArray, hide: false});
  }

  testTransaction() {
    let passPhrase = BitcoinHandler.generatePassphrase();
    BitcoinHandler.generatePrivateKey(passPhrase);
  }

  render() {
    console.log('home props',this.props);
    let fooBar;
    let imageCode;
    if (this.props.walletObject) {
       fooBar = <Button onPress={this.displayPassphrase()} small block > Try Me bitch </Button>;

    }

    if (this.props.currentAddress) {
      imageCode = <QRCode
                  value={this.props.currentAddress}
                  size={200}
                  bgColor='black'
                  fgColor='white' />;
    }
    console.log('render ', this.props.currentAddress);
    return (
      <Container>

        <Header >
            <Title>PresidioWallet</Title>

        </Header>

        <Content >
          <Text> This is the home Component </Text>
          <Text> Current BTC/USD: {this.props.currentBTCPrice} </Text>
          <Text> Address: {this.props.currentAddress} </Text>
          <Text> Balance: {this.props.currentBalance} </Text>
          <Button small block onPress={this.getWalletBalance()} > Send BTC </Button>
          <Button small block > Recieve BTC </Button>
          {imageCode}
        </Content>

        <Footer>
            <FooterTab>
                <Button>
                    Home
                    <Icon name='ios-apps-outline' />
                </Button>
                <Button>
                    Settings
                    <Icon name='ios-settings' />
                </Button>
            </FooterTab>
       </Footer>

      </Container>
    );
  }
}

module.exports = Home;
