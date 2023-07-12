var _excluded = ["element", "onUpdate", "attributeFormData", "state"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormNumberInput, FormTextInput } from '../../../style/export';
import { PropertyLengthMeasure } from '../../../../catalog/properties/export';
import ReactPlannerContext from '../../../../utils/react-planner-context';
var tableStyle = {
  width: '100%'
};
var firstTdStyle = {
  width: '6em'
};
var inputStyle = {
  textAlign: 'left'
};
var LineAttributesEditor = function LineAttributesEditor(_ref) {
  var element = _ref.element,
    _onUpdate = _ref.onUpdate,
    attributeFormData = _ref.attributeFormData,
    state = _ref.state,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useContext = useContext(ReactPlannerContext),
    translator = _useContext.translator;
  var name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;
  var vertexOne = attributeFormData.has('vertexOne') ? attributeFormData.get('vertexOne') : null;
  var vertexTwo = attributeFormData.has('vertexTwo') ? attributeFormData.get('vertexTwo') : null;
  var lineLength = attributeFormData.has('lineLength') ? attributeFormData.get('lineLength') : null;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
    style: tableStyle
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: firstTdStyle
  }, translator.t('Name')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FormTextInput, {
    value: name,
    onChange: function onChange(event) {
      return _onUpdate('name', event.target.value);
    },
    style: inputStyle
  }))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: firstTdStyle
  }, "X1"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FormNumberInput, _extends({
    value: vertexOne.get('x'),
    onChange: function onChange(event) {
      return _onUpdate('vertexOne', {
        'x': event.target.value
      });
    },
    style: inputStyle,
    state: state,
    precision: 2
  }, rest)))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: firstTdStyle
  }, "Y1"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FormNumberInput, _extends({
    value: vertexOne.get('y'),
    onChange: function onChange(event) {
      return _onUpdate('vertexOne', {
        'y': event.target.value
      });
    },
    style: inputStyle,
    state: state,
    precision: 2
  }, rest)))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: firstTdStyle
  }, "X2"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FormNumberInput, _extends({
    value: vertexTwo.get('x'),
    onChange: function onChange(event) {
      return _onUpdate('vertexTwo', {
        'x': event.target.value
      });
    },
    style: inputStyle,
    state: state,
    precision: 2
  }, rest)))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: firstTdStyle
  }, "Y2"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FormNumberInput, _extends({
    value: vertexTwo.get('y'),
    onChange: function onChange(event) {
      return _onUpdate('vertexTwo', {
        'y': event.target.value
      });
    },
    style: inputStyle,
    state: state,
    precision: 2
  }, rest)))))), /*#__PURE__*/React.createElement(PropertyLengthMeasure, {
    value: lineLength,
    onUpdate: function onUpdate(mapped) {
      return _onUpdate('lineLength', mapped);
    },
    configs: {
      label: translator.t('Length'),
      min: 0,
      max: Infinity,
      precision: 2
    },
    state: state
  }));
};
LineAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};
export default LineAttributesEditor;