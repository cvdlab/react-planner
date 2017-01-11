'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToolbarScreenshotButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cameraAlt = require('react-icons/lib/md/camera-alt');

var _cameraAlt2 = _interopRequireDefault(_cameraAlt);

var _toolbarButton = require('./toolbar-button');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _browser = require('../../utils/browser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ToolbarScreenshotButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var saveScreenshotToFile = function saveScreenshotToFile(event) {
    event.preventDefault();
    var canvas = document.getElementsByTagName('canvas')[0];
    (0, _browser.imageBrowserDownload)(canvas.toDataURL());
    projectActions.saveScreenshot();
  };

  return _react2.default.createElement(
    _toolbarButton2.default,
    { active: false, tooltip: translator.t("Get Screenshot"), onClick: saveScreenshotToFile },
    _react2.default.createElement(_cameraAlt2.default, null)
  );
}

ToolbarScreenshotButton.propTypes = {
  state: _react.PropTypes.object.isRequired
};

ToolbarScreenshotButton.contextTypes = {
  projectActions: _react.PropTypes.object.isRequired,
  translator: _react.PropTypes.object.isRequired
};