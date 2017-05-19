import React from 'react';
import PropTypes from 'prop-types';
import IconSave from 'react-icons/lib/fa/floppy-o';
import ToolbarButton from './toolbar-button';
import { browserDownload } from '../../utils/browser';
import { unselectAll } from '../../utils/layer-operations';

export default function ToolbarSaveButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var saveProjectToFile = function saveProjectToFile(event) {
    event.preventDefault();
    var scene = state.get('scene').update('layers', function (layers) {
      return layers.map(function (layer) {
        return unselectAll(layer);
      });
    }).toJS();

    browserDownload(scene);
  };

  return React.createElement(
    ToolbarButton,
    { active: false, tooltip: translator.t("Save project"), onClick: saveProjectToFile },
    React.createElement(IconSave, null)
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired
};

ToolbarSaveButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};