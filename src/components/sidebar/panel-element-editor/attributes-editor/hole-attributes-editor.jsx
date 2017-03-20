import React, {PropTypes, Component} from 'react';
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

export default function HoleAttributesEditor({element, onUpdate, attributeFormData}, {translator}) {
  let offsetA = attributeFormData.has('offsetA') ? attributeFormData.get('offsetA') : element.offsetA;
  let offsetB = attributeFormData.has('offsetB') ? attributeFormData.get('offsetB') : element.offsetA;

  return <div>
    <PropertyLengthMeasure
      value={offsetA}
      onUpdate={mapped => onUpdate('offsetA', mapped)}
      configs={{label: 'Offset 1', min: 0, max: Infinity}}
    />
    <PropertyLengthMeasure
      value={offsetB}
      onUpdate={mapped => onUpdate('offsetB', mapped)}
      configs={{label: 'Offset 2', min: 0, max: Infinity}}
    />
  </div>;
}

HoleAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired
};

HoleAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired,
};
