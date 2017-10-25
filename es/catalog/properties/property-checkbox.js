import React from 'react';
import PropTypes from 'prop-types';
import { FormLabel } from '../../components/style/export';
import PropertyStyle from './shared-property-style';

var checkboxStyle = { margin: 0 };

export default function PropertyCheckbox(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement,
      internalState = _ref.internalState,
      state = _ref.state;


  var update = function update(val) {

    if (configs.hook) {
      return configs.hook(val, sourceElement, internalState, state).then(function (_val) {
        return onUpdate(_val);
      });
    }

    return onUpdate(val);
  };

  return React.createElement(
    'table',
    { className: 'PropertyCheckbox', style: PropertyStyle.tableStyle },
    React.createElement(
      'tbody',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          { style: PropertyStyle.firstTdStyle },
          React.createElement(
            FormLabel,
            null,
            configs.label
          )
        ),
        React.createElement(
          'td',
          null,
          React.createElement('input', { style: checkboxStyle, type: 'checkbox', checked: value, onChange: function onChange(e) {
              return update(!value);
            } })
        )
      )
    )
  );
}

PropertyCheckbox.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};