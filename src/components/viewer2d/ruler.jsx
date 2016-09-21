import React, {PropTypes} from 'react';

const STYLE = {
  stroke: "#0096fd",
  strokeWidth: "1px"
};

const STYLE_TEXT = {
  textAnchor: "middle",
  fontSize: "12px",
  fontFamily: "'Courier New', Courier, monospace",
  pointerEvents: "none",
  fontWeight: "bold",

  //http://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css
  WebkitTouchCallout: "none", /* iOS Safari */
  WebkitUserSelect: "none",   /* Chrome/Safari/Opera */
  MozUserSelect: "none",      /* Firefox */
  MsUserSelect: "none",       /* Internet Explorer/Edge */
  userSelect: "none"
};


export default function Ruler({length, pixelPerUnit, unit}) {

  let distanceText = `${(length / pixelPerUnit).toPrecision(3)} ${unit}`;

  return (
    <g transform="translate(0, 15)">
      <text x={length / 2} y="-3" transform={`scale(1, -1)`} style={STYLE_TEXT}>{distanceText}</text>
      <line x1="0" y1="-5" x2="0" y2="5" style={STYLE}/>
      <line x1={length} y1="-5" x2={length} y2="5" style={STYLE}/>
      <line x1="0" y1="0" x2={length} y2="0" style={STYLE}/>
    </g>
  );

}

Ruler.propTypes = {
  length: PropTypes.number.isRequired,
  pixelPerUnit: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired
};
