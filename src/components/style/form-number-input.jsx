import React, {PropTypes, Component} from 'react';
import FormTextInput from './form-text-input';

//TODO Check if min and max are not defined

export default function FormNumberInput({onChange, ...rest}) {
  let onChangeCustom = event => {
    let value = event.target.value;

    if( value <= rest.min || value >= rest.max )
    {
      event.target.value = rest.min;
      onChange(event);
      event.target.select();
    }
    else
    {
      if( !isNaN(parseFloat(value)) && isFinite(value) )
      {
        onChange(event);
      }
      else
      {
        if( value === '-' )
        {
          if( rest.min <= 0 )
          {
            event.target.value = 0;
            event.target.select();
            onChange(event);
          }
        }
        else if( value === '0' || value === '' )
        {
          event.target.value = rest.min;
          onChange(event);
          event.target.select();
        }

      }
    }
  };

  return <FormTextInput onChange={onChangeCustom} autoComplete="off" {...rest}/>;
}
