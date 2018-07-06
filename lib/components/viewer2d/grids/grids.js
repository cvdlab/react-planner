'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Grids;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _gridHorizontalStreak = require('./grid-horizontal-streak');

var _gridHorizontalStreak2 = _interopRequireDefault(_gridHorizontalStreak);

var _gridVerticalStreak = require('./grid-vertical-streak');

var _gridVerticalStreak2 = _interopRequireDefault(_gridVerticalStreak);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Grids(_ref) {
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
        return _react2.default.createElement(_gridHorizontalStreak2.default, { key: gridID, width: width, height: height, grid: grid });

      case 'vertical-streak':
        return _react2.default.createElement(_gridVerticalStreak2.default, { key: gridID, width: width, height: height, grid: grid });

      default:
        console.warn('grid ' + grid.type + ' not allowed');
    }
  }).toList();

  return _react2.default.createElement(
    'g',
    null,
    renderedGrids
  );
}

Grids.propTypes = {
  scene: _propTypes2.default.object.isRequired
};