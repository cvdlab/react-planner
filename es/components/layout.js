var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import Toolbar from './toolbar/toolbar';
import Content from './content';
import Sidebar from './sidebar/sidebar';
import FooterBar from './footerbar/footerbar';

export default function (_ref) {
  var width = _ref.width,
      height = _ref.height,
      rest = _objectWithoutProperties(_ref, ['width', 'height']);

  var toolbarWidth = 50;
  var sidebarWidth = 300;
  var contentWidth = width - toolbarWidth - sidebarWidth;

  var footerBarHeight = 20;
  var toolbarHeight = height - footerBarHeight;
  var contentHeight = height - footerBarHeight;
  var sidebarHeight = height - footerBarHeight;

  return React.createElement(
    'div',
    { style: { display: "flex", flexFlow: "row nowrap", height: height } },
    React.createElement(Toolbar, _extends({ width: toolbarWidth, height: toolbarHeight }, rest)),
    React.createElement(Content, _extends({ width: contentWidth, height: contentHeight }, rest, { onWheel: function onWheel(event) {
        return event.preventDefault();
      } })),
    React.createElement(Sidebar, _extends({ width: sidebarWidth, height: sidebarHeight }, rest)),
    React.createElement(FooterBar, _extends({ width: width, height: footerBarHeight }, rest))
  );
}