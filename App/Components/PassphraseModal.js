import { View  } from 'react-native';


import React, { Component } from 'react';
import { Container, Content, ListItem, List, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

class PassphraseModal extends Component {

  constructor(props) {
    super(props);

    // this.dismissModal = this.dismissModal.bind(this);

  }

  componentDidMount() {
    // this.state = { hide: this.props.hide };
  }

  dismissModal() {
    Actions.pop();
  }


  render() {
    // if () {
    //   return (
    //     <View>
    //     </View>
    //   );
    // } else {
      let phraseArray = this.props.walletObject.passphrase.split(' ');

      // this is LITERALLY the least effective way to do this
      return (
        <Container>
          <Content>
            <Text> Copy this passphrase down and keep it hidden! </Text>
            <List>
                <ListItem >
                  <Text>{phraseArray[0]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{phraseArray[1]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{phraseArray[2]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{phraseArray[3]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{phraseArray[4]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{phraseArray[5]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{phraseArray[6]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{phraseArray[7]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{phraseArray[8]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{phraseArray[9]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{phraseArray[10]}</Text>
                </ListItem>
                <ListItem >
                  <Text>{phraseArray[11]}</Text>
                </ListItem>
              </List>

              <Button
                onPress={Actions.pop()}
                title="Ok, I wrote it down"
                color="#841548"
                accessibilityLabel="I WROTE IT DOWN"
              />

          </Content>
        </Container>
      );
    }
  }


module.exports = PassphraseModal;
