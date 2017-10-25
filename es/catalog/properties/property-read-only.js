import React from 'react';
import PropTypes from 'prop-types';
import { FormLabel } from '../../components/style/export';
import PropertyStyle from './shared-property-style';

export default function PropertyReadOnly(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement,
      internalState = _ref.internalState,
      state = _ref.state;

  return React.createElement(
    'table',
    { className: 'PropertyReadOnly', style: PropertyStyle.tableStyle },
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
          React.createElement(
            'div',
            null,
            value
          )
        )
      )
    )
  );
}

PropertyReadOnly.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};