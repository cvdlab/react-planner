import React, { PropTypes } from 'react';
import FormLabel from '../../components/style/form-label';
import Button from '../../components/style/button';

export default function PropertyToggle(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs;

  value = value === true;

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
      React.createElement(
        Button,
        { onClick: function onClick(e) {
            return onUpdate(!value);
          }, size: 'small' },
        configs.actionName
      )
    )
  );
}

PropertyToggle.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};