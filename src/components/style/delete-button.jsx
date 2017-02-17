import React, {PropTypes, Component} from 'react';
import Button from './button';

const STYLE = {
  borderColor: "#c12e2a",
  backgroundColor: "#c9302c",
  color: "#fff",
  width: "100%"
};

const STYLE_HOVER = {
  backgroundColor: "#972726",
  borderColor: "#c12e2a",
  color: "#fff",
  width: "100%"
};

export default function FormDeleteButton({children, ...rest}) {
  return <Button style={STYLE} styleHover={STYLE_HOVER} {...rest}>{children}</Button>
}
