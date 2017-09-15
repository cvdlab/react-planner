import React from 'react';
import * as SharedStyle from '../../shared-style';

const STYLE = {borderTop: '1px solid #222', borderBottom: '1px solid #48494E'};
const STYLE_TITLE = {
  fontSize: '11px',
  color: SharedStyle.PRIMARY_COLOR.text_alt,
  padding: '5px 15px 8px 15px',
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  textShadow: '-1px -1px 2px rgba(0, 0, 0, 1)',
  boxShadow: 'inset 0px -3px 19px 0px rgba(0,0,0,0.5)',
  margin: '0px'
};
const STYLE_CONTENT = {
  fontSize: '11px',
  color: SharedStyle.PRIMARY_COLOR.text_alt,
  border: '1px solid #222',
  padding: '0px',
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  textShadow: '-1px -1px 2px rgba(0, 0, 0, 1)'
};

export default function Panel({name, headComponents, children}) {
  return (
    <div style={STYLE}>
      <h3 style={STYLE_TITLE}>
        {name}
        {headComponents}
      </h3>

      <div style={STYLE_CONTENT}>
        {children}
      </div>
    </div>
  )
}
