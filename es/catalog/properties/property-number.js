import React, { PropTypes } from 'react';
import FormLabel from '../../components/style/form-label';
import FormNumberInput from '../../components/style/form-number-input';

var tableStyle = { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" };
var firstTdStyle = { width: '6em' };

export default function PropertyNumber(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement;


  var update = function update(value) {
    var number = parseFloat(value);

    if (isNaN(number)) {
      number = 0;
    }
    return onUpdate(number);
  };

  return React.createElement(
    'table',
    { className: 'PropertyNumber', style: tableStyle },
    React.createElement(
      'tbody',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          { style: firstTdStyle },
          React.createElement(
            FormLabel,
            null,
            configs.label
          )
        ),
        React.createElement(
          'td',
          null,
          React.createElement(FormNumberInput, {
            value: value,
            onChange: function onChange(event) {
              return update(event.target.value);
            },
            min: configs.min,
            max: configs.max })
        )
      )
    )
  );
}

PropertyNumber.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object
};