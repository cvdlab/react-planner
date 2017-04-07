import React, { PropTypes } from 'react';
import FormLabel from '../../components/style/form-label';

export default function PropertyReadOnly(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs;

  return React.createElement(
    'div',
    { className: 'PropertyReadOnly', style: { marginBottom: "3px" } },
    React.createElement(
      'div',
      { style: { display: "inline-block", width: "30%" } },
      React.createElement(
        FormLabel,
        null,
        configs.label
      )
    ),
    React.createElement(
      'div',
      { style: { display: "inline-block", width: "70%" } },
      value
    )
  );
}

PropertyReadOnly.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};