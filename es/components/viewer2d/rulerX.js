var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

var RulerX = function (_Component) {
  _inherits(RulerX, _Component);

  function RulerX(props, context) {
    _classCallCheck(this, RulerX);

    return _possibleConstructorReturn(this, (RulerX.__proto__ || Object.getPrototypeOf(RulerX)).call(this, props, context));
  }

  _createClass(RulerX, [{
    key: 'render',
    value: function render() {

      var elementW = this.props.unitPixelSize * this.props.zoom;

      var elementStyle = {
        display: 'inline-block',
        width: elementW,
        position: 'relative',
        borderLeft: '1px solid ' + this.props.fontColor,
        paddingLeft: '0.2em',
        fontSize: '10px',
        height: '100%'
      };

      var insideElementsStyle = {
        width: '20%',
        display: 'inline-block',
        margin: 0,
        padding: 0
      };

      var rulerStyle = {
        backgroundColor: this.props.backgroundColor,
        position: 'relative',
        width: this.props.width,
        height: '100%',
        color: this.props.fontColor
      };

      var markerStyle = {
        position: 'absolute',
        left: this.props.zeroLeftPosition + this.props.mouseX * this.props.zoom - 6.5,
        top: 8,
        width: 0,
        height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: '8px solid ' + this.props.markerColor,
        zIndex: 9001
      };

      var rulerContainer = {
        position: 'absolute',
        height: '10px',
        top: '4px',
        display: 'grid',
        gridRowGap: '0',
        gridColumnGap: '0',
        gridTemplateRows: '100%',
        grdAutoColumns: elementW + 'px'
      };

      var positiveRulerContainer = _extends({}, rulerContainer, {
        width: this.props.positiveUnitsNumber * elementW,
        left: this.props.zeroLeftPosition
      });

      var negativeRulerContainer = _extends({}, rulerContainer, {
        width: this.props.negativeUnitsNumber * elementW,
        left: this.props.zeroLeftPosition - this.props.negativeUnitsNumber * elementW
      });

      var positiveDomElements = [];

      if (elementW <= 200) {
        for (var x = 0; x < this.props.positiveUnitsNumber; x++) {
          positiveDomElements.push(React.createElement(
            'div',
            { key: x, style: _extends({}, elementStyle, { gridColumn: x + 1, gridRow: 1 }) },
            elementW > 30 ? x * 100 : ''
          ));
        }
      } else if (elementW > 200) {
        for (var _x = 0; _x < this.props.positiveUnitsNumber; _x++) {
          var val = _x * 100;
          positiveDomElements.push(React.createElement(
            'div',
            { key: _x, style: _extends({}, elementStyle, { gridColumn: _x + 1, gridRow: 1 }) },
            React.createElement(
              'div',
              { style: insideElementsStyle },
              val
            ),
            React.createElement(
              'div',
              { style: insideElementsStyle },
              val + 1 * 20
            ),
            React.createElement(
              'div',
              { style: insideElementsStyle },
              val + 2 * 20
            ),
            React.createElement(
              'div',
              { style: insideElementsStyle },
              val + 3 * 20
            ),
            React.createElement(
              'div',
              { style: insideElementsStyle },
              val + 4 * 20
            )
          ));
        }
      }

      return React.createElement(
        'div',
        { style: rulerStyle },
        React.createElement('div', { id: 'horizontalMarker', style: markerStyle }),
        React.createElement('div', { id: 'negativeRuler', style: negativeRulerContainer }),
        React.createElement(
          'div',
          { id: 'positiveRuler', style: positiveRulerContainer },
          positiveDomElements
        )
      );
    }
  }]);

  return RulerX;
}(Component);

export default RulerX;


RulerX.propTypes = {
  unitPixelSize: PropTypes.number.isRequired,
  positiveUnitsNumber: PropTypes.number,
  negativeUnitsNumber: PropTypes.number,
  zoom: PropTypes.number.isRequired,
  mouseX: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  zeroLeftPosition: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  markerColor: PropTypes.string
};

RulerX.defaultProps = {
  positiveUnitsNumber: 50,
  negativeUnitsNumber: 50,
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  fontColor: SharedStyle.COLORS.white,
  markerColor: SharedStyle.SECONDARY_COLOR.main
};

RulerX.contextTypes = {
  translator: PropTypes.object.isRequired
};