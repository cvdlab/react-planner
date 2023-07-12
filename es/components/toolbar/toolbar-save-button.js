import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaSave as IconSave } from 'react-icons/fa';
import ReactPlannerContext from '../../utils/react-planner-context';
import ToolbarButton from './toolbar-button';
import { browserDownload } from '../../utils/browser';
import { Project } from '../../class/export';
export default function ToolbarSaveButton(_ref) {
  var state = _ref.state;
  var _useContext = useContext(ReactPlannerContext),
    translator = _useContext.translator;
  var saveProjectToFile = function saveProjectToFile(e) {
    e.preventDefault();
    state = Project.unselectAll(state).updatedState;
    browserDownload(state.get('scene').toJS());
  };
  return /*#__PURE__*/React.createElement(ToolbarButton, {
    active: false,
    tooltip: translator.t('Save project'),
    onClick: saveProjectToFile
  }, /*#__PURE__*/React.createElement(IconSave, null));
}
ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired
};