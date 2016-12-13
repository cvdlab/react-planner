import React, {PropTypes} from 'react';
import IconLoad from 'react-icons/lib/fa/folder-open-o';
import ToolbarButton from './toolbar-button';

export default function ToolbarLoadButton({state}, {translator, projectActions}) {
  return (
    <ToolbarButton tooltip={translator.t("Load project")} onClick={event => projectActions.loadProjectFromFile()}>
      <IconLoad />
    </ToolbarButton>
  );
}

ToolbarLoadButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarLoadButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
