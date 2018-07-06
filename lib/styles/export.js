'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsStyle = undefined;

var _tabs = require('./tabs.css');

var TabsStyle = _interopRequireWildcard(_tabs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.TabsStyle = TabsStyle;
exports.default = {
  TabsStyle: TabsStyle
};