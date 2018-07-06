import React from 'react';
import PropTypes from 'prop-types';
import If from '../../utils/react-if';
import * as sharedStyles from '../../shared-style';

var cx = 0;
var cy = 0;
var radius = 5;

var STYLE_CIRCLE = {
  fill: sharedStyles.MATERIAL_COLORS[500].orange,
  stroke: sharedStyles.MATERIAL_COLORS[500].orange,
  cursor: 'default'
};

export default function Group(_ref, _ref2) {
  var layer = _ref.layer,
      group = _ref.group,
      scene = _ref.scene,
      catalog = _ref.catalog;
  var translator = _ref2.translator;

  return React.createElement(
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
    React.createElement(
      If,
      { condition: group.selected },
      React.createElement(
        'g',
        {
          'data-element-root': true,
          'data-prototype': group.prototype,
          'data-id': group.id,
          'data-selected': group.selected,
          'data-layer': layer.id,
          'data-part': 'rotation-anchor'
        },
        React.createElement(
          'circle',
          { cx: cx, cy: cy, r: radius, style: STYLE_CIRCLE },
          React.createElement(
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
  group: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};

Group.contextTypes = {
  translator: PropTypes.object.isRequired
};