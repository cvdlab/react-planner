import React, {PropTypes} from 'react';
import {MODE_IDLE} from '../../constants';
import polylabel from 'polylabel';
import areapolygon from 'area-polygon';

const STYLE_TEXT = {
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


export default function Area({layer, area, mode, pixelPerUnit, unit}, {editingActions, catalog}) {

  let rendered = catalog[area.type].render2D(area, layer);

  let renderedAreaSize = null;

  if (area.selected) {
    let vertices = layer.vertices;
    let polygon = area.vertices
      .map(vertexID => vertices.get(vertexID))
      .map(vertex => [vertex.x, vertex.y])
      .toArray();

    var center = polylabel([polygon], 1.0);
    let areaSize = (areapolygon(polygon, false) / Math.pow(pixelPerUnit, 2)).toFixed(2);
    renderedAreaSize = (
      <text x="0" y="0" transform={`translate(${center[0]} ${center[1]}) scale(1, -1)`} style={STYLE_TEXT}>
        {areaSize} {unit}{String.fromCharCode(0xb2)}
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
  mode: PropTypes.string.isRequired,
  pixelPerUnit: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired
};

Area.contextTypes = {
  editingActions: PropTypes.object,
  catalog: PropTypes.object
};

