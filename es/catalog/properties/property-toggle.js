import React, { PropTypes } from 'react';
import FormLabel from '../../components/style/form-label';
import Button from '../../components/style/button';

var tableStyle = { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" };
var firstTdStyle = { width: '6em' };

export default function PropertyToggle(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement;

  return React.createElement(
    'table',
    { className: 'PropertyToggle', style: tableStyle },
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
          React.createElement(
            Button,
            { onClick: function onClick(e) {
                return onUpdate(!value);
              }, size: 'small' },
            configs.actionName
          )
        )
      )
    )
  );
}

PropertyToggle.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object
};