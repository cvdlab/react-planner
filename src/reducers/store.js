import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducer';

export default function initStore(dependencies = {}, customReducer) {
  let middlewares = compose(
    applyMiddleware(thunk.withExtraArgument(dependencies)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  let reducer = (state, action) => {
    let nextState = reducers(state, action);
    return customReducer(nextState, action);
  };

  return createStore(reducer, null, middlewares);
}
