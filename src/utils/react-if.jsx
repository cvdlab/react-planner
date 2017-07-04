import React from 'react';
import PropTypes from 'prop-types';

/**
 * @return {null}
 */
export default function If({condition, style, children}) {
  return condition ? ( Array.isArray(children) ? <div style={style}>{children}</div> : children ) : null;
}

If.propTypes = {
  condition: PropTypes.bool.isRequired,
  style: PropTypes.object
};
