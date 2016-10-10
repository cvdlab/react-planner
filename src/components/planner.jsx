import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';

import App from './app';
import initStore from '../reducers/store';
import autosave from '../autosave';
import keyboard from '../keyboard';
import Catalog from './../catalog/catalog';
import mergePlugins from '../utils/merge-plugins';


export default class Planner extends Component {

  constructor(props) {
    super(props);
    let {plugins} = props;
    this.state = {... mergePlugins(plugins)};
  }

  componentWillMount() {
    let {catalog} = this.props;
    let {customReducer, onReady} = this.state;

    let store = initStore({catalog}, customReducer);
    autosave(store);
    keyboard(store);
    onReady(store);
    this.store = store;
  }

  render() {
    let {store} = this;
    let {catalog} = this.props;
    let {toolbarButtons, customContents, customActions} = this.state;

    customActions = bindActionCreators(customActions, store.dispatch);

    return (
      <App
        store={store}
        catalog={catalog}
        toolbarButtons={toolbarButtons}
        customContents={customContents}
        customActions={customActions}/>
    )
  }
}

Planner.propTypes = {
  catalog: PropTypes.instanceOf(Catalog),
  plugins: PropTypes.arrayOf(PropTypes.object)
};

Planner.defaultProps = {
  catalog: new Catalog(),
  plugins: []
};
