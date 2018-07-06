'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = State;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _scene = require('./scene');

var _scene2 = _interopRequireDefault(_scene);

var _snap = require('./snap');

var _snap2 = _interopRequireDefault(_snap);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var guideStyle = {
  stroke: SharedStyle.SECONDARY_COLOR.main,
  strokewidth: '2.5px'
};

function State(_ref) {
  var state = _ref.state,
      catalog = _ref.catalog;
  var activeSnapElement = state.activeSnapElement,
      snapElements = state.snapElements,
      scene = state.scene;
  var width = scene.width,
      height = scene.height;


  activeSnapElement = activeSnapElement ? _react2.default.createElement(_snap2.default, { snap: activeSnapElement, width: scene.width, height: scene.height }) : null;
  // snapElements = snapElements.map((snap,id) => <Snap key={id} snap={snap} width={scene.width} height={scene.height}/>);
  snapElements = null; //only for debug purpose

  return _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement('rect', { x: '0', y: '0', width: width, height: height, fill: SharedStyle.COLORS.white }),
    _react2.default.createElement(
      'g',
      { transform: 'translate(0, ' + scene.height + ') scale(1, -1)', id: 'svg-drawing-paper' },
      _react2.default.createElement(_scene2.default, { scene: scene, catalog: catalog }),
      scene.getIn(['guides', 'horizontal']).entrySeq().map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            hgKey = _ref3[0],
            hgVal = _ref3[1];

        return _react2.default.createElement('line', { id: 'hGuide' + hgKey, key: hgKey, x1: 0, y1: hgVal, x2: width, y2: hgVal, style: guideStyle });
      }),
      scene.getIn(['guides', 'vertical']).entrySeq().map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            vgKey = _ref5[0],
            vgVal = _ref5[1];

        return _react2.default.createElement('line', { key: vgKey, x1: vgVal, y1: 0, x2: vgVal, y2: height, style: guideStyle });
      }),
      activeSnapElement,
      snapElements
    )
  );
}

State.propTypes = {
  state: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired
};