function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React from 'react';
import PropTypes from 'prop-types';
import GridHorizontalStreak from './grid-horizontal-streak';
import GridVerticalStreak from './grid-vertical-streak';
export default function Grids(_ref) {
  var scene = _ref.scene;
  var width = scene.width,
    height = scene.height,
    grids = scene.grids;
  var renderedGrids = grids.entrySeq().map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      gridID = _ref3[0],
      grid = _ref3[1];
    switch (grid.type) {
      case 'horizontal-streak':
        return /*#__PURE__*/React.createElement(GridHorizontalStreak, {
          key: gridID,
          width: width,
          height: height,
          grid: grid
        });
      case 'vertical-streak':
        return /*#__PURE__*/React.createElement(GridVerticalStreak, {
          key: gridID,
          width: width,
          height: height,
          grid: grid
        });
      default:
        console.warn("grid ".concat(grid.type, " not allowed"));
    }
  }).toList();
  return /*#__PURE__*/React.createElement("g", null, renderedGrids);
}
Grids.propTypes = {
  scene: PropTypes.object.isRequired
};