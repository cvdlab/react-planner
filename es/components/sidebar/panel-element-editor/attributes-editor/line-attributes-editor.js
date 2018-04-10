export { LineAttributesEditor as default };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormNumberInput, FormTextInput } from '../../../style/export';
import { PropertyLengthMeasure } from '../../../../catalog/properties/export';

var tableStyle = { width: '100%' };
var firstTdStyle = { width: '6em' };
var inputStyle = { textAlign: 'left' };

function LineAttributesEditor(_ref, _ref2) {
  var element = _ref.element,
      _onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state,
      rest = _objectWithoutProperties(_ref, ['element', 'onUpdate', 'attributeFormData', 'state']);

  var translator = _ref2.translator;


  var name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;
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
            translator.t('Name')
          ),
          React.createElement(
            'td',
            null,
            React.createElement(FormTextInput, {
              value: name,
              onChange: function onChange(event) {
                return _onUpdate('name', event.target.value);
              },
              style: inputStyle
            })
          )
        ),
        React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            { style: firstTdStyle },
            'X1'
          ),
          React.createElement(
            'td',
            null,
            React.createElement(FormNumberInput, _extends({
              value: vertexOne.get('x'),
              onChange: function onChange(event) {
                return _onUpdate('vertexOne', { 'x': event.target.value });
              },
              style: inputStyle,
              state: state,
              precision: 2
            }, rest))
          )
        ),
        React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            { style: firstTdStyle },
            'Y1'
          ),
          React.createElement(
            'td',
            null,
            React.createElement(FormNumberInput, _extends({
              value: vertexOne.get('y'),
              onChange: function onChange(event) {
                return _onUpdate('vertexOne', { 'y': event.target.value });
              },
              style: inputStyle,
              state: state,
              precision: 2
            }, rest))
          )
        ),
        React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            { style: firstTdStyle },
            'X2'
          ),
          React.createElement(
            'td',
            null,
            React.createElement(FormNumberInput, _extends({
              value: vertexTwo.get('x'),
              onChange: function onChange(event) {
                return _onUpdate('vertexTwo', { 'x': event.target.value });
              },
              style: inputStyle,
              state: state,
              precision: 2
            }, rest))
          )
        ),
        React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            { style: firstTdStyle },
            'Y2'
          ),
          React.createElement(
            'td',
            null,
            React.createElement(FormNumberInput, _extends({
              value: vertexTwo.get('y'),
              onChange: function onChange(event) {
                return _onUpdate('vertexTwo', { 'y': event.target.value });
              },
              style: inputStyle,
              state: state,
              precision: 2
            }, rest))
          )
        )
      )
    ),
    React.createElement(PropertyLengthMeasure, {
      value: lineLength,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('lineLength', mapped);
      },
      configs: { label: translator.t('Length'), min: 0, max: Infinity, precision: 2 },
      state: state
    })
  );
}

LineAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

LineAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired
};