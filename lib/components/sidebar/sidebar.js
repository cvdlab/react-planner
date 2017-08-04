'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Sidebar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _panelElementEditor = require('./panel-element-editor/panel-element-editor');

var _panelElementEditor2 = _interopRequireDefault(_panelElementEditor);

var _panelLayers = require('./panel-layers');

var _panelLayers2 = _interopRequireDefault(_panelLayers);

var _panelGuides = require('./panel-guides');

var _panelGuides2 = _interopRequireDefault(_panelGuides);

var _panelLayerElements = require('./panel-layer-elements');

var _panelLayerElements2 = _interopRequireDefault(_panelLayerElements);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  display: 'block',
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingBottom: '20px'
};

function Sidebar(_ref) {
  var state = _ref.state,
      width = _ref.width,
      height = _ref.height,
      sidebarComponents = _ref.sidebarComponents;


  return _react2.default.createElement(
    'aside',
    {
      style: _extends({ width: width, height: height }, STYLE),
      onKeyDown: function onKeyDown(event) {
        return event.stopPropagation();
      },
      onKeyUp: function onKeyUp(event) {
        return event.stopPropagation();
      },
      className: 'sidebar'
    },
    _react2.default.createElement(
      'div',
      { className: 'layers' },
      _react2.default.createElement(_panelLayers2.default, { state: state })
    ),
    _react2.default.createElement(
      'div',
      { className: 'layer-elements' },
      _react2.default.createElement(_panelLayerElements2.default, { state: state })
    ),
    _react2.default.createElement(
      'div',
      { className: 'properties' },
      _react2.default.createElement(_panelElementEditor2.default, { state: state })
    ),
    sidebarComponents.map(function (Component, index) {
      return _react2.default.createElement(Component, { state: state, key: index });
    })
  );
}

Sidebar.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired
};