import React from 'react';
import * as SharedStyle from '../../shared-style';

const STYLE = {
  color: SharedStyle.PRIMARY_COLOR.alt,
  fontWeight: 300,
};

export default function ContentTitle({ children, style = {}, ...rest }: any) {
  return <h1 style={{ ...STYLE, ...style }} {...rest}>{children}</h1>;
}
