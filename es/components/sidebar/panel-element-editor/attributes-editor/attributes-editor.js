import React, { PropTypes, Component } from 'react';
import ItemAttributesEditor from './item-attributes-editor';
import LineAttributesEditor from './line-attributes-editor';
import HoleAttributesEditor from './hole-attributes-editor';

export default function AttributesEditor(_ref) {
  var element = _ref.element,
      onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData;

  switch (element.prototype) {
    case 'items':
      return React.createElement(ItemAttributesEditor, { element: element, onUpdate: onUpdate, attributeFormData: attributeFormData });
    case 'lines':
      return React.createElement(LineAttributesEditor, { element: element, onUpdate: onUpdate, attributeFormData: attributeFormData });
    case 'holes':
      return React.createElement(HoleAttributesEditor, { element: element, onUpdate: onUpdate, attributeFormData: attributeFormData });
    case 'areas':
      return null;

  }

  return null;
}

AttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired
};