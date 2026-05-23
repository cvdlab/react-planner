import React from 'react';
import PropTypes from 'prop-types';
import If from '../../utils/react-if';
import * as sharedStyles from '../../shared-style';

const cx = 0;
const cy = 0;
const radius = 5;

const STYLE_CIRCLE = {
  fill: sharedStyles.MATERIAL_COLORS[500].orange,
  stroke: sharedStyles.MATERIAL_COLORS[500].orange,
  cursor: 'default'
};

type Props = { layer: any; group: any; scene: any; catalog: any };
type Context = { translator: any };

export default function Group({ layer, group, scene, catalog }: Props, { translator }: Context) {
  return (
    <g
      data-element-root
      data-prototype={group.prototype}
      data-id={group.id}
      data-selected={group.selected}
      data-layer={layer.id}
      style={group.selected ? { cursor: 'move' } : {}}
      transform={`translate(${group.x},${group.y}) rotate(${group.rotation})`}
    >
      <If condition={group.selected}>
        <g
          data-element-root
          data-prototype={group.prototype}
          data-id={group.id}
          data-selected={group.selected}
          data-layer={layer.id}
          data-part="rotation-anchor"
        >
          <circle cx={cx} cy={cy} r={radius} style={STYLE_CIRCLE}>
            <title>{translator.t('Group\'s Barycenter')}</title>
          </circle>
        </g>
      </If>
    </g>
  );
}

(Group as any).propTypes = {
  group: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};

(Group as any).contextTypes = {
  translator: PropTypes.object.isRequired
};
