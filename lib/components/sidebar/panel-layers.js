'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = PanelLayers;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _panel = require('./panel');

var _panel2 = _interopRequireDefault(_panel);

var _eye = require('react-icons/lib/fa/eye');

var _eye2 = _interopRequireDefault(_eye);

var _eyeSlash = require('react-icons/lib/fa/eye-slash');

var _eyeSlash2 = _interopRequireDefault(_eyeSlash);

var _plus = require('react-icons/lib/ti/plus');

var _plus2 = _interopRequireDefault(_plus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE_LAYER_WRAPPER = {
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  background: "#3A3A3E",
  borderBottom: "1px solid #000",
  height: "30px",
  padding: "5px 15px 5px 15px"
};

var STYLE_LAYER_ACTIVE = _extends({}, STYLE_LAYER_WRAPPER, {
  background: "#415375"
});

var STYLE_ICON = {
  width: "10%",
  fontSize: "18px"
};

var STYLE_NAME = {
  width: "90%",
  verticalAlign: "center",
  padding: "0 5px"
};

var STYLE_ADD_WRAPPER = {
  display: "block",
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
  padding: "0px 15px"
};

var STYLE_ADD_LABEL = {
  fontSize: "10px",
  marginLeft: "5px"
};

function PanelLayers(_ref, _ref2) {
  var scene = _ref.scene;
  var mode = _ref.mode;
  var sceneActions = _ref2.sceneActions;


  var addClick = function addClick(event) {
    var name = window.prompt("layer name");
    var altitude = window.prompt("layer altitude");
    sceneActions.addLayer(name, parseFloat(altitude));
    event.stopPropagation();
  };

  return _react2.default.createElement(
    _panel2.default,
    { name: 'Layers' },
    scene.layers.entrySeq().map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2);

      var layerID = _ref4[0];
      var layer = _ref4[1];


      var isCurrentLayer = layerID === scene.selectedLayer;
      var style = isCurrentLayer ? STYLE_LAYER_ACTIVE : STYLE_LAYER_WRAPPER;
      var icon = layer.visible || layerID === scene.selectedLayer ? _react2.default.createElement(_eye2.default, null) : _react2.default.createElement(_eyeSlash2.default, { style: { color: "#a5a1a1" } });

      var selectClick = function selectClick(event) {
        return sceneActions.selectLayer(layerID);
      };

      var swapVisibility = function swapVisibility(event) {
        sceneActions.setLayerProperties(layerID, { visible: !layer.visible });
        event.stopPropagation();
      };

      var iconRendered = isCurrentLayer ? _react2.default.createElement('div', { style: STYLE_ICON }) : _react2.default.createElement(
        'div',
        { style: STYLE_ICON, onClick: swapVisibility },
        icon
      );

      return _react2.default.createElement(
        'div',
        { style: style, key: layerID, onClick: selectClick },
        iconRendered,
        _react2.default.createElement(
          'div',
          { style: STYLE_NAME },
          '[',
          layer.id,
          '] ',
          layer.name
        )
      );
    }),
    _react2.default.createElement(
      'a',
      { href: 'javascript:;', style: STYLE_ADD_WRAPPER, key: 'add', onClick: addClick },
      _react2.default.createElement(_plus2.default, null),
      _react2.default.createElement(
        'span',
        { style: STYLE_ADD_LABEL },
        'New Layer'
      )
    )
  );
}

PanelLayers.propTypes = {
  scene: _react.PropTypes.object.isRequired,
  mode: _react.PropTypes.string.isRequired
};

PanelLayers.contextTypes = {
  sceneActions: _react.PropTypes.object.isRequired
};