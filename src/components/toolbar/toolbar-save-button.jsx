import React, {PropTypes} from 'react';
import IconSave from 'react-icons/lib/fa/floppy-o';
import ToolbarButton from './toolbar-button';

export default function ToolbarSaveButton({state}, {translator, projectActions}) {
  return (
    <ToolbarButton tooltip={translator.t("Save project")} onClick={event => projectActions.saveProjectToFile()}>
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
