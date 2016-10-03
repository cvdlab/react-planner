'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initStore;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initStore() {
  var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var customReducer = arguments[1];

  var middlewares = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default.withExtraArgument(dependencies)), window.devToolsExtension ? window.devToolsExtension() : function (f) {
    return f;
  });

  var reducer = function reducer(state, action) {
    var nextState = (0, _reducer2.default)(state, action);
    return customReducer(nextState, action);
  };

  return (0, _redux.createStore)(reducer, null, middlewares);
}