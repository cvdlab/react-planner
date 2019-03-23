import React from 'react';
import PropTypes from 'prop-types';
import { FaFolderOpen as IconLoad } from 'react-icons/fa';
import ToolbarButton from './toolbar-button';
import { browserUpload } from '../../utils/browser';

export default function ToolbarLoadButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var loadProjectFromFile = function loadProjectFromFile(event) {
    event.preventDefault();
    browserUpload().then(function (data) {
      projectActions.loadProject(JSON.parse(data));
    });
  };

  return React.createElement(
    ToolbarButton,
    { active: false, tooltip: translator.t("Load project"), onClick: loadProjectFromFile },
    React.createElement(IconLoad, null)
  );
}

ToolbarLoadButton.propTypes = {
  state: PropTypes.object.isRequired
};

ToolbarLoadButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};