"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ImageEditor;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE_BUTTON_UPLOAD = {
  border: "5px",
  backgroundColor: "#28292d",
  margin: "0 auto",
  display: "block",
  fontSize: "20px",
  color: "#fff",
  borderRadius: "0px",
  marginTop: "100px",
  padding: "10px 25px",
  cursor: "pointer"
};

function ImageEditor(_ref, _ref2) {
  var scene = _ref.scene;
  var width = _ref.width;
  var height = _ref.height;
  var imagesActions = _ref2.imagesActions;

  return _react2.default.createElement(
    "div",
    { style: { width: width, height: height } },
    _react2.default.createElement(
      "button",
      { onClick: function onClick(event) {
          return imagesActions.beginUploadingImage();
        }, style: STYLE_BUTTON_UPLOAD },
      "Upload image"
    )
  );
}

ImageEditor.propTypes = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  scene: _react.PropTypes.object.isRequired
};

ImageEditor.contextTypes = {
  imagesActions: _react.PropTypes.object.isRequired
};