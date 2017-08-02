'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _keyboardArrowRight = require('react-icons/lib/md/keyboard-arrow-right');

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CatalogBreadcrumb = function CatalogBreadcrumb(_ref) {
  var names = _ref.names;

  var labelNames = [];
  for (var i = 0; i < names.length - 1; i++) {

    var _cursor = 'default';
    if (names[i].hasOwnProperty('action')) {
      _cursor = 'pointer';
    }

    labelNames.push(_react2.default.createElement(
      'div',
      { key: i, style: { display: 'flex' } },
      _react2.default.createElement(
        'div',
        { style: { fontSize: '20px', cursor: _cursor },
          onClick: names[i].action },
        names[i].name
      ),
      _react2.default.createElement(
        'div',
        { style: { marginLeft: '10px', marginRight: '10px' } },
        _react2.default.createElement(_keyboardArrowRight2.default, { style: { fill: '#000', fontSize: 24 } })
      )
    ));
  }

  var cursor = 'default';
  if (names[names.length - 1].hasOwnProperty('action')) {
    cursor = 'pointer';
  }

  labelNames.push(_react2.default.createElement(
    'div',
    { key: names.length - 1, style: { display: 'flex' } },
    _react2.default.createElement(
      'div',
      { style: { fontSize: '20px', cursor: cursor },
        onClick: names[names.length - 1].action },
      _react2.default.createElement(
        'b',
        null,
        names[names.length - 1].name
      )
    )
  ));

  return _react2.default.createElement(
    'div',
    { style: { margin: '50px', display: 'flex' } },
    labelNames
  );
};

CatalogBreadcrumb.propTypes = {
  names: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired
};

exports.default = CatalogBreadcrumb;