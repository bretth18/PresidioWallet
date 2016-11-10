'use strict';
/* Router component */
import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import store from './Store/Store';
import { Router, Scene, Modal } from 'react-native-router-flux';

import HomeContainer from './Containers/HomeContainer';
import PassphraseModal from './Components/PassphraseModal';

const RouterWithRedux = connect()(Router);


class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <RouterWithRedux>
          <Scene key="modal" component={Modal} >
            <Scene key="root">
              <Scene key="HomeContainer"
                 component={HomeContainer} title="HomeContainer" initial={true} hideNavBar />
            </Scene>
            <Scene key="PassphraseModal" component={PassphraseModal} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}



module.exports = App;
