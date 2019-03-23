import React from 'react';
import PropTypes from 'prop-types';
import { FaSave as IconSave } from 'react-icons/fa';
import ToolbarButton from './toolbar-button';
import { browserDownload } from '../../utils/browser';
import { Project } from '../../class/export';

export default function ToolbarSaveButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator;


  var saveProjectToFile = function saveProjectToFile(e) {
    e.preventDefault();
    state = Project.unselectAll(state).updatedState;
    browserDownload(state.get('scene').toJS());
  };

  return React.createElement(
    ToolbarButton,
    { active: false, tooltip: translator.t('Save project'), onClick: saveProjectToFile },
    React.createElement(IconSave, null)
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired
};

ToolbarSaveButton.contextTypes = {
  translator: PropTypes.object.isRequired
};