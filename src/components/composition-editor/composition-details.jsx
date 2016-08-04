import React, {PropTypes} from 'react';

const STYLE_WRAPPER = {listStyle: "none", padding: "4px", backgroundColor: "#111113", marginBottom: "5px"};
const STYLE_DL = {margin: "0px 0px 5px 0px"};
const STYLE_DT = {width: "30%", display: "inline-block"};
const STYLE_DD = {width: "70%", display: "inline-block", margin:"0px"};

export default function CompositionDetails(props) {
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

CompositionDetails.propTypes = {};

CompositionDetails.contextTypes = {};
