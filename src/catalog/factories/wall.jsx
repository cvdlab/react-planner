import render3D from './wall-3d.js';
import React from 'react';

function distanceFromTwoPoints(x0, y0, x1, y1) {
  return Math.sqrt(Math.pow((x1 - x0), 2) + Math.pow((y1 - y0), 2));
}

export default WallFactory = (name, info, textures) => {

  return {
    prototype: "lines",

    properties: {
      height: {
        label: "Height",
        type: "length-measure",
        defaultValue: {
          length: 300,
        }
      },
      thickness: {
        label: "Thickness",
        type: "length-measure",
        defaultValue: {
          length: 20
        }
      },
      textureA: {
        label: "Covering A",
        type: "enum",
        defaultValue: 'none',
        values: {
          'none': "None",
          'bricks': "Bricks",
          'painted': "Painting"
        }
      },
      textureB: {
        label: "Covering B",
        type: "enum",
        defaultValue: 'none',
        values: {
          'none': "None",
          'bricks': "Bricks",
          'painted': "Paintings"
        }
      }
    },

    render2D: function (element, layer, scene) {
      const STYLE_BASE = {stroke: "#8E9BA2", strokeWidth: "1px", fill: "#8E9BA2"};
      const STYLE_SELECTED = {stroke: "#99c3fb", strokeWidth: "5px", fill: "#000"};
      const STYLE_TEXT = {textAnchor: "middle"};
      const STYLE_LINE = {stroke: "#99c3fb"};

      //let line = layer.lines.get(hole.line);
      //let epsilon = line.properties.get('thickness') / 2;

      let epsilon = 3;

      let {x:x1, y:y1} = layer.vertices.get(element.vertices.get(0));
      let {x:x2, y: y2} = layer.vertices.get(element.vertices.get(1));

      let length = distanceFromTwoPoints(x1, y1, x2, y2);
      let path = `M${0} ${ -epsilon}  L${length} ${-epsilon}  L${length} ${epsilon}  L${0} ${epsilon}  z`;

      return (element.selected) ?
        <g>
          <path key="3" d={path} style={element.selected ? STYLE_SELECTED : STYLE_BASE}/>
          <line key="2" x1={length / 5} y1={-39} x2={length / 5} y2={38} style={STYLE_LINE}/>
          <text key="1" x={length / 5} y={50} style={STYLE_TEXT}>A</text>
          ,
          <text key="4" x={length / 5} y={-40} style={STYLE_TEXT}>B</text>
        </g> :
        <path key={3} d={path} style={element.selected ? STYLE_SELECTED : STYLE_BASE}/>
    },

    render3D: function (element, layer, scene) {
      return buildWall(element, layer, scene, textures)
    },

  }

}
