import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';

import App from './app';
import initStore from '../reducers/store';
import keyboard from '../keyboard';
import autosave from '../autosave';
import Catalog from './../catalog/catalog';
import Translator from '../translator/translator';
import mergePlugins from '../utils/merge-plugins';


export default class Planner extends Component {

  constructor(props) {
    super(props);
    let {plugins} = props;
    this.state = {... mergePlugins(plugins)};
  }

  componentWillMount() {
    let {catalog, autosaveKey, autosaveDelay} = this.props;
    let {customReducer, actionsExtraArgument, onReady} = this.state;

    let store = initStore({...actionsExtraArgument, catalog}, customReducer);
    keyboard(store);
    autosave(store, autosaveKey, autosaveDelay);
    onReady(store);
    this.store = store;
  }

  render() {
    let {store} = this;
    let {catalog, translator, width, height} = this.props;
    let {toolbarButtons, customContents, customActions} = this.state;

    customActions = bindActionCreators(customActions, store.dispatch);

    return (
      <App
        store={store}
        catalog={catalog}
        toolbarButtons={toolbarButtons}
        customContents={customContents}
        customActions={customActions}
        width={width}
        height={height}
        allowProjectFileSupport={this.props.allowProjectFileSupport}
        translator={translator}
      />
    )
  }
}

Planner.propTypes = {
  translator: PropTypes.instanceOf(Translator),
  catalog: PropTypes.instanceOf(Catalog),
  plugins: PropTypes.arrayOf(PropTypes.object),
  allowProjectFileSupport: PropTypes.bool,
  autosaveKey: PropTypes.string,
  autosaveDelay: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

Planner.defaultProps = {
  translator: new Translator(),
  catalog: new Catalog(),
  plugins: [],
  allowProjectFileSupport: true,
  autosaveKey: null,
  autosaveDelay: null,
};
