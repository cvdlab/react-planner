'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _export = require('../../../style/export');

var _export2 = require('../../../../catalog/properties/export');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'table',
      { style: tableStyle },
      _react2.default.createElement(
        'tbody',
        null,
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { style: firstTdStyle },
            translator.t('Name')
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_export.FormTextInput, {
              value: name,
              onChange: function onChange(event) {
                return _onUpdate('name', event.target.value);
              },
              style: inputStyle
            })
          )
        ),
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { style: firstTdStyle },
            'X1'
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_export.FormNumberInput, _extends({
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
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { style: firstTdStyle },
            'Y1'
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_export.FormNumberInput, _extends({
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
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { style: firstTdStyle },
            'X2'
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_export.FormNumberInput, _extends({
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
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { style: firstTdStyle },
            'Y2'
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_export.FormNumberInput, _extends({
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
    _react2.default.createElement(_export2.PropertyLengthMeasure, {
      value: lineLength,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('lineLength', mapped);
      },
      configs: { label: translator.t('Length'), min: 0, max: Infinity, precision: 2 },
      state: state
    })
  );
}

exports.default = LineAttributesEditor;
LineAttributesEditor.propTypes = {
  element: _propTypes2.default.object.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  onValid: _propTypes2.default.func,
  attributeFormData: _propTypes2.default.object.isRequired,
  state: _propTypes2.default.object.isRequired
};

LineAttributesEditor.contextTypes = {
  translator: _propTypes2.default.object.isRequired
};