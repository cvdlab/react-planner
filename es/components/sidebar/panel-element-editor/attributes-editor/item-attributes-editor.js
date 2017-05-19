import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormNumberInput from '../../../style/form-number-input';

var tableStyle = {
  width: '100%'
};
var firstTdStyle = {
  width: '6em'
};
var inputStyle = {
  textAlign: 'left'
};

export default function ItemAttributesEditor(_ref, _ref2) {
  var element = _ref.element,
      onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData;
  var translator = _ref2.translator;

  var renderedX = attributeFormData.has('x') ? attributeFormData.get('x') : element.x;
  var renderedY = attributeFormData.has('y') ? attributeFormData.get('y') : element.y;
  var renderedR = attributeFormData.has('rotation') ? attributeFormData.get('rotation') : element.rotation;

  return React.createElement(
    'table',
    { style: tableStyle },
    React.createElement(
      'tbody',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          { style: firstTdStyle },
          'X:'
        ),
        React.createElement(
          'td',
          null,
          React.createElement(FormNumberInput, { value: renderedX, onChange: function onChange(event) {
              return onUpdate('x', event.target.value);
            }, style: inputStyle })
        )
      ),
      React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          { style: firstTdStyle },
          'Y:'
        ),
        React.createElement(
          'td',
          null,
          React.createElement(FormNumberInput, { value: renderedY, onChange: function onChange(event) {
              return onUpdate('y', event.target.value);
            }, style: inputStyle })
        )
      ),
      React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          { style: firstTdStyle },
          translator.t("Rotation"),
          ':'
        ),
        React.createElement(
          'td',
          null,
          React.createElement(FormNumberInput, { value: renderedR, onChange: function onChange(event) {
              return onUpdate('rotation', event.target.value);
            },
            style: inputStyle })
        )
      )
    )
  );
}

ItemAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired
};

ItemAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired
};