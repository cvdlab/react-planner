import React from 'react';
import PropTypes from 'prop-types';

/**
 * @return {null}
 */
export default function If(_ref) {
  var condition = _ref.condition,
      children = _ref.children;

  return condition ? children : null;
}

If.propTypes = {
  condition: PropTypes.bool.isRequired
};