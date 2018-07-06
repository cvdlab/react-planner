var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Grids } from './export';

var Scene = function (_Component) {
  _inherits(Scene, _Component);

  function Scene() {
    _classCallCheck(this, Scene);

    return _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).apply(this, arguments));
  }

  _createClass(Scene, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.scene.hashCode() !== nextProps.scene.hashCode();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          scene = _props.scene,
          catalog = _props.catalog;
      var height = scene.height,
          layers = scene.layers;

      var selectedLayer = layers.get(scene.selectedLayer);

      return React.createElement(
        'g',
        null,
        React.createElement(Grids, { scene: scene }),
        React.createElement(
          'g',
          { style: { pointerEvents: 'none' } },
          layers.entrySeq().filter(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                layerID = _ref2[0],
                layer = _ref2[1];

            return layerID !== scene.selectedLayer && layer.visible;
          }).map(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                layerID = _ref4[0],
                layer = _ref4[1];

            return React.createElement(Layer, { key: layerID, layer: layer, scene: scene, catalog: catalog });
          })
        ),
        React.createElement(Layer, { key: selectedLayer.id, layer: selectedLayer, scene: scene, catalog: catalog })
      );
    }
  }]);

  return Scene;
}(Component);

export default Scene;


Scene.propTypes = {
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};