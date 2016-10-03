import React, {PropTypes} from 'react';

export default function PropertyComposition({propertyName, value, onUpdate, configs}) {
  return (
    <div style={{marginBottom: "3px"}}>
      <label>{propertyName}</label>

      <CompositionForm/>

    </div>
  );
}

PropertyComposition.propTypes = {
  propertyName: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};


function CompositionForm(props) {

  const STYLE_UL = {listStyle: "none", padding: "5px", backgroundColor: "#111113"};
  const STYLE_LI = {marginBottom: "5px"};
  const STYLE_LABEL = {width: "70px", display: "inline-block"};
  const STYLE_SELECT = {width: "130px"};

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
        <select style={STYLE_SELECT} onChange={event => console.log(event)}>
          <option value=""/>
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

function CompositionDetails(props) {
  const STYLE_WRAPPER = {listStyle: "none", padding: "4px", backgroundColor: "#111113", marginBottom: "5px"};
  const STYLE_DL = {margin: "0px 0px 5px 0px"};
  const STYLE_DT = {width: "30%", display: "inline-block"};
  const STYLE_DD = {width: "70%", display: "inline-block", margin:"0px"};

  return (
    <div style={STYLE_WRAPPER}>
      <dl style={STYLE_DL}>
        <dt style={STYLE_DT}>CER (80%)</dt>
        <dd style={STYLE_DD}>17.01.01 Cemento</dd>
      </dl>

      <dl style={STYLE_DL}>
        <dt style={STYLE_DT}>Danger</dt>
        <dd style={STYLE_DD}>H3. Cancerogeno</dd>
      </dl>

      <dl style={STYLE_DL}>
        <dt style={STYLE_DT}>Operation</dt>
        <dd style={STYLE_DD}>D1. Discarica</dd>
      </dl>
    </div>

  );
}

function CompositionAddButton(props) {

  return (
    <div>
      <button>Copy from ...</button>
      <button>Presets</button>
      <button>Insert</button>
    </div>
  );

}
