'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = If;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {null}
 */
function If(_ref) {
  var condition = _ref.condition,
      children = _ref.children;

  return condition ? children : null;
}

If.propTypes = {
  condition: _react.PropTypes.bool.isRequired
};