var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import { MdArrowBack as Arrow } from 'react-icons/md';
import * as SharedStyle from '../../shared-style';

var breadcrumbStyle = {
  margin: '1.5em',
  display: 'flex'
};

var breadcrumbTextStyle = {
  fontSize: '20px',
  cursor: 'pointer'
};

var breadcrumbLastTextStyle = _extends({}, breadcrumbTextStyle, {
  fontWeight: 'bolder',
  color: SharedStyle.SECONDARY_COLOR.main
});

var breadcrumbTabStyle = {
  fill: SharedStyle.COLORS.black,
  fontSize: '24px',
  marginLeft: '10px',
  marginRight: '10px'
};

var CatalogBreadcrumb = function CatalogBreadcrumb(_ref) {
  var names = _ref.names;


  var labelNames = names.map(function (name, ind) {

    var lastElement = ind === names.length - 1;

    return React.createElement(
      'div',
      { key: ind, style: { display: 'flex' } },
      React.createElement(
        'div',
        { style: !lastElement ? breadcrumbTextStyle : breadcrumbLastTextStyle, onClick: name.action || null },
        name.name
      ),
      !lastElement ? React.createElement(Arrow, { style: breadcrumbTabStyle }) : null
    );
  });

  return React.createElement(
    'div',
    { style: breadcrumbStyle },
    labelNames
  );
};

CatalogBreadcrumb.propTypes = {
  names: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CatalogBreadcrumb;