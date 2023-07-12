import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {FaFolderOpen as IconLoad} from 'react-icons/fa';
import ReactPlannerContext from '../../utils/react-planner-context';
import ToolbarButton from './toolbar-button';
import {browserUpload}  from '../../utils/browser';

export default function ToolbarLoadButton({state}) {
  const { projectActions, translator } = useContext(ReactPlannerContext);

  let loadProjectFromFile = event => {
    event.preventDefault();
    browserUpload().then((data) => {
      projectActions.loadProject(JSON.parse(data));
    });
  };

  return (
    <ToolbarButton active={false} tooltip={translator.t("Load project")} onClick={loadProjectFromFile}>
      <IconLoad />
    </ToolbarButton>
  );
}

ToolbarLoadButton.propTypes = {
  state: PropTypes.object.isRequired,
};
