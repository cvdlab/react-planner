import React from 'react';
import Button from './button';

const STYLE = {
  borderColor: "#415375",
  backgroundColor: "#415375",
  color: "#fff"
};

const STYLE_HOVER = {
  borderColor: "#1f3149",
  backgroundColor: "#1f3149",
  color: "#fff"
};

export default function FormSubmitButton({children, ...rest}) {
  return <Button type="submit" style={STYLE} styleHover={STYLE_HOVER} {...rest}>{children}</Button>
}
