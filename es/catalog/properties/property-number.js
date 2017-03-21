import React, { PropTypes } from 'react';
import FormLabel from '../../components/style/form-label';
import FormNumberInput from '../../components/style/form-number-input';

export default function PropertyNumber(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs;


  var update = function update(value) {
    var number = parseFloat(value);

    if (isNaN(number)) {
      number = 0;
    }
    return onUpdate(number);
  };

  return React.createElement(
    'div',
    { className: 'PropertyNumber', style: { marginBottom: "3px" } },
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
          return update(event.target.value);
        },
        min: configs.min, max: configs.max })
    )
  );
}

PropertyNumber.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};