import React, { PropTypes } from 'react';
import IconSave from 'react-icons/lib/fa/floppy-o';
import ToolbarButton from './toolbar-button';
import { browserDownload } from '../../utils/browser';

export default function ToolbarSaveButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var saveProjectToFile = function saveProjectToFile(event) {
    event.preventDefault();
    var scene = state.get('scene').toJS();
    browserDownload(scene);
  };

  return React.createElement(
    ToolbarButton,
    { tooltip: translator.t("Save project"), onClick: saveProjectToFile },
    React.createElement(IconSave, null)
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired
};

ToolbarSaveButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};