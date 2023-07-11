"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _export = require("../class/export");
var _constants = require("../constants");
function _default(state, action) {
  switch (action.type) {
    case _constants.SELECT_AREA:
      return _export.Area.select(state, action.layerID, action.areaID).updatedState;
    default:
      return state;
  }
}