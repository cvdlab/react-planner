import React, {PropTypes, Component} from 'react';
import FormTextInput from './form-text-input';

const EREG_NUMBER = /^[0-9]+$/;

export default function FormNumberInput({onChange, ...rest}) {
  let onChangeCustom = event => {
    let value = event.target.value;
    if (EREG_NUMBER.test(value)) {
      onChange(event);
    }
  };

  return <FormTextInput onChange={onChangeCustom} autoComplete="off" {...rest}/>;
}
