import React from 'react';
import PropTypes from 'prop-types';
import { FormLabel, FormTextInput } from '../../components/style/export';
import PropertyStyle from './shared-property-style';
var tableStyle = {
  width: "100%",
  borderSpacing: "2px 0",
  marginBottom: "2px"
};
var firstTdStyle = {
  width: '6em',
  textTransform: 'capitalize'
};
export default function PropertyString(_ref) {
  var value = _ref.value,
    onUpdate = _ref.onUpdate,
    configs = _ref.configs,
    sourceElement = _ref.sourceElement,
    internalState = _ref.internalState,
    state = _ref.state;
  var update = function update(val) {
    if (configs.hook) {
      return configs.hook(val, sourceElement, internalState, state).then(function (_val) {
        return onUpdate(_val);
      });
    }
    return onUpdate(val);
  };
  return /*#__PURE__*/React.createElement("table", {
    className: "PropertyString",
    style: PropertyStyle.tableStyle
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: PropertyStyle.firstTdStyle
  }, /*#__PURE__*/React.createElement(FormLabel, null, configs.label)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FormTextInput, {
    value: value,
    onChange: function onChange(event) {
      return update(event.target.value);
    }
  })))));
}
PropertyString.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};