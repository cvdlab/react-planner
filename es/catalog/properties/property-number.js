import React, { PropTypes } from 'react';
import FormLabel from '../../components/style/form-label';
import FormNumberInput from '../../components/style/form-number-input';

export default function PropertyString(_ref) {
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
      React.createElement(FormNumberInput, { value: value, onChange: function onChange(event) {
          return onUpdate(parseFloat(event.target.value));
        },
        min: configs.min, max: configs.max })
    )
  );
}

PropertyString.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};