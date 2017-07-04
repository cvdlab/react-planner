var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import If from '../../utils/react-if';
import FooterToggleButton from './footer-toggle-button';
import { VERSION } from '../../version';
import { SNAP_POINT, SNAP_LINE, SNAP_SEGMENT, SNAP_MASK } from '../../utils/snap';
import { MODE_SNAPPING } from '../../constants';

var footerBarStyle = {
  position: 'absolute',
  bottom: 0,
  height: '20px',
  lineHeight: '14px',
  fontSize: '12px',
  color: '#FFF',
  backgroundColor: '#005faf',
  padding: '3px 1em',
  width: '100%',
  margin: 0,
  boxSizing: 'border-box',
  cursor: 'default',
  userSelect: 'none',
  zIndex: '9001'
};

export var leftTextStyle = {
  position: 'relative',
  borderRight: '1px solid #FFF',
  float: 'left',
  padding: '0 1em',
  display: 'inline-block'
};

export var rightTextStyle = {
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

      return React.createElement(
        'div',
        { style: footerBarStyle },
        React.createElement(
          If,
          { condition: MODE_SNAPPING.includes(mode) },
          React.createElement(
            'div',
            { style: leftTextStyle },
            React.createElement(
              'div',
              { title: 'Mouse X Coordinates', style: coordStyle },
              'X : ',
              x.toFixed(3)
            ),
            React.createElement(
              'div',
              { title: 'Mouse Y Coordinates', style: coordStyle },
              'Y : ',
              y.toFixed(3)
            )
          ),
          React.createElement(
            'div',
            { style: leftTextStyle, title: 'Scene Zoom Level' },
            'Zoom: ',
            zoom.toFixed(3),
            'X'
          ),
          React.createElement(
            'div',
            { style: leftTextStyle },
            React.createElement(FooterToggleButton, {
              state: this.state,
              toggleOn: function toggleOn() {
                _this2.context.projectActions.toggleSnap(_this2.props.state.snapMask.merge({ SNAP_POINT: true }));
              },
              toggleOff: function toggleOff() {
                _this2.context.projectActions.toggleSnap(_this2.props.state.snapMask.merge({ SNAP_POINT: false }));
              },
              text: 'Snap PT',
              toggleState: this.props.state.snapMask.get(SNAP_POINT),
              title: 'Snap to Point'
            }),
            React.createElement(FooterToggleButton, {
              state: this.state,
              toggleOn: function toggleOn() {
                _this2.context.projectActions.toggleSnap(_this2.props.state.snapMask.merge({ SNAP_LINE: true }));
              },
              toggleOff: function toggleOff() {
                _this2.context.projectActions.toggleSnap(_this2.props.state.snapMask.merge({ SNAP_LINE: false }));
              },
              text: 'Snap LN',
              toggleState: this.props.state.snapMask.get(SNAP_LINE),
              title: 'Snap to Line'
            }),
            React.createElement(FooterToggleButton, {
              state: this.state,
              toggleOn: function toggleOn() {
                _this2.context.projectActions.toggleSnap(_this2.props.state.snapMask.merge({ SNAP_SEGMENT: true }));
              },
              toggleOff: function toggleOff() {
                _this2.context.projectActions.toggleSnap(_this2.props.state.snapMask.merge({ SNAP_SEGMENT: false }));
              },
              text: 'Snap SEG',
              toggleState: this.props.state.snapMask.get(SNAP_SEGMENT),
              title: 'Snap to Segment'
            })
          )
        ),
        this.props.footerbarComponents.map(function (Component, index) {
          return React.createElement(Component, { state: state, key: index });
        }),
        React.createElement(
          'div',
          { style: rightTextStyle },
          'React-Planner ',
          VERSION
        )
      );
    }
  }]);

  return FooterBar;
}(Component);

export default FooterBar;


FooterBar.propTypes = {
  state: PropTypes.object.isRequired,
  footerbarComponents: PropTypes.array.isRequired
};

FooterBar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  editingActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};