import React from 'react';
import PropTypes from 'prop-types';

/**
 * @return {null}
 */
export default function If({condition, children}) {
  return condition ? children : null;
}

If.propTypes = {
  condition: PropTypes.bool.isRequired
};
