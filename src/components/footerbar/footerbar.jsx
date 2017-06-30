import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconNewFile from 'react-icons/lib/fa/file-o';
import IconPointer from 'react-icons/lib/fa/mouse-pointer';
import IconZoomPlus from 'react-icons/lib/ti/zoom-in';
import IconZoomMinus from 'react-icons/lib/ti/zoom-out';
import IconPan from 'react-icons/lib/fa/hand-paper-o';
import Icon3DFirstPerson from 'react-icons/lib/md/directions-run';
import IconCatalog from 'react-icons/lib/fa/plus';
import IconUndo from 'react-icons/lib/md/undo';
import IconConfigure from 'react-icons/lib/md/settings';
import If from '../../utils/react-if';
import { VERSION } from '../../version';
import FooterToggleButton from './footer-toggle-button';

const footerBarStyle = {
  position: 'absolute',
  bottom: 0,
  height: '20px',
  lineHeight: '14px',
  fontSize: '12px',
  color: '#FFF',
  backgroundColor: '#005faf',
  padding: '3px 1em',
  width: '100%',
  margin: 0,
  boxSizing: 'border-box',
  cursor: 'default',
  userSelect: 'none'
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

    let { x, y } = this.props.state.get('mouse').toJS();
    let zoom = this.props.state.get('zoom');

    return (
      <div style={footerBarStyle}>

        <div style={leftTextStyle}>
          <div style={coordStyle}>X : {x.toFixed(3)}</div>
          <div style={coordStyle}>Y : {y.toFixed(3)}</div>
        </div>

        <div style={leftTextStyle}>Zoom: {zoom.toFixed(3)}X</div>

        {this.props.footerbarComponents.map((Component, index) => <Component state={state} key={index} />)}

        <div id="footerToggleArea" style={leftTextStyle}>
          <FooterToggleButton
            state={this.state}
            toggleOn={() => { this.context.projectActions.toggleSnap(1) }}
            toggleOff={() => { this.context.projectActions.toggleSnap(0) }}
            text="Snap"
            initialToggleState={this.props.state.snapMask ? true : false}
          />
        </div>

        <div style={rightTextStyle}>React-Planner {VERSION}</div>

      </div>
    );
  }
}

FooterBar.propTypes = {
  state: PropTypes.object.isRequired,
  footerbarComponents: PropTypes.array.isRequired
};

FooterBar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  editingActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
