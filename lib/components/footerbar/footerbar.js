'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rightTextStyle = exports.leftTextStyle = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIf = require('../../utils/react-if');

var _reactIf2 = _interopRequireDefault(_reactIf);

var _footerToggleButton = require('./footer-toggle-button');

var _footerToggleButton2 = _interopRequireDefault(_footerToggleButton);

var _version = require('../../version');

var _snap = require('../../utils/snap');

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var footerBarStyle = {
  position: 'absolute',
  bottom: 0,
  lineHeight: '14px',
  fontSize: '12px',
  color: '#FFF',
  backgroundColor: '#005faf',
  padding: '3px 1em',
  margin: 0,
  boxSizing: 'border-box',
  cursor: 'default',
  userSelect: 'none',
  zIndex: '9001'
};

var leftTextStyle = exports.leftTextStyle = {
  position: 'relative',
  borderRight: '1px solid #FFF',
  float: 'left',
  padding: '0 1em',
  display: 'inline-block'
};

var rightTextStyle = exports.rightTextStyle = {
  position: 'relative',
  borderLeft: '1px solid #FFF',
  float: 'right',
  padding: '0 1em',
  display: 'inline-block'
};

var coordStyle = {
  display: 'inline-block',
  width: '6em',
  margin: 0,
  padding: 0
};

var FooterBar = function (_Component) {
  _inherits(FooterBar, _Component);

  function FooterBar(props) {
    _classCallCheck(this, FooterBar);

    var _this = _possibleConstructorReturn(this, (FooterBar.__proto__ || Object.getPrototypeOf(FooterBar)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(FooterBar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props$state$get$toJS = this.props.state.get('mouse').toJS(),
          x = _props$state$get$toJS.x,
          y = _props$state$get$toJS.y;

      var zoom = this.props.state.get('zoom');
      var mode = this.props.state.get('mode');

      return _react2.default.createElement(
        'div',
        { style: _extends({}, footerBarStyle, { width: this.props.width, height: this.props.height }) },
        _react2.default.createElement(
          _reactIf2.default,
          { condition: _constants.MODE_SNAPPING.includes(mode) },
          _react2.default.createElement(
            'div',
            { style: leftTextStyle },
            _react2.default.createElement(
              'div',
              { title: 'Mouse X Coordinates', style: coordStyle },
              'X : ',
              x.toFixed(3)
            ),
            _react2.default.createElement(
              'div',
              { title: 'Mouse Y Coordinates', style: coordStyle },
              'Y : ',
              y.toFixed(3)
            )
          ),
          _react2.default.createElement(
            'div',
            { style: leftTextStyle, title: 'Scene Zoom Level' },
            'Zoom: ',
            zoom.toFixed(3),
            'X'
          ),
          _react2.default.createElement(
            'div',
            { style: leftTextStyle },
            _react2.default.createElement(_footerToggleButton2.default, {
              state: this.state,
              toggleOn: function toggleOn() {
                _this2.context.projectActions.toggleSnap(_this2.props.state.snapMask.merge({ SNAP_POINT: true }));
              },
              toggleOff: function toggleOff() {
                _this2.context.projectActions.toggleSnap(_this2.props.state.snapMask.merge({ SNAP_POINT: false }));
              },
              text: 'Snap PT',
              toggleState: this.props.state.snapMask.get(_snap.SNAP_POINT),
              title: 'Snap to Point'
            }),
            _react2.default.createElement(_footerToggleButton2.default, {
              state: this.state,
              toggleOn: function toggleOn() {
                _this2.context.projectActions.toggleSnap(_this2.props.state.snapMask.merge({ SNAP_LINE: true }));
              },
              toggleOff: function toggleOff() {
                _this2.context.projectActions.toggleSnap(_this2.props.state.snapMask.merge({ SNAP_LINE: false }));
              },
              text: 'Snap LN',
              toggleState: this.props.state.snapMask.get(_snap.SNAP_LINE),
              title: 'Snap to Line'
            }),
            _react2.default.createElement(_footerToggleButton2.default, {
              state: this.state,
              toggleOn: function toggleOn() {
                _this2.context.projectActions.toggleSnap(_this2.props.state.snapMask.merge({ SNAP_SEGMENT: true }));
              },
              toggleOff: function toggleOff() {
                _this2.context.projectActions.toggleSnap(_this2.props.state.snapMask.merge({ SNAP_SEGMENT: false }));
              },
              text: 'Snap SEG',
              toggleState: this.props.state.snapMask.get(_snap.SNAP_SEGMENT),
              title: 'Snap to Segment'
            })
          )
        ),
        this.props.footerbarComponents.map(function (Component, index) {
          return _react2.default.createElement(Component, { state: state, key: index });
        }),
        _react2.default.createElement(
          'div',
          { style: rightTextStyle },
          'React-Planner ',
          _version.VERSION
        )
      );
    }
  }]);

  return FooterBar;
}(_react.Component);

exports.default = FooterBar;


FooterBar.propTypes = {
  state: _propTypes2.default.object.isRequired,
  footerbarComponents: _propTypes2.default.array.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired
};

FooterBar.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  viewer2DActions: _propTypes2.default.object.isRequired,
  viewer3DActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};