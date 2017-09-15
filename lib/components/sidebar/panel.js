'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Panel;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = { borderTop: '1px solid #222', borderBottom: '1px solid #48494E' };
var STYLE_TITLE = {
  fontSize: '11px',
  color: SharedStyle.PRIMARY_COLOR.text_alt,
  padding: '5px 15px 8px 15px',
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  textShadow: '-1px -1px 2px rgba(0, 0, 0, 1)',
  boxShadow: 'inset 0px -3px 19px 0px rgba(0,0,0,0.5)',
  margin: '0px'
};
var STYLE_CONTENT = {
  fontSize: '11px',
  color: SharedStyle.PRIMARY_COLOR.text_alt,
  border: '1px solid #222',
  padding: '0px',
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  textShadow: '-1px -1px 2px rgba(0, 0, 0, 1)'
};

function Panel(_ref) {
  var name = _ref.name,
      headComponents = _ref.headComponents,
      children = _ref.children;

  return _react2.default.createElement(
    'div',
    { style: STYLE },
    _react2.default.createElement(
      'h3',
      { style: STYLE_TITLE },
      name,
      headComponents
    ),
    _react2.default.createElement(
      'div',
      { style: STYLE_CONTENT },
      children
    )
  );
}