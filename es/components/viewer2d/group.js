import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import If from '../../utils/react-if';
import * as sharedStyles from '../../styles/shared-style';
var cx = 0;
var cy = 0;
var radius = 5;
var STYLE_CIRCLE = {
  fill: sharedStyles.MATERIAL_COLORS[500].orange,
  stroke: sharedStyles.MATERIAL_COLORS[500].orange,
  cursor: 'default'
};
var Group = function Group(_ref) {
  var layer = _ref.layer,
    group = _ref.group,
    scene = _ref.scene,
    catalog = _ref.catalog;
  var _useContext = useContext(ReactPlannerContext),
    translator = _useContext.translator;
  return /*#__PURE__*/React.createElement("g", {
    "data-element-root": true,
    "data-prototype": group.prototype,
    "data-id": group.id,
    "data-selected": group.selected,
    "data-layer": layer.id,
    style: group.selected ? {
      cursor: 'move'
    } : {},
    transform: "translate(".concat(group.x, ",").concat(group.y, ") rotate(").concat(group.rotation, ")")
  }, /*#__PURE__*/React.createElement(If, {
    condition: group.selected
  }, /*#__PURE__*/React.createElement("g", {
    "data-element-root": true,
    "data-prototype": group.prototype,
    "data-id": group.id,
    "data-selected": group.selected,
    "data-layer": layer.id,
    "data-part": "rotation-anchor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: radius,
    style: STYLE_CIRCLE
  }, /*#__PURE__*/React.createElement("title", null, translator.t('Group\'s Barycenter'))))));
};
Group.propTypes = {
  group: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};
export default Group;