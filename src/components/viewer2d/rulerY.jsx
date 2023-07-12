import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../styles/shared-style';

const RulerY = (props) => {
  let elementH = props.unitPixelSize * props.zoom;

  let elementStyle = {
    width: '8px',
    borderBottom: '1px solid ' + props.fontColor,
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
    backgroundColor: props.backgroundColor,
    height: props.height,
    width: '100%',
    color: props.fontColor
  }

  let markerStyle = {
    position: 'absolute',
    top: props.zeroTopPosition - (props.mouseY * props.zoom) - 6.5,
    left: 8,
    width: 0,
    height: 0,
    borderTop: '5px solid transparent',
    borderBottom: '5px solid transparent',
    borderLeft: '8px solid ' + props.markerColor,
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
    top: props.zeroTopPosition - (props.positiveUnitsNumber * elementH),
    height: (props.positiveUnitsNumber * elementH)
  };

  let negativeRulerContainer = {
    ...rulerContainer,
    top: props.zeroTopPosition + (props.negativeUnitsNumber * elementH),
    height: (props.negativeUnitsNumber * elementH)
  };

  let positiveDomElements = [];

  if (elementH <= 200) {
    for (let x = 1; x <= props.positiveUnitsNumber; x++) {
      positiveDomElements.push(
        <div key={x} style={{ ...elementStyle, gridColumn: 1, gridRow: x }}>
          {elementH > 30 ? ((props.positiveUnitsNumber - x) * 100) : ''}
        </div>
      );
    }
  }
  else if (elementH > 200) {
    for (let x = 1; x <= props.positiveUnitsNumber; x++) {
      let val = (props.positiveUnitsNumber - x) * 100;
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

  return (
    <div style={rulerStyle}>
      <div id="verticalMarker" style={markerStyle}></div>
      <div id="negativeRuler" style={negativeRulerContainer}></div>
      <div id="positiveRuler" style={positiveRulerContainer}>{positiveDomElements}</div>
    </div>
  );
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

export default RulerY;