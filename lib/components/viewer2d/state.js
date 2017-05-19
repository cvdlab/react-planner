'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = State;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _scene = require('./scene');

var _scene2 = _interopRequireDefault(_scene);

var _snap = require('./snap');

var _snap2 = _interopRequireDefault(_snap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function State(_ref) {
  var state = _ref.state,
      catalog = _ref.catalog;
  var viewer2D = state.viewer2D,
      mode = state.mode,
      activeSnapElement = state.activeSnapElement,
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
    _react2.default.createElement('rect', { x: '0', y: '0', width: width, height: height, fill: '#fff' }),
    _react2.default.createElement(
      'g',
      { transform: 'translate(0, ' + scene.height + ') scale(1, -1)' },
      _react2.default.createElement(_scene2.default, { scene: scene, catalog: catalog }),
      activeSnapElement,
      snapElements
    )
  );
}

State.propTypes = {
  state: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired
};