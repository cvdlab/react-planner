'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ItemAttributesEditor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formNumberInput = require('../../../style/form-number-input');

var _formNumberInput2 = _interopRequireDefault(_formNumberInput);

var _formTextInput = require('../../../style/form-text-input');

var _formTextInput2 = _interopRequireDefault(_formTextInput);

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

function ItemAttributesEditor(_ref, _ref2) {
  var element = _ref.element,
      onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state;
  var translator = _ref2.translator;

  var name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;
  var renderedX = attributeFormData.has('x') ? attributeFormData.get('x') : element.x;
  var renderedY = attributeFormData.has('y') ? attributeFormData.get('y') : element.y;
  var renderedR = attributeFormData.has('rotation') ? attributeFormData.get('rotation') : element.rotation;

  return _react2.default.createElement(
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
          'Nome:'
        ),
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(_formTextInput2.default, { value: name, onChange: function onChange(event) {
              return onUpdate('name', event.target.value);
            }, style: inputStyle })
        )
      ),
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          { style: firstTdStyle },
          'X:'
        ),
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(_formNumberInput2.default, { value: renderedX, onChange: function onChange(event) {
              return onUpdate('x', event.target.value);
            }, style: inputStyle,
            state: state })
        )
      ),
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          { style: firstTdStyle },
          'Y:'
        ),
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(_formNumberInput2.default, { value: renderedY, onChange: function onChange(event) {
              return onUpdate('y', event.target.value);
            }, style: inputStyle,
            state: state })
        )
      ),
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          { style: firstTdStyle },
          translator.t("Rotation"),
          ':'
        ),
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(_formNumberInput2.default, { value: renderedR, onChange: function onChange(event) {
              return onUpdate('rotation', event.target.value);
            },
            style: inputStyle, state: state })
        )
      )
    )
  );
}

ItemAttributesEditor.propTypes = {
  element: _propTypes2.default.object.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  attributeFormData: _propTypes2.default.object.isRequired,
  state: _propTypes2.default.object.isRequired
};

ItemAttributesEditor.contextTypes = {
  translator: _propTypes2.default.object.isRequired
};