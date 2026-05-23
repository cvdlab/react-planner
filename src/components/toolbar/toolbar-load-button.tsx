import React from 'react';
import PropTypes from 'prop-types';
import { FaFolderOpen as IconLoad } from 'react-icons/fa';
import ToolbarButton from './toolbar-button';
import { browserUpload } from '../../utils/browser';

type Props = { state: any };
type Context = { translator: any; projectActions: any };

export default function ToolbarLoadButton({ state }: Props, { translator, projectActions }: Context) {

  let loadProjectFromFile = (event: any) => {
    event.preventDefault();
    browserUpload().then((data: any) => {
      projectActions.loadProject(JSON.parse(data));
    });
  };

  return (
    <ToolbarButton active={false} tooltip={translator.t("Load project")} onClick={loadProjectFromFile}>
      <IconLoad />
    </ToolbarButton>
  );
}

(ToolbarLoadButton as any).propTypes = {
  state: PropTypes.object.isRequired,
};

(ToolbarLoadButton as any).contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
