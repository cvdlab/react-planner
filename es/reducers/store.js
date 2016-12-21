import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducer';

export default function initStore() {
  var extraArgument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var customReducer = arguments[1];

  var middlewares = compose(applyMiddleware(thunk.withExtraArgument(extraArgument)), window.devToolsExtension ? window.devToolsExtension() : function (f) {
    return f;
  });

  var reducer = function reducer(state, action) {
    var nextState = reducers(state, action);
    return customReducer(nextState, action);
  };

  return createStore(reducer, null, middlewares);
}