import React, { PropTypes, Component } from 'react';
import ItemAttributesEditor from './item-attributes-editor'

export default function AttributesEditor({ element, onUpdate, attributeFormData }) {
  switch (element.prototype) {
    case 'lines':
    case 'holes':
    case 'areas':
    case 'items':
    case 'item': return <ItemAttributesEditor element={element} onUpdate={onUpdate} attributeFormData={attributeFormData} />;
  }

  return null;
}

AttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData:  PropTypes.object.isRequired
};
