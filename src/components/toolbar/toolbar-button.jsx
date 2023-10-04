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
  //http://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css
  WebkitTouchCallout: 'none', /* iOS Safari */
  WebkitUserSelect: 'none', /* Chrome/Safari/Opera */
  MozUserSelect: 'none', /* Firefox */
  MsUserSelect: 'none', /* Internet Explorer/Edge */
  userSelect: 'none'
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
  left: '50%',
  transform: 'translateX(-50%)', // Centers the tooltip horizontally
  bottom: '100%', // Positions the tooltip above the button
  marginBottom: '10px', // Adds some space between the tooltip and the button
  zIndex: '999',
  fontSize: '12px',
  //http://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css
  WebkitTouchCallout: 'none', /* iOS Safari */
  WebkitUserSelect: 'none', /* Chrome/Safari/Opera */
  MozUserSelect: 'none', /* Firefox */
  MsUserSelect: 'none', /* Internet Explorer/Edge */
  userSelect: 'none'
};

const STYLE_TOOLTIP_PIN = {
  position: 'absolute',
  bottom: '-8px', // Positions the pin at the bottom of the tooltip
  left: '50%',
  transform: 'translateX(-50%)', // Centers the pin horizontally
  width: '0',
  height: '0',
  borderTop: '8px solid #000000', // The arrow now points downwards
  borderLeft: '8px solid transparent',
  borderRight: '8px solid transparent'
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
