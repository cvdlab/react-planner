import React from 'react';
import PropTypes from 'prop-types';
import { FaFileDownload as IconDownload } from 'react-icons/fa';
import ColladaExporter from 'three/examples/js/exporters/ColladaExporter';
import { xml2js, js2xml } from 'xml-js';

import { saveAs } from 'file-saver';
import ToolbarButton from './toolbar-button';
import { Project } from '../../class/export';
import { parseData } from '../viewer3d/scene-creator';

export default function ToolbarExportButton(
  { state, context, catalog },
  { translator }
) {
  let saveProjectToFile = e => {
    e.preventDefault();
    state = Project.unselectAll(state).updatedState;
    let actions = {
      areaActions: context.areaActions,
      holesActions: context.holesActions,
      itemsActions: context.itemsActions,
      linesActions: context.linesActions,
      projectActions: context.projectActions
    };

    let scene = state.get('scene');
    // LOAD DATA
    let planData = parseData(scene, actions, catalog);

    setTimeout(() => {
      const exporter = new ColladaExporter();
      exporter.parse(planData.plan, ({ data }) => {
        let parsedFile = xml2js(data, { compact: true });
        parsedFile.COLLADA.asset['unit'] = {
          _attributes: { name: 'centimeter', meter: '0.01' }
        };
        let fixedData = js2xml(parsedFile, { compact: true, spaces: 4 });

        const fileBlob = new Blob([fixedData], {
          type: 'text/plain;charset=utf-8'
        });

        saveAs(fileBlob, 'planner.DAE');
      });
    }, 1000);
  };

  return (
    <ToolbarButton
      active={false}
      tooltip={translator.t('Export project')}
      onClick={saveProjectToFile}
    >
      <IconDownload />
    </ToolbarButton>
  );
}

ToolbarExportButton.propTypes = {
  state: PropTypes.object.isRequired
};

ToolbarExportButton.contextTypes = {
  translator: PropTypes.object.isRequired
};
