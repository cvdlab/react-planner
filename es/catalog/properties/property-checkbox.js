import React, { PropTypes } from 'react';
import FormLabel from '../../components/style/form-label';

export default function PropertyCheckbox(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs;

  value = value === true;

  return React.createElement(
    'div',
    { className: 'PropertyCheckbox', style: { marginBottom: "3px" } },
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
      React.createElement('input', { type: 'checkbox', checked: value, onChange: function onChange(e) {
          return onUpdate(!value);
        } })
    )
  );
}

PropertyCheckbox.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};