"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OBJExporter = void 0;
var _three = require("three");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var OBJExporter = /*#__PURE__*/function () {
  function OBJExporter() {
    _classCallCheck(this, OBJExporter);
  }
  _createClass(OBJExporter, [{
    key: "parse",
    value: function parse(object) {
      var output = '';
      var indexVertex = 0;
      var indexVertexUvs = 0;
      var indexNormals = 0;
      var vertex = new _three.Vector3();
      var color = new _three.Color();
      var normal = new _three.Vector3();
      var uv = new _three.Vector2();
      var faces = [];
      function parseMesh(mesh) {
        var nbVertex = 0;
        var nbNormals = 0;
        var nbVertexUvs = 0;
        var geometry = mesh.geometry;
        var normalMatrixWorld = new _three.Matrix3();
        if (geometry instanceof _three.Geometry) {
          geometry = new _three.BufferGeometry().setFromObject(mesh);
        }
        if (geometry instanceof _three.BufferGeometry) {
          // shortcuts
          var vertices = geometry.attributes.position;
          var normals = geometry.attributes.normal;
          var uvs = geometry.attributes.uv;
          var indices = geometry.index;

          // name of the mesh object
          output += 'o ' + mesh.name + '\n';

          // name of the mesh material
          if (mesh.material && mesh.material.name) {
            output += 'usemtl ' + mesh.material.name + '\n';
          }

          // vertices

          if (vertices !== undefined) {
            for (var i = 0, l = vertices.count; i < l; i++, nbVertex++) {
              vertex.fromBufferAttribute(vertices, i);

              // transform the vertex to world space
              vertex.applyMatrix4(mesh.matrixWorld);

              // transform the vertex to export format
              output += 'v ' + vertex.x + ' ' + vertex.y + ' ' + vertex.z + '\n';
            }
          }

          // uvs

          if (uvs !== undefined) {
            for (var _i = 0, _l = uvs.count; _i < _l; _i++, nbVertexUvs++) {
              uv.fromBufferAttribute(uvs, _i);

              // transform the uv to export format
              output += 'vt ' + uv.x + ' ' + uv.y + '\n';
            }
          }

          // normals

          if (normals !== undefined) {
            normalMatrixWorld.getNormalMatrix(mesh.matrixWorld);
            for (var _i2 = 0, _l2 = normals.count; _i2 < _l2; _i2++, nbNormals++) {
              normal.fromBufferAttribute(normals, _i2);

              // transform the normal to world space
              normal.applyMatrix3(normalMatrixWorld).normalize();

              // transform the normal to export format
              output += 'vn ' + normal.x + ' ' + normal.y + ' ' + normal.z + '\n';
            }
          }

          // faces

          if (indices !== null) {
            for (var _i3 = 0, _l3 = indices.count; _i3 < _l3; _i3 += 3) {
              for (var m = 0; m < 3; m++) {
                var j = indices.getX(_i3 + m) + 1;
                faces[m] = indexVertex + j + (normals || uvs ? '/' + (uvs ? indexVertexUvs + j : '') + (normals ? '/' + (indexNormals + j) : '') : '');
              }

              // transform the face to export format
              output += 'f ' + faces.join(' ') + '\n';
            }
          } else if (vertices) {
            for (var _i4 = 0, _l4 = vertices.count; _i4 < _l4; _i4 += 3) {
              for (var _m = 0; _m < 3; _m++) {
                var _j = _i4 + _m + 1;
                faces[_m] = indexVertex + _j + (normals || uvs ? '/' + (uvs ? indexVertexUvs + _j : '') + (normals ? '/' + (indexNormals + _j) : '') : '');
              }

              // transform the face to export format
              output += 'f ' + faces.join(' ') + '\n';
            }
          }
        } else {
          console.warn('OBJExporter.parseMesh(): geometry type unsupported', geometry);
        }

        // update index
        indexVertex += nbVertex;
        indexVertexUvs += nbVertexUvs;
        indexNormals += nbNormals;
      }
      function parseLine(line) {
        var nbVertex = 0;
        var geometry = line.geometry;
        var type = line.type;
        if (geometry instanceof _three.Geometry) {
          geometry = new _three.BufferGeometry().setFromObject(line);
        }
        if (geometry instanceof _three.BufferGeometry) {
          // shortcuts
          var vertices = geometry.atributes.position;

          // name of the line object
          output += 'o ' + line.name + '\n';
          if (vertices !== undefined) {
            for (var i = 0, l = vertices.count; i < l; i++, nbVertex++) {
              vertex.fromBufferAttribute(vertices, i);

              // transform the vertex to world space
              vertex.applyMatrix4(line.matrixWorld);

              // transform the vertex to export format
              output += 'v ' + vertex.x + ' ' + vertex.y + ' ' + vertex.z + '\n';
            }
          }
          if (type === 'Line') {
            output += 'l ';
            for (var j = 1, _l5 = vertices.count; j <= _l5; j++) {
              output += indexVertex + j + ' ';
            }
            output += '\n';
          }
          if (type === 'LineSegments') {
            for (var _j2 = 1, k = _j2 + 1, _l6 = vertices.count; _j2 < _l6; _j2 += 2, k = _j2 + 1) {
              output += 'l ' + (indexVertex + _j2) + ' ' + (indexVertex + k) + '\n';
            }
          }
        } else {
          console.warn('THREE.OBJExporter.parseLine(): geometry type unsupported', geometry);
        }

        // update index
        indexVertex += nbVertex;
      }
      function parsePoints(points) {
        var nbVertex = 0;
        var geometry = points.geometry;
        if (geometry instanceof _three.Geometry) {
          geometry = new _three.BufferGeometry().setFromObject(points);
        }
        if (geometry instanceof _three.BufferGeometry) {
          var vertices = geometry.atributes.position;
          var colors = geometry.atributes.color;
          output += 'o ' + points.name + '\n';
          if (vertices !== undefined) {
            for (var i = 0, l = vertices.count; i < l; i++, nbVertex++) {
              vertex.fromBufferAttribute(vertices, i);
              vertex.applyMatrix4(points.matrixWorld);
              output += 'v ' + vertex.x + ' ' + vertex.y + ' ' + vertex.z;
              if (colors !== undefined) {
                color.fromBufferAttribute(colors, i).convertLinearToSRGB();
                output += ' ' + color.r + ' ' + color.g + ' ' + color.b;
              }
              output += '\n';
            }
            output += 'p ';
            for (var j = 1, _l7 = vertices.count; j <= _l7; j++) {
              output += indexVertex + j + ' ';
            }
            output += '\n';
          }
        } else {
          console.warn('THREE.OBJExporter.parsePoints(): geometry type unsupported', geometry);
        }
        // update index
        indexVertex += nbVertex;
      }
      object.traverse(function (child) {
        if (child.isMesh === true) {
          parseMesh(child);
        }
        if (child.isLine === true) {
          parseLine(child);
        }
        if (child.isPoints === true) {
          parsePoints(child);
        }
      });
      return output;
    }
  }]);
  return OBJExporter;
}();
exports.OBJExporter = OBJExporter;