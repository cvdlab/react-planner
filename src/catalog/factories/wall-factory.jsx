import React from 'react';
import { buildWall, updatedWall } from './wall-factory-3d';
import * as SharedStyle from '../../styles/shared-style';
import * as Geometry from '../../utils/geometry';
import Translator from '../../translator/translator';

const EPSILON = 20;
const THRESHOLD_ANGLE = 0.5;
const EPSILON_ANGLE = 0.01;

const STYLE_TEXT = { textAnchor: 'middle' };
const STYLE_LINE = { stroke: SharedStyle.LINE_MESH_COLOR.selected };
const STYLE_RECT = { strokeWidth: 1, stroke: SharedStyle.LINE_MESH_COLOR.unselected, fill: 'url(#diagonalFill)' };
const STYLE_RECT_SELECTED = { ...STYLE_RECT, stroke: SharedStyle.LINE_MESH_COLOR.selected };

let translator = new Translator();

export default function WallFactory(name, info, textures) {

  let wallElement = {
    name,
    prototype: 'lines',
    info,
    properties: {
      height: {
        label: translator.t('height'),
        type: 'length-measure',
        defaultValue: {
          length: 300,
        }
      },
      thickness: {
        label: translator.t('thickness'),
        type: 'length-measure',
        defaultValue: {
          length: 20
        }
      }
    },

    render2D: function (element, layer, scene) {
      console.log("element ID: ", element.id);
      console.log("element: ", element);
      console.log("layer: ", layer);

      let wall = layer.lines.get(element.id);
      let { x: x1, y: y1, lines: lines1 } = layer.vertices.get(element.vertices.get(0));
      let { x: x2, y: y2, lines: lines2 } = layer.vertices.get(element.vertices.get(1));

      let length = Geometry.pointsDistance(x1, y1, x2, y2);
      let length_5 = length / 5;

      let thickness = element.getIn(['properties', 'thickness', 'length']);
      let half_thickness = thickness / 2;
      let half_thickness_eps = half_thickness + EPSILON;
      let char_height = 11;
      let EXTRA_EPSILON = 5;
      let textDistance = half_thickness + EPSILON + EXTRA_EPSILON;

      // Checking intersection with other walls and building points array to build polygon instead of rectangle
      // TODO(pg): investigate why removed lines still appears as undefined in the list of lines
      // refreshing the page removes them but still...
      lines1 = lines1.filter((line) => (line !== undefined && line !== wall.id));
      lines2 = lines2.filter((line) => (line !== undefined && line !== wall.id));
      console.log("lines1.size: ", lines1.size);
      console.log("lines2.size: ", lines2.size);

      let wp1 = layer.vertices.get(wall.vertices.get(0));
      let wp2 = layer.vertices.get(wall.vertices.get(1));
      let angleWall = Geometry.angleBetweenTwoVertices(wp1, wp2);
      console.log("angleWall: ", angleWall);

      let line;
      let point;
      let points = [];
      if (lines1.size == 0) {
        points.push({ x: 0, y: half_thickness });
        points.push({ x: 0, y: - half_thickness });
      } else if (lines1.size == 1) {
        line = layer.lines.get(lines1.get(0));

        if (line.vertices.get(0) == wp1.id) {
          point = layer.vertices.get(line.vertices.get(1));
        } else {
          point = layer.vertices.get(line.vertices.get(0));
        }
        let angleLine = Geometry.angleBetweenTwoVertices(wp1, point);
        let lengthLine = Geometry.verticesDistance(wp1, point);

        let angleDiff = angleLine - angleWall;
        // we bring it back between -PI and PI to simplify following if / else
        if (angleDiff > Math.PI) {
          angleDiff -= 2 * Math.PI;
        }
        if (angleDiff < -Math.PI) {
          angleDiff += 2 * Math.PI;
        }

        if (Math.abs(angleDiff) < THRESHOLD_ANGLE) {
          points.push({ x: 0, y: half_thickness });
          points.push({ x: 0, y: - half_thickness });
        } else if (Math.abs(angleDiff) > THRESHOLD_ANGLE && ((Math.abs(Math.abs(angleDiff) - Math.PI / 2)) > EPSILON_ANGLE)) {
          let topWall = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          let botLine = Geometry.linePassingThroughTwoPoints(0, - half_thickness / Math.cos(angleDiff), lengthLine * Math.cos(angleDiff), lengthLine * Math.sin(angleDiff) - half_thickness / Math.cos(angleDiff));
          let convexPoint = Geometry.twoLinesIntersection(topWall.a, topWall.b, topWall.c, botLine.a, botLine.b, botLine.c);
          points.push(convexPoint);
          let botWall = Geometry.linePassingThroughTwoPoints(0, - half_thickness, length, - half_thickness);
          let topLine = Geometry.linePassingThroughTwoPoints(0, half_thickness / Math.cos(angleDiff), lengthLine * Math.cos(angleDiff), lengthLine * Math.sin(angleDiff) + half_thickness / Math.cos(angleDiff));
          let concavePoint = Geometry.twoLinesIntersection(botWall.a, botWall.b, botWall.c, topLine.a, topLine.b, topLine.c);
          points.push(concavePoint);
        } else if ((Math.abs(Math.abs(angleDiff) - Math.PI / 2)) < EPSILON_ANGLE) {
          if (angleWall > angleLine) {
            points.push({ x: - half_thickness, y: half_thickness });
            points.push({ x: half_thickness, y: - half_thickness });
          } else {
            points.push({ x: half_thickness, y: half_thickness });
            points.push({ x: - half_thickness, y: - half_thickness });
          }
        } else {
          let topWall = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          let topLine = Geometry.linePassingThroughTwoPoints(0, half_thickness / Math.sin(angleDiff - Math.PI/2), - lengthLine * Math.sin(angleDiff - Math.PI/2), lengthLine * Math.cos(angleDiff - Math.PI/2) + half_thickness / Math.sin(angleDiff - Math.PI/2));
          let convexPoint = Geometry.twoLinesIntersection(topWall.a, topWall.b, topWall.c, topLine.a, topLine.b, topLine.c);
          points.push(convexPoint);
          let botWall = Geometry.linePassingThroughTwoPoints(0, - half_thickness, length, - half_thickness);
          let botLine = Geometry.linePassingThroughTwoPoints(0, - half_thickness / Math.sin(angleDiff - Math.PI/2), - lengthLine * Math.sin(angleDiff - Math.PI/2), lengthLine * Math.cos(angleDiff - Math.PI/2) - half_thickness / Math.sin(angleDiff - Math.PI/2));
          let concavePoint = Geometry.twoLinesIntersection(botWall.a, botWall.b, botWall.c, botLine.a, botLine.b, botLine.c);
          points.push(concavePoint);
        }
      } else {
        // TODO(pg): more than 2 lines
        console.log("more than 2 lines");

      }

      if (lines2.size == 0) {
        points.push({ x: length, y: - half_thickness });
        points.push({ x: length, y: half_thickness });
      } else if (lines2.size == 1) {
        line = layer.lines.get(lines2.get(0));

        if (line.vertices.get(0) == wp2.id) {
          point = layer.vertices.get(line.vertices.get(1));
        } else {
          point = layer.vertices.get(line.vertices.get(0));
        }
        let angleLine = Geometry.angleBetweenTwoVertices(wp2, point);
        let lengthLine = Geometry.verticesDistance(wp2, point);

        let angleDiff = angleLine - ( angleWall + Math.PI );
        // we bring it back between -PI and PI to simplify following if / else
        if (angleDiff > Math.PI) {
          angleDiff -= 2 * Math.PI;
        }
        if (angleDiff < -Math.PI) {
          angleDiff += 2 * Math.PI;
        }

        if (Math.abs(angleDiff) < THRESHOLD_ANGLE) {
          points.push({ x: wp2.x, y: wp2.y + half_thickness });
          points.push({ x: wp2.x, y: wp2.y - half_thickness });
        } else if (Math.abs(angleDiff) > THRESHOLD_ANGLE && ((Math.abs(Math.abs(angleDiff) - Math.PI / 2)) > EPSILON_ANGLE)) {
          let botWall = Geometry.linePassingThroughTwoPoints(0, - half_thickness, length, - half_thickness);
          let topLine = Geometry.linePassingThroughTwoPoints(length, half_thickness / Math.cos(angleDiff), length - lengthLine * Math.cos(angleDiff), - lengthLine * Math.sin(angleDiff) + half_thickness / Math.cos(angleDiff));
          let concavePoint = Geometry.twoLinesIntersection(botWall.a, botWall.b, botWall.c, topLine.a, topLine.b, topLine.c);
          points.push(concavePoint);
          let topWall = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          let botLine = Geometry.linePassingThroughTwoPoints(length, - half_thickness / Math.cos(angleDiff), length - lengthLine * Math.cos(angleDiff), - lengthLine * Math.sin(angleDiff) - half_thickness / Math.cos(angleDiff));
          let convexPoint = Geometry.twoLinesIntersection(topWall.a, topWall.b, topWall.c, botLine.a, botLine.b, botLine.c);
          points.push(convexPoint);
        } else if (Math.abs(Math.abs(angleDiff) - Math.PI / 2) < EPSILON_ANGLE) {
          if (angleWall > angleLine) {
            points.push({ x: length - half_thickness, y: - half_thickness });
            points.push({ x: length + half_thickness, y: half_thickness });
          } else {
            points.push({ x: length + half_thickness, y: - half_thickness });
            points.push({ x: length - half_thickness, y: half_thickness });
          }
        } else {
          let botWall = Geometry.linePassingThroughTwoPoints(0, - half_thickness, length, - half_thickness);
          let botLine = Geometry.linePassingThroughTwoPoints(length, - half_thickness / Math.sin(angleDiff - Math.PI/2), length - lengthLine * Math.sin(angleDiff - Math.PI/2), lengthLine * Math.cos(angleDiff - Math.PI/2) - half_thickness / Math.sin(angleDiff - Math.PI/2));
          let concavePoint = Geometry.twoLinesIntersection(botWall.a, botWall.b, botWall.c, botLine.a, botLine.b, botLine.c);
          points.push(concavePoint);
          let topWall = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          let topLine = Geometry.linePassingThroughTwoPoints(length, half_thickness / Math.sin(angleDiff - Math.PI/2), length - lengthLine * Math.sin(angleDiff - Math.PI/2), lengthLine * Math.cos(angleDiff - Math.PI/2) + half_thickness / Math.sin(angleDiff - Math.PI/2));
          let convexPoint = Geometry.twoLinesIntersection(topWall.a, topWall.b, topWall.c, topLine.a, topLine.b, topLine.c);
          points.push(convexPoint);
        }
      } else {
        // TODO(pg): more than 2 lines
        console.log("more than 2 lines");
      }

      console.log("points: ", points);

      return (element.selected) ?
        <g>
          {/* <rect x="0" y={-half_thickness} width={length} height={thickness} style={STYLE_RECT_SELECTED} /> */}
          <polygon points={points.map((p) => `${p.x},${p.y}`).join(' ')} style={STYLE_RECT_SELECTED} />;
          <line x1={length_5} y1={-half_thickness_eps} x2={length_5} y2={half_thickness_eps} style={STYLE_LINE} />
          <text x={length_5} y={textDistance + char_height} style={STYLE_TEXT}>A</text>
          <text x={length_5} y={-textDistance} style={STYLE_TEXT}>B</text>
        </g> :
        <>
          {/* <rect x="0" y={-half_thickness} width={length} height={thickness} style={STYLE_RECT} /> */}
          <polygon points={points.map((p) => `${p.x},${p.y}`).join(' ')} style={STYLE_RECT} />;
          <text x={length_5} y={-thickness} style={STYLE_TEXT}>{element.id}</text>
        </>
    },

    render3D: function (element, layer, scene) {
      return buildWall(element, layer, scene, textures);
    },

    updateRender3D: (element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild) => {
      return updatedWall(element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild);
    }

  };

  if (textures && textures !== {}) {

    let textureValues = { 'none': 'None' };

    for (let textureName in textures) {
      textureValues[textureName] = textures[textureName].name;
    }

    wallElement.properties.textureA = {
      label: translator.t('texture') + ' A',
      type: 'enum',
      defaultValue: textureValues.bricks ? 'bricks' : 'none',
      values: textureValues
    };

    wallElement.properties.textureB = {
      label: translator.t('texture') + ' B',
      type: 'enum',
      defaultValue: textureValues.bricks ? 'bricks' : 'none',
      values: textureValues
    };

  }

  return wallElement;
}
