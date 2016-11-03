import React from 'react';

const STYLE = {
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "5px",
  fontSize: "25px"
};


export default function ToolbarButton(props) {

  let color = props.active === true ? '#1CA6FC' : '#C2C2C2';

  return (
    <div style={STYLE}>
      <a href="javascript:;" style={{color, textDecoration: "none"}} onClick={props.onClick} title={props.tooltip}>
        {props.children}
      </a>
    </div>
  )
}
