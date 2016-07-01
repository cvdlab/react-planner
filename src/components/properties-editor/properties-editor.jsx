import React, {PropTypes} from 'react';

export default function PropertiesEditor({element}) {

  return (
    <ul style={{listStyle: "none", padding: "0px"}}>
      <li><strong>id</strong> {element.id}</li>
      <li><strong>type</strong> {element.type} </li>
    </ul>
  )
}

PropertiesEditor.propTypes = {
  element: PropTypes.object.isRequired
};
