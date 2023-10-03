import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ReactPlannerContext from '../../utils/react-planner-context';
import If from '../../utils/react-if';
import FooterToggleButton from './footer-toggle-button';
import FooterContentButton from './footer-content-button';
import { SNAP_POINT, SNAP_LINE, SNAP_SEGMENT, SNAP_GRID, SNAP_GUIDE } from '../../utils/snap';
import { MODE_SNAPPING } from '../../utils/constants';
import * as SharedStyle from '../../styles/shared-style';
import { MdAddCircle, MdWarning } from 'react-icons/md';
import { VERSION } from '../../version';

const footerBarStyle = {
  position: 'absolute',
  bottom: 0,
  lineHeight: '14px',
  fontSize: '12px',
  color: SharedStyle.PRIMARY_COLOR.text_main,
  backgroundColor: SharedStyle.PRIMARY_COLOR.grey,
  padding: '3px 1em',
  margin: 0,
  boxSizing: 'border-box',
  cursor: 'default',
  userSelect: 'none',
  zIndex: '9001'
};

export const leftTextStyle = {
  position: 'relative',
  borderRight: '1px solid #FFF',
  float: 'left',
  padding: '0 1em',
  display: 'inline-block'
};

export const rightTextStyle = {
  position: 'relative',
  borderLeft: '1px solid #FFF',
  float: 'right',
  padding: '0 1em',
  display: 'inline-block'
};

const coordStyle = {
  display: 'inline-block',
  width: '6em',
  margin: 0,
  padding: 0
};

const appMessageStyle = { borderBottom: '1px solid #555', lineHeight: '1.5em' };

const FooterBar = ({ state: globalState, width, height, footerbarComponents, softwareSignature }) => {
  const [state] = useState({});
  const { translator, projectActions } = useContext(ReactPlannerContext);
  const { x, y } = globalState.get('mouse').toJS();
  const zoom = globalState.get('zoom');
  const mode = globalState.get('mode');

  let errors = globalState.get('errors').toArray();
  let errorsJsx = errors.map((err, ind) =>
    <div key={ind} style={appMessageStyle}>[ {(new Date(err.date)).toLocaleString()} ] {err.error}</div>
  );
  let errorLableStyle = errors.length ? { color: SharedStyle.MATERIAL_COLORS[500].red } : {};
  let errorIconStyle = errors.length ? { transform: 'rotate(45deg)', color: SharedStyle.MATERIAL_COLORS[500].red } : { transform: 'rotate(45deg)' };

  let warnings = globalState.get('warnings').toArray();
  let warningsJsx = warnings.map((warn, ind) =>
    <div key={ind} style={appMessageStyle}>[ {(new Date(warn.date)).toLocaleString()} ] {warn.warning}</div>
  );
  let warningLableStyle = warnings.length ? { color: SharedStyle.MATERIAL_COLORS[500].yellow } : {};
  let warningIconStyle = warningLableStyle;

  let updateSnapMask = (val) => projectActions.toggleSnap(globalState.snapMask.merge(val));

  return (
    <div style={{ ...footerBarStyle, width, height }}>

      <If condition={MODE_SNAPPING.includes(mode)}>
        <div style={leftTextStyle}>
          <div title={translator.t('Mouse X Coordinate')} style={coordStyle}>X : {x.toFixed(3)}</div>
          <div title={translator.t('Mouse Y Coordinate')} style={coordStyle}>Y : {y.toFixed(3)}</div>
        </div>

        <div style={leftTextStyle} title={translator.t('Scene Zoom Level')}>Zoom: {zoom.toFixed(3)}X</div>

        <div style={leftTextStyle}>
          <FooterToggleButton
            state={state}
            toggleOn={() => { updateSnapMask({ SNAP_POINT: true }); }}
            toggleOff={() => { updateSnapMask({ SNAP_POINT: false }); }}
            text="Snap PT"
            toggleState={globalState.snapMask.get(SNAP_POINT)}
            title={translator.t('Snap to Point')}
          />
          <FooterToggleButton
            state={state}
            toggleOn={() => { updateSnapMask({ SNAP_LINE: true }); }}
            toggleOff={() => { updateSnapMask({ SNAP_LINE: false }); }}
            text="Snap LN"
            toggleState={globalState.snapMask.get(SNAP_LINE)}
            title={translator.t('Snap to Line')}
          />
          <FooterToggleButton
            state={state}
            toggleOn={() => { updateSnapMask({ SNAP_SEGMENT: true }); }}
            toggleOff={() => { updateSnapMask({ SNAP_SEGMENT: false }); }}
            text="Snap SEG"
            toggleState={globalState.snapMask.get(SNAP_SEGMENT)}
            title={translator.t('Snap to Segment')}
          />
          <FooterToggleButton
            state={state}
            toggleOn={() => { updateSnapMask({ SNAP_GRID: true }); }}
            toggleOff={() => { updateSnapMask({ SNAP_GRID: false }); }}
            text="Snap GRD"
            toggleState={globalState.snapMask.get(SNAP_GRID)}
            title={translator.t('Snap to Grid')}
          />
          <FooterToggleButton
            state={state}
            toggleOn={() => { updateSnapMask({ SNAP_GUIDE: true }); }}
            toggleOff={() => { updateSnapMask({ SNAP_GUIDE: false }); }}
            text="Snap GDE"
            toggleState={globalState.snapMask.get(SNAP_GUIDE)}
            title={translator.t('Snap to Guide')}
          />
        </div>
      </If>

      {footerbarComponents.map((Component, index) => <Component state={state} key={index} />)}

      {
        softwareSignature ?
          <div
            style={rightTextStyle}
            title={softwareSignature + (softwareSignature.includes('React-Planner') ? '' : ` using React-Planner ${VERSION}`)}
          >
            {softwareSignature}
          </div>
          : null
      }

      {/* TODO(pg): reintegrate when needed and fix issue with display in Luccid if this is the case */}
      {/* <div style={rightTextStyle}>
        <FooterContentButton
          state={state}
          icon={MdAddCircle}
          iconStyle={errorIconStyle}
          text={errors.length.toString()}
          textStyle={errorLableStyle}
          title={`Errors [ ${errors.length} ]`}
          titleStyle={errorLableStyle}
          content={[errorsJsx]}
        />
        <FooterContentButton
          state={state}
          icon={MdWarning}
          iconStyle={warningIconStyle}
          text={warnings.length.toString()}
          textStyle={warningLableStyle}
          title={`Warnings [ ${warnings.length} ]`}
          titleStyle={warningLableStyle}
          content={[warningsJsx]}
        />
      </div> */}
    </div>
  );
}

FooterBar.propTypes = {
  state: PropTypes.object.isRequired,
  footerbarComponents: PropTypes.array.isRequired,
  softwareSignature: PropTypes.string
};

export default FooterBar;