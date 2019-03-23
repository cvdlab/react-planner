'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToolbarSaveButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fa = require('react-icons/fa');

var _toolbarButton = require('./toolbar-button');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _browser = require('../../utils/browser');

var _export = require('../../class/export');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ToolbarSaveButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator;


  var saveProjectToFile = function saveProjectToFile(e) {
    e.preventDefault();
    state = _export.Project.unselectAll(state).updatedState;
    (0, _browser.browserDownload)(state.get('scene').toJS());
  };

  return _react2.default.createElement(
    _toolbarButton2.default,
    { active: false, tooltip: translator.t('Save project'), onClick: saveProjectToFile },
    _react2.default.createElement(_fa.FaSave, null)
  );
}

ToolbarSaveButton.propTypes = {
  state: _propTypes2.default.object.isRequired
};

ToolbarSaveButton.contextTypes = {
  translator: _propTypes2.default.object.isRequired
};