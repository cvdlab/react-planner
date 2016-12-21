'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PanelPropertiesEditor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _panel = require('../panel');

var _panel2 = _interopRequireDefault(_panel);

var _immutable = require('immutable');

var _constants = require('../../../constants');

var _propertiesEditor = require('./properties-editor');

var _propertiesEditor2 = _interopRequireDefault(_propertiesEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PanelPropertiesEditor(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator;
  var scene = state.scene,
      mode = state.mode;


  if (![_constants.MODE_IDLE, _constants.MODE_3D_VIEW, _constants.MODE_3D_FIRST_PERSON].includes(mode)) return null;

  var componentRenderer = function componentRenderer(element, layer) {
    return _react2.default.createElement(
      _panel2.default,
      { key: element.id, name: translator.t("Properties: [{0}] {1}", element.type, element.id) },
      _react2.default.createElement(
        'div',
        { style: { padding: "5px 15px 5px 15px" } },
        _react2.default.createElement(_propertiesEditor2.default, { element: element, layer: layer, state: state })
      )
    );
  };

  var layerRenderer = function layerRenderer(layer) {
    return (0, _immutable.Seq)().concat(layer.lines).concat(layer.holes).concat(layer.areas).concat(layer.items).filter(function (element) {
      return element.selected;
    }).map(function (element) {
      return componentRenderer(element, layer);
    }).valueSeq();
  };

  return _react2.default.createElement(
    'div',
    null,
    scene.layers.valueSeq().map(layerRenderer)
  );
}

PanelPropertiesEditor.propTypes = {
  state: _react.PropTypes.object.isRequired
};

PanelPropertiesEditor.contextTypes = {
  translator: _react.PropTypes.object.isRequired
};