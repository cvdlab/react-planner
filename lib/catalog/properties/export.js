"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PropertyCheckbox", {
  enumerable: true,
  get: function get() {
    return _propertyCheckbox["default"];
  }
});
Object.defineProperty(exports, "PropertyColor", {
  enumerable: true,
  get: function get() {
    return _propertyColor["default"];
  }
});
Object.defineProperty(exports, "PropertyEnum", {
  enumerable: true,
  get: function get() {
    return _propertyEnum["default"];
  }
});
Object.defineProperty(exports, "PropertyHidden", {
  enumerable: true,
  get: function get() {
    return _propertyHidden["default"];
  }
});
Object.defineProperty(exports, "PropertyLengthMeasure", {
  enumerable: true,
  get: function get() {
    return _propertyLenghtMeasure["default"];
  }
});
Object.defineProperty(exports, "PropertyNumber", {
  enumerable: true,
  get: function get() {
    return _propertyNumber["default"];
  }
});
Object.defineProperty(exports, "PropertyReadOnly", {
  enumerable: true,
  get: function get() {
    return _propertyReadOnly["default"];
  }
});
Object.defineProperty(exports, "PropertyString", {
  enumerable: true,
  get: function get() {
    return _propertyString["default"];
  }
});
Object.defineProperty(exports, "PropertyToggle", {
  enumerable: true,
  get: function get() {
    return _propertyToggle["default"];
  }
});
exports["default"] = void 0;
var _propertyColor = _interopRequireDefault(require("./property-color"));
var _propertyEnum = _interopRequireDefault(require("./property-enum"));
var _propertyString = _interopRequireDefault(require("./property-string"));
var _propertyNumber = _interopRequireDefault(require("./property-number"));
var _propertyLenghtMeasure = _interopRequireDefault(require("./property-lenght-measure"));
var _propertyToggle = _interopRequireDefault(require("./property-toggle"));
var _propertyCheckbox = _interopRequireDefault(require("./property-checkbox"));
var _propertyHidden = _interopRequireDefault(require("./property-hidden"));
var _propertyReadOnly = _interopRequireDefault(require("./property-read-only"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  PropertyColor: _propertyColor["default"],
  PropertyEnum: _propertyEnum["default"],
  PropertyString: _propertyString["default"],
  PropertyNumber: _propertyNumber["default"],
  PropertyLengthMeasure: _propertyLenghtMeasure["default"],
  PropertyToggle: _propertyToggle["default"],
  PropertyCheckbox: _propertyCheckbox["default"],
  PropertyHidden: _propertyHidden["default"],
  PropertyReadOnly: _propertyReadOnly["default"]
};
exports["default"] = _default;