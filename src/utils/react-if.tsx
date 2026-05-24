import React from 'react';
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

