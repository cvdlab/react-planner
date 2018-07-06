'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Group;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIf = require('../../utils/react-if');

var _reactIf2 = _interopRequireDefault(_reactIf);

var _sharedStyle = require('../../shared-style');

var sharedStyles = _interopRequireWildcard(_sharedStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = 0;
var cy = 0;
var radius = 5;

var STYLE_CIRCLE = {
  fill: sharedStyles.MATERIAL_COLORS[500].orange,
  stroke: sharedStyles.MATERIAL_COLORS[500].orange,
  cursor: 'default'
};

function Group(_ref, _ref2) {
  var layer = _ref.layer,
      group = _ref.group,
      scene = _ref.scene,
      catalog = _ref.catalog;
  var translator = _ref2.translator;

  return _react2.default.createElement(
    'g',
    {
      'data-element-root': true,
      'data-prototype': group.prototype,
      'data-id': group.id,
      'data-selected': group.selected,
      'data-layer': layer.id,
      style: group.selected ? { cursor: 'move' } : {},
      transform: 'translate(' + group.x + ',' + group.y + ') rotate(' + group.rotation + ')'
    },
    _react2.default.createElement(
      _reactIf2.default,
      { condition: group.selected },
      _react2.default.createElement(
        'g',
        {
          'data-element-root': true,
          'data-prototype': group.prototype,
          'data-id': group.id,
          'data-selected': group.selected,
          'data-layer': layer.id,
          'data-part': 'rotation-anchor'
        },
        _react2.default.createElement(
          'circle',
          { cx: cx, cy: cy, r: radius, style: STYLE_CIRCLE },
          _react2.default.createElement(
            'title',
            null,
            translator.t('Group\'s Barycenter')
          )
        )
      )
    )
  );
}

Group.propTypes = {
  group: _propTypes2.default.object.isRequired,
  layer: _propTypes2.default.object.isRequired,
  scene: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired
};

Group.contextTypes = {
  translator: _propTypes2.default.object.isRequired
};