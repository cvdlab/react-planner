import React, {PropTypes} from 'react';
import IconSave from 'react-icons/lib/md/camera-alt';
import ToolbarButton from './toolbar-button';
import {imageBrowserDownload}  from '../../utils/browser';

export default function ToolbarScreenshotButton({state}, {translator, projectActions}) {

  let saveScreenshotToFile = event => {
    event.preventDefault();
    let canvas = document.getElementsByTagName('canvas')[0];
    imageBrowserDownload(canvas.toDataURL());
    projectActions.saveScreenshot();
  };

  return (
    <ToolbarButton tooltip={translator.t("Get Screenshot")} onClick={saveScreenshotToFile}>
      <IconSave />
    </ToolbarButton>
  );
}

ToolbarScreenshotButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarScreenshotButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
