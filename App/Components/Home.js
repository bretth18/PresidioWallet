import {
 View,
 Text,
 ListView,
 TextInput,
 AsyncStorage,
 Alert,
 ActionSheetIOS,
 NetInfo } from 'react-native';


import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { Container, Content,  Header, Footer, FooterTab, Title, Icon, Button, Card, CardItem} from 'native-base';
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
  componentDidMount() {
    // this.displayPassphrase();
    this.getBTCPrice().done();
    // this.updateAsyncStorage(this.props.walletObject.passphrase);
    // console.log('reached');
    // this.getWalletData().done();
  }

  updateAsyncStorage(passphrase) {
    AsyncStorage.setItem('walletPhrase', passphrase, (error) => {
      if (error) {
        console.log('failed to update Async with new wallet phrase:', error);
      } else {
        console.log('new wallet phrase set in Async:', passphrase);
      }
    });
  }



  async getWalletData() {
    try {
      const walletPhrase = await AsyncStorage.getItem('walletPhrase');
      if (walletPhrase === null) {
        // create a wallet

        /* NOTE: THIS SHOULD TRIGGER USER DISPLAY OF PASSPHRASE -- METHOD WILL CHANGE */
        let walletObject = BitcoinHandler.createWallet();
        let keyAddress = walletObject.privateKey.getAddress();
        // update redux store
        this.props.getAddress(keyAddress);
        this.props.setWalletObject(walletObject);
        this.updateAsyncStorage(walletObject.passphrase);
        // store in async
        console.log('reached');
        // AsyncStorage.setItem('walletPhrase', walletObject.passphrase, (error) => {
        //   if (error) {
        //     console.log('failed to update Async with new wallet phrase:', error);
        //   } else {
        //     console.log('new wallet phrase set in Async:', walletObject.passphrase);
        //   }
        // });
      } else if (walletPhrase != null) {
        /* NOTE: should probably implement some checks here */
        let asyncWalletPhrase = walletPhrase;

        /* rebuild wallet object and place in redux store */
        let walletObject = BitcoinHandler.reOpenWallet(asyncWalletPhrase);
        // update store
        this.props.getAddress(walletObject.privateKey.getAddress());
        this.props.setWalletObject(walletObject);

        console.log('updated address based on async phrase', this.props.currentAddress);
      }
    } catch (error) {
      console.warn('ERROR RETRIEVING FROM ASYNC', error);
    }
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
    Actions.PassphraseModalContainer();
  }

  testTransaction() {
    let passPhrase = BitcoinHandler.generatePassphrase();
    BitcoinHandler.generatePrivateKey(passPhrase);
  }

  showMyActionSheet() {
    var BUTTONS = [
      'Copy',
      'Cancel',
    ];
    var CANCEL_INDEX = 1;
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });
  }

  render() {
    console.log('home props',this.props);
    let fooBar;
    let imageCode;
    // if (this.props.walletObject) {
    //    fooBar = <Button onPress={Actions.PassphraseModalContainer()} small block > Try Me  </Button>;
    //
    // }

    if (this.props.currentAddress) {
      imageCode =
      <Card style={{alignItems: 'center'}}>
        <CardItem>
        <QRCode
          value={this.props.currentAddress}
          size={200}
          bgColor='black'
          fgColor='white'
          style={{position: 'center' }} />
      </CardItem>
      </Card>
      ;
    }
    console.log('render ', this.props.currentAddress);
    return (
      <Container>

        <Header >
            <Title>PresidioWallet</Title>

        </Header>

        <Content>
          <Card>
            <CardItem>
              <Text> Current BTC/USD: {this.props.currentBTCPrice} </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text > Address: {this.props.currentAddress} </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text> Balance: {this.props.currentBalance} </Text>
            </CardItem>
          </Card>
          <Button medium block rounded onPress={this.getWalletBalance()} > Send BTC </Button>
          <Button medium block rounded > Recieve BTC </Button>
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
