export { LineAttributesEditor as default };
import React, { PropTypes, Component } from 'react';
import FormNumberInput from '../../../style/form-number-input';
import PropertyLengthMeasure from '../../../../catalog/properties/property-lenght-measure';

var tableStyle = {
  width: '100%'
};
var firstTdStyle = {
  width: '6em'
};
var inputStyle = {
  textAlign: 'left'
};

function LineAttributesEditor(_ref, _ref2) {
  var element = _ref.element,
      _onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData;
  var translator = _ref2.translator;

  var vertexOne = attributeFormData.has('vertexOne') ? attributeFormData.get('vertexOne') : null;
  var vertexTwo = attributeFormData.has('vertexTwo') ? attributeFormData.get('vertexTwo') : null;
  var lineLength = attributeFormData.has('lineLength') ? attributeFormData.get('lineLength') : null;

  return React.createElement(
    'div',
    null,
    React.createElement(
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
            'X1: '
          ),
          React.createElement(
            'td',
            null,
            React.createElement(FormNumberInput, { value: vertexOne.get('x'), onChange: function onChange(event) {
                return _onUpdate('vertexOne', { 'x': event.target.value });
              }, style: inputStyle })
          )
        ),
        React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            { style: firstTdStyle },
            'Y1: '
          ),
          React.createElement(
            'td',
            null,
            React.createElement(FormNumberInput, { value: vertexOne.get('y'), onChange: function onChange(event) {
                return _onUpdate('vertexOne', { 'y': event.target.value });
              }, style: inputStyle })
          )
        ),
        React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            { style: firstTdStyle },
            'X2: '
          ),
          React.createElement(
            'td',
            null,
            React.createElement(FormNumberInput, { value: vertexTwo.get('x'), onChange: function onChange(event) {
                return _onUpdate('vertexTwo', { 'x': event.target.value });
              }, style: inputStyle })
          )
        ),
        React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            { style: firstTdStyle },
            'Y2: '
          ),
          React.createElement(
            'td',
            null,
            React.createElement(FormNumberInput, { value: vertexTwo.get('y'), onChange: function onChange(event) {
                return _onUpdate('vertexTwo', { 'y': event.target.value });
              }, style: inputStyle })
          )
        )
      )
    ),
    React.createElement(PropertyLengthMeasure, {
      value: lineLength,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('lineLength', mapped);
      },
      configs: { label: 'Length', min: 0, max: Infinity }
    })
  );
}

LineAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired
};

LineAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired
};