import React, {PropTypes} from 'react';

const STYLE = {
  marginBottom: "16px"
};

export default function FormBlock({children, ...rest}) {
  return <div style={STYLE} {...rest}>{children}</div>
}
