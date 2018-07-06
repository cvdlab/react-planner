var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
        return React.createElement(GridHorizontalStreak, { key: gridID, width: width, height: height, grid: grid });

      case 'vertical-streak':
        return React.createElement(GridVerticalStreak, { key: gridID, width: width, height: height, grid: grid });

      default:
        console.warn('grid ' + grid.type + ' not allowed');
    }
  }).toList();

  return React.createElement(
    'g',
    null,
    renderedGrids
  );
}

Grids.propTypes = {
  scene: PropTypes.object.isRequired
};