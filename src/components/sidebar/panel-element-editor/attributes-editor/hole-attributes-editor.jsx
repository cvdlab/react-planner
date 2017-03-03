import React, {PropTypes, Component} from 'react';
import FormNumberInput from '../../../style/form-number-input';

let tableStyle = {
  width: '100%'
};
let firstTdStyle = {
  width: '6em'
};
let inputStyle = {
  textAlign : 'left'
}

export default function HoleAttributesEditor( { element, onUpdate, attributeFormData }, {translator} )
{
  let offset = attributeFormData.has('offset') ? attributeFormData.get('offset') : element.offset;

  return <table style={tableStyle}>
    <tbody>
      <tr>
        <td style={firstTdStyle}>Offset: </td>
        <td><FormNumberInput value={offset} onChange={event => onUpdate( 'offset', event.target.value)} style={inputStyle} /></td>
      </tr>
    </tbody>
  </table>;
}

HoleAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired
};

HoleAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired,
};
