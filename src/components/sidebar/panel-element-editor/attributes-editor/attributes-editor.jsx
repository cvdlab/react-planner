import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemAttributesEditor from './item-attributes-editor';
import LineAttributesEditor from './line-attributes-editor';
import HoleAttributesEditor from './hole-attributes-editor';


export default function AttributesEditor({element, onUpdate, attributeFormData}) {
  switch (element.prototype) {
    case 'items':
      return <ItemAttributesEditor element={element} onUpdate={onUpdate} attributeFormData={attributeFormData}/>;
    case 'lines':
      return <LineAttributesEditor element={element} onUpdate={onUpdate} attributeFormData={attributeFormData}/>;
    case 'holes':
      return <HoleAttributesEditor element={element} onUpdate={onUpdate} attributeFormData={attributeFormData}/>;
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
