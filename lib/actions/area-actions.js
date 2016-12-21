'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectArea = selectArea;

var _constants = require('../constants');

function selectArea(layerID, areaID) {
  return {
    type: _constants.SELECT_AREA,
    layerID: layerID,
    areaID: areaID
  };
}