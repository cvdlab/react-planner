export { HoleAttributesEditor as default };
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PropertyLengthMeasure from '../../../../catalog/properties/property-lenght-measure';
import PropertyString from '../../../../catalog/properties/property-string';

function HoleAttributesEditor(_ref, _ref2) {
  var element = _ref.element,
      _onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state;
  var translator = _ref2.translator;

  var name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;
  var offsetA = attributeFormData.has('offsetA') ? attributeFormData.get('offsetA') : element.offsetA;
  var offsetB = attributeFormData.has('offsetB') ? attributeFormData.get('offsetB') : element.offsetA;

  return React.createElement(
    'div',
    null,
    React.createElement(PropertyString, {
      value: name,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('name', mapped);
      },
      configs: { label: 'Nome' },
      state: state
    }),
    React.createElement(PropertyLengthMeasure, {
      value: offsetA,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('offsetA', mapped);
      },
      configs: { label: 'Offset 1', min: 0, max: Infinity },
      state: state
    }),
    React.createElement(PropertyLengthMeasure, {
      value: offsetB,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('offsetB', mapped);
      },
      configs: { label: 'Offset 2', min: 0, max: Infinity },
      state: state
    })
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