import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '../../components/style/form-label';
import FormNumberInput from '../../components/style/form-number-input';

var tableStyle = { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" };
var firstTdStyle = { width: '6em' };

export default function PropertyNumber(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      onValid = _ref.onValid,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement,
      internalState = _ref.internalState,
      state = _ref.state;


  var update = function update(val) {
    var number = parseFloat(val);

    if (isNaN(number)) {
      number = 0;
    }

    if (configs.hook) {
      return configs.hook(number, sourceElement, internalState, state).then(function (_val) {
        return onUpdate(_val);
      });
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
            onValid: onValid,
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
  onValid: PropTypes.func,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};