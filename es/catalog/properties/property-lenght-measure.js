var _excluded = ["hook", "label"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import PropTypes from 'prop-types';
import { UNITS_LENGTH, UNIT_CENTIMETER } from '../../utils/constants';
import convert from 'convert-units';
import { FormLabel, FormNumberInput, FormSelect } from '../../components/style/export';
import { Map } from 'immutable';
import { toFixedFloat } from '../../utils/math';
import PropertyStyle from './shared-property-style';
var internalTableStyle = {
  borderCollapse: 'collapse'
};
var secondTdStyle = {
  padding: 0
};
var unitContainerStyle = {
  width: '5em'
};
var PropertyLengthMeasure = function PropertyLengthMeasure(_ref) {
  var value = _ref.value,
    onUpdate = _ref.onUpdate,
    onValid = _ref.onValid,
    configs = _ref.configs,
    sourceElement = _ref.sourceElement,
    internalState = _ref.internalState,
    state = _ref.state;
  var length = value.get('length') || 0;
  var _length = value.get('_length') || length;
  var _unit = value.get('_unit') || UNIT_CENTIMETER;
  var hook = configs.hook,
    label = configs.label,
    configRest = _objectWithoutProperties(configs, _excluded);
  var update = function update(lengthInput, unitInput) {
    var newLength = toFixedFloat(lengthInput);
    var merged = value.merge({
      length: unitInput !== UNIT_CENTIMETER ? convert(newLength).from(unitInput).to(UNIT_CENTIMETER) : newLength,
      _length: lengthInput,
      _unit: unitInput
    });
    if (hook) {
      return hook(merged, sourceElement, internalState, state).then(function (val) {
        return onUpdate(val);
      });
    }
    return onUpdate(merged);
  };
  return /*#__PURE__*/React.createElement("table", {
    className: "PropertyLengthMeasure",
    style: PropertyStyle.tableStyle
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: PropertyStyle.firstTdStyle
  }, /*#__PURE__*/React.createElement(FormLabel, null, label)), /*#__PURE__*/React.createElement("td", {
    style: secondTdStyle
  }, /*#__PURE__*/React.createElement("table", {
    style: internalTableStyle
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FormNumberInput, _extends({
    value: _length,
    onChange: function onChange(event) {
      return update(event.target.value, _unit);
    },
    onValid: onValid
  }, configRest))), /*#__PURE__*/React.createElement("td", {
    style: unitContainerStyle
  }, /*#__PURE__*/React.createElement(FormSelect, {
    value: _unit,
    onChange: function onChange(event) {
      return update(_length, event.target.value);
    }
  }, UNITS_LENGTH.map(function (el) {
    return /*#__PURE__*/React.createElement("option", {
      key: el,
      value: el
    }, el);
  }))))))))));
};
PropertyLengthMeasure.propTypes = {
  value: PropTypes.instanceOf(Map).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};
export default PropertyLengthMeasure;