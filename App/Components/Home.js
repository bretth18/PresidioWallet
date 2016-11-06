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
import '../../shim';
import Bitcoin from 'react-native-bitcoinjs-lib';

class Home extends Component {
  constructor(props) {
    super(props);
  }


  componentWillMount(){
    this.getLocalAddress().done();

  }

  async getLocalAddress() {
    try {
      console.log('try hit');
      const walletAddress = await AsyncStorage.getItem('walletAddress');
      if (walletAddress === null) {
        const keypair = Bitcoin.ECPair.makeRandom();
        let walletAddress = keypair.getAddress();

        AsyncStorage.setItem('walletAddress', walletAddress, (error) => {
          if (error) {
            console.log('failed to update Async with new address: ', error);
          } else {
            console.log('new wallet address set in Async: ', walletAddress);
          }
        });
        this.props.getAddress(walletAddress);
        console.log('ADRESS FROM ASYNC', walletAddress);
      } else if (walletAddress != null) {
        this.props.getAddress(walletAddress);
        console.log('ADRESS FROM ASYNC', walletAddress);
      }
    } catch (error) {
      // alert error
      console.log('error retrieving from async: ', error);
      console.log('generating new address...');
      const keypair = Bitcoin.ECPair.makeRandom();
      let walletAddress = keypair.getAddress();

      AsyncStorage.setItem('walletAddress', walletAddress, (error) => {
        if (error) {
          console.log('failed to update Async with new address: ', error);
        } else {
          console.log('new wallet address set in Async: ', walletAddress);
        }
      });
    }
  }
  componentDidMount() {
    this.getLocalAddress().done();

  }

  testTransaction() {

  }

  render() {
    console.log('home props',this.props);
    let bitcoinPrice = null;
    let bitcoinAddress = this.props.currentAddress;
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
