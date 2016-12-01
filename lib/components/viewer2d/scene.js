'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Scene;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _layer = require('./layer');

var _layer2 = _interopRequireDefault(_layer);

var _guides = require('./guides/guides');

var _guides2 = _interopRequireDefault(_guides);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Scene(_ref) {
  var scene = _ref.scene,
      catalog = _ref.catalog;
  var height = scene.height,
      layers = scene.layers;

  var selectedLayer = scene.layers.get(scene.selectedLayer);

  return _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement(_guides2.default, { scene: scene }),
    _react2.default.createElement(
      'g',
      { style: { pointerEvents: "none" } },
      layers.entrySeq().filter(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            layerID = _ref3[0],
            layer = _ref3[1];

        return layerID !== scene.selectedLayer && layer.visible;
      }).map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            layerID = _ref5[0],
            layer = _ref5[1];

        return _react2.default.createElement(_layer2.default, { key: layerID, layer: layer, scene: scene, catalog: catalog });
      })
    ),
    _react2.default.createElement(_layer2.default, { key: selectedLayer.id, layer: selectedLayer, scene: scene, catalog: catalog })
  );
}

Scene.propTypes = {
  scene: _react.PropTypes.object.isRequired,
  catalog: _react.PropTypes.object.isRequired
};