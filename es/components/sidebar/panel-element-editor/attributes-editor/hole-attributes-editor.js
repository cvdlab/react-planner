var _excluded = ["element", "onUpdate", "attributeFormData", "state"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import PropTypes from 'prop-types';
import PropertyLengthMeasure from '../../../../catalog/properties/property-lenght-measure';
import PropertyString from '../../../../catalog/properties/property-string';
var HoleAttributesEditor = function HoleAttributesEditor(_ref) {
  var element = _ref.element,
    _onUpdate = _ref.onUpdate,
    attributeFormData = _ref.attributeFormData,
    state = _ref.state,
    rest = _objectWithoutProperties(_ref, _excluded);
  var name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;
  var offsetA = attributeFormData.has('offsetA') ? attributeFormData.get('offsetA') : element.offsetA;
  var offsetB = attributeFormData.has('offsetB') ? attributeFormData.get('offsetB') : element.offsetA;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PropertyString, _extends({
    value: name,
    onUpdate: function onUpdate(mapped) {
      return _onUpdate('name', mapped);
    },
    configs: {
      label: 'Nome'
    },
    state: state
  }, rest)), /*#__PURE__*/React.createElement(PropertyLengthMeasure, _extends({
    value: offsetA,
    onUpdate: function onUpdate(mapped) {
      return _onUpdate('offsetA', mapped);
    },
    configs: {
      label: 'Offset 1',
      min: 0,
      max: Infinity,
      precision: 2
    },
    state: state
  }, rest)), /*#__PURE__*/React.createElement(PropertyLengthMeasure, _extends({
    value: offsetB,
    onUpdate: function onUpdate(mapped) {
      return _onUpdate('offsetB', mapped);
    },
    configs: {
      label: 'Offset 2',
      min: 0,
      max: Infinity,
      precision: 2
    },
    state: state
  }, rest)));
};
HoleAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};
export default HoleAttributesEditor;