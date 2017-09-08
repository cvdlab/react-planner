'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaFactory = exports.WallFactory = undefined;

var _wallFactory = require('./wall-factory');

var _wallFactory2 = _interopRequireDefault(_wallFactory);

var _areaFactory = require('./area-factory');

var _areaFactory2 = _interopRequireDefault(_areaFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.WallFactory = _wallFactory2.default;
exports.AreaFactory = _areaFactory2.default;
exports.default = {
  WallFactory: _wallFactory2.default,
  AreaFactory: _areaFactory2.default
};