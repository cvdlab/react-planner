import React from 'react';
import PropTypes from 'prop-types';
import { FaCloudDownloadAlt as IconFetch } from 'react-icons/fa';
import ToolbarButton from './toolbar-button';

export default function ToolbarFetchButton({ state }, { translator, projectActions }) {


  let fetchAndLoadProject = () => {
    fetch('http://localhost:4000/get-project-data')
      .then(response => response.json())
      .then(data => {
        // Assuming 'data' contains the generated project data
        projectActions.loadProject(data);
      })
      .catch(error => {
        console.error('Error fetching and loading project:', error);
      });
  };

  return (
    <ToolbarButton active={false} tooltip={translator.t("Fetch and generate")} onClick={fetchAndLoadProject}>
      <IconFetch />
    </ToolbarButton>
  );
}

ToolbarFetchButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarFetchButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
