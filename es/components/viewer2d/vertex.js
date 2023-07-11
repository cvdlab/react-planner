import React from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
var STYLE = {
  fill: "#0096fd",
  stroke: SharedStyle.COLORS.white,
  cursor: "move"
};
export default function Vertex(_ref) {
  var vertex = _ref.vertex,
    layer = _ref.layer;
  var x = vertex.x,
    y = vertex.y;
  return /*#__PURE__*/React.createElement("g", {
    transform: "translate(".concat(x, ", ").concat(y, ")"),
    "data-element-root": true,
    "data-prototype": vertex.prototype,
    "data-id": vertex.id,
    "data-selected": vertex.selected,
    "data-layer": layer.id
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "7",
    style: STYLE
  }));
}
Vertex.propTypes = {
  vertex: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired
};