import React, {PropTypes, Component} from 'react';
import FormTextInput from './form-text-input';

export default function FormNumberInput({onChange, ...rest}) {
  let onChangeCustom = event => {
    let value = event.target.value;

    if( !isNaN(parseFloat(value)) && isFinite(value) )
    {
      onChange(event);
    }
    else
    {
      if( value === '-' )
      {
        onChange(event);
      }
      else if( value === '0' || value === '' )
      {
        event.target.value = '0';
        onChange(event);
        event.target.select();
      }
    }
  };

  return <FormTextInput onChange={onChangeCustom} autoComplete="off" {...rest}/>;
}
