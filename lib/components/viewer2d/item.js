'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Item;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ruler = require('./ruler.jsx');

var _ruler2 = _interopRequireDefault(_ruler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Item(_ref, _ref2) {
  var layer = _ref.layer;
  var item = _ref.item;
  var pixelPerUnit = _ref.pixelPerUnit;
  var unit = _ref.unit;
  var catalog = _ref2.catalog;
  var width = item.width;
  var height = item.height;
  var x = item.x;
  var y = item.y;
  var rotation = item.rotation;


  var renderedRuler = !item.selected ? null : _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement(_ruler2.default, { pixelPerUnit: pixelPerUnit, unit: unit, length: width, transform: 'translate(' + 0 + ', ' + (height + 10) + ')' }),
    _react2.default.createElement(_ruler2.default, { pixelPerUnit: pixelPerUnit, unit: unit, length: height,
      transform: 'translate(' + (width + 10) + ', ' + height + ') rotate(-90)' })
  );

  var renderedItem = catalog.getElement(item.type).render2D(item, layer);

  return _react2.default.createElement(
    'g',
    {
      'data-element-root': true,
      'data-prototype': item.prototype,
      'data-id': item.id,
      'data-selected': item.selected,
      'data-layer': layer.id,
      style: item.selected ? { cursor: "move" } : {},
      transform: 'translate(' + x + ',' + y + ') rotate(' + rotation + ') translate(' + -width / 2 + ',' + -height / 2 + ')' },
    renderedItem,
    renderedRuler
  );
}

Item.propTypes = {
  item: _react.PropTypes.object.isRequired,
  layer: _react.PropTypes.object.isRequired,
  mode: _react.PropTypes.string.isRequired,
  pixelPerUnit: _react.PropTypes.number.isRequired,
  unit: _react.PropTypes.string.isRequired
};

Item.contextTypes = {
  editingActions: _react.PropTypes.object,
  catalog: _react2.default.PropTypes.object
};