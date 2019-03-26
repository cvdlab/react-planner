# react-planner

*react-planner* is a [React][react] component which can be used to draw model buildings. Drag & drop from a catalog of customizable and ready-to-use objects, you can start from 2D wireframes and land on 3D models. As a developer you can provide your users with new objects by adding them to the catalog.

[![npm][npm_label]][npm_link]
![javascript][js]
![react-version][react_version]

## Demo

[Demo][demo]

[![react-planner][preview_image]][demo]

## Usage

``` es6
import React from 'react';
import ReactDOM from 'react-dom';
import {Map} from 'immutable';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

//download this demo catalog https://github.com/cvdlab/react-planner/tree/master/demo/src/catalog
import MyCatalog from './catalog/mycatalog';

import {
  Models as PlannerModels,
  reducer as PlannerReducer,
  ReactPlanner,
  Plugins as PlannerPlugins,
} from 'react-planner';


//define state
let AppState = Map({
  'react-planner': new PlannerModels.State()
});

//define reducer
let reducer = (state, action) => {
  state = state || AppState;
  state = state.update('react-planner', plannerState => PlannerReducer(plannerState, action));
  return state;
};

let store = createStore(reducer, null, window.devToolsExtension ? window.devToolsExtension() : f => f);

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave('react-planner_v0'),
  PlannerPlugins.ConsoleDebugger(),
];

//render
ReactDOM.render(
  (
    <Provider store={store}>
      <ReactPlanner
        catalog={MyCatalog}
        width={800}
        height={600}
        plugins={plugins}
        stateExtractor={state => state.get('react-planner')}
      />
    </Provider>
  ),
  document.getElementById('app')
);

```

## Docs

- [Create a Property](docs/HOW_TO_CREATE_A_PROPERTY.md)
- [Create a Catalog](docs/HOW_TO_CREATE_A_CATALOG.md)
- [Create a Catalog's Element](docs/HOW_TO_CREATE_AN_ELEMENT.md)

## Authors

- [chrvadala](https://github.com/chrvadala)
- [danilosalvati](https://github.com/danilosalvati)
- [enricomarino](https://github.com/enricomarino)
- [federicospini](https://github.com/federicospini)
- [alessiocarrafa](https://github.com/alessiocarrafa)
- [stefanoperrone](https://github.com/stefanoperrone)

Developed @ [CVDLAB][cvdlab]

## Contributing

Your contributions (issues and pull request) are very appreciated!

## Contributors

 - [JikkuJose](https://github.com/JikkuJose)
 - [Yeri-Kim](https://github.com/Yeri-Kim)
 - [lucacastoro](https://github.com/lucacastoro)
 - [cbosse-skwirrel](https://github.com/cbosse-skwirrel)
 - [JaccoGoris](https://github.com/JaccoGoris)

## License

MIT

[react]: https://facebook.github.io/react/
[npm_label]: https://img.shields.io/npm/v/react-planner.svg?maxAge=2592000?style=plastic
[npm_link]: https://www.npmjs.com/package/react-planner
[js]: https://img.shields.io/badge/javascript-ES6-fbde34.svg
[react_version]: https://img.shields.io/badge/react%20version-16.0.0%20or%20later-61dafb.svg
[preview_image]: https://raw.githubusercontent.com/cvdlab/react-planner/master/preview.png
[demo]: https://cvdlab.github.io/react-planner
[cvdlab]: http://cvdlab.org/
