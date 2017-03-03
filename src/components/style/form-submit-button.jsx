import React, {PropTypes, Component} from 'react';
import Button from './button';

const STYLE = {
  borderColor: "#415375",
  backgroundColor: "#415375",
  color: "#fff",
  width: "100%"
};

const STYLE_HOVER = {
  borderColor: "#1f3149",
  backgroundColor: "#1f3149",
  color: "#fff",
  width: "100%"
};

export default function FormSubmitButton({children, ...rest}) {
  return <Button type="submit" style={STYLE} styleHover={STYLE_HOVER} {...rest}>{children}</Button>
}