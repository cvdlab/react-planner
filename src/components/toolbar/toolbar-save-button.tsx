import React from 'react';
import PropTypes from 'prop-types';
import { FaSave as IconSave } from 'react-icons/fa';
import ToolbarButton from './toolbar-button';
import { browserDownload } from '../../utils/browser';
import { Project } from '../../class/export';

type Props = { state: any };
type Context = { translator: any };

export default function ToolbarSaveButton({ state }: Props, { translator }: Context) {

  let saveProjectToFile = (e: any) => {
    e.preventDefault();
    state = Project.unselectAll(state).updatedState;
    browserDownload(state.get('scene').toJS());
  };

  return (
    <ToolbarButton active={false} tooltip={translator.t('Save project')} onClick={saveProjectToFile}>
      <IconSave />
    </ToolbarButton>
  );
}

(ToolbarSaveButton as any).propTypes = {
  state: PropTypes.object.isRequired,
};

(ToolbarSaveButton as any).contextTypes = {
  translator: PropTypes.object.isRequired,
};
