import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../styles/shared-style';

//http://www.cssportal.com/css-tooltip-generator/

const STYLE_OUTER = {
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '5px',
  marginLeft: '8px',
  marginRight: '8px',
  fontSize: '12px',
  position: 'relative',
  cursor: 'pointer'
};

const STYLE_INNER = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}

const STYLE_TOOLTIP = {
  position: 'absolute',
  width: '140px',
  color: SharedStyle.COLORS.white,
  background: SharedStyle.COLORS.black,
  height: '30px',
  lineHeight: '30px',
  textAlign: 'center',
  visibility: 'visible',
  borderRadius: '6px',
  opacity: '0.8',
  left: '100%',
  top: '50%',
  marginTop: '-15px',
  marginLeft: '15px',
  zIndex: '999',
  fontSize: '12px'
};

const STYLE_TOOLTIP_PIN = {
  position: 'absolute',
  top: '50%',
  right: '100%',
  marginTop: '-8px',
  width: '0',
  height: '0',
  borderRight: '8px solid #000000',
  borderTop: '8px solid transparent',
  borderBottom: '8px solid transparent'
};

export default function ToolbarButton(props){
  const [state, setState] = useState({active: false})
  let color = props.active || state.active ? SharedStyle.SECONDARY_COLOR.icon : SharedStyle.PRIMARY_COLOR.icon;
  let stroke = props.active || state.active ? SharedStyle.SECONDARY_COLOR.icon : SharedStyle.PRIMARY_COLOR.icon;
  let fill = props.active || state.active ? SharedStyle.SECONDARY_COLOR.icon : SharedStyle.PRIMARY_COLOR.icon;

  return (
    <div style={STYLE_OUTER}
      onMouseOver={event => setState({ active: true })}
      onMouseOut={event => setState({ active: false })}>
      <div style={{ ...STYLE_INNER, color, stroke, fill }} onClick={props.onClick}>
        {props.children}
      </div>

      {
        state.active ?
        <div style={STYLE_TOOLTIP}>
          <span style={STYLE_TOOLTIP_PIN} />
          {props.tooltip}
        </div>
        : null
      }
    </div>
  )
}

ToolbarButton.propTypes = {
  active: PropTypes.bool.isRequired,
  tooltip: PropTypes.string.isRequired
};
