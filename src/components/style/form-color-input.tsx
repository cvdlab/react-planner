import React from 'react';
import FormTextInput from './form-text-input';


const STYLE = {
  padding: 0,
  border: 0,
};
const EREG_NUMBER = /^.*$/;

export default function FormColorInput({ onChange, ...rest }: any) {
  let onChangeCustom = (event: any) => {
    let value = event.target.value;
    if (EREG_NUMBER.test(value)) {
      onChange(event);
    }
  };

  return <FormTextInput type="color" style={STYLE} onChange={onChangeCustom} autoComplete="off" {...rest} />;
}
