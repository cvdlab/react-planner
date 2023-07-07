import React from 'react';
import Range from 'react-range';
import FormTextInput from './form-text-input';

const sliderContainerTrackStyle = {display: 'inline-block', width: '80%', marginRight: '5%'};
const sliderContainerThumbStyle = {display: 'inline-block', width: '', marginRight: '5%'};
const sliderStyle = { display: 'block', width: '100%', height: '30px' };
const textContainerStyle = {display: 'inline-block', width: '15%', float: 'right'};
const textStyle = {height:'34px', textAlign:'center'};

// TODO(pg): port this component
export default function FormSlider({value, onChange, ...rest}) {
  return (
    <div>
      <div style={sliderContainerStyle}>
        <Range style={sliderStyle} onChange={onChange} value={[value]} {...rest}/>
      </div>

      <div style={textContainerStyle}>
        <FormTextInput value={value} onChange={onChange} style={textStyle}/>
      </div>
    </div>
  )
}
