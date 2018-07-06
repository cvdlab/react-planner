'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PanelElementEditor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _panel = require('../panel');

var _panel2 = _interopRequireDefault(_panel);

var _immutable = require('immutable');

var _constants = require('../../../constants');

var _elementEditor = require('./element-editor');

var _elementEditor2 = _interopRequireDefault(_elementEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PanelElementEditor(_ref, _ref2) {
  var state = _ref.state;
  var projectActions = _ref2.projectActions,
      translator = _ref2.translator;
  var scene = state.scene,
      mode = state.mode;


  if (![_constants.MODE_IDLE, _constants.MODE_2D_ZOOM_IN, _constants.MODE_2D_ZOOM_OUT, _constants.MODE_2D_PAN, _constants.MODE_3D_VIEW, _constants.MODE_3D_FIRST_PERSON, _constants.MODE_WAITING_DRAWING_LINE, _constants.MODE_DRAWING_LINE, _constants.MODE_DRAWING_HOLE, _constants.MODE_DRAWING_ITEM, _constants.MODE_DRAGGING_LINE, _constants.MODE_DRAGGING_VERTEX, _constants.MODE_DRAGGING_ITEM, _constants.MODE_DRAGGING_HOLE, _constants.MODE_ROTATING_ITEM, _constants.MODE_UPLOADING_IMAGE, _constants.MODE_FITTING_IMAGE].includes(mode)) return null;

  var componentRenderer = function componentRenderer(element, layer) {
    return _react2.default.createElement(
      _panel2.default,
      { key: element.id, name: translator.t('Properties: [{0}] {1}', element.type, element.id), opened: true },
      _react2.default.createElement(
        'div',
        { style: { padding: '5px 15px' } },
        _react2.default.createElement(_elementEditor2.default, { element: element, layer: layer, state: state })
      )
    );
  };

  var layerRenderer = function layerRenderer(layer) {
    return (0, _immutable.Seq)().concat(layer.lines, layer.holes, layer.areas, layer.items).filter(function (element) {
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

PanelElementEditor.propTypes = {
  state: _propTypes2.default.object.isRequired
};

PanelElementEditor.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};