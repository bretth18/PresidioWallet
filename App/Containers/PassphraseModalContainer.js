'use strict';
/* container binds action creators and inject state/dispatchers as props */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PassphraseModal from '../Components/PassphraseModal';
import * as HomeActions from '../Actions/homeActions';


class HomeContainer extends Component {
  render() {
    return (
      <PassphraseModal {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    walletObject: state.home.walletObject,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeContainer);
