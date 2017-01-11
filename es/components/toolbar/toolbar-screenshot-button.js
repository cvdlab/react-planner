import React, { PropTypes } from 'react';
import IconSave from 'react-icons/lib/md/camera-alt';
import ToolbarButton from './toolbar-button';
import { imageBrowserDownload } from '../../utils/browser';

export default function ToolbarScreenshotButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var saveScreenshotToFile = function saveScreenshotToFile(event) {
    event.preventDefault();
    var canvas = document.getElementsByTagName('canvas')[0];
    imageBrowserDownload(canvas.toDataURL());
    projectActions.saveScreenshot();
  };

  return React.createElement(
    ToolbarButton,
    { active: false, tooltip: translator.t("Get Screenshot"), onClick: saveScreenshotToFile },
    React.createElement(IconSave, null)
  );
}

ToolbarScreenshotButton.propTypes = {
  state: PropTypes.object.isRequired
};

ToolbarScreenshotButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};