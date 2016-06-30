"use strict";

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactDimensions from 'react-dimensions';

import * as projectActions from '../actions/project-actions';
import * as viewer2DActions from '../actions/viewer2d-actions';
import * as editingActions from '../actions/editing-actions';
import * as viewer3DActions from '../actions/viewer3d-actions';
import Layout from './layout.jsx';


class App extends React.Component {
  render() {
    let {containerWidth, containerHeight, ...props} = this.props;
    return <Layout width={containerWidth} height={containerHeight} {...props} />;
  }
}

function mapStateToProps(state) {
  return {state};
}

function mapDispatchToProps(dispatch) {
  return {
    projectActions: bindActionCreators(Object.assign({}, projectActions), dispatch),
    viewer2DActions: bindActionCreators(Object.assign({}, viewer2DActions), dispatch),
    editingActions: bindActionCreators(Object.assign({}, editingActions), dispatch),
    viewer3DActions: bindActionCreators(Object.assign({}, viewer3DActions), dispatch)
  }
}


App = connect(mapStateToProps, mapDispatchToProps)(App);
App = ReactDimensions()(App);
export default App;
