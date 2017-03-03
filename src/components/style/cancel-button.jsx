import React, {PropTypes, Component} from 'react';
import Button from './button';

const STYLE = {
  borderColor: "#adadad",
  backgroundColor: "#e6e6e6",
  width: "100%"
};

const STYLE_HOVER = {
  backgroundColor: "#d4d4d4",
  borderColor: "#8c8c8c",
  width: "100%"
};

export default function CancelButton({children, ...rest}) {
  return <Button style={STYLE} styleHover={STYLE_HOVER} {...rest}>{children}</Button>
}
