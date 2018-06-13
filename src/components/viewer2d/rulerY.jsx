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

export default class RulerY extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {

    let elementW = defW * this.props.zoom;

    let elementStyle = {
      width:'8px',
      float:'right',
      position:'relative',
      borderTop: '1px solid ' + ( this.props.fontColor || fontColor ),
      paddingTop: '0.2em',
      fontSize:'10px',
      height:elementW,
      textOrientation: 'upright',
      writingMode: 'vertical-rl',
      margin:0,
      display:'table',
      letterSpacing:'-2px'
    };

    let insideElementsStyle = {
      height: '20%',
      width:'100%',
      margin:0,
      padding:0,
      textOrientation: 'upright',
      writingMode: 'vertical-rl',
      display:'table-cell',
      letterSpacing:'-2px'
    };

    let rulerStyle = {
      backgroundColor: this.props.backgroundColor || backgroundColor,
      position:'relative',
      height: this.props.height,
      width:'100%',
      color: this.props.fontColor || fontColor
    }

    let markerStyle = {
      position:'absolute',
      top: this.props.zeroTopPosition - ( this.props.mouseY * this.props.zoom ),
      left:8,
      width: 0, 
      height: 0, 
      borderTop: '5px solid transparent',
      borderBottom: '5px solid transparent',
      borderLeft: '8px solid ' + ( this.props.markerColor || markerColor ),
      zIndex:9001
    };

    let positiveRulerContainer = {
      position:'absolute',
      width: '100%',
      top: this.props.zeroTopPosition - ( (negativeNumEl - 1 ) * elementW ),
      height: (positiveNumEl * elementW),
      margin:0,
      padding:0
    };

    let negativeRulerContainer = {
      position:'absolute',
      width: '100%',
      top: this.props.zeroTopPosition + ( (negativeNumEl - 1 ) * elementW ),
      height: (negativeNumEl * elementW),
      margin:0,
      padding:0
    };

    let positiveElements = Array.from(Array(positiveNumEl).keys());
    let positiveDomElements = null;

    if( elementW <= 200 )
      positiveDomElements = positiveElements.map( el => <div key={el} style={elementStyle}>{ elementW > 30 ? ( el * 100 ) : ''}</div> ).reverse();
    else if( elementW > 200 )
      positiveDomElements = positiveElements.map( el => {
        let val = el * 100;
        return (
          <div key={el} style={elementStyle}>
            <div style={insideElementsStyle}>{ val + ( 4 * 20 ) }</div>
            <div style={insideElementsStyle}>{ val + ( 3 * 20 ) }</div>
            <div style={insideElementsStyle}>{ val + ( 2 * 20 ) }</div>
            <div style={insideElementsStyle}>{ val + ( 1 * 20 ) }</div>
            <div style={insideElementsStyle}>{ val }</div>
          </div>
        );
      }).reverse();

    return <div style={rulerStyle}>

        <div style={markerStyle}></div>

        <div id='negativeRuler' style={negativeRulerContainer}></div>

        <div id="positiveRuler" style={positiveRulerContainer}>
          { positiveDomElements }
        </div>

    </div>;
  }

}

RulerY.propTypes = {
  zoom: PropTypes.number.isRequired,
  mouseY: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zeroTopPosition: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  markerColor: PropTypes.string
};

RulerY.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  groupsActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};
