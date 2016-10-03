"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//INIT CATALOG


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _planner = require('./components/planner.jsx');

var _planner2 = _interopRequireDefault(_planner);

var _actions = require('./actions/actions');

var _actions2 = _interopRequireDefault(_actions);

var _catalog = require('./catalog/catalog');

var _catalog2 = _interopRequireDefault(_catalog);

var _area = require('./catalog/areas/area/area');

var _area2 = _interopRequireDefault(_area);

var _door = require('./catalog/holes/door/door');

var _door2 = _interopRequireDefault(_door);

var _window = require('./catalog/holes/window/window');

var _window2 = _interopRequireDefault(_window);

var _sashWindow = require('./catalog/holes/sash-window/sash-window');

var _sashWindow2 = _interopRequireDefault(_sashWindow);

var _wall = require('./catalog/lines/wall/wall');

var _wall2 = _interopRequireDefault(_wall);

var _sofa = require('./catalog/items/sofa/sofa');

var _sofa2 = _interopRequireDefault(_sofa);

var _tv = require('./catalog/items/tv/tv');

var _tv2 = _interopRequireDefault(_tv);

var _propertyColor = require('./catalog/properties/property-color.jsx');

var _propertyColor2 = _interopRequireDefault(_propertyColor);

var _propertyEnum = require('./catalog/properties/property-enum.jsx');

var _propertyEnum2 = _interopRequireDefault(_propertyEnum);

var _propertyString = require('./catalog/properties/property-string.jsx');

var _propertyString2 = _interopRequireDefault(_propertyString);

var _propertyNumber = require('./catalog/properties/property-number.jsx');

var _propertyNumber2 = _interopRequireDefault(_propertyNumber);

var _propertyComposition = require('./catalog/properties/property-composition.jsx');

var _propertyComposition2 = _interopRequireDefault(_propertyComposition);

var _buttonX = require('./demo/buttonX.jsx');

var _buttonX2 = _interopRequireDefault(_buttonX);

var _contentX = require('./demo/contentX.jsx');

var _contentX2 = _interopRequireDefault(_contentX);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var catalog = new _catalog2.default();

catalog.registerPropertyType('color', _propertyColor2.default, _propertyColor2.default);
catalog.registerPropertyType('enum', _propertyEnum2.default, _propertyEnum2.default);
catalog.registerPropertyType('string', _propertyString2.default, _propertyString2.default);
catalog.registerPropertyType('number', _propertyNumber2.default, _propertyNumber2.default);
catalog.registerPropertyType('composition', _propertyComposition2.default, _propertyComposition2.default);

catalog.registerElement(_area2.default);
catalog.registerElement(_door2.default);
catalog.registerElement(_window2.default);
catalog.registerElement(_sashWindow2.default);
catalog.registerElement(_wall2.default);
catalog.registerElement(_sofa2.default);
catalog.registerElement(_tv2.default);
//END CATALOG

//INIT TOOLBAR BUTTONS

var toolbarButtons = [_buttonX2.default];

//INIT CUSTOM CONTENT

var customContents = {
  'MODE_MY_MODE': _contentX2.default
};

//INIT CUSTOM REDUCER
var customReducer = function customReducer(state, action) {
  console.log(action);
  return state;
};

var onReady = function onReady(store) {
  window.Metior = _extends({
    store: store,
    dispatch: store.dispatch,
    getState: function getState() {
      return store.getState().toJS();
    }
  }, _actions2.default);
  console.groupCollapsed("Metior");
  console.info("Metior is ready");
  console.info("console.log(Metior)");
  console.log(window.Metior);
  console.groupEnd();
};

_reactDom2.default.render(_react2.default.createElement(_planner2.default, { onReady: onReady, catalog: catalog, toolbarButtons: toolbarButtons, customContents: customContents, customReducer: customReducer }), document.getElementById('app'));