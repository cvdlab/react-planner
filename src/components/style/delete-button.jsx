import React from 'react';
import Button from './button';

const STYLE = {
  borderColor: "#c12e2a",
  backgroundColor: "#c9302c",
  color: "#fff"
};

const STYLE_HOVER = {
  backgroundColor: "#972726",
  borderColor: "#c12e2a",
  color: "#fff"
};

export default function FormDeleteButton({children, ...rest}) {
  return <Button style={STYLE} styleHover={STYLE_HOVER} {...rest}>{children}</Button>
}
