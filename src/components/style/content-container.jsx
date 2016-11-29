import React, {PropTypes} from 'react';

const STYLE = {
  padding: "0 20px",
  overflowY: "scroll"
};

export default function ContentContainer({children, width, height}) {
  return <div style={{width, height, ...STYLE}} onWheel={event => event.stopPropagation()}>{children}</div>
}

ContentContainer.propsType = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

