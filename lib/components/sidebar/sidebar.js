'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Sidebar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _panelElementEditor = require('./panel-element-editor/panel-element-editor');

var _panelElementEditor2 = _interopRequireDefault(_panelElementEditor);

var _panelLayers = require('./panel-layers');

var _panelLayers2 = _interopRequireDefault(_panelLayers);

var _panelGuides = require('./panel-guides');

var _panelGuides2 = _interopRequireDefault(_panelGuides);

var _panelLayerElements = require('./panel-layer-elements');

var _panelLayerElements2 = _interopRequireDefault(_panelLayerElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var STYLE = {
  backgroundColor: "#28292D",
  display: "block",
  overflowY: "auto",
  overflowX: "hidden"
};

function Sidebar(_ref) {
  var _extends2;

  var state = _ref.state,
      width = _ref.width,
      height = _ref.height;


  return _react2.default.createElement(
    'aside',
    {
      style: _extends((_extends2 = { width: width }, _defineProperty(_extends2, 'width', width), _defineProperty(_extends2, 'height', height), _extends2), STYLE),
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
    )
  );
}

Sidebar.propTypes = {
  state: _react.PropTypes.object.isRequired,
  width: _react2.default.PropTypes.number.isRequired,
  height: _react2.default.PropTypes.number.isRequired
};