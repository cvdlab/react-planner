import React, {Component} from 'react';
import PropTypes from 'prop-types';

//http://www.cssportal.com/css-tooltip-generator/

const STYLE = {
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "5px",
  fontSize: "25px",
  position: "relative",
};

const STYLE_TOOLTIP = {
  position: "absolute",
  width: "140px",
  color: "#FFFFFF",
  background: "#000000",
  height: "30px",
  lineHeight: "30px",
  textAlign: "center",
  visibility: "visible",
  borderRadius: "6px",
  opacity: "0.8",
  left: "100%",
  top: "50%",
  marginTop: "-15px",
  marginLeft: "15px",
  zIndex: "999",
  fontSize: "12px",
};

const STYLE_TOOLTIP_PIN = {
  position: "absolute",
  top: "50%",
  right: "100%",
  marginTop: "-8px",
  width: "0",
  height: "0",
  borderRight: "8px solid #000000",
  borderTop: "8px solid transparent",
  borderBottom: "8px solid transparent"
};

export default class ToolbarButton extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {active: false};
  }

  render() {
    let {state, props} = this;
    let color = props.active || state.active ? '#1CA6FC' : '#C2C2C2';

    return (
      <div style={STYLE}
           onMouseEnter={event => this.setState({active: true})}
           onMouseLeave={event => this.setState({active: false})}>

        <a href="javascript:;" style={{color, textDecoration: "none"}} onClick={props.onClick}>
          {props.children}
        </a>

        {state.active ?
          <div style={STYLE_TOOLTIP}>
            <span style={STYLE_TOOLTIP_PIN}/>
            {props.tooltip}
          </div>
          : null
        }

      </div>
    )
  }
}

ToolbarButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.string.isRequired
};
