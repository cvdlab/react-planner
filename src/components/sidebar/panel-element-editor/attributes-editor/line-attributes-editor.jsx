import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormNumberInput from '../../../style/form-number-input';
import PropertyLengthMeasure from '../../../../catalog/properties/property-lenght-measure';

let tableStyle = {
  width: '100%'
};
let firstTdStyle = {
  width: '6em'
};
let inputStyle = {
  textAlign: 'left'
};

export default function LineAttributesEditor({element, onUpdate, attributeFormData}, {translator}) {
  let vertexOne = attributeFormData.has('vertexOne') ? attributeFormData.get('vertexOne') : null;
  let vertexTwo = attributeFormData.has('vertexTwo') ? attributeFormData.get('vertexTwo') : null;
  let lineLength = attributeFormData.has('lineLength') ? attributeFormData.get('lineLength') : null;

  return <div>
    <table style={tableStyle}>
      <tbody>
      <tr>
        <td style={firstTdStyle}>X1:</td>
        <td><FormNumberInput value={vertexOne.get('x')}
                             onChange={event => onUpdate('vertexOne', {'x': event.target.value})} style={inputStyle}/>
        </td>
      </tr>
      <tr>
        <td style={firstTdStyle}>Y1:</td>
        <td><FormNumberInput value={vertexOne.get('y')}
                             onChange={event => onUpdate('vertexOne', {'y': event.target.value})} style={inputStyle}/>
        </td>
      </tr>
      <tr>
        <td style={firstTdStyle}>X2:</td>
        <td><FormNumberInput value={vertexTwo.get('x')}
                             onChange={event => onUpdate('vertexTwo', {'x': event.target.value})} style={inputStyle}/>
        </td>
      </tr>
      <tr>
        <td style={firstTdStyle}>Y2:</td>
        <td><FormNumberInput value={vertexTwo.get('y')}
                             onChange={event => onUpdate('vertexTwo', {'y': event.target.value})} style={inputStyle}/>
        </td>
      </tr>
      </tbody>
    </table>
    <PropertyLengthMeasure
      value={ lineLength }
      onUpdate={mapped => onUpdate('lineLength', mapped)}
      configs={{label: 'Length', min: 0, max: Infinity}}
    />
  </div>;
}

LineAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired
};

LineAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired,
};
