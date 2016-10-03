import React, {PropTypes, Component} from 'react';

import App from './app.jsx';
import initStore from '../reducers/store';
import autosave from '../autosave';
import keyboard from '../keyboard';
import Catalog from './../catalog/catalog';

export default class Planner extends Component {

  componentWillMount() {
    let {catalog, onReady, customReducer} = this.props;
    let store = initStore({catalog}, customReducer);
    autosave(store);
    keyboard(store);
    onReady(store);
    this.store = store;
  }

  render() {
    let {store} = this;
    let {catalog, toolbarButtons, customContents} = this.props;

    return (
      <App store={store} catalog={catalog} toolbarButtons={toolbarButtons} customContents={customContents}/>
    )
  }
}

Planner.propTypes = {
  catalog: PropTypes.instanceOf(Catalog),
  toolbarButtons: PropTypes.array,
  customContents: PropTypes.object,
  customReducer: PropTypes.func,
  onReady: PropTypes.func,
};

Planner.defaultProps = {
  catalog: new Catalog(),
  toolbarButtons: [],
  customContents: {},
  onReady: () => {
  },
  customReducer: (state) => {
    return state;
  }
};
