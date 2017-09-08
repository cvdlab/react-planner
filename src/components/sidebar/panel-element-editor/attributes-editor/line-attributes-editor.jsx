import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormNumberInput, FormTextInput } from '../../../style/export';
import { PropertyLengthMeasure } from '../../../../catalog/properties/export';

const tableStyle = {
  width: '100%'
};
const firstTdStyle = {
  width: '6em'
};
const inputStyle = {
  textAlign: 'left'
};

export default function LineAttributesEditor({element, onUpdate, attributeFormData, state}, {translator}) {

  let name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;
  let vertexOne = attributeFormData.has('vertexOne') ? attributeFormData.get('vertexOne') : null;
  let vertexTwo = attributeFormData.has('vertexTwo') ? attributeFormData.get('vertexTwo') : null;
  let lineLength = attributeFormData.has('lineLength') ? attributeFormData.get('lineLength') : null;

  return <div>
    <table style={tableStyle}>
      <tbody>
      <tr>
        <td style={firstTdStyle}>Nome:</td>
        <td><FormTextInput value={name} onChange={event => onUpdate('name', event.target.value)} style={inputStyle}/></td>
      </tr>
      <tr>
        <td style={firstTdStyle}>X1:</td>
        <td><FormNumberInput value={vertexOne.get('x')}
                             onChange={event => onUpdate('vertexOne', {'x': event.target.value})} style={inputStyle}
                             state={state}/>
        </td>
      </tr>
      <tr>
        <td style={firstTdStyle}>Y1:</td>
        <td><FormNumberInput value={vertexOne.get('y')}
                             onChange={event => onUpdate('vertexOne', {'y': event.target.value})} style={inputStyle}
                             state={state}/>
        </td>
      </tr>
      <tr>
        <td style={firstTdStyle}>X2:</td>
        <td><FormNumberInput value={vertexTwo.get('x')}
                             onChange={event => onUpdate('vertexTwo', {'x': event.target.value})} style={inputStyle}
                             state={state}/>
        </td>
      </tr>
      <tr>
        <td style={firstTdStyle}>Y2:</td>
        <td><FormNumberInput value={vertexTwo.get('y')}
                             onChange={event => onUpdate('vertexTwo', {'y': event.target.value})} style={inputStyle}
                             state={state}/>
        </td>
      </tr>
      </tbody>
    </table>
    <PropertyLengthMeasure
      value={ lineLength }
      onUpdate={mapped => onUpdate('lineLength', mapped)}
      configs={{label: 'Length', min: 0, max: Infinity}}
      state={state}
    />
  </div>;
}

LineAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

LineAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired,
};
