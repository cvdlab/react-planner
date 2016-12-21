import React, { PropTypes } from 'react';
import FormLabel from '../../components/style/form-label';
import FormColorInput from '../../components/style/form-color-input';

export default function PropertyColor(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs;

  return React.createElement(
    'div',
    { style: { marginBottom: "3px" } },
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
      React.createElement(FormColorInput, { value: value, onChange: function onChange(event) {
          return onUpdate(event.target.value);
        } })
    )
  );
}

PropertyColor.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};