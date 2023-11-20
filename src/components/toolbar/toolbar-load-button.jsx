import React from 'react';
import PropTypes from 'prop-types';
import { FaFolderOpen as IconLoad, FaCloudDownloadAlt as IconFetch } from 'react-icons/fa';
import ToolbarButton from './toolbar-button';
import { browserUpload } from '../../utils/browser';

export default function ToolbarLoadButton({ state }, { translator, projectActions }) {

  // let loadProjectFromFile = event => {
  //   event.preventDefault();
  //   browserUpload().then((data) => {
  //     projectActions.loadProject(JSON.parse(data));
  //   });
  // };

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

ToolbarLoadButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarLoadButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
