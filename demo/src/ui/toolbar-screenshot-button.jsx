import React, {PropTypes} from 'react';
import IconSave from 'react-icons/lib/md/camera-alt';
import {ToolbarButton} from 'react-planner';

export default function ToolbarScreenshotButton({mode}, {translator}) {

  let imageBrowserDownload = imageUri => {
    let fileOutputLink = document.createElement('a');

    let filename = "output" + Date.now() + ".png";
    filename = window.prompt("Insert output filename", filename);
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

  if (["MODE_3D_FIRST_PERSON", "MODE_3D_VIEW"].includes(mode)){
    return (
      <ToolbarButton active={false} tooltip={translator.t("Get Screenshot")} onClick={saveScreenshotToFile}>
        <IconSave />
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
