"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TabsStyle = void 0;
// import * as TabsStyle from './tabs.css';

var TabsStyle = {
  tabList: {
    borderBottom: '1px solid #aaa',
    margin: '0 0 10px',
    padding: '0'
  },
  tab: {
    display: 'inline-block',
    border: '1px solid transparent',
    borderBottom: 'none',
    bottom: '-1px',
    position: 'relative',
    listStyle: 'none',
    padding: '6px 12px',
    cursor: 'pointer'
  },
  selectedTab: {
    borderColor: '#aaa',
    color: '#1CA6FC',
    outline: 'none'
  },
  tabPanel: {
    display: 'none'
  },
  selectedTabPanel: {
    display: 'block'
  }
};
exports.TabsStyle = TabsStyle;
var _default = {
  TabsStyle: TabsStyle
};
exports["default"] = _default;