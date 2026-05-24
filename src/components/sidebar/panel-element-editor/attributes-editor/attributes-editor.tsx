import React from 'react';
import ItemAttributesEditor from './item-attributes-editor';
import LineAttributesEditor from './line-attributes-editor';
import HoleAttributesEditor from './hole-attributes-editor';

type Props = {
  element: any;
  onUpdate: (...args: any[]) => any;
  onValid?: (...args: any[]) => any;
  attributeFormData: any;
  state: any;
};


export default function AttributesEditor({ element, onUpdate, onValid, attributeFormData, state, ...rest }: any) {

  switch (element.prototype) {
    case 'items':
      return <ItemAttributesEditor
        element={element}
        onUpdate={onUpdate}
        onValid={onValid}
        attributeFormData={attributeFormData}
        state={state}
        {...rest}
      />;
    case 'lines':
      return <LineAttributesEditor
        element={element}
        onUpdate={onUpdate}
        onValid={onValid}
        attributeFormData={attributeFormData}
        state={state}
        {...rest}
      />;
    case 'holes':
      return <HoleAttributesEditor
        element={element}
        onUpdate={onUpdate}
        onValid={onValid}
        attributeFormData={attributeFormData}
        state={state}
        {...rest}
      />;
    case 'areas':
      return null;

  }

  return null;
}

