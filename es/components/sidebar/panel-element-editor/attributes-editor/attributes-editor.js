import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemAttributesEditor from './item-attributes-editor';
import LineAttributesEditor from './line-attributes-editor';
import HoleAttributesEditor from './hole-attributes-editor';

export default function AttributesEditor(_ref) {
  var element = _ref.element,
      onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state;

  switch (element.prototype) {
    case 'items':
      return React.createElement(ItemAttributesEditor, { element: element, onUpdate: onUpdate, attributeFormData: attributeFormData,
        state: state });
    case 'lines':
      return React.createElement(LineAttributesEditor, { element: element, onUpdate: onUpdate, attributeFormData: attributeFormData,
        state: state });
    case 'holes':
      return React.createElement(HoleAttributesEditor, { element: element, onUpdate: onUpdate, attributeFormData: attributeFormData,
        state: state });
    case 'areas':
      return null;

  }

  return null;
}

AttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};