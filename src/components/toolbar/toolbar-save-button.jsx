import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {FaSave as IconSave} from 'react-icons/fa';
import ReactPlannerContext from '../../utils/react-planner-context';
import ToolbarButton from './toolbar-button';
import {browserDownload}  from '../../utils/browser';
import { Project } from '../../class/export';

export default function ToolbarSaveButton({state}) {
  const { translator } = useContext(ReactPlannerContext);

  let saveProjectToFile = e => {
    e.preventDefault();
    state = Project.unselectAll( state ).updatedState;
    browserDownload(state.get('scene').toJS());
  };

  return (
    <ToolbarButton active={false} tooltip={translator.t('Save project')} onClick={saveProjectToFile}>
      <IconSave />
    </ToolbarButton>
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired,
};
