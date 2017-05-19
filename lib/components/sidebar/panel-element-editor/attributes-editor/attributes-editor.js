'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

function AttributesEditor(_ref) {
  var element = _ref.element,
      onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData;

  switch (element.prototype) {
    case 'items':
      return _react2.default.createElement(_itemAttributesEditor2.default, { element: element, onUpdate: onUpdate, attributeFormData: attributeFormData });
    case 'lines':
      return _react2.default.createElement(_lineAttributesEditor2.default, { element: element, onUpdate: onUpdate, attributeFormData: attributeFormData });
    case 'holes':
      return _react2.default.createElement(_holeAttributesEditor2.default, { element: element, onUpdate: onUpdate, attributeFormData: attributeFormData });
    case 'areas':
      return null;

  }

  return null;
}

AttributesEditor.propTypes = {
  element: _propTypes2.default.object.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  attributeFormData: _propTypes2.default.object.isRequired
};