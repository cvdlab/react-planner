import React from 'react';

const STYLE = {
  color: "#2e2f33",
  fontWeight: "300",
};

export default function ContentTitle({children, ...rest}) {
  return <h1 style={STYLE} {...rest}>{children}</h1>
}
