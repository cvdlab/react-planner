import React, {PropTypes} from 'react';

const BASE_STYLE = {
  marginBottom: "16px"
};

export default function FormBlock({children, style, ...rest}) {
  return <div style={{...BASE_STYLE, style}} {...rest}>{children}</div>
}
