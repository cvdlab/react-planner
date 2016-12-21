import React from 'react';

var STYLE = {
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "5px",
  fontSize: "25px"
};

export default function ToolbarButton(props) {

  var color = props.active === true ? '#1CA6FC' : '#C2C2C2';

  return React.createElement(
    "div",
    { style: STYLE },
    React.createElement(
      "a",
      { href: "javascript:;", style: { color: color, textDecoration: "none" }, onClick: props.onClick, title: props.tooltip },
      props.children
    )
  );
}