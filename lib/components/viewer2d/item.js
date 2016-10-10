'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Item;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ruler = require('./ruler');

var _ruler2 = _interopRequireDefault(_ruler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Item(_ref, _ref2) {
  var layer = _ref.layer;
  var item = _ref.item;
  var scene = _ref.scene;
  var catalog = _ref2.catalog;
  var x = item.x;
  var y = item.y;
  var rotation = item.rotation;


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
    renderedItem
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