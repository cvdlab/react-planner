import React from 'react';

const STYLE = {borderTop: "1px solid #222222", borderBottom: "1px solid #48494E"};
const STYLE_TITLE = {
  fontSize: "10px",
  color: "#EBEBEB",
  padding: "5px 0 8px 15px",
  backgroundColor: "#2E2F33",
  textShadow: "-1px -1px 2px rgba(0, 0, 0, 1)",
  boxShadow: "inset 0px -3px 19px 0px rgba(0,0,0,0.5)",
  margin: "0px"
};
const STYLE_CONTENT = {
  fontSize: "10px",
  color: "#EBEBEB",
  border: "1px solid #222222",
  padding: "5px 0 5px 15px",
  backgroundColor: "#2E2F33",
  textShadow: "-1px -1px 2px rgba(0, 0, 0, 1)"
};

export default function Panel({name, children}) {
  return (
    <div style={STYLE}>
      <h3 style={STYLE_TITLE}>
        {name}
      </h3>

      <div style={STYLE_CONTENT}>
        {children}
      </div>
    </div>
  )
}
