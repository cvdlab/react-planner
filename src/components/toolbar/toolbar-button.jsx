import React, {Component, PropTypes} from 'react';

const STYLE = {
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "5px",
  fontSize: "25px"
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

        <a href="javascript:;" style={{color, textDecoration: "none"}} onClick={props.onClick} title={props.tooltip}>
          {props.children}
        </a>
      </div>
    )
  }
}

ToolbarButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.string.isRequired
}
