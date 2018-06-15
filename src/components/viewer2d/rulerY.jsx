import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

export default class RulerY extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {

    let elementH = this.props.unitPixelSize * this.props.zoom;

    let elementStyle = {
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

    let insideElementsStyle = {
      height: '20%',
      width: '100%',
      textOrientation: 'upright',
      writingMode: 'vertical-lr',
      display: 'inline-block',
      letterSpacing: '-2px',
      textAlign: 'right'
    };

    let rulerStyle = {
      backgroundColor: this.props.backgroundColor,
      height: this.props.height,
      width: '100%',
      color: this.props.fontColor
    }

    let markerStyle = {
      position: 'absolute',
      top: this.props.zeroTopPosition - (this.props.mouseY * this.props.zoom) - 6.5,
      left: 8,
      width: 0,
      height: 0,
      borderTop: '5px solid transparent',
      borderBottom: '5px solid transparent',
      borderLeft: '8px solid ' + this.props.markerColor,
      zIndex: 9001
    };

    let rulerContainer = {
      position: 'absolute',
      width: '100%',
      display: 'grid',
      gridRowGap: '0',
      gridColumnGap: '0',
      gridTemplateColumns: '100%',
      grdAutoRows: `${elementH}px`,
      paddingLeft: '5px'
    };

    let positiveRulerContainer = {
      ...rulerContainer,
      top: this.props.zeroTopPosition - (this.props.positiveUnitsNumber * elementH),
      height: (this.props.positiveUnitsNumber * elementH)
    };

    let negativeRulerContainer = {
      ...rulerContainer,
      top: this.props.zeroTopPosition + (this.props.negativeUnitsNumber * elementH),
      height: (this.props.negativeUnitsNumber * elementH)
    };

    let positiveDomElements = [];

    if (elementH <= 200) {
      for (let x = 1; x <= this.props.positiveUnitsNumber; x++) {
        positiveDomElements.push(
          <div key={x} style={{ ...elementStyle, gridColumn: 1, gridRow: x }}>
            {elementH > 30 ? ((this.props.positiveUnitsNumber - x) * 100) : ''}
          </div>
        );
      }
    }
    else if (elementH > 200) {
      for (let x = 1; x <= this.props.positiveUnitsNumber; x++) {
        let val = (this.props.positiveUnitsNumber - x) * 100;
        positiveDomElements.push(
          <div key={x} style={{ ...elementStyle, gridColumn: 1, gridRow: x }}>
            <div style={insideElementsStyle}>{val + (4 * 20)}</div>
            <div style={insideElementsStyle}>{val + (3 * 20)}</div>
            <div style={insideElementsStyle}>{val + (2 * 20)}</div>
            <div style={insideElementsStyle}>{val + (1 * 20)}</div>
            <div style={insideElementsStyle}>{val}</div>
          </div>
        );
      }
    }

    return <div style={rulerStyle}>
      <div id="verticalMarker" style={markerStyle}></div>
      <div id="negativeRuler" style={negativeRulerContainer}></div>
      <div id="positiveRuler" style={positiveRulerContainer}>{positiveDomElements}</div>
    </div>;
  }

}

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
}

RulerY.contextTypes = {
  translator: PropTypes.object.isRequired
};
