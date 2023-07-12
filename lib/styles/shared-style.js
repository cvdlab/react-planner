"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SECONDARY_COLOR = exports.PRIMARY_COLOR = exports.MESH_SELECTED = exports.MATERIAL_COLORS = exports.LINE_MESH_COLOR = exports.COLORS = exports.AREA_MESH_COLOR = void 0;
// COLORS
var COLORS = {
  white: '#FFF',
  black: '#000'
};
exports.COLORS = COLORS;
var MATERIAL_COLORS = {
  500: {
    amber: '#FFC107',
    blue_grey: '#607D8B',
    blue: '#2196F3',
    brown: '#795548',
    cyan: '#00BCD4',
    deep_orange: '#FF5722',
    deep_purple: '#673AB7',
    green: '#4CAF50',
    grey: '#9E9E9E',
    indigo: '#3F51B5',
    light_blue: '#03A9F4',
    light_green: '#8BC34A',
    lime: '#CDDC39',
    orange: '#FF9800',
    pink: '#E91E63',
    purple: '#9C27B0',
    red: '#F44336',
    teal: '#009688',
    yellow: '#FFEB3B'
  }
};
exports.MATERIAL_COLORS = MATERIAL_COLORS;
var PRIMARY_COLOR = {
  main: '#28292D',
  alt: '#2E2F33',
  icon: '#C2C2C2',
  border: '1px solid #555',
  text_main: COLORS.white,
  text_alt: '#EBEBEB',
  input: '#55595C'
};
exports.PRIMARY_COLOR = PRIMARY_COLOR;
var SECONDARY_COLOR = {
  main: '#1CA6FC',
  alt: '#005FAF',
  icon: '#1CA6FC',
  border: '1px solid #FFF'
};
exports.SECONDARY_COLOR = SECONDARY_COLOR;
var MESH_SELECTED = '#99C3FB';
exports.MESH_SELECTED = MESH_SELECTED;
var AREA_MESH_COLOR = {
  selected: MESH_SELECTED,
  unselected: '#F5F4F4'
};
exports.AREA_MESH_COLOR = AREA_MESH_COLOR;
var LINE_MESH_COLOR = {
  selected: MESH_SELECTED,
  unselected: '#8E9BA2'
};
exports.LINE_MESH_COLOR = LINE_MESH_COLOR;