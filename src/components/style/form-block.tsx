import React from 'react';

const BASE_STYLE = {
  marginBottom: "16px"
};

export default function FormBlock({ children, style, ...rest }: any) {
  return <div style={{ ...BASE_STYLE, style }} {...rest}>{children}</div>;
}
