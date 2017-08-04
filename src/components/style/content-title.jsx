import React from 'react';
import * as SharedStyle from '../../shared-style';

const STYLE = {
  color: SharedStyle.PRIMARY_COLOR.alt,
  fontWeight: "300",
};

export default function ContentTitle({children, ...rest}) {
  return <h1 style={STYLE} {...rest}>{children}</h1>
}
