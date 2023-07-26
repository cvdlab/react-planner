var _excluded = ["element", "onUpdate", "onValid", "attributeFormData", "state"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemAttributesEditor from './item-attributes-editor';
import LineAttributesEditor from './line-attributes-editor';
import HoleAttributesEditor from './hole-attributes-editor';
export default function AttributesEditor(_ref) {
  var element = _ref.element,
    onUpdate = _ref.onUpdate,
    onValid = _ref.onValid,
    attributeFormData = _ref.attributeFormData,
    state = _ref.state,
    rest = _objectWithoutProperties(_ref, _excluded);
  switch (element.prototype) {
    case 'items':
      return /*#__PURE__*/React.createElement(ItemAttributesEditor, _extends({
        element: element,
        onUpdate: onUpdate,
        onValid: onValid,
        attributeFormData: attributeFormData,
        state: state
      }, rest));
    case 'lines':
      return /*#__PURE__*/React.createElement(LineAttributesEditor, _extends({
        element: element,
        onUpdate: onUpdate,
        onValid: onValid,
        attributeFormData: attributeFormData,
        state: state
      }, rest));
    case 'holes':
      return /*#__PURE__*/React.createElement(HoleAttributesEditor, _extends({
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
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};