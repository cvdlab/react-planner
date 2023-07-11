"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _button["default"];
  }
});
Object.defineProperty(exports, "CancelButton", {
  enumerable: true,
  get: function get() {
    return _cancelButton["default"];
  }
});
Object.defineProperty(exports, "ContentContainer", {
  enumerable: true,
  get: function get() {
    return _contentContainer["default"];
  }
});
Object.defineProperty(exports, "ContentTitle", {
  enumerable: true,
  get: function get() {
    return _contentTitle["default"];
  }
});
Object.defineProperty(exports, "DeleteButton", {
  enumerable: true,
  get: function get() {
    return _deleteButton["default"];
  }
});
Object.defineProperty(exports, "FormBlock", {
  enumerable: true,
  get: function get() {
    return _formBlock["default"];
  }
});
Object.defineProperty(exports, "FormColorInput", {
  enumerable: true,
  get: function get() {
    return _formColorInput["default"];
  }
});
Object.defineProperty(exports, "FormLabel", {
  enumerable: true,
  get: function get() {
    return _formLabel["default"];
  }
});
Object.defineProperty(exports, "FormNumberInput", {
  enumerable: true,
  get: function get() {
    return _formNumberInput["default"];
  }
});
Object.defineProperty(exports, "FormSelect", {
  enumerable: true,
  get: function get() {
    return _formSelect["default"];
  }
});
Object.defineProperty(exports, "FormSubmitButton", {
  enumerable: true,
  get: function get() {
    return _formSubmitButton["default"];
  }
});
Object.defineProperty(exports, "FormTextInput", {
  enumerable: true,
  get: function get() {
    return _formTextInput["default"];
  }
});
exports["default"] = void 0;
var _button = _interopRequireDefault(require("./button"));
var _cancelButton = _interopRequireDefault(require("./cancel-button"));
var _contentContainer = _interopRequireDefault(require("./content-container"));
var _contentTitle = _interopRequireDefault(require("./content-title"));
var _deleteButton = _interopRequireDefault(require("./delete-button"));
var _formBlock = _interopRequireDefault(require("./form-block"));
var _formColorInput = _interopRequireDefault(require("./form-color-input"));
var _formLabel = _interopRequireDefault(require("./form-label"));
var _formNumberInput = _interopRequireDefault(require("./form-number-input"));
var _formSelect = _interopRequireDefault(require("./form-select"));
var _formSlider = _interopRequireDefault(require("./form-slider"));
var _formSubmitButton = _interopRequireDefault(require("./form-submit-button"));
var _formTextInput = _interopRequireDefault(require("./form-text-input"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  Button: _button["default"],
  CancelButton: _cancelButton["default"],
  ContentContainer: _contentContainer["default"],
  ContentTitle: _contentTitle["default"],
  DeleteButton: _deleteButton["default"],
  FormBlock: _formBlock["default"],
  FormColorInput: _formColorInput["default"],
  FormLabel: _formLabel["default"],
  FormNumberInput: _formNumberInput["default"],
  FormSelect: _formSelect["default"],
  // FormSlider,
  FormSubmitButton: _formSubmitButton["default"],
  FormTextInput: _formTextInput["default"]
};
exports["default"] = _default;