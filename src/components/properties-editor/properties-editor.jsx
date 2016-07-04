import React, {PropTypes} from 'react';

export default function PropertiesEditor({element}) {
  return (
    <div>
      <ul style={{listStyle: "none", padding: "0px"}}>
        <li><strong>id</strong> {element.id}</li>
        <li><strong>type</strong> {element.type} </li>
      </ul>

      <ul style={{listStyle: "none", padding: "0px"}}>
        <li style={{marginBottom: "5px"}}>
          <label style={{width: "70px", display: "inline-block"}}>Height</label>
          <input type="text" defaultValue={element.height}/>
        </li>

        <li style={{marginBottom: "5px"}}>
          <label style={{width: "70px", display: "inline-block"}}>Width</label>
          <input type="text" defaultValue={element.width}/>
        </li>

        <li style={{marginBottom: "5px"}}>
          <label style={{width: "70px", display: "inline-block"}}>Material</label>
          <select>
            <option value="1">Non disponibile</option>
            <option value="2">Cemento</option>
            <option value="3">Vetro</option>
            <option value="4">Amianto</option>
            <option value="4">Cartongesso</option>
          </select>
        </li>
      </ul>

      <div style={{textAlign:"right"}}>
        <button style={{backgroundColor: "red", border: 0, color: "white", margin: "3px"}}>Annulla</button>
        <button style={{backgroundColor: "green", border: 0, color: "white", margin: "3px"}}>Salva</button>
      </div>


    </div>
  )

}

PropertiesEditor.propTypes = {
  element: PropTypes.object.isRequired
};
