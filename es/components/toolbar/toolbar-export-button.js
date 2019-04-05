import React from 'react';
import PropTypes from 'prop-types';
import { FaFileDownload as IconDownload } from 'react-icons/fa';
import { ColladaExporter } from 'three/examples/jsm/exporters/ColladaExporter';
import { xml2js, js2xml } from 'xml-js';

import { saveAs } from 'file-saver';
import ToolbarButton from './toolbar-button';
import { Project } from '../../class/export';
import { parseData } from '../viewer3d/scene-creator';

export default function ToolbarExportButton(_ref, _ref2) {
  var state = _ref.state,
      context = _ref.context,
      catalog = _ref.catalog;
  var translator = _ref2.translator;

  var saveProjectToFile = function saveProjectToFile(e) {
    e.preventDefault();
    state = Project.unselectAll(state).updatedState;
    var actions = {
      areaActions: context.areaActions,
      holesActions: context.holesActions,
      itemsActions: context.itemsActions,
      linesActions: context.linesActions,
      projectActions: context.projectActions
    };

    var scene = state.get('scene');
    // LOAD DATA
    var planData = parseData(scene, actions, catalog);

    setTimeout(function () {
      var exporter = new ColladaExporter();
      exporter.parse(planData.plan, function (_ref3) {
        var data = _ref3.data;

        var parsedFile = xml2js(data, { compact: true });
        parsedFile.COLLADA.asset['unit'] = {
          _attributes: { name: 'centimeter', meter: '0.01' }
        };
        var fixedData = js2xml(parsedFile, { compact: true, spaces: 4 });

        var fileBlob = new Blob([fixedData], {
          type: 'text/plain;charset=utf-8'
        });

        saveAs(fileBlob, 'planner.DAE');
      });
    }, 1000);
  };

  return React.createElement(
    ToolbarButton,
    {
      active: false,
      tooltip: translator.t('Export project'),
      onClick: saveProjectToFile
    },
    React.createElement(IconDownload, null)
  );
}

ToolbarExportButton.propTypes = {
  state: PropTypes.object.isRequired
};

ToolbarExportButton.contextTypes = {
  translator: PropTypes.object.isRequired
};