'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ButtonX;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _toolbarButton = require('../components/toolbar/toolbar-button.jsx');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _trash = require('react-icons/lib/fa/trash');

var _trash2 = _interopRequireDefault(_trash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ButtonX(_ref, _ref2) {
  var mode = _ref.mode;
  var editingActions = _ref2.editingActions;

  return _react2.default.createElement(
    _toolbarButton2.default,
    { active: ["MODE_3D_VIEW"].includes(mode), tooltip: '3D View', onClick: function onClick(event) {
        return editingActions.remove();
      } },
    _react2.default.createElement(_trash2.default, null)
  );
};

ButtonX.propTypes = {
  mode: _react.PropTypes.string.isRequired
};

ButtonX.contextTypes = {
  editingActions: _react.PropTypes.object
};