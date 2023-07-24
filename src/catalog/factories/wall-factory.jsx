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
      //console.log("element ID: ", element.id);
      //console.log("element: ", element);
      //console.log("layer: ", layer);

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
      let _lines1 = lines1.filter((line) => (line !== undefined && line !== wall.id));
      let _lines2 = lines2.filter((line) => (line !== undefined && line !== wall.id));
      // TODO(pg): investiage why the same line ID appears twice in the list of lines
      _lines1 = _lines1.filter((line, idx) => (_lines1.indexOf(line) === idx));
      _lines2 = _lines2.filter((line, idx) => (_lines2.indexOf(line) === idx));

      //console.log("lines1.size: ", _lines1.size);
      //console.log("lines2.size: ", _lines2.size);
      //console.log("lines1: ", _lines1);
      //console.log("lines2: ", _lines2);

      let wp1 = layer.vertices.get(wall.vertices.get(0));
      let wp2 = layer.vertices.get(wall.vertices.get(1));
      let angleWall1_2 = Geometry.angleBetweenTwoVertices(wp1, wp2);
      let angleWall2_1 = Geometry.angleBetweenTwoVertices(wp2, wp1);
      //console.log("angleWall1_2: ", angleWall1_2);
      //console.log("angleWall2_1: ", angleWall2_1);

      let line;
      let point;
      let poly_points = [];

      //console.log("Rendering end point WP1");
      if (_lines1.size == 0) {
        poly_points.push({ x: 0, y: half_thickness });
        poly_points.push({ x: 0, y: - half_thickness });
      } else if (_lines1.size == 1) {
        line = layer.lines.get(_lines1.get(0));

        if (line.vertices.get(0) == wp1.id) {
          point = layer.vertices.get(line.vertices.get(1));
        } else {
          point = layer.vertices.get(line.vertices.get(0));
        }
        let angleLine = Geometry.angleBetweenTwoVertices(wp1, point);
        let lengthLine = Geometry.verticesDistance(wp1, point);

        let angleDiff = angleLine - angleWall1_2;
        // we bring it back between -PI and PI to simplify following if / else
        if (angleDiff > Math.PI) {
          angleDiff -= 2 * Math.PI;
        }
        if (angleDiff < -Math.PI) {
          angleDiff += 2 * Math.PI;
        }

        if (Math.abs(angleDiff) < THRESHOLD_ANGLE || lengthLine === 0) {
          poly_points.push({ x: 0, y: half_thickness });
          poly_points.push({ x: 0, y: - half_thickness });
        } else if (Math.abs(angleDiff) > THRESHOLD_ANGLE && ((Math.abs(Math.abs(angleDiff) - Math.PI / 2)) > EPSILON_ANGLE)) {
          let topWall = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          let botLine = Geometry.linePassingThroughTwoPoints(0, - half_thickness / Math.cos(angleDiff), lengthLine * Math.cos(angleDiff), lengthLine * Math.sin(angleDiff) - half_thickness / Math.cos(angleDiff));
          let convexPoint = Geometry.twoLinesIntersection(topWall.a, topWall.b, topWall.c, botLine.a, botLine.b, botLine.c);
          if (convexPoint) {
            poly_points.push(convexPoint);
          }
          let botWall = Geometry.linePassingThroughTwoPoints(0, - half_thickness, length, - half_thickness);
          let topLine = Geometry.linePassingThroughTwoPoints(0, half_thickness / Math.cos(angleDiff), lengthLine * Math.cos(angleDiff), lengthLine * Math.sin(angleDiff) + half_thickness / Math.cos(angleDiff));
          let concavePoint = Geometry.twoLinesIntersection(botWall.a, botWall.b, botWall.c, topLine.a, topLine.b, topLine.c);
          if (concavePoint) {
            poly_points.push(concavePoint);
          }
        } else if ((Math.abs(Math.abs(angleDiff) - Math.PI / 2)) < EPSILON_ANGLE) {
          if (angleWall1_2 > angleLine) {
            poly_points.push({ x: - half_thickness, y: half_thickness });
            poly_points.push({ x: half_thickness, y: - half_thickness });
          } else {
            poly_points.push({ x: half_thickness, y: half_thickness });
            poly_points.push({ x: - half_thickness, y: - half_thickness });
          }
        } else {
          let topWall = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          let topLine = Geometry.linePassingThroughTwoPoints(0, half_thickness / Math.sin(angleDiff - Math.PI/2), - lengthLine * Math.sin(angleDiff - Math.PI/2), lengthLine * Math.cos(angleDiff - Math.PI/2) + half_thickness / Math.sin(angleDiff - Math.PI/2));
          let convexPoint = Geometry.twoLinesIntersection(topWall.a, topWall.b, topWall.c, topLine.a, topLine.b, topLine.c);
          if (convexPoint) {
            poly_points.push(convexPoint);
          }
          let botWall = Geometry.linePassingThroughTwoPoints(0, - half_thickness, length, - half_thickness);
          let botLine = Geometry.linePassingThroughTwoPoints(0, - half_thickness / Math.sin(angleDiff - Math.PI/2), - lengthLine * Math.sin(angleDiff - Math.PI/2), lengthLine * Math.cos(angleDiff - Math.PI/2) - half_thickness / Math.sin(angleDiff - Math.PI/2));
          let concavePoint = Geometry.twoLinesIntersection(botWall.a, botWall.b, botWall.c, botLine.a, botLine.b, botLine.c);
          if (concavePoint) {
            poly_points.push(concavePoint);
          }
        }
      } else {
        //console.log("more than 2 lines");
        // We are first computing the min and max angles between the wall and the lines that are impacting rendering
        const lines = _lines1.map((line) => layer.lines.get(line));
        const points = lines.map((line) => {
          if (line.vertices.get(0) == wp1.id) {
            point = layer.vertices.get(line.vertices.get(1));
          } else {
            point = layer.vertices.get(line.vertices.get(0));
          }
          return { x: point.x, y: point.y };
        });
        const angles = points.map((point) => Geometry.angleBetweenTwoVertices(wp1, point));
        const angleDiffs = angles.map((angle) => angle - angleWall1_2);
        const lengths = points.map((point) => Geometry.verticesDistance(wp1, point));

        const {min, max, minIdx, maxIdx} = angleDiffs.reduce((acc, angle, idx) => {
          if (angle < 0) {
            angle += 2 * Math.PI;
          }
          if (acc.min === undefined || angle < acc.min) {
            acc.min = angle;
            acc.minIdx = idx;
          }
          if (acc.max === undefined || angle > acc.max) {
            acc.max = angle;
            acc.maxIdx = idx;
          }
          return acc;
        }, {min: undefined, max: undefined, minIdx: undefined, maxIdx: undefined});
        
        //console.log("angles: ", angles);
        //console.log("angleDiffs: ", angleDiffs);
        //console.log("min: ", min);
        //console.log("max: ", max);
        //console.log("minIdx: ", minIdx);
        //console.log("maxIdx: ", maxIdx);

        // Rendering the intersection of the wall and line with min angle
        let minLength = lengths.get(minIdx);
        let minAngle = angles.get(minIdx);
        let minAngleDiff = angleDiffs.get(minIdx);

        if (Math.abs(minAngleDiff) < THRESHOLD_ANGLE || minLength === 0) {
          //console.log(" small minAngleDiff: ", minAngleDiff);
          poly_points.push({ x: 0, y: half_thickness });
        } else if (Math.abs(minAngleDiff) > THRESHOLD_ANGLE && ((Math.abs(Math.abs(minAngleDiff) - Math.PI / 2)) > EPSILON_ANGLE)) {
          //console.log(" aigu minAngleDiff: ", minAngleDiff);
          let topWall = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          let botLine = Geometry.linePassingThroughTwoPoints(0, - half_thickness / Math.cos(minAngleDiff), minLength * Math.cos(minAngleDiff), minLength * Math.sin(minAngleDiff) - half_thickness / Math.cos(minAngleDiff));
          let convexPoint = Geometry.twoLinesIntersection(topWall.a, topWall.b, topWall.c, botLine.a, botLine.b, botLine.c);
          if (convexPoint) {
            poly_points.push(convexPoint);
          }
        } else if ((Math.abs(Math.abs(minAngleDiff) - Math.PI / 2)) < EPSILON_ANGLE) {
          //console.log(" ortho minAngleDiff: ", minAngleDiff);
          if (angleWall1_2 > minAngle) {
            poly_points.push({ x: - half_thickness, y: half_thickness });
          } else {
            poly_points.push({ x: half_thickness, y: half_thickness });
          }
        } else {
          //console.log(" obtu minAngleDiff: ", minAngleDiff);
          let topWall = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          let topLine = Geometry.linePassingThroughTwoPoints(0, half_thickness / Math.sin(minAngleDiff - Math.PI/2), - minLength * Math.sin(minAngleDiff - Math.PI/2), minLength * Math.cos(minAngleDiff - Math.PI/2) + half_thickness / Math.sin(minAngleDiff - Math.PI/2));
          let convexPoint = Geometry.twoLinesIntersection(topWall.a, topWall.b, topWall.c, topLine.a, topLine.b, topLine.c);
          if (convexPoint) {
            poly_points.push(convexPoint);
          }
        }

        // adds center point
        poly_points.push({x: 0, y: 0});

        // Rendering the intersection of the wall and line with max angle
        let maxLength = lengths.get(maxIdx);
        let maxAngle = angles.get(maxIdx);
        let maxAngleDiff = angleDiffs.get(maxIdx);

        if (Math.abs(maxAngleDiff) < THRESHOLD_ANGLE || maxLength === 0) {
          //console.log(" small maxAngleDiff: ", maxAngleDiff);
          poly_points.push({ x: 0, y: - half_thickness });
        } else if (Math.abs(maxAngleDiff) > THRESHOLD_ANGLE && ((Math.abs(Math.abs(maxAngleDiff) - Math.PI / 2)) > EPSILON_ANGLE)) {
          //console.log(" aigu maxAngleDiff: ", maxAngleDiff);
          let botWall = Geometry.linePassingThroughTwoPoints(0, - half_thickness, length, - half_thickness);
          let topLine = Geometry.linePassingThroughTwoPoints(0, half_thickness / Math.cos(maxAngleDiff), maxLength * Math.cos(maxAngleDiff), maxLength * Math.sin(maxAngleDiff) + half_thickness / Math.cos(maxAngleDiff));
          let concavePoint = Geometry.twoLinesIntersection(botWall.a, botWall.b, botWall.c, topLine.a, topLine.b, topLine.c);
          if (concavePoint) {
            poly_points.push(concavePoint);
          }
        } else if ((Math.abs(Math.abs(maxAngleDiff) - Math.PI / 2)) < EPSILON_ANGLE) {
          //console.log(" ortho maxAngleDiff: ", maxAngleDiff);
          if (angleWall1_2 > maxAngle) {
            poly_points.push({ x: half_thickness, y: - half_thickness });
          } else {
            poly_points.push({ x: - half_thickness, y: - half_thickness });
          }
        } else {
          //console.log(" obtu maxAngleDiff: ", maxAngleDiff);
          let botWall = Geometry.linePassingThroughTwoPoints(0, - half_thickness, length, - half_thickness);
          let botLine = Geometry.linePassingThroughTwoPoints(0, - half_thickness / Math.sin(maxAngleDiff - Math.PI/2), maxLength * Math.sin(maxAngleDiff - Math.PI/2), maxLength * Math.cos(maxAngleDiff - Math.PI/2) - half_thickness / Math.sin(maxAngleDiff - Math.PI/2));
          let concavePoint = Geometry.twoLinesIntersection(botWall.a, botWall.b, botWall.c, botLine.a, botLine.b, botLine.c);
          if (concavePoint) {
            poly_points.push(concavePoint);
          }
        }
      }

      //console.log("Rendering end point WP2");
      if (_lines2.size == 0) {
        poly_points.push({ x: length, y: - half_thickness });
        poly_points.push({ x: length, y: half_thickness });
      } else if (_lines2.size == 1) {
        line = layer.lines.get(_lines2.get(0));
        //console.log("line: ", line);

        if (line.vertices.get(0) == wp2.id) {
          point = layer.vertices.get(line.vertices.get(1));
        } else {
          point = layer.vertices.get(line.vertices.get(0));
        }
        //console.log("point: ", point);

        let angleLine = Geometry.angleBetweenTwoVertices(wp2, point);
        let lengthLine = Geometry.verticesDistance(wp2, point);

        //console.log("angleLine: ", angleLine);
        //console.log("lengthLine: ", lengthLine);

        // TODO(pg): refactor using angleWall2_1
        let angleDiff = angleLine - ( angleWall1_2 + Math.PI );
        // we bring it back between -PI and PI to simplify following if / else
        if (angleDiff > Math.PI) {
          angleDiff -= 2 * Math.PI;
        }
        if (angleDiff < -Math.PI) {
          angleDiff += 2 * Math.PI;
        }

        if (Math.abs(angleDiff) < THRESHOLD_ANGLE || lengthLine === 0) {
          poly_points.push({ x: wp2.x, y: wp2.y + half_thickness });
          poly_points.push({ x: wp2.x, y: wp2.y - half_thickness });
        } else if (Math.abs(angleDiff) > THRESHOLD_ANGLE && ((Math.abs(Math.abs(angleDiff) - Math.PI / 2)) > EPSILON_ANGLE)) {
          let botWall = Geometry.linePassingThroughTwoPoints(0, - half_thickness, length, - half_thickness);
          let topLine = Geometry.linePassingThroughTwoPoints(length, half_thickness / Math.cos(angleDiff), length - lengthLine * Math.cos(angleDiff), - lengthLine * Math.sin(angleDiff) + half_thickness / Math.cos(angleDiff));
          let concavePoint = Geometry.twoLinesIntersection(botWall.a, botWall.b, botWall.c, topLine.a, topLine.b, topLine.c);
          if (concavePoint) {
            poly_points.push(concavePoint);
          }
          let topWall = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          let botLine = Geometry.linePassingThroughTwoPoints(length, - half_thickness / Math.cos(angleDiff), length - lengthLine * Math.cos(angleDiff), - lengthLine * Math.sin(angleDiff) - half_thickness / Math.cos(angleDiff));
          let convexPoint = Geometry.twoLinesIntersection(topWall.a, topWall.b, topWall.c, botLine.a, botLine.b, botLine.c);
          if (convexPoint) {
            poly_points.push(convexPoint);
          }
        } else if (Math.abs(Math.abs(angleDiff) - Math.PI / 2) < EPSILON_ANGLE) {
          if (angleWall1_2 > angleLine) {
            poly_points.push({ x: length - half_thickness, y: - half_thickness });
            poly_points.push({ x: length + half_thickness, y: half_thickness });
          } else {
            poly_points.push({ x: length + half_thickness, y: - half_thickness });
            poly_points.push({ x: length - half_thickness, y: half_thickness });
          }
        } else {
          let botWall = Geometry.linePassingThroughTwoPoints(0, - half_thickness, length, - half_thickness);
          let botLine = Geometry.linePassingThroughTwoPoints(length, - half_thickness / Math.sin(angleDiff - Math.PI/2), length - lengthLine * Math.sin(angleDiff - Math.PI/2), lengthLine * Math.cos(angleDiff - Math.PI/2) - half_thickness / Math.sin(angleDiff - Math.PI/2));
          let concavePoint = Geometry.twoLinesIntersection(botWall.a, botWall.b, botWall.c, botLine.a, botLine.b, botLine.c);
          if (concavePoint) {
            poly_points.push(concavePoint);
          }
          let topWall = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          let topLine = Geometry.linePassingThroughTwoPoints(length, half_thickness / Math.sin(angleDiff - Math.PI/2), length - lengthLine * Math.sin(angleDiff - Math.PI/2), lengthLine * Math.cos(angleDiff - Math.PI/2) + half_thickness / Math.sin(angleDiff - Math.PI/2));
          let convexPoint = Geometry.twoLinesIntersection(topWall.a, topWall.b, topWall.c, topLine.a, topLine.b, topLine.c);
          if (convexPoint) {
            poly_points.push(convexPoint);
          }
        }
      } else {
        //console.log("more than 2 lines");
        // We are first computing the min and max angles between the wall and the lines that are impacting rendering
        const lines = _lines2.map((line) => layer.lines.get(line));
        const points = lines.map((line) => {
          if (line.vertices.get(0) == wp2.id) {
            point = layer.vertices.get(line.vertices.get(1));
          } else {
            point = layer.vertices.get(line.vertices.get(0));
          }
          return { x: point.x, y: point.y };
        });
        const angles = points.map((point) => Geometry.angleBetweenTwoVertices(wp2, point));
        const angleDiffs = angles.map((angle) => angle - angleWall2_1);
        const lengths = points.map((point) => Geometry.verticesDistance(wp2, point));

        const {min, max, minIdx, maxIdx} = angleDiffs.reduce((acc, angle, idx) => {
          if (angle < 0) {
            angle += 2 * Math.PI;
          }
          if (acc.min === undefined || angle < acc.min) {
            acc.min = angle;
            acc.minIdx = idx;
          }
          if (acc.max === undefined || angle > acc.max) {
            acc.max = angle;
            acc.maxIdx = idx;
          }
          return acc;
        }, {min: undefined, max: undefined, minIdx: undefined, maxIdx: undefined});

        //console.log("angles: ", angles);
        //console.log("angleDiffs: ", angleDiffs);
        //console.log("min: ", min);
        //console.log("max: ", max);
        //console.log("minIdx: ", minIdx);
        //console.log("maxIdx: ", maxIdx);

        // Rendering the intersection of the wall and line with min angle
        let minLength = lengths.get(minIdx);
        let minAngle = angles.get(minIdx);
        let minAngleDiff = angleDiffs.get(minIdx);

        if (Math.abs(minAngleDiff) < THRESHOLD_ANGLE || minLength === 0) {
        //console.log(" small minAngleDiff: ", minAngleDiff);
        poly_points.push({ x: wp2.x, y: wp2.y - half_thickness });
        } else if (Math.abs(minAngleDiff) > THRESHOLD_ANGLE && ((Math.abs(Math.abs(minAngleDiff) - Math.PI / 2)) > EPSILON_ANGLE)) {
          //console.log(" aigu minAngleDiff: ", minAngleDiff);
          let botWall = Geometry.linePassingThroughTwoPoints(0, - half_thickness, length, - half_thickness);
          let topLine = Geometry.linePassingThroughTwoPoints(length, half_thickness / Math.cos(minAngleDiff), length - minLength * Math.cos(minAngleDiff), - minLength * Math.sin(minAngleDiff) + half_thickness / Math.cos(minAngleDiff));
          let concavePoint = Geometry.twoLinesIntersection(botWall.a, botWall.b, botWall.c, topLine.a, topLine.b, topLine.c);
          if (concavePoint) {
            poly_points.push(concavePoint);
          }
        } else if ((Math.abs(Math.abs(minAngleDiff) - Math.PI / 2)) < EPSILON_ANGLE) {
          //console.log(" ortho minAngleDiff: ", minAngleDiff);
          if (angleWall2_1 > minAngle) {
            poly_points.push({ x: length - half_thickness, y: - half_thickness });
          } else {
            poly_points.push({ x: length + half_thickness, y: - half_thickness });
          }
        } else {
          //console.log(" obtu minAngleDiff: ", minAngleDiff);
          let botWall = Geometry.linePassingThroughTwoPoints(0, - half_thickness, length, - half_thickness);
          let botLine = Geometry.linePassingThroughTwoPoints(length, - half_thickness / Math.sin(minAngleDiff - Math.PI/2), length - minLength * Math.sin(minAngleDiff - Math.PI/2), minLength * Math.cos(minAngleDiff - Math.PI/2) - half_thickness / Math.sin(minAngleDiff - Math.PI/2));
          let concavePoint = Geometry.twoLinesIntersection(botWall.a, botWall.b, botWall.c, botLine.a, botLine.b, botLine.c);
          if (concavePoint) {
            poly_points.push(concavePoint);
          }
        }

        // adds center point
        poly_points.push({x: length, y: 0});

        // Rendering the intersection of the wall and line with max angle
        let maxLength = lengths.get(maxIdx);
        let maxAngle = angles.get(maxIdx);
        let maxAngleDiff = angleDiffs.get(maxIdx);

        if (Math.abs(maxAngleDiff) < THRESHOLD_ANGLE || maxLength === 0) {
          //console.log(" small maxAngleDiff: ", maxAngleDiff);
          poly_points.push({ x: wp2.x, y: wp2.y + half_thickness });
        } else if (Math.abs(maxAngleDiff) > THRESHOLD_ANGLE && ((Math.abs(Math.abs(maxAngleDiff) - Math.PI / 2)) > EPSILON_ANGLE)) {
          //console.log(" aigu maxAngleDiff: ", maxAngleDiff);
          let topWall = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          let botLine = Geometry.linePassingThroughTwoPoints(length, - half_thickness / Math.cos(maxAngleDiff), length - maxLength * Math.cos(maxAngleDiff), - maxLength * Math.sin(maxAngleDiff) - half_thickness / Math.cos(maxAngleDiff));
          let convexPoint = Geometry.twoLinesIntersection(topWall.a, topWall.b, topWall.c, botLine.a, botLine.b, botLine.c);
          if (convexPoint) {
            poly_points.push(convexPoint);
          }
        } else if ((Math.abs(Math.abs(maxAngleDiff) - Math.PI / 2)) < EPSILON_ANGLE) {
          //console.log(" ortho maxAngleDiff: ", maxAngleDiff);
          if (angleWall2_1 > maxAngle) {
            poly_points.push({ x: length + half_thickness, y: half_thickness });
          } else {
            poly_points.push({ x: length - half_thickness, y: half_thickness });
          }
        } else {
          //console.log(" obtu maxAngleDiff: ", maxAngleDiff);
          let topWall = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          let topLine = Geometry.linePassingThroughTwoPoints(length, half_thickness / Math.sin(maxAngleDiff - Math.PI/2), length - maxLength * Math.sin(maxAngleDiff - Math.PI/2), maxLength * Math.cos(maxAngleDiff - Math.PI/2) + half_thickness / Math.sin(maxAngleDiff - Math.PI/2));
          let convexPoint = Geometry.twoLinesIntersection(topWall.a, topWall.b, topWall.c, topLine.a, topLine.b, topLine.c);
          if (convexPoint) {
            poly_points.push(convexPoint);
          }
        }
      }

      //console.log("polygon points: ", poly_points);

      return (element.selected) ?
        <g>
          {/* <rect x="0" y={-half_thickness} width={length} height={thickness} style={STYLE_RECT_SELECTED} /> */}
          <polygon points={poly_points.map((p) => `${p.x},${p.y}`).join(' ')} style={STYLE_RECT_SELECTED} />;
          <line x1={length_5} y1={-half_thickness_eps} x2={length_5} y2={half_thickness_eps} style={STYLE_LINE} />
          <text x={length_5} y={textDistance + char_height} style={STYLE_TEXT}>A</text>
          <text x={length_5} y={-textDistance} style={STYLE_TEXT}>B</text>
        </g> :
        <>
          {/* <rect x="0" y={-half_thickness} width={length} height={thickness} style={STYLE_RECT} /> */}
          <polygon points={poly_points.map((p) => `${p.x},${p.y}`).join(' ')} style={STYLE_RECT} />;
          {/* <text x={length_5} y={-thickness} style={STYLE_TEXT}>{element.id}</text> */}
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
