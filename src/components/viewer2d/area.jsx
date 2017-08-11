import React from 'react';
import PropTypes from 'prop-types';
import polylabel from 'polylabel';
import areapolygon from 'area-polygon';

const STYLE_TEXT = {
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


export default function Area({layer, area, catalog}) {

  let rendered = catalog.getElement(area.type).render2D(area, layer);

  let renderedAreaSize = null;

  if (area.selected) {
    let polygon = area.vertices.toArray().map(vertexID => {
      let {x, y} = layer.vertices.get(vertexID);
      return [x, y];
    });

    let polygonWithHoles = polygon;

    area.holes.forEach(holeID => {

      let polygonHole = layer.areas.get(holeID).vertices.toArray().map(vertexID => {
        let {x, y} = layer.vertices.get(vertexID);
        return [x, y];
      });

      polygonWithHoles = polygonWithHoles.concat(polygonHole.reverse());
    });

    let center = polylabel([polygonWithHoles], 1.0);
    let areaSize = areapolygon(polygon, false);

    //subtract holes area
    area.holes.forEach(areaID => {
      let hole = layer.areas.get(areaID);
      let holePolygon = hole.vertices.toArray().map(vertexID => {
        let {x, y} = layer.vertices.get(vertexID);
        return [x, y];
      });
      areaSize -= areapolygon(holePolygon, false);
    });

    renderedAreaSize = (
      <text x="0" y="0" transform={`translate(${center[0]} ${center[1]}) scale(1, -1)`} style={STYLE_TEXT}>
        {(areaSize / 10000).toFixed(2)} m{String.fromCharCode(0xb2)}
      </text>
    )
  }

  return (
    <g
      data-element-root
      data-prototype={area.prototype}
      data-id={area.id}
      data-selected={area.selected}
      data-layer={layer.id}
    >
      {rendered}
      {renderedAreaSize}
    </g>
  )

}

Area.propTypes = {
  area: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};


