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

export default function LineAttributesEditor( { element, onUpdate, attributeFormData }, {translator} )
{
  let vertexOne = attributeFormData.has('vertexOne') ? attributeFormData.get('vertexOne') : null;
  let vertexTwo = attributeFormData.has('vertexTwo') ? attributeFormData.get('vertexTwo') : null;

  return <table style={tableStyle}>
    <tbody>
      <tr>
        <td style={firstTdStyle}>X1: </td>
        <td><FormNumberInput value={vertexOne.get('x')} onChange={event => onUpdate( 'vertexOne', { 'x': event.target.value } )} style={inputStyle} /></td>
      </tr>
      <tr>
        <td style={firstTdStyle}>Y1: </td>
        <td><FormNumberInput value={vertexOne.get('y')} onChange={event => onUpdate( 'vertexOne', { 'y': event.target.value } )} style={inputStyle} /></td>
      </tr>
      <tr>
        <td style={firstTdStyle}>X2: </td>
        <td><FormNumberInput value={vertexTwo.get('x')} onChange={event => onUpdate( 'vertexTwo', { 'x': event.target.value } )} style={inputStyle} /></td>
      </tr>
      <tr>
        <td style={firstTdStyle}>Y2: </td>
        <td><FormNumberInput value={vertexTwo.get('y')} onChange={event => onUpdate( 'vertexTwo', { 'y': event.target.value } )} style={inputStyle} /></td>
      </tr>
    </tbody>
  </table>;
}

LineAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired
};

LineAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired,
};
