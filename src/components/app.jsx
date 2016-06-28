"use strict";

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactDimensions from 'react-dimensions';

import * as projectActions from '../actions/project';
import * as viewer2dActions from '../actions/viewer2d';


class App extends React.Component {
  render() {
    let {containerWidth, containerHeight, ...props} = this.props;
    return <div width={containerWidth} height={containerHeight} {...props}></div>;
  }
}

function mapStateToProps(state) {
  return {state};
}

function mapDispatchToProps(dispatch) {
  return {
    projectActions: bindActionCreators(Object.assign({}, projectActions), dispatch),
    viewer2dActions: bindActionCreators(Object.assign({}, viewer2dActions), dispatch)
  }
}


App = connect(mapStateToProps, mapDispatchToProps)(App);
App = ReactDimensions()(App);
export default App;
