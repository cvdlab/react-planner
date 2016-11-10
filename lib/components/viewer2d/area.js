'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Area;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../../constants');

var _polylabel = require('polylabel');

var _polylabel2 = _interopRequireDefault(_polylabel);

var _areaPolygon = require('area-polygon');

var _areaPolygon2 = _interopRequireDefault(_areaPolygon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE_TEXT = {
  textAnchor: "middle",
  fontSize: "12px",
  fontFamily: "'Courier New', Courier, monospace",
  pointerEvents: "none",
  fontWeight: "bold",

  //http://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css
  WebkitTouchCallout: "none", /* iOS Safari */
  WebkitUserSelect: "none", /* Chrome/Safari/Opera */
  MozUserSelect: "none", /* Firefox */
  MsUserSelect: "none", /* Internet Explorer/Edge */
  userSelect: "none"
};

function Area(_ref, _ref2) {
  var layer = _ref.layer,
      area = _ref.area,
      mode = _ref.mode,
      unit = _ref.unit;
  var editingActions = _ref2.editingActions,
      catalog = _ref2.catalog;


  var rendered = catalog.getElement(area.type).render2D(area, layer);

  var renderedAreaSize = null;

  if (area.selected) {
    var center;

    (function () {
      var vertices = layer.vertices;
      var polygon = area.vertices.map(function (vertexID) {
        return vertices.get(vertexID);
      }).map(function (vertex) {
        return [vertex.x, vertex.y];
      }).toArray();

      center = (0, _polylabel2.default)([polygon], 1.0);

      var areaSize = ((0, _areaPolygon2.default)(polygon, false) / 10000).toFixed(2);
      renderedAreaSize = _react2.default.createElement(
        'text',
        { x: '0', y: '0', transform: 'translate(' + center[0] + ' ' + center[1] + ') scale(1, -1)', style: STYLE_TEXT },
        areaSize,
        ' m',
        String.fromCharCode(0xb2)
      );
    })();
  }

  return _react2.default.createElement(
    'g',
    {
      'data-element-root': true,
      'data-prototype': area.prototype,
      'data-id': area.id,
      'data-selected': area.selected,
      'data-layer': layer.id
    },
    rendered,
    renderedAreaSize
  );
}

Area.propTypes = {
  area: _react.PropTypes.object.isRequired,
  layer: _react.PropTypes.object.isRequired,
  mode: _react.PropTypes.string.isRequired,
  unit: _react.PropTypes.string.isRequired
};

Area.contextTypes = {
  editingActions: _react.PropTypes.object,
  catalog: _react.PropTypes.object
};