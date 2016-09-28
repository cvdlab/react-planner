import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducer';

export default function initStore(dependencies = {}) {
  let middlewares = compose(
    applyMiddleware(thunk.withExtraArgument(dependencies)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
  return createStore(reducers, null, middlewares);
}
