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

  }

  componentDidMount() {

  }

  render() {
    let bitcoinPrice = null;
    const keypair = Bitcoin.ECPair.makeRandom();
    let bitcoinAddress = keypair.getAddress();
    return (
      <Container>

        <Header >
            <Title>PresidioWallet</Title>

        </Header>

        <Content >
          <Text> This is the home Component </Text>
          <Text> {bitcoinPrice} </Text>
          <Text> Address: {bitcoinAddress} </Text>
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
