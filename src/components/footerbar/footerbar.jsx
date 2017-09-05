import React, {Component} from 'react';
import PropTypes from 'prop-types';
import If from '../../utils/react-if';
import FooterToggleButton from './footer-toggle-button';
import FooterContentButton from './footer-content-button';
import {VERSION} from '../../version';
import {SNAP_POINT, SNAP_LINE, SNAP_SEGMENT, SNAP_MASK} from '../../utils/snap';
import {MODE_SNAPPING} from '../../constants';
import * as SharedStyle from '../../shared-style';
import IconClose from 'react-icons/lib/fa/close';
import MdAddCircle from 'react-icons/lib/md/add-circle';
import MdWarning from 'react-icons/lib/md/warning';

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

export default class FooterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    let {x, y} = this.props.state.get('mouse').toJS();
    let zoom = this.props.state.get('zoom');
    let mode = this.props.state.get('mode');

    let errors = this.props.state.get('errors').toArray();
    let errorsJsx = errors.map((err,ind) =>
      <div key={ind} style={{borderBottom:'1px solid #555', lineHeight:'1.5em'}}>[ { (new Date(err.date)).toLocaleString() } ] {err.error}</div>
    );
    let errorLableStyle = errors.length ? {color:SharedStyle.MATERIAL_COLORS[500].red} : {};
    let errorIconStyle = errors.length ? {transform:'rotate(45deg)',color:SharedStyle.MATERIAL_COLORS[500].red} : {transform:'rotate(45deg)'};

    return (
      <div style={{...footerBarStyle, width: this.props.width, height: this.props.height}}>

        <If condition={MODE_SNAPPING.includes(mode)}>
          <div style={leftTextStyle}>
            <div title="Mouse X Coordinates" style={coordStyle}>X : {x.toFixed(3)}</div>
            <div title="Mouse Y Coordinates" style={coordStyle}>Y : {y.toFixed(3)}</div>
          </div>

          <div style={leftTextStyle} title="Scene Zoom Level">Zoom: {zoom.toFixed(3)}X</div>

          <div style={leftTextStyle}>
            <FooterToggleButton
              state={this.state}
              toggleOn={() => {
                this.context.projectActions.toggleSnap(this.props.state.snapMask.merge({SNAP_POINT: true}))
              }}
              toggleOff={() => {
                this.context.projectActions.toggleSnap(this.props.state.snapMask.merge({SNAP_POINT: false}))
              }}
              text="Snap PT"
              toggleState={this.props.state.snapMask.get(SNAP_POINT)}
              title="Snap to Point"
            />
            <FooterToggleButton
              state={this.state}
              toggleOn={() => {
                this.context.projectActions.toggleSnap(this.props.state.snapMask.merge({SNAP_LINE: true}))
              }}
              toggleOff={() => {
                this.context.projectActions.toggleSnap(this.props.state.snapMask.merge({SNAP_LINE: false}))
              }}
              text="Snap LN"
              toggleState={this.props.state.snapMask.get(SNAP_LINE)}
              title="Snap to Line"
            />
            <FooterToggleButton
              state={this.state}
              toggleOn={() => {
                this.context.projectActions.toggleSnap(this.props.state.snapMask.merge({SNAP_SEGMENT: true}))
              }}
              toggleOff={() => {
                this.context.projectActions.toggleSnap(this.props.state.snapMask.merge({SNAP_SEGMENT: false}))
              }}
              text="Snap SEG"
              toggleState={this.props.state.snapMask.get(SNAP_SEGMENT)}
              title="Snap to Segment"
            />
          </div>
        </If>

        {this.props.footerbarComponents.map((Component, index) => <Component state={state} key={index}/>)}

        <div style={rightTextStyle}>React-Planner {VERSION}</div>

        <div style={rightTextStyle}>
          <FooterContentButton
            state={this.state}
            icon={MdAddCircle}
            iconStyle={errorIconStyle}
            text={errors.length.toString()}
            textStyle={errorLableStyle}
            title={'Errors [ ' + errors.length + ' ]'}
            titleStyle={errorLableStyle}
            content={[errorsJsx]}
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
  height: PropTypes.number.isRequired
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
