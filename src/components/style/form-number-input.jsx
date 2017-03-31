import React, {PropTypes, Component} from 'react';
import FormTextInput from './form-text-input';

export default function FormNumberInput({onChange, ...rest}) {
  let onChangeCustom = event => {
    let value = event.target.value;

    rest.min = rest.min ? parseFloat(rest.min) : -Infinity;
    rest.max = rest.max ? parseFloat(rest.max) : Infinity;

    if( parseFloat( value ) <= ( parseFloat( rest.min ) || -Infinity ) || parseFloat( value ) >= ( parseFloat( rest.max ) || Infinity ) )
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
          if( rest.min == 0 )
          {
            event.target.value = '0';
            event.target.select();
          }
          onChange(event);
        }
        else if( value === '0' || value === '' )
        {
          event.target.value = rest.min > 0 ? rest.min : '0';
          onChange(event);
          event.target.select();
        }

      }
    }
  };

  return <FormTextInput onChange={onChangeCustom} autoComplete="off" {...rest}/>;
}
