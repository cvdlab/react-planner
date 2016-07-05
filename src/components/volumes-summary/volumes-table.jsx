import React, {PropTypes} from 'react';
import calculateVolumes from '../../utils/calculateVolumes';

const STYLE_CONTAINER = {
  padding: "0 20px",
  overflowY: "scroll"
};

const STYLE_TABLE = {
  width: "100%",
  borderCollapse: "collapse",
  borderTop: "1px solid #aaa"
};

const STYLE_CELL = {
  borderBottom: "1px solid #aaa",
  borderLeft: "1px solid #aaa",
  borderRight: "1px solid #aaa",
  padding: "4px 5px",
  fontSize: "12px",
  textAlign: "left"
};

const STYLE_HEADER = {
  ...STYLE_CELL,
  fontSize: "13px"
};

export default function VolumesSummary({width, height, scene}) {

  let calculatedVolumes = calculateVolumes(scene);

  return (
    <div style={{width, height, ...STYLE_CONTAINER}}>
      <table style={STYLE_TABLE}>
        <thead>
        <tr>
          <th style={{width: "5%", ...STYLE_HEADER}}>ID</th>
          <th style={{width: "5%", ...STYLE_HEADER}}>Element</th>
          <th style={{width: "15%", ...STYLE_HEADER}}>Layer</th>
          <th style={{width: "15%", ...STYLE_HEADER}}>Type</th>
          <th style={{width: "20%", ...STYLE_HEADER}}>Base</th>
          <th style={{width: "20%", ...STYLE_HEADER}}>Volume</th>
          <th style={{width: "20%", ...STYLE_HEADER}}>Composition</th>
        </tr>
        </thead>
        <tbody>
        {
          calculatedVolumes.map(({id, elementID, layerID, type, base, volume, composition}) =>
            <tr key={id}>
              <td style={STYLE_CELL}>{id}</td>
              <td style={STYLE_CELL}>{elementID}</td>
              <td style={STYLE_CELL}>{layerID}</td>
              <td style={STYLE_CELL}>{type}</td>
              <td style={STYLE_CELL}>{base}</td>
              <td style={STYLE_CELL}>{volume} m³</td>
              <td style={STYLE_CELL}>{composition}</td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  );

}

VolumesSummary.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scene: PropTypes.object.isRequired
};

VolumesSummary.contextTypes = {};
