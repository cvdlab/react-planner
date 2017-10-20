'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = AttributesEditor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _itemAttributesEditor = require('./item-attributes-editor');

var _itemAttributesEditor2 = _interopRequireDefault(_itemAttributesEditor);

var _lineAttributesEditor = require('./line-attributes-editor');

var _lineAttributesEditor2 = _interopRequireDefault(_lineAttributesEditor);

var _holeAttributesEditor = require('./hole-attributes-editor');

var _holeAttributesEditor2 = _interopRequireDefault(_holeAttributesEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function AttributesEditor(_ref) {
  var element = _ref.element,
      onUpdate = _ref.onUpdate,
      onValid = _ref.onValid,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state,
      rest = _objectWithoutProperties(_ref, ['element', 'onUpdate', 'onValid', 'attributeFormData', 'state']);

  switch (element.prototype) {
    case 'items':
      return _react2.default.createElement(_itemAttributesEditor2.default, _extends({
        element: element,
        onUpdate: onUpdate,
        onValid: onValid,
        attributeFormData: attributeFormData,
        state: state
      }, rest));
    case 'lines':
      return _react2.default.createElement(_lineAttributesEditor2.default, _extends({
        element: element,
        onUpdate: onUpdate,
        onValid: onValid,
        attributeFormData: attributeFormData,
        state: state
      }, rest));
    case 'holes':
      return _react2.default.createElement(_holeAttributesEditor2.default, _extends({
        element: element,
        onUpdate: onUpdate,
        onValid: onValid,
        attributeFormData: attributeFormData,
        state: state
      }, rest));
    case 'areas':
      return null;

  }

  return null;
}

AttributesEditor.propTypes = {
  element: _propTypes2.default.object.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  onValid: _propTypes2.default.func,
  attributeFormData: _propTypes2.default.object.isRequired,
  state: _propTypes2.default.object.isRequired
};