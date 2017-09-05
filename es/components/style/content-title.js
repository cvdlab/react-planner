var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

var STYLE = {
  color: SharedStyle.PRIMARY_COLOR.alt,
  fontWeight: 300
};

export default function ContentTitle(_ref) {
  var children = _ref.children,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      rest = _objectWithoutProperties(_ref, ['children', 'style']);

  return React.createElement(
    'h1',
    _extends({ style: _extends({}, STYLE, style) }, rest),
    children
  );
}

ContentTitle.propsType = {
  style: PropTypes.object
};