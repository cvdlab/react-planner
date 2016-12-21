'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectTool3DView = selectTool3DView;
exports.selectTool3DFirstPerson = selectTool3DFirstPerson;

var _constants = require('../constants');

function selectTool3DView() {
  return {
    type: _constants.SELECT_TOOL_3D_VIEW
  };
}

function selectTool3DFirstPerson() {
  return {
    type: _constants.SELECT_TOOL_3D_FIRST_PERSON
  };
}