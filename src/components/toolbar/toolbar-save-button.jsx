import React, {PropTypes} from 'react';
import IconSave from 'react-icons/lib/fa/floppy-o';
import ToolbarButton from './toolbar-button';
import {browserDownload}  from '../../utils/browser';

export default function ToolbarSaveButton({state}, {translator, projectActions}) {

  let saveProjectToFile = event => {
    event.preventDefault();
    let scene = state.get('scene').toJS();
    browserDownload(scene);
  };

  return (
    <ToolbarButton active={false} tooltip={translator.t("Save project")} onClick={saveProjectToFile}>
      <IconSave />
    </ToolbarButton>
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarSaveButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
