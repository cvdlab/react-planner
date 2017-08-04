import React from 'react';
import Button from './button';
import * as SharedStyle from '../../shared-style';

const STYLE = {
  borderColor: "#415375",
  backgroundColor: "#415375",
  color: SharedStyle.COLORS.white
};

const STYLE_HOVER = {
  borderColor: "#1f3149",
  backgroundColor: "#1f3149",
  color: SharedStyle.COLORS.white
};

export default function FormSubmitButton({children, ...rest}) {
  return <Button type="submit" style={STYLE} styleHover={STYLE_HOVER} {...rest}>{children}</Button>
}
