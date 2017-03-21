'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formNumberInput = require('../../../style/form-number-input');

var _formNumberInput2 = _interopRequireDefault(_formNumberInput);

var _propertyLenghtMeasure = require('../../../../catalog/properties/property-lenght-measure');

var _propertyLenghtMeasure2 = _interopRequireDefault(_propertyLenghtMeasure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            'X1: '
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_formNumberInput2.default, { value: vertexOne.get('x'), onChange: function onChange(event) {
                return _onUpdate('vertexOne', { 'x': event.target.value });
              }, style: inputStyle })
          )
        ),
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { style: firstTdStyle },
            'Y1: '
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_formNumberInput2.default, { value: vertexOne.get('y'), onChange: function onChange(event) {
                return _onUpdate('vertexOne', { 'y': event.target.value });
              }, style: inputStyle })
          )
        ),
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { style: firstTdStyle },
            'X2: '
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_formNumberInput2.default, { value: vertexTwo.get('x'), onChange: function onChange(event) {
                return _onUpdate('vertexTwo', { 'x': event.target.value });
              }, style: inputStyle })
          )
        ),
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { style: firstTdStyle },
            'Y2: '
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(_formNumberInput2.default, { value: vertexTwo.get('y'), onChange: function onChange(event) {
                return _onUpdate('vertexTwo', { 'y': event.target.value });
              }, style: inputStyle })
          )
        )
      )
    ),
    _react2.default.createElement(_propertyLenghtMeasure2.default, {
      value: lineLength,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('lineLength', mapped);
      },
      configs: { label: 'Length', min: 0, max: Infinity }
    })
  );
}

exports.default = LineAttributesEditor;
LineAttributesEditor.propTypes = {
  element: _react.PropTypes.object.isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  attributeFormData: _react.PropTypes.object.isRequired
};

LineAttributesEditor.contextTypes = {
  translator: _react.PropTypes.object.isRequired
};