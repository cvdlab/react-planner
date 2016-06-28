"use strict";

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as projectActions from '../actions/project';
import * as viewer2dActions from '../actions/viewer2d';

class App extends React.Component {
  render() {
    return <div></div>
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    projectActions: bindActionCreators(Object.assign({}, projectActions), dispatch),
    viewer2dActions: bindActionCreators(Object.assign({}, viewer2dActions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
