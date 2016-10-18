import React, {PropTypes} from 'react';

/**
 * @return {null}
 */
export default function If({condition, children}) {
  return condition ? children : null;
}

If.propTypes = {
  condition: PropTypes.bool.isRequired
};
