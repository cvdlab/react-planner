export { HoleAttributesEditor as default };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PropertyLengthMeasure from '../../../../catalog/properties/property-lenght-measure';
import PropertyString from '../../../../catalog/properties/property-string';

function HoleAttributesEditor(_ref, _ref2) {
  var element = _ref.element,
      _onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state,
      rest = _objectWithoutProperties(_ref, ['element', 'onUpdate', 'attributeFormData', 'state']);

  var translator = _ref2.translator;

  var name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;
  var offsetA = attributeFormData.has('offsetA') ? attributeFormData.get('offsetA') : element.offsetA;
  var offsetB = attributeFormData.has('offsetB') ? attributeFormData.get('offsetB') : element.offsetA;

  return React.createElement(
    'div',
    null,
    React.createElement(PropertyString, _extends({
      value: name,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('name', mapped);
      },
      configs: { label: 'Nome' },
      state: state
    }, rest)),
    React.createElement(PropertyLengthMeasure, _extends({
      value: offsetA,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('offsetA', mapped);
      },
      configs: { label: 'Offset 1', min: 0, max: Infinity, precision: 2 },
      state: state
    }, rest)),
    React.createElement(PropertyLengthMeasure, _extends({
      value: offsetB,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('offsetB', mapped);
      },
      configs: { label: 'Offset 2', min: 0, max: Infinity, precision: 2 },
      state: state
    }, rest))
  );
}

HoleAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

HoleAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired
};