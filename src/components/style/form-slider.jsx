import React, {PropTypes, Component} from 'react';
import ReactRange from '@mapbox/react-range';
import FormTextInput from './form-text-input';

const STYLE_INPUT = {
  display: "block",
  width: "100%",
  height: "30px",
};


export default function FormNumberInput({value, onChange, ...rest}) {
  return (
    <div>
      <div style={{display: "inline-block", width: "85%", marginRight: "5%"}}>
        <ReactRange type="range" style={STYLE_INPUT} onChange={onChange} value={value} {...rest}/>
      </div>

      <div style={{display: "inline-block", width: "10%"}}>
        <FormTextInput value={value} onChange={onChange}/>
      </div>
    </div>
  )
}
