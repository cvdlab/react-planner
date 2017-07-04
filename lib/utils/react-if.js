'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = If;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {null}
 */
function If(_ref) {
  var condition = _ref.condition,
      style = _ref.style,
      children = _ref.children;

  return condition ? Array.isArray(children) ? _react2.default.createElement(
    'div',
    { style: style },
    children
  ) : children : null;
}

If.propTypes = {
  condition: _propTypes2.default.bool.isRequired,
  style: _propTypes2.default.object
};