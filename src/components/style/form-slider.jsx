import React from 'react';
import ReactRange from '@mapbox/react-range';
import FormTextInput from './form-text-input';

const sliderContainerStyle = {display: 'inline-block', width: '80%', marginRight: '5%'};
const sliderStyle = { display: 'block', width: '100%', height: '30px' };
const textContainerStyle = {display: 'inline-block', width: '15%', float: 'right'};
const textStyle = {height:'34px', textAlign:'center'};

export default function FormNumberInput({value, onChange, ...rest}) {
  return (
    <div>
      <div style={sliderContainerStyle}>
        <ReactRange type='range' style={sliderStyle} onChange={onChange} value={value} {...rest}/>
      </div>

      <div style={textContainerStyle}>
        <FormTextInput value={value} onChange={onChange} style={textStyle}/>
      </div>
    </div>
  )
}
