import React from 'react';
import PropTypes from 'prop-types';
import { MdCamera } from 'react-icons/md'
import {ReactPlannerComponents, ReactPlannerConstants} from 'react-planner';

const {
  MODE_IDLE,
  MODE_2D_ZOOM_IN,
  MODE_2D_ZOOM_OUT,
  MODE_2D_PAN,
  MODE_WAITING_DRAWING_LINE,
  MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX,
  MODE_DRAGGING_ITEM,
  MODE_DRAWING_LINE,
  MODE_DRAWING_HOLE,
  MODE_DRAWING_ITEM,
  MODE_DRAGGING_HOLE,
  MODE_ROTATING_ITEM,
  MODE_3D_FIRST_PERSON,
  MODE_3D_VIEW
} = ReactPlannerConstants;

const { ToolbarButton } = ReactPlannerComponents.ToolbarComponents;

export default function ToolbarScreenshotButton({mode}, {translator}) {

  let imageBrowserDownload = imageUri => {
    let fileOutputLink = document.createElement('a');

    let filename = 'output' + Date.now() + '.png';
    filename = window.prompt('Insert output filename', filename);
    if (!filename) return;

    fileOutputLink.setAttribute('download', filename);
    fileOutputLink.href = imageUri;
    fileOutputLink.style.display = 'none';
    document.body.appendChild(fileOutputLink);
    fileOutputLink.click();
    document.body.removeChild(fileOutputLink);
  };


  let saveScreenshotToFile = event => {
    event.preventDefault();
    let canvas = document.getElementsByTagName('canvas')[0];
    imageBrowserDownload(canvas.toDataURL());
  };

  let saveSVGScreenshotToFile = event => {
    event.preventDefault();

    // First of all I need the svg content of the viewer
    let svgElements = document.getElementsByTagName('svg');

    // I get the element with max width (which is the viewer)
    let maxWidthSVGElement = svgElements[0];
    for (let i = 1; i < svgElements.length; i++) {
      if (svgElements[i].width.baseVal.value > maxWidthSVGElement.width.baseVal.value) {
        maxWidthSVGElement = svgElements[i];
      }
    }

    let serializer = new XMLSerializer();

    let img = new Image;

    // I create the new canvas to draw
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    // Set width and height for the new canvas
    let heightAtt = document.createAttribute('height');
    heightAtt.value = maxWidthSVGElement.height.baseVal.value;
    canvas.setAttributeNode(heightAtt);

    let widthAtt = document.createAttribute('width');
    widthAtt.value = maxWidthSVGElement.width.baseVal.value;
    canvas.setAttributeNode(widthAtt);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    img.crossOrigin = 'anonymous';
    img.src = `data:image/svg+xml;base64,${window.btoa(serializer.serializeToString(maxWidthSVGElement))}`;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, maxWidthSVGElement.width.baseVal.value, maxWidthSVGElement.height.baseVal.value);
      imageBrowserDownload(canvas.toDataURL());
    };

  };

  if ([MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode)) {
    return (
      <ToolbarButton active={false} tooltip={translator.t('Get Screenshot')} onClick={saveScreenshotToFile}>
        <MdCamera/>
      </ToolbarButton>
    );
  }

  if ([MODE_IDLE,
      MODE_2D_ZOOM_IN,
      MODE_2D_ZOOM_OUT,
      MODE_2D_PAN,
      MODE_WAITING_DRAWING_LINE,
      MODE_DRAGGING_LINE,
      MODE_DRAGGING_VERTEX,
      MODE_DRAGGING_ITEM,
      MODE_DRAWING_LINE,
      MODE_DRAWING_HOLE,
      MODE_DRAWING_ITEM,
      MODE_DRAGGING_HOLE,
      MODE_ROTATING_ITEM].includes(mode)) {

    return (
      <ToolbarButton active={false} tooltip={translator.t('Get Screenshot')} onClick={saveSVGScreenshotToFile}>
        <MdCamera/>
      </ToolbarButton>
    );
  }

  return null;

}

ToolbarScreenshotButton.propTypes = {
  mode: PropTypes.string.isRequired,
};

ToolbarScreenshotButton.contextTypes = {
  translator: PropTypes.object.isRequired,
};
