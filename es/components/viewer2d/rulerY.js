var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

var RulerY = function (_Component) {
  _inherits(RulerY, _Component);

  function RulerY(props, context) {
    _classCallCheck(this, RulerY);

    return _possibleConstructorReturn(this, (RulerY.__proto__ || Object.getPrototypeOf(RulerY)).call(this, props, context));
  }

  _createClass(RulerY, [{
    key: 'render',
    value: function render() {

      var elementH = this.props.unitPixelSize * this.props.zoom;

      var elementStyle = {
        width: '8px',
        borderBottom: '1px solid ' + this.props.fontColor,
        paddingBottom: '0.2em',
        fontSize: '10px',
        height: elementH,
        textOrientation: 'upright',
        writingMode: 'vertical-lr',
        letterSpacing: '-2px',
        textAlign: 'right'
      };

      var insideElementsStyle = {
        height: '20%',
        width: '100%',
        textOrientation: 'upright',
        writingMode: 'vertical-lr',
        display: 'inline-block',
        letterSpacing: '-2px',
        textAlign: 'right'
      };

      var rulerStyle = {
        backgroundColor: this.props.backgroundColor,
        height: this.props.height,
        width: '100%',
        color: this.props.fontColor
      };

      var markerStyle = {
        position: 'absolute',
        top: this.props.zeroTopPosition - this.props.mouseY * this.props.zoom - 6.5,
        left: 8,
        width: 0,
        height: 0,
        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderLeft: '8px solid ' + this.props.markerColor,
        zIndex: 9001
      };

      var rulerContainer = {
        position: 'absolute',
        width: '100%',
        display: 'grid',
        gridRowGap: '0',
        gridColumnGap: '0',
        gridTemplateColumns: '100%',
        grdAutoRows: elementH + 'px',
        paddingLeft: '5px'
      };

      var positiveRulerContainer = _extends({}, rulerContainer, {
        top: this.props.zeroTopPosition - this.props.positiveUnitsNumber * elementH,
        height: this.props.positiveUnitsNumber * elementH
      });

      var negativeRulerContainer = _extends({}, rulerContainer, {
        top: this.props.zeroTopPosition + this.props.negativeUnitsNumber * elementH,
        height: this.props.negativeUnitsNumber * elementH
      });

      var positiveDomElements = [];

      if (elementH <= 200) {
        for (var x = 1; x <= this.props.positiveUnitsNumber; x++) {
          positiveDomElements.push(React.createElement(
            'div',
            { key: x, style: _extends({}, elementStyle, { gridColumn: 1, gridRow: x }) },
            elementH > 30 ? (this.props.positiveUnitsNumber - x) * 100 : ''
          ));
        }
      } else if (elementH > 200) {
        for (var _x = 1; _x <= this.props.positiveUnitsNumber; _x++) {
          var val = (this.props.positiveUnitsNumber - _x) * 100;
          positiveDomElements.push(React.createElement(
            'div',
            { key: _x, style: _extends({}, elementStyle, { gridColumn: 1, gridRow: _x }) },
            React.createElement(
              'div',
              { style: insideElementsStyle },
              val + 4 * 20
            ),
            React.createElement(
              'div',
              { style: insideElementsStyle },
              val + 3 * 20
            ),
            React.createElement(
              'div',
              { style: insideElementsStyle },
              val + 2 * 20
            ),
            React.createElement(
              'div',
              { style: insideElementsStyle },
              val + 1 * 20
            ),
            React.createElement(
              'div',
              { style: insideElementsStyle },
              val
            )
          ));
        }
      }

      return React.createElement(
        'div',
        { style: rulerStyle },
        React.createElement('div', { id: 'verticalMarker', style: markerStyle }),
        React.createElement('div', { id: 'negativeRuler', style: negativeRulerContainer }),
        React.createElement(
          'div',
          { id: 'positiveRuler', style: positiveRulerContainer },
          positiveDomElements
        )
      );
    }
  }]);

  return RulerY;
}(Component);

export default RulerY;


RulerY.propTypes = {
  unitPixelSize: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  mouseY: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zeroTopPosition: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  markerColor: PropTypes.string
};

RulerY.defaultProps = {
  positiveUnitsNumber: 50,
  negativeUnitsNumber: 50,
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  fontColor: SharedStyle.COLORS.white,
  markerColor: SharedStyle.SECONDARY_COLOR.main
};

RulerY.contextTypes = {
  translator: PropTypes.object.isRequired
};