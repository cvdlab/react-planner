'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Item;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIf = require('../../utils/react-if');

var _reactIf2 = _interopRequireDefault(_reactIf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE_LINE = {
  fill: "#0096fd",
  stroke: "#0096fd"
};

var STYLE_CIRCLE = {
  fill: "#0096fd",
  stroke: "#0096fd",
  cursor: "ew-resize"
};

var STYLE_CIRCLE2 = {
  fill: "none",
  stroke: "#0096fd",
  cursor: "ew-resize"
};

function Item(_ref, _ref2) {
  var layer = _ref.layer,
      item = _ref.item,
      scene = _ref.scene;
  var catalog = _ref2.catalog;
  var x = item.x,
      y = item.y,
      rotation = item.rotation;


  var renderedItem = catalog.getElement(item.type).render2D(item, layer, scene);

  return _react2.default.createElement(
    'g',
    {
      'data-element-root': true,
      'data-prototype': item.prototype,
      'data-id': item.id,
      'data-selected': item.selected,
      'data-layer': layer.id,
      style: item.selected ? { cursor: "move" } : {},
      transform: 'translate(' + x + ',' + y + ') rotate(' + rotation + ')' },
    renderedItem,
    _react2.default.createElement(
      _reactIf2.default,
      { condition: item.selected },
      _react2.default.createElement(
        'g',
        { 'data-element-root': true,
          'data-prototype': item.prototype,
          'data-id': item.id,
          'data-selected': item.selected,
          'data-layer': layer.id,
          'data-part': 'rotation-anchor'
        },
        _react2.default.createElement('circle', { cx: '0', cy: '150', r: '10', style: STYLE_CIRCLE }),
        _react2.default.createElement('circle', { cx: '0', cy: '0', r: '150', style: STYLE_CIRCLE2 })
      )
    )
  );
}

Item.propTypes = {
  item: _react.PropTypes.object.isRequired,
  layer: _react.PropTypes.object.isRequired,
  mode: _react.PropTypes.string.isRequired,
  scene: _react.PropTypes.object.isRequired
};

Item.contextTypes = {
  editingActions: _react.PropTypes.object,
  catalog: _react2.default.PropTypes.object
};