import React from 'react';
import Button from './button';

const STYLE = {
  borderColor: "#adadad",
  backgroundColor: "#e6e6e6"
};

const STYLE_HOVER = {
  backgroundColor: "#d4d4d4",
  borderColor: "#8c8c8c"
};

export default function CancelButton({children, ...rest}) {
  return <Button style={STYLE} styleHover={STYLE_HOVER} {...rest}>{children}</Button>
}
