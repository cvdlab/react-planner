var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React from 'react';
import PropTypes from 'prop-types';
import Scene from './scene';
import Snap from './snap';
import * as SharedStyle from '../../shared-style';

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


  activeSnapElement = activeSnapElement ? React.createElement(Snap, { snap: activeSnapElement, width: scene.width, height: scene.height }) : null;
  // snapElements = snapElements.map((snap,id) => <Snap key={id} snap={snap} width={scene.width} height={scene.height}/>);
  snapElements = null; //only for debug purpose

  return React.createElement(
    'g',
    null,
    React.createElement('rect', { x: '0', y: '0', width: width, height: height, fill: SharedStyle.COLORS.white }),
    React.createElement(
      'g',
      { transform: 'translate(0, ' + scene.height + ') scale(1, -1)', id: 'svg-drawing-paper' },
      React.createElement(Scene, { scene: scene, catalog: catalog }),
      scene.getIn(['guides', 'horizontal']).entrySeq().map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            hgKey = _ref3[0],
            hgVal = _ref3[1];

        return React.createElement('line', { id: 'hGuide' + hgKey, key: hgKey, x1: 0, y1: hgVal, x2: width, y2: hgVal, style: guideStyle });
      }),
      scene.getIn(['guides', 'vertical']).entrySeq().map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            vgKey = _ref5[0],
            vgVal = _ref5[1];

        return React.createElement('line', { key: vgKey, x1: vgVal, y1: 0, x2: vgVal, y2: height, style: guideStyle });
      }),
      activeSnapElement,
      snapElements
    )
  );
}

State.propTypes = {
  state: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};