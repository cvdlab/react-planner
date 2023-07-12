import React from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../styles/shared-style';

const RulerX = (props) => {
  let elementW = props.unitPixelSize * props.zoom;

  let elementStyle = {
    display: 'inline-block',
    width: elementW,
    position: 'relative',
    borderLeft: '1px solid ' + props.fontColor,
    paddingLeft: '0.2em',
    fontSize: '10px',
    height: '100%'
  };

  let insideElementsStyle = {
    width: '20%',
    display: 'inline-block',
    margin: 0,
    padding: 0
  };

  let rulerStyle = {
    backgroundColor: props.backgroundColor,
    position: 'relative',
    width: props.width,
    height: '100%',
    color: props.fontColor
  }

  let markerStyle = {
    position: 'absolute',
    left: props.zeroLeftPosition + (props.mouseX * props.zoom) - 6.5,
    top: 8,
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '8px solid ' + props.markerColor,
    zIndex: 9001
  };

  let rulerContainer = {
    position: 'absolute',
    height: '10px',
    top: '4px',
    display: 'grid',
    gridRowGap: '0',
    gridColumnGap: '0',
    gridTemplateRows: '100%',
    grdAutoColumns: `${elementW}px`
  };

  let positiveRulerContainer = {
    ...rulerContainer,
    width: (props.positiveUnitsNumber * elementW),
    left: props.zeroLeftPosition
  };

  let negativeRulerContainer = {
    ...rulerContainer,
    width: (props.negativeUnitsNumber * elementW),
    left: props.zeroLeftPosition - (props.negativeUnitsNumber * elementW)
  };

  let positiveDomElements = [];

  if (elementW <= 200) {
    for (let x = 0; x < props.positiveUnitsNumber; x++) {
      positiveDomElements.push(
        <div key={x} style={{ ...elementStyle, gridColumn: (x + 1), gridRow: 1 }}>
          {elementW > 30 ? (x * 100) : ''}
        </div>
      );
    }
  }
  else if (elementW > 200) {
    for (let x = 0; x < props.positiveUnitsNumber; x++) {
      let val = x * 100;
      positiveDomElements.push(
        <div key={x} style={{ ...elementStyle, gridColumn: (x + 1), gridRow: 1 }}>
          <div style={insideElementsStyle}>{val}</div>
          <div style={insideElementsStyle}>{val + (1 * 20)}</div>
          <div style={insideElementsStyle}>{val + (2 * 20)}</div>
          <div style={insideElementsStyle}>{val + (3 * 20)}</div>
          <div style={insideElementsStyle}>{val + (4 * 20)}</div>
        </div>
      );
    }
  }

  return (
    <div style={rulerStyle}>
      <div id="horizontalMarker" style={markerStyle}></div>
      <div id="negativeRuler" style={negativeRulerContainer}></div>
      <div id="positiveRuler" style={positiveRulerContainer}>{positiveDomElements}</div>
    </div>
  );
}

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
}

export default RulerX;
