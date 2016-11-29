import React, {PropTypes} from 'react';

const STYLE = {
  display: "block",
  marginBottom: "5px"
};

export default function FormLabel({children, ...rest}) {
  return <label style={STYLE} {...rest}>{children}</label>
}
