import React from 'react';
import PropTypes from 'prop-types';

/**
 * @return {null}
 */
export default function If(_ref) {
  var condition = _ref.condition,
      style = _ref.style,
      children = _ref.children;

  return condition ? Array.isArray(children) ? React.createElement(
    'div',
    { style: style },
    children
  ) : children : null;
}

If.propTypes = {
  condition: PropTypes.bool.isRequired,
  style: PropTypes.object
};