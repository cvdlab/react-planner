import React from 'react';
import Button from './button';
import * as SharedStyle from '../../shared-style';

const STYLE = {
  borderColor: "#c12e2a",
  backgroundColor: "#c9302c",
  color: SharedStyle.COLORS.white
};

const STYLE_HOVER = {
  backgroundColor: "#972726",
  borderColor: "#c12e2a",
  color: SharedStyle.COLORS.white
};

export default function FormDeleteButton({children, ...rest}) {
  return <Button style={STYLE} styleHover={STYLE_HOVER} {...rest}>{children}</Button>
}
