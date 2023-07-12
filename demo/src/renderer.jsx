import React from 'react';
import { createRoot } from 'react-dom/client';
import { SizeMe } from 'react-sizeme'
import Immutable, { Map } from 'immutable';
import immutableDevtools from 'immutable-devtools';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MyCatalog from './catalog/mycatalog';

import ToolbarScreenshotButton from './ui/toolbar-screenshot-button';

import {
  Models as PlannerModels,
} from 'react-planner/models';
import {
  reducer as PlannerReducer,
} from 'react-planner/reducers';
import {
  Plugins as PlannerPlugins,
} from 'react-planner/plugins';
import {
  ReactPlannerWrapper as ReactPlanner,
} from 'react-planner';

// Define state
let AppState = Map({
  'react-planner': new PlannerModels.State()
});

// Define reducer
let reducer = (state, action) => {
  state = state || AppState;
  state = state.update('react-planner', plannerState => PlannerReducer(plannerState, action));
  return state;
};

let blackList = isProduction === true ? [] : [
  'UPDATE_MOUSE_COORDS',
  'UPDATE_ZOOM_SCALE',
  'UPDATE_2D_CAMERA'
];

if (!isProduction) {
  console.info('Environment is in development and these actions will be blacklisted', blackList);
  console.info('Enable Chrome custom formatter for Immutable pretty print');
  immutableDevtools(Immutable);
}

// Init store
let store = createStore(
  reducer,
  null,
  !isProduction && window.devToolsExtension ?
    window.devToolsExtension({
      features: {
        pause: true,
        lock: true,
        persist: true,
        export: true,
        import: 'custom',
        jump: true,
        skip: true,
        reorder: true,
        dispatch: true,
        test: true
      },
      actionsBlacklist: blackList,
      maxAge: 999999
    }) :
    f => f
);

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave('react-planner_v0'),
  PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [
  ToolbarScreenshotButton,
];

// Render
const root = createRoot(document.getElementById('app'));

root.render(
  <Provider store={store}>
    <SizeMe>
      {({ size }) => (
        <ReactPlanner
          store={store}
          catalog={MyCatalog}
          width={size.width}
          height={size.height || 900}
          plugins={plugins}
          toolbarButtons={toolbarButtons}
          stateExtractor={state => state.get('react-planner')}
        />
      )}
    </SizeMe>
  </Provider>
);
