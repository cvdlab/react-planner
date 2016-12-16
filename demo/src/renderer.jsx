import React from 'react';
import ReactDOM from 'react-dom';
import ContainerDimensions from 'react-container-dimensions';
import {Map} from 'immutable';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import MyCatalog from './catalog/mycatalog';

import {
  Models as PlannerModels,
  reducer as PlannerReducer,
  ReactPlanner,
  Plugins as PlannerPlugins,
} from '../../src'; //react-planner

//define state
let AppState = Map({
  'react-planner': new PlannerModels.State()
});
let stateExtractor = state => state.get('react-planner');

//define reducer
let reducer = (state, action) => {
  state = state || AppState;
  state = state.update('react-planner', plannerState => PlannerReducer(plannerState, action));
  return state;
};

//init store
let store = createStore(reducer, null, window.devToolsExtension ? window.devToolsExtension() : f => f);
PlannerPlugins.Keyboard(store, stateExtractor);
PlannerPlugins.Autosave(store, stateExtractor, 'react-planner_v0');
PlannerPlugins.ConsoleDebugger(store, stateExtractor);

ReactDOM.render(
  (
    <Provider store={store}>
      <ContainerDimensions>
        {({width, height}) =>
          <ReactPlanner
            catalog={MyCatalog}
            width={width}
            height={height}
            stateExtractor={stateExtractor}
          />
        }
      </ContainerDimensions>
    </Provider>
  ),

  document.getElementById('app')
);

