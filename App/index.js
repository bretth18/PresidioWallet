'use strict';

import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import store from './Store/Store';
import { Router, Scene } from 'react-native-router-flux';

import HomeContainer from './Containers/HomeContainer';

const RouterWithRedux = connect()(Router);


class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="HomeContainer"
               component={HomeContainer} title="HomeContainer" initial={true} hideNavBar />
          </Scene>

        </RouterWithRedux>
      </Provider>
    );
  }
}



module.exports = App;
