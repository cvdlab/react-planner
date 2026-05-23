import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  condition: boolean;
  style?: any;
  children?: any;
};

/**
 * @return {null}
 */
export default function If({ condition, style, children }: Props) {
  return condition ? (Array.isArray(children) ? <div style={style}>{children}</div> : children) : null;
}

(If as any).propTypes = {
  condition: PropTypes.bool.isRequired,
  style: PropTypes.object
};
