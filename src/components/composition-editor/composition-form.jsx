import React, {PropTypes} from 'react';

const STYLE_UL = {listStyle: "none", padding: "5px", backgroundColor: "#111113"};
const STYLE_LI = {marginBottom: "5px"};
const STYLE_LABEL = {width: "70px", display: "inline-block"};
const STYLE_SELECT = {width: "130px"};

export default function CompositionForm(props) {

  return (
    <ul style={STYLE_UL}>
      <li style={STYLE_LI}>
        <label style={STYLE_LABEL}>Class</label>
        <select value="17" style={STYLE_SELECT} onChange={event => console.log(event)}>
          <option value=""/>
          <option value="17">17. Rifiuti da costruzione</option>
        </select>
      </li>

      <li style={STYLE_LI}>
        <label style={STYLE_LABEL}>Subclass</label>
        <select value="01" style={STYLE_SELECT} onChange={event => console.log(event)}>
          <option value=""/>
          <option value="01">01. Inerti</option>
        </select>
      </li>

      <li style={STYLE_LI}>
        <label style={STYLE_LABEL}>Category</label>
        <select value="01" style={STYLE_SELECT} onChange={event => console.log(event)}>
          <option value=""/>
          <option value="01">01. Cemento</option>
        </select>
      </li>

      <li style={STYLE_LI}>
        <label style={STYLE_LABEL}>Danger</label>
        <select value="H3" style={STYLE_SELECT} onChange={event => console.log(event)}>
          <option value=""/>
          <option value="H3">H3. Cancerogeno</option>
        </select>
      </li>

      <li style={STYLE_LI}>
        <label style={STYLE_LABEL}>Op. type</label>
        <select value="R" style={STYLE_SELECT} onChange={event => console.log(event)}>
          <option value=""/>
          <option value="R">R. Recupero</option>
          <option value="S">S. Smaltimento</option>
        </select>
      </li>

      <li style={STYLE_LI}>
        <label style={STYLE_LABEL}>Operation</label>
        <select value="D1" style={STYLE_SELECT} onChange={event => console.log(event)}>
          <option value=""/>
          <option value="D1">D1. Discarica</option>
        </select>
      </li>
    </ul>
  );

}

CompositionForm.propTypes = {};

CompositionForm.contextTypes = {};
