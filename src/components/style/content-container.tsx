import React from 'react';
import PropTypes from 'prop-types';

const STYLE = {
  padding: '0 20px',
  overflowY: 'auto'
};

type Props = {
  children?: any;
  width: number;
  height: number;
  style?: any;
};

export default function ContentContainer({ children, width, height, style = {} }: Props) {
  return <div style={{ width, height, ...STYLE, ...style }} onWheel={event => event.stopPropagation()}>{children}</div>;
}

(ContentContainer as any).propsType = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object
};
