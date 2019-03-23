import React, { Component } from 'react';
import PropTypes from 'prop-types';
import If from '../../utils/react-if';
import FooterToggleButton from './footer-toggle-button';
import FooterContentButton from './footer-content-button';
import { SNAP_POINT, SNAP_LINE, SNAP_SEGMENT, SNAP_GRID, SNAP_GUIDE } from '../../utils/snap';
import { MODE_SNAPPING } from '../../constants';
import * as SharedStyle from '../../shared-style';
import { MdAddCircle, MdWarning } from 'react-icons/md';
import { VERSION } from '../../version';

const footerBarStyle = {
  position: 'absolute',
  bottom: 0,
  lineHeight: '14px',
  fontSize: '12px',
  color: SharedStyle.COLORS.white,
  backgroundColor: SharedStyle.SECONDARY_COLOR.alt,
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

export default class FooterBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    let { state: globalState, width, height } = this.props;
    let { translator, projectActions } = this.context;
    let { x, y } = globalState.get('mouse').toJS();
    let zoom = globalState.get('zoom');
    let mode = globalState.get('mode');

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
              state={this.state}
              toggleOn={() => { updateSnapMask({ SNAP_POINT: true }); }}
              toggleOff={() => { updateSnapMask({ SNAP_POINT: false }); }}
              text="Snap PT"
              toggleState={globalState.snapMask.get(SNAP_POINT)}
              title={translator.t('Snap to Point')}
            />
            <FooterToggleButton
              state={this.state}
              toggleOn={() => { updateSnapMask({ SNAP_LINE: true }); }}
              toggleOff={() => { updateSnapMask({ SNAP_LINE: false }); }}
              text="Snap LN"
              toggleState={globalState.snapMask.get(SNAP_LINE)}
              title={translator.t('Snap to Line')}
            />
            <FooterToggleButton
              state={this.state}
              toggleOn={() => { updateSnapMask({ SNAP_SEGMENT: true }); }}
              toggleOff={() => { updateSnapMask({ SNAP_SEGMENT: false }); }}
              text="Snap SEG"
              toggleState={globalState.snapMask.get(SNAP_SEGMENT)}
              title={translator.t('Snap to Segment')}
            />
            <FooterToggleButton
              state={this.state}
              toggleOn={() => { updateSnapMask({ SNAP_GRID: true }); }}
              toggleOff={() => { updateSnapMask({ SNAP_GRID: false }); }}
              text="Snap GRD"
              toggleState={globalState.snapMask.get(SNAP_GRID)}
              title={translator.t('Snap to Grid')}
            />
            <FooterToggleButton
              state={this.state}
              toggleOn={() => { updateSnapMask({ SNAP_GUIDE: true }); }}
              toggleOff={() => { updateSnapMask({ SNAP_GUIDE: false }); }}
              text="Snap GDE"
              toggleState={globalState.snapMask.get(SNAP_GUIDE)}
              title={translator.t('Snap to Guide')}
            />
          </div>
        </If>

        {this.props.footerbarComponents.map((Component, index) => <Component state={state} key={index} />)}

        {
          this.props.softwareSignature ?
            <div
              style={rightTextStyle}
              title={this.props.softwareSignature + (this.props.softwareSignature.includes('React-Planner') ? '' : ` using React-Planner ${VERSION}`)}
            >
              {this.props.softwareSignature}
            </div>
            : null
        }

        <div style={rightTextStyle}>
          <FooterContentButton
            state={this.state}
            icon={MdAddCircle}
            iconStyle={errorIconStyle}
            text={errors.length.toString()}
            textStyle={errorLableStyle}
            title={`Errors [ ${errors.length} ]`}
            titleStyle={errorLableStyle}
            content={[errorsJsx]}
          />
          <FooterContentButton
            state={this.state}
            icon={MdWarning}
            iconStyle={warningIconStyle}
            text={warnings.length.toString()}
            textStyle={warningLableStyle}
            title={`Warnings [ ${warnings.length} ]`}
            titleStyle={warningLableStyle}
            content={[warningsJsx]}
          />
        </div>

      </div>
    );
  }
}

FooterBar.propTypes = {
  state: PropTypes.object.isRequired,
  footerbarComponents: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  softwareSignature: PropTypes.string
};

FooterBar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
