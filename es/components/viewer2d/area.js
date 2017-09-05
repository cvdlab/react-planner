import React from 'react';
import PropTypes from 'prop-types';
import polylabel from 'polylabel';
import areapolygon from 'area-polygon';

var STYLE_TEXT = {
  textAnchor: 'middle',
  fontSize: '12px',
  fontFamily: '"Courier New", Courier, monospace',
  pointerEvents: 'none',
  fontWeight: 'bold',

  //http://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css
  WebkitTouchCallout: 'none', /* iOS Safari */
  WebkitUserSelect: 'none', /* Chrome/Safari/Opera */
  MozUserSelect: 'none', /* Firefox */
  MsUserSelect: 'none', /* Internet Explorer/Edge */
  userSelect: 'none'
};

export default function Area(_ref) {
  var layer = _ref.layer,
      area = _ref.area,
      catalog = _ref.catalog;


  var rendered = catalog.getElement(area.type).render2D(area, layer);

  var renderedAreaSize = null;

  if (area.selected) {
    var polygon = area.vertices.toArray().map(function (vertexID) {
      var _layer$vertices$get = layer.vertices.get(vertexID),
          x = _layer$vertices$get.x,
          y = _layer$vertices$get.y;

      return [x, y];
    });

    var polygonWithHoles = polygon;

    area.holes.forEach(function (holeID) {

      var polygonHole = layer.areas.get(holeID).vertices.toArray().map(function (vertexID) {
        var _layer$vertices$get2 = layer.vertices.get(vertexID),
            x = _layer$vertices$get2.x,
            y = _layer$vertices$get2.y;

        return [x, y];
      });

      polygonWithHoles = polygonWithHoles.concat(polygonHole.reverse());
    });

    var center = polylabel([polygonWithHoles], 1.0);
    var areaSize = areapolygon(polygon, false);

    //subtract holes area
    area.holes.forEach(function (areaID) {
      var hole = layer.areas.get(areaID);
      var holePolygon = hole.vertices.toArray().map(function (vertexID) {
        var _layer$vertices$get3 = layer.vertices.get(vertexID),
            x = _layer$vertices$get3.x,
            y = _layer$vertices$get3.y;

        return [x, y];
      });
      areaSize -= areapolygon(holePolygon, false);
    });

    renderedAreaSize = React.createElement(
      'text',
      { x: '0', y: '0', transform: 'translate(' + center[0] + ' ' + center[1] + ') scale(1, -1)', style: STYLE_TEXT },
      (areaSize / 10000).toFixed(2),
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