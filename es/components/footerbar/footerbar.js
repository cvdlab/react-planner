var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import If from '../../utils/react-if';
import FooterToggleButton from './footer-toggle-button';
import FooterContentButton from './footer-content-button';
import { SNAP_POINT, SNAP_LINE, SNAP_SEGMENT, SNAP_GRID, SNAP_GUIDE } from '../../utils/snap';
import { MODE_SNAPPING } from '../../constants';
import * as SharedStyle from '../../shared-style';
import { MdAddCircle, MdWarning } from 'react-icons/md';
import { VERSION } from '../../version';

var footerBarStyle = {
  position: 'absolute',
  bottom: 0,
  lineHeight: '14px',
  fontSize: '12px',
  color: SharedStyle.COLORS.white,
  backgroundColor: SharedStyle.SECONDARY_COLOR.alt,
  padding: '3px 1em',
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

var appMessageStyle = { borderBottom: '1px solid #555', lineHeight: '1.5em' };

var FooterBar = function (_Component) {
  _inherits(FooterBar, _Component);

  function FooterBar(props, context) {
    _classCallCheck(this, FooterBar);

    var _this = _possibleConstructorReturn(this, (FooterBar.__proto__ || Object.getPrototypeOf(FooterBar)).call(this, props, context));

    _this.state = {};
    return _this;
  }

  _createClass(FooterBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          globalState = _props.state,
          width = _props.width,
          height = _props.height;
      var _context = this.context,
          translator = _context.translator,
          projectActions = _context.projectActions;

      var _globalState$get$toJS = globalState.get('mouse').toJS(),
          x = _globalState$get$toJS.x,
          y = _globalState$get$toJS.y;

      var zoom = globalState.get('zoom');
      var mode = globalState.get('mode');

      var errors = globalState.get('errors').toArray();
      var errorsJsx = errors.map(function (err, ind) {
        return React.createElement(
          'div',
          { key: ind, style: appMessageStyle },
          '[ ',
          new Date(err.date).toLocaleString(),
          ' ] ',
          err.error
        );
      });
      var errorLableStyle = errors.length ? { color: SharedStyle.MATERIAL_COLORS[500].red } : {};
      var errorIconStyle = errors.length ? { transform: 'rotate(45deg)', color: SharedStyle.MATERIAL_COLORS[500].red } : { transform: 'rotate(45deg)' };

      var warnings = globalState.get('warnings').toArray();
      var warningsJsx = warnings.map(function (warn, ind) {
        return React.createElement(
          'div',
          { key: ind, style: appMessageStyle },
          '[ ',
          new Date(warn.date).toLocaleString(),
          ' ] ',
          warn.warning
        );
      });
      var warningLableStyle = warnings.length ? { color: SharedStyle.MATERIAL_COLORS[500].yellow } : {};
      var warningIconStyle = warningLableStyle;

      var updateSnapMask = function updateSnapMask(val) {
        return projectActions.toggleSnap(globalState.snapMask.merge(val));
      };

      return React.createElement(
        'div',
        { style: _extends({}, footerBarStyle, { width: width, height: height }) },
        React.createElement(
          If,
          { condition: MODE_SNAPPING.includes(mode) },
          React.createElement(
            'div',
            { style: leftTextStyle },
            React.createElement(
              'div',
              { title: translator.t('Mouse X Coordinate'), style: coordStyle },
              'X : ',
              x.toFixed(3)
            ),
            React.createElement(
              'div',
              { title: translator.t('Mouse Y Coordinate'), style: coordStyle },
              'Y : ',
              y.toFixed(3)
            )
          ),
          React.createElement(
            'div',
            { style: leftTextStyle, title: translator.t('Scene Zoom Level') },
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
                updateSnapMask({ SNAP_POINT: true });
              },
              toggleOff: function toggleOff() {
                updateSnapMask({ SNAP_POINT: false });
              },
              text: 'Snap PT',
              toggleState: globalState.snapMask.get(SNAP_POINT),
              title: translator.t('Snap to Point')
            }),
            React.createElement(FooterToggleButton, {
              state: this.state,
              toggleOn: function toggleOn() {
                updateSnapMask({ SNAP_LINE: true });
              },
              toggleOff: function toggleOff() {
                updateSnapMask({ SNAP_LINE: false });
              },
              text: 'Snap LN',
              toggleState: globalState.snapMask.get(SNAP_LINE),
              title: translator.t('Snap to Line')
            }),
            React.createElement(FooterToggleButton, {
              state: this.state,
              toggleOn: function toggleOn() {
                updateSnapMask({ SNAP_SEGMENT: true });
              },
              toggleOff: function toggleOff() {
                updateSnapMask({ SNAP_SEGMENT: false });
              },
              text: 'Snap SEG',
              toggleState: globalState.snapMask.get(SNAP_SEGMENT),
              title: translator.t('Snap to Segment')
            }),
            React.createElement(FooterToggleButton, {
              state: this.state,
              toggleOn: function toggleOn() {
                updateSnapMask({ SNAP_GRID: true });
              },
              toggleOff: function toggleOff() {
                updateSnapMask({ SNAP_GRID: false });
              },
              text: 'Snap GRD',
              toggleState: globalState.snapMask.get(SNAP_GRID),
              title: translator.t('Snap to Grid')
            }),
            React.createElement(FooterToggleButton, {
              state: this.state,
              toggleOn: function toggleOn() {
                updateSnapMask({ SNAP_GUIDE: true });
              },
              toggleOff: function toggleOff() {
                updateSnapMask({ SNAP_GUIDE: false });
              },
              text: 'Snap GDE',
              toggleState: globalState.snapMask.get(SNAP_GUIDE),
              title: translator.t('Snap to Guide')
            })
          )
        ),
        this.props.footerbarComponents.map(function (Component, index) {
          return React.createElement(Component, { state: state, key: index });
        }),
        this.props.softwareSignature ? React.createElement(
          'div',
          {
            style: rightTextStyle,
            title: this.props.softwareSignature + (this.props.softwareSignature.includes('React-Planner') ? '' : ' using React-Planner ' + VERSION)
          },
          this.props.softwareSignature
        ) : null,
        React.createElement(
          'div',
          { style: rightTextStyle },
          React.createElement(FooterContentButton, {
            state: this.state,
            icon: MdAddCircle,
            iconStyle: errorIconStyle,
            text: errors.length.toString(),
            textStyle: errorLableStyle,
            title: 'Errors [ ' + errors.length + ' ]',
            titleStyle: errorLableStyle,
            content: [errorsJsx]
          }),
          React.createElement(FooterContentButton, {
            state: this.state,
            icon: MdWarning,
            iconStyle: warningIconStyle,
            text: warnings.length.toString(),
            textStyle: warningLableStyle,
            title: 'Warnings [ ' + warnings.length + ' ]',
            titleStyle: warningLableStyle,
            content: [warningsJsx]
          })
        )
      );
    }
  }]);

  return FooterBar;
}(Component);

export default FooterBar;


FooterBar.propTypes = {
  state: PropTypes.object.isRequired,
  footerbarComponents: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  softwareSignature: PropTypes.string
};

FooterBar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};