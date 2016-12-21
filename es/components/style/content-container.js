var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { PropTypes } from 'react';

var STYLE = {
  padding: "0 20px",
  overflowY: "scroll"
};

export default function ContentContainer(_ref) {
  var children = _ref.children,
      width = _ref.width,
      height = _ref.height;

  return React.createElement(
    "div",
    { style: _extends({ width: width, height: height }, STYLE), onWheel: function onWheel(event) {
        return event.stopPropagation();
      } },
    children
  );
}

ContentContainer.propsType = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};