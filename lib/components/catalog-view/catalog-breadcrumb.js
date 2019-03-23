'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _md = require('react-icons/md');

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    return _react2.default.createElement(
      'div',
      { key: ind, style: { display: 'flex' } },
      _react2.default.createElement(
        'div',
        { style: !lastElement ? breadcrumbTextStyle : breadcrumbLastTextStyle, onClick: name.action || null },
        name.name
      ),
      !lastElement ? _react2.default.createElement(_md.MdArrowBack, { style: breadcrumbTabStyle }) : null
    );
  });

  return _react2.default.createElement(
    'div',
    { style: breadcrumbStyle },
    labelNames
  );
};

CatalogBreadcrumb.propTypes = {
  names: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired
};

exports.default = CatalogBreadcrumb;