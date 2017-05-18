import React from 'react';

const BASE_STYLE = {
  display: "block",
  marginBottom: "5px"
};

export default function FormLabel({children, style, ...rest}) {
  return <label style={{...BASE_STYLE, style}} {...rest}>{children}</label>
}
