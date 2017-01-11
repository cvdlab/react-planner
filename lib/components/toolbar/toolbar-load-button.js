'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToolbarLoadButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _folderOpenO = require('react-icons/lib/fa/folder-open-o');

var _folderOpenO2 = _interopRequireDefault(_folderOpenO);

var _toolbarButton = require('./toolbar-button');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _browser = require('../../utils/browser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ToolbarLoadButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var loadProjectFromFile = function loadProjectFromFile(event) {
    event.preventDefault();
    (0, _browser.browserUpload)().then(function (data) {
      projectActions.loadProject(JSON.parse(data));
    });
  };

  return _react2.default.createElement(
    _toolbarButton2.default,
    { active: false, tooltip: translator.t("Load project"), onClick: loadProjectFromFile },
    _react2.default.createElement(_folderOpenO2.default, null)
  );
}

ToolbarLoadButton.propTypes = {
  state: _react.PropTypes.object.isRequired
};

ToolbarLoadButton.contextTypes = {
  projectActions: _react.PropTypes.object.isRequired,
  translator: _react.PropTypes.object.isRequired
};