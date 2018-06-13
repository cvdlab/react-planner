import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

const defW = 100; //100px
const totNumEl = 100;
const positiveNumEl = 50;
const negativeNumEl = totNumEl - positiveNumEl;
const totalLength = defW * totNumEl;

const backgroundColor = '#999';
const fontColor = '#FFF';
const markerColor = SharedStyle.SECONDARY_COLOR.main;

export default class RulerX extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {

    let elementW = defW * this.props.zoom;

    let elementStyle = {
      display:'inline-block',
      width: elementW,
      position:'relative',
      borderLeft: '1px solid ' + ( this.props.fontColor || fontColor ),
      paddingLeft: '0.2em',
      fontSize:'10px',
      height:'100%'
    };

    let insideElementsStyle = {
      width: '20%',
      display:'inline-block',
      margin:0,
      padding:0
    };

    let rulerStyle = {
      backgroundColor: this.props.backgroundColor || backgroundColor,
      position:'relative',
      width: this.props.width,
      height:'100%',
      color: this.props.fontColor || fontColor
    }

    let markerStyle = {
      position:'absolute',
      left: this.props.zeroLeftPosition + ( this.props.mouseX * this.props.zoom ),
      top:8,
      width: 0, 
      height: 0, 
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '8px solid ' + ( this.props.markerColor || markerColor ),
      zIndex:9001
    };

    let positiveRulerContainer = {
      position:'absolute',
      width: (positiveNumEl * elementW),
      left: this.props.zeroLeftPosition,
      height: '100%',
      margin:0,
      padding:0
    };

    let negativeRulerContainer = {
      position:'absolute',
      width: (negativeNumEl * elementW),
      left: this.props.zeroLeftPosition - (negativeNumEl * elementW),
      height: '100%',
      margin:0,
      padding:0
    };

    let positiveElements = Array.from(Array(positiveNumEl).keys());
    let positiveDomElements = null;

    if( elementW <= 200 ) positiveDomElements = positiveElements.map( el => <div key={el} style={elementStyle}>{ elementW > 30 ? ( el * 100 ) : ''}</div> );
    else if( elementW > 200 ) positiveDomElements = positiveElements.map( el => {
      let val = el * 100;
      return (
        <div key={el} style={elementStyle}>
          <div style={insideElementsStyle}>{ val }</div>
          <div style={insideElementsStyle}>{ val + ( 1 * 20 ) }</div>
          <div style={insideElementsStyle}>{ val + ( 2 * 20 ) }</div>
          <div style={insideElementsStyle}>{ val + ( 3 * 20 ) }</div>
          <div style={insideElementsStyle}>{ val + ( 4 * 20 ) }</div>
        </div>
      );
    });

    return <div style={rulerStyle}>

        <div style={markerStyle}></div>

        <div id='negativeRuler' style={negativeRulerContainer}></div>

        <div id="positiveRuler" style={positiveRulerContainer}>
          { positiveDomElements }
        </div>

    </div>;
  }

}

RulerX.propTypes = {
  zoom: PropTypes.number.isRequired,
  mouseX: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  zeroLeftPosition: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  markerColor: PropTypes.string
};

RulerX.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  groupsActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};
