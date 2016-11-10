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

/*btc*/
import Bitcoin from 'react-native-bitcoinjs-lib';
import * as BitcoinHandler from '../Bitcoin/BitcoinHandler';

class Home extends Component {
  constructor(props) {
    super(props);
  }


  componentWillMount(){
    this.getWalletData().done();

    // this.testTransaction();
  }

  generatePassword() {

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

    // console.log('reached');
    // this.getWalletData().done();
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
    let bitcoinPrice = null;
    let bitcoinAddress = this.props.currentAddress;
    if (this.props.walletObject) {
      this.displayPassphrase();
    }
    console.log('render ', this.props.currentAddress);
    return (
      <Container>

        <Header >
            <Title>PresidioWallet</Title>

        </Header>

        <Content >
          <Text> This is the home Component </Text>
          <Text> {bitcoinPrice} </Text>
          <Text> Address: {this.props.currentAddress} </Text>
          <Button small block > Send BTC </Button>
          <Button small block > Recieve BTC </Button>
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
