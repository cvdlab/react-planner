import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {Map} from 'immutable';
import { ReactPlannerContext } from 'react-planner';

const grabCircleRadius = 10;
const hoverCircleRadius = 14;
const rulerColor = '#f45c42';
const hoverColor = '#ff9900';

const grabCircleStyle = {
  cursor: 'grab',
  fill: rulerColor,
  transition: 'r 150ms ease-in'
};

const hoverCircleStyle = {
  cursor: 'grab',
  fill: hoverColor,
  transition: 'r 150ms ease-in'
};

const pointsDistance = (x1, y1, x2, y2) => {

  if (
    !isNaN(x1) &&
    !isNaN(y1) &&
    !isNaN(x2) &&
    !isNaN(y2)
  ) {
    if (!(x1 == 0 && y1 == 0 && x2 == 0 && y2 == 0)) {
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }
  }

  return 0;
};

const ImageFul = (props) => {
  const { element, x1, y1, x2, y2, distance, width, height, imageUri, layer, scene } = props;
  const { projectActions, catalog, translator } = useContext(ReactPlannerContext);

  const [state, setState] = useState({
    handleMouseMove1: false,
    handleMouseMove2: false,
    hover1: false,
    hover2: false,
    imageLoadError: false
  });

  const onMouseDown = (event) => {
    let target = event.viewerEvent.originalEvent.target;

    if (target.nodeName === 'circle') {
      if (target.attributes.name) {
        if (target.attributes.name.nodeValue === 'fst-anchor') {
          setState({handleMouseMove1: !state.handleMouseMove1});
        }
        else if (target.attributes.name.nodeValue === 'snd-anchor') {
          setState({handleMouseMove2: !state.handleMouseMove2});
        }
      }
    }
  };

  const onMouseMove = (event) => {
    let {x, y} = event.viewerEvent;

    y = scene.height - y;

    let dist = pointsDistance(x1, y1, x2, y2);
    let scale = !isNaN(dist) && dist ? (distance.length / dist) : 0;

    let origin = {
      x: element.x - (width * scale / 2),
      y: element.y + (height * scale / 2)
    };

    let minX = origin.x + (width * scale);
    let minY = origin.y - (height * scale);

    if (x < origin.x) {
      x = origin.x;
    }
    else if (x > minX) {
      x = minX;
    }

    if (y > origin.y) {
      y = origin.y;
    }
    else if (y < minY) {
      y = minY;
    }

    let newX = (x - origin.x);
    let newY = (origin.y - y);

    if (state.handleMouseMove1) {
      let dist = pointsDistance(newX, newY, x2, y2);
      projectActions.setProperties(new Map({x1: newX, y1: newY, distance: new Map({length: dist})}));
    }
    else if (state.handleMouseMove2) {
      let dist = pointsDistance(x1, y1, newX, newY);
      projectActions.setProperties(new Map({x2: newX, y2: newY, distance: new Map({length: dist})}));
    }
  };

  const toggleHover1 = (e) => {
    setState(prevState => ({ ...prevState, hover1: !prevState.hover1 }));
  };

  const toggleHover2 = (e) => {
    setState(prevState => ({ ...prevState, hover2: !prevState.hover2 }));
  };
  

  useEffect(() => {
    document.addEventListener('mousedown-planner-event', onMouseDown);
    document.addEventListener('mousemove-planner-event', onMouseMove);

    if (imageUri) {
      let img = new Image;
      img.src = imageUri;
      img.onload = () => {
        setState(prevState => ({ ...prevState, imageLoadError: false }));
        projectActions.setProperties(new Map({width: img.naturalWidth, height: img.naturalHeight}));
      };
      img.onerror = () => {
        setState(prevState => ({ ...prevState, imageLoadError: true }));
      };
    }

    return () => {
      document.removeEventListener('mousedown-planner-event', onMouseDown);
      document.removeEventListener('mousemove-planner-event', onMouseMove);
    };
  }, [imageUri]);

  let dist = pointsDistance(x1, y1, x2, y2);
  let scale = !isNaN(dist) && dist ? (distance.length / dist) : 0;
  let half_w = width / 2;

  let ruler = !element.selected ? null : (
    <g>
      <line key="1" x1={x1} y1={y1} x2={x2} y2={y2} stroke={rulerColor}
            strokeWidth="3px"/>
      <circle
        onMouseEnter={toggleHover1}
        onMouseLeave={toggleHover1}
        key="2"
        name="fst-anchor"
        cx={x1}
        cy={y1}
        r={state.hover1 || state.handleMouseMove1 ? hoverCircleRadius : grabCircleRadius}
        style={state.hover1 || state.handleMouseMove1 ? hoverCircleStyle : grabCircleStyle}/>
      <circle
        onMouseEnter={toggleHover2}
        onMouseLeave={toggleHover2}
        key="3"
        name="snd-anchor"
        cx={x2}
        cy={y2}
        r={state.hover2 || state.handleMouseMove2 ? hoverCircleRadius : grabCircleRadius}
        style={state.hover2 || state.handleMouseMove2 ? hoverCircleStyle : grabCircleStyle}/>
    </g>
  );

  return (
    <g
      transform={`scale(${scale}, ${scale}), scale(1,-1) translate(${-width / 2}, ${-height / 2})`}>
      {
        imageUri && !state.imageLoadError ?
          <image
            xlinkHref={imageUri}
            x="0"
            y="0"
            width={width}
            height={height}
          /> :
          <g>
            <rect x="0" y="0" width={width} height={height} fill="#CCC"></rect>
            <text
              x={half_w}
              y={height / 2}
              textAnchor="middle"
              alignmentBaseline="central"
              fontFamily="Arial"
              fontSize="35"
              fill="#666"
            >
              <tspan x={half_w} dy="-2em">Set the image url on the component</tspan>
              <tspan x={half_w} dy="1em">property inside the sidebar,</tspan>
              <tspan x={half_w} dy="1em">click and move each vertex</tspan>
              <tspan x={half_w} dy="1em">of the ruler then set the real distance</tspan>
              <tspan x={half_w} dy="1em">in the component property</tspan>
            </text>
          </g>
      }
      {ruler}
    </g>
  )
}


ImageFul.propTypes = {
  element: PropTypes.object.isRequired,
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  distance: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  imageUri: PropTypes.string.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired
};

export default ImageFul;