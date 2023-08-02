import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaSave as IconSave } from 'react-icons/fa';
import ReactPlannerContext from '../../utils/react-planner-context';
import ToolbarButton from './toolbar-button';
import { browserDownload } from '../../utils/browser';
import { Project } from '../../class/export';
import { OBJExporter } from './OBJExporter';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import './rc-dropdown.css';
import { parseData } from '../viewer3d/scene-creator';
import * as Three from 'three';
export default function ToolbarSaveButton(_ref) {
  var state = _ref.state;
  var context = useContext(ReactPlannerContext);
  var translator = context.translator,
    catalog = context.catalog;
  var saveProjectToJSONFile = function saveProjectToJSONFile() {
    state = Project.unselectAll(state).updatedState;
    browserDownload(JSON.stringify(state.get('scene').toJS()), "json");
  };
  var saveProjectToObjFile = function saveProjectToObjFile() {
    var objExporter = new OBJExporter();
    state = Project.unselectAll(state).updatedState;
    var actions = {
      areaActions: context.areaActions,
      holesActions: context.holesActions,
      itemsActions: context.itemsActions,
      linesActions: context.linesActions,
      projectActions: context.projectActions
    };
    var scene = state.get('scene');
    var planData = parseData(scene, actions, catalog);
    setTimeout(function () {
      var plan = planData.plan;
      plan.position.set(plan.position.x, 0.1, plan.position.z);
      var scene3D = new Three.Scene();
      scene3D.add(planData.plan);
      browserDownload(objExporter.parse(scene3D), "obj");
    });
  };
  var menu = /*#__PURE__*/React.createElement(Menu, {
    style: {
      width: 140
    }
  }, /*#__PURE__*/React.createElement(MenuItem, {
    key: "1",
    onClick: saveProjectToJSONFile
  }, "JSON"), /*#__PURE__*/React.createElement(MenuItem, {
    key: "2",
    onClick: saveProjectToObjFile
  }, "OBJ"));
  return /*#__PURE__*/React.createElement(Dropdown, {
    trigger: ['click'],
    overlay: menu,
    animation: "slide-up",
    placement: "topLeft"
  }, /*#__PURE__*/React.createElement(ToolbarButton, {
    active: false,
    tooltip: translator.t('Save project')
  }, /*#__PURE__*/React.createElement(IconSave, null)));
}
ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired
};