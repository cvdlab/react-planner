import React from 'react';
import PropTypes from 'prop-types';
import polylabel from 'polylabel';
import areapolygon from 'area-polygon';

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

export default function Area(_ref) {
  var layer = _ref.layer,
      area = _ref.area,
      catalog = _ref.catalog;


  var rendered = catalog.getElement(area.type).render2D(area, layer);

  var renderedAreaSize = null;

  if (area.selected) {
    var vertices = layer.vertices;
    var polygon = area.vertices.map(function (vertexID) {
      return vertices.get(vertexID);
    }).map(function (vertex) {
      return [vertex.x, vertex.y];
    }).toArray();

    var center = polylabel([polygon], 1.0);
    var areaSize = (areapolygon(polygon, false) / 10000).toFixed(2);
    renderedAreaSize = React.createElement(
      'text',
      { x: '0', y: '0', transform: 'translate(' + center[0] + ' ' + center[1] + ') scale(1, -1)', style: STYLE_TEXT },
      areaSize,
      ' m',
      String.fromCharCode(0xb2)
    );
  }

  return React.createElement(
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
  area: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};