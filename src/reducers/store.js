import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducer';

export default function initStore(extraArgument = {}, customReducer) {
  let middlewares = compose(
    applyMiddleware(thunk.withExtraArgument(extraArgument)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  let reducer = (state, action) => {
    let nextState = reducers(state, action);
    return customReducer(nextState, action);
  };

  return createStore(reducer, null, middlewares);
}
