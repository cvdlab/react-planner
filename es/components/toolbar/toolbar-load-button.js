import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaFolderOpen as IconLoad } from 'react-icons/fa';
import ReactPlannerContext from '../../utils/react-planner-context';
import ToolbarButton from './toolbar-button';
import { browserUpload } from '../../utils/browser';
export default function ToolbarLoadButton(_ref) {
  var state = _ref.state;
  var _useContext = useContext(ReactPlannerContext),
    projectActions = _useContext.projectActions,
    translator = _useContext.translator;
  var loadProjectFromFile = function loadProjectFromFile(event) {
    event.preventDefault();
    browserUpload().then(function (data) {
      projectActions.loadProject(JSON.parse(data));
    });
  };
  return /*#__PURE__*/React.createElement(ToolbarButton, {
    active: false,
    tooltip: translator.t("Load project"),
    onClick: loadProjectFromFile
  }, /*#__PURE__*/React.createElement(IconLoad, null));
}
ToolbarLoadButton.propTypes = {
  state: PropTypes.object.isRequired
};