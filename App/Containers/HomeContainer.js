'use strict';
/* container binds action creators and inject state/dispatchers as props */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from '../Components/Home';
import * as HomeActions from '../Actions/homeActions';


class HomeContainer extends Component {
  render() {
    return (
      <Home {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    //home: state.home.etc
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps);
