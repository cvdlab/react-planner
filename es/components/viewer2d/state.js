function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Scene from './scene';
import Snap from './snap';
import * as SharedStyle from '../../styles/shared-style';
var guideStyle = {
  stroke: SharedStyle.SECONDARY_COLOR.main,
  strokewidth: '2.5px'
};
export default function State(_ref) {
  var state = _ref.state,
    catalog = _ref.catalog;
  var activeSnapElement = state.activeSnapElement,
    snapElements = state.snapElements,
    scene = state.scene;
  var width = scene.width,
    height = scene.height;
  activeSnapElement = activeSnapElement ? /*#__PURE__*/React.createElement(Snap, {
    snap: activeSnapElement,
    width: scene.width,
    height: scene.height
  }) : null;
  // snapElements = snapElements.map((snap,id) => <Snap key={id} snap={snap} width={scene.width} height={scene.height}/>);
  snapElements = null; //only for debug purpose

  return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: width,
    height: height,
    fill: SharedStyle.COLORS.grey
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(0, ".concat(scene.height, ") scale(1, -1)"),
    id: "svg-drawing-paper"
  }, /*#__PURE__*/React.createElement(Scene, {
    scene: scene,
    catalog: catalog
  }), scene.getIn(['guides', 'horizontal']).entrySeq().map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      hgKey = _ref3[0],
      hgVal = _ref3[1];
    return /*#__PURE__*/React.createElement("line", {
      id: 'hGuide' + hgKey,
      key: hgKey,
      x1: 0,
      y1: hgVal,
      x2: width,
      y2: hgVal,
      style: guideStyle
    });
  }), scene.getIn(['guides', 'vertical']).entrySeq().map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      vgKey = _ref5[0],
      vgVal = _ref5[1];
    return /*#__PURE__*/React.createElement("line", {
      key: vgKey,
      x1: vgVal,
      y1: 0,
      x2: vgVal,
      y2: height,
      style: guideStyle
    });
  }), activeSnapElement, snapElements));
}
State.propTypes = {
  state: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};