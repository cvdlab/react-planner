'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propertyColor = require('./properties/property-color');

var _propertyColor2 = _interopRequireDefault(_propertyColor);

var _propertyEnum = require('./properties/property-enum');

var _propertyEnum2 = _interopRequireDefault(_propertyEnum);

var _propertyString = require('./properties/property-string');

var _propertyString2 = _interopRequireDefault(_propertyString);

var _propertyNumber = require('./properties/property-number');

var _propertyNumber2 = _interopRequireDefault(_propertyNumber);

var _propertyLenghtMeasure = require('./properties/property-lenght-measure');

var _propertyLenghtMeasure2 = _interopRequireDefault(_propertyLenghtMeasure);

var _propertyToggle = require('./properties/property-toggle');

var _propertyToggle2 = _interopRequireDefault(_propertyToggle);

var _propertyCheckbox = require('./properties/property-checkbox');

var _propertyCheckbox2 = _interopRequireDefault(_propertyCheckbox);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Catalog = function () {
  function Catalog() {
    var unit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.UNIT_CENTIMETER;

    _classCallCheck(this, Catalog);

    this.elements = {};
    this.propertyTypes = {};
    this.unit = unit;

    this.registerPropertyType('color', _propertyColor2.default, _propertyColor2.default);
    this.registerPropertyType('enum', _propertyEnum2.default, _propertyEnum2.default);
    this.registerPropertyType('string', _propertyString2.default, _propertyString2.default);
    this.registerPropertyType('number', _propertyNumber2.default, _propertyNumber2.default);
    this.registerPropertyType('length-measure', _propertyLenghtMeasure2.default, _propertyLenghtMeasure2.default);
    this.registerPropertyType('toggle', _propertyToggle2.default, _propertyToggle2.default);
    this.registerPropertyType('checkbox', _propertyCheckbox2.default, _propertyCheckbox2.default);
  }

  _createClass(Catalog, [{
    key: 'getElement',
    value: function getElement(type) {
      if (this.hasElement(type)) {
        return this.elements[type];
      }
      throw new Error('Element ' + type + ' does not exist in catalog');
    }
  }, {
    key: 'getPropertyType',
    value: function getPropertyType(type) {
      if (this.propertyTypes.hasOwnProperty(type)) {
        return this.propertyTypes[type];
      }
      throw new Error('Element ' + type + ' does not exist in catalog');
    }
  }, {
    key: 'registerElement',
    value: function registerElement(json) {
      json.properties = json.properties || {};
      if (this.validateElement(json)) {
        this.elements[json.name] = json;
      }
    }
  }, {
    key: 'registerPropertyType',
    value: function registerPropertyType(propertyType, propertyViewer, propertyEditor) {
      this.propertyTypes[propertyType] = {
        type: propertyType,
        Viewer: propertyViewer,
        Editor: propertyEditor
      };
    }
  }, {
    key: 'validateElement',
    value: function validateElement(json) {
      if (!json.hasOwnProperty('name')) throw new Error('Element not valid');

      var name = json.name;
      if (!json.hasOwnProperty('prototype')) throw new Error('Element ' + name + ' doesn\'t have prototype');

      if (!json.hasOwnProperty('info')) throw new Error('Element ' + name + ' doesn\'t have info');
      if (!json.info.hasOwnProperty('tag')) throw new Error('Element ' + name + ' doesn\'t have tag');
      if (!json.info.hasOwnProperty('group')) throw new Error('Element ' + name + ' doesn\'t have group');
      if (!json.info.hasOwnProperty('description')) throw new Error('Element ' + name + ' doesn\'t have description');
      if (!json.info.hasOwnProperty('image')) throw new Error('Element ' + name + ' doesn\'t have image');

      if (!json.hasOwnProperty('render2D')) throw new Error('Element ' + name + ' doesn\'t have render2D handler');
      if (!json.hasOwnProperty('render3D')) throw new Error('Element ' + name + ' doesn\'t have render3D handler');
      if (!json.hasOwnProperty('properties')) throw new Error('Element ' + name + ' doesn\'t have properties');

      for (var propertyName in json.properties) {
        var propertyConfigs = json.properties[propertyName];
        if (!propertyConfigs.hasOwnProperty('type')) throw new Error('Element ' + name + ', Property ' + propertyName + ' doesn\'t have type');
        if (!propertyConfigs.hasOwnProperty('defaultValue')) throw new Error('Element ' + name + ', Property ' + propertyName + ' doesn\'t have defaultValue');
      }

      return true;
    }
  }, {
    key: 'hasElement',
    value: function hasElement(type) {
      return this.elements.hasOwnProperty(type);
    }
  }]);

  return Catalog;
}();

exports.default = Catalog;