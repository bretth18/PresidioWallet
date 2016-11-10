import {
 View,
 Button } from 'react-native';


import React, { Component } from 'react';
import { Container, Content, ListItem, List, Text } from 'native-base';


class PassphraseModal extends Component {

  constructor(props) {
    super(props);

    this.dismissModal = this.dismissModal.bind(this);

  }

  componentDidMount() {
    this.state = { hide: this.props.hide };
  }

  dismissModal() {
    this.setState({hide: true});
  }


  render() {
    if (this.state.hide) {
      return (
        <View>
        </View>
      );
    } else {
      // this is LITERALLY the least effective way to do this
      return (
        <Container>
          <Content>
            <Text> Copy this passphrase down and keep it hidden! </Text>
            <List>
                <ListItem >
                  <Text>{this.props.passphrase[0]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{this.props.passphrase[1]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{this.props.passphrase[2]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{this.props.passphrase[3]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{this.props.passphrase[4]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{this.props.passphrase[5]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{this.props.passphrase[6]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{this.props.passphrase[7]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{this.props.passphrase[8]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{this.props.passphrase[9]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{this.props.passphrase[10]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{this.props.passphrase[11]}</Text>
                </ListItem>
              </List>

              <Button
                onPress={this.dismissModal().bind(this)}
                title="Ok, I wrote it down"
                color="#841548"
                accessibilityLabel="I WROTE IT DOWN"
              />

          </Content>
        </Container>
      );
    }
  }
}

module.exports = PassphraseModal;
