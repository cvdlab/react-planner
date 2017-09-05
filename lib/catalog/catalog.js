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

var _propertyHidden = require('./properties/property-hidden');

var _propertyHidden2 = _interopRequireDefault(_propertyHidden);

var _propertyReadOnly = require('./properties/property-read-only');

var _propertyReadOnly2 = _interopRequireDefault(_propertyReadOnly);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Catalog = function () {
  function Catalog() {
    var unit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.UNIT_CENTIMETER;

    _classCallCheck(this, Catalog);

    this.elements = {};
    this.categories = { root: { name: 'root', label: '/', elements: [], categories: [] } };
    this.propertyTypes = {};
    this.unit = unit;

    this.registerMultiplePropertyType([['color', _propertyColor2.default, _propertyColor2.default], ['enum', _propertyEnum2.default, _propertyEnum2.default], ['string', _propertyString2.default, _propertyString2.default], ['number', _propertyNumber2.default, _propertyNumber2.default], ['length-measure', _propertyLenghtMeasure2.default, _propertyLenghtMeasure2.default], ['toggle', _propertyToggle2.default, _propertyToggle2.default], ['checkbox', _propertyCheckbox2.default, _propertyCheckbox2.default], ['hidden', _propertyHidden2.default, _propertyHidden2.default], ['read-only', _propertyReadOnly2.default, _propertyReadOnly2.default]]);
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
    key: 'getCategory',
    value: function getCategory(categoryName) {
      if (this.hasCategory(categoryName)) {
        return this.categories[categoryName];
      }
      throw new Error('Category ' + categoryName + ' does not exist in catalog');
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
        this.categories.root.elements.push(this.elements[json.name]);
      }
    }
  }, {
    key: 'registerMultipleElements',
    value: function registerMultipleElements(elementArray) {
      var _this = this;

      elementArray.forEach(function (el) {
        return _this.registerElement(el);
      });
    }
  }, {
    key: 'registerPropertyType',
    value: function registerPropertyType(type, Viewer, Editor) {
      this.propertyTypes[type] = { type: type, Viewer: Viewer, Editor: Editor };
    }
  }, {
    key: 'registerMultiplePropertyType',
    value: function registerMultiplePropertyType(propertyTypeArray) {
      var _this2 = this;

      propertyTypeArray.forEach(function (el) {
        return _this2.registerPropertyType.apply(_this2, _toConsumableArray(el));
      });
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
  }, {
    key: 'registerCategory',
    value: function registerCategory(name, label, childs) {
      var _this3 = this;

      if (this.validateCategory(name, label)) {
        this.categories[name] = { name: name, label: label, categories: [], elements: [] };
        this.categories.root.categories.push(this.categories[name]);

        if (childs && childs.length) {
          childs.forEach(function (el) {
            return _this3.addToCategory(name, el);
          });
        }
      }
    }
  }, {
    key: 'addToCategory',
    value: function addToCategory(name, child) {
      if (this.hasElement(child.name)) {
        this.categories[name].elements.push(child);
        this.categories.root.elements.splice(this.categories.root.elements.indexOf(child), 1);
      } else if (this.hasCategory(child.name)) {
        this.categories[name].categories.push(child);
        this.categories.root.categories.splice(this.categories.root.categories.indexOf(child), 1);
      } else {
        throw new Error('child ' + child + ' is either category nor element');
      }
    }
  }, {
    key: 'categoryHasElement',
    value: function categoryHasElement(categoryName, elementName) {
      return this.hasCategory(categoryName) && this.categories[categoryName].elements.some(function (el) {
        return el.name === elementName;
      });
    }
  }, {
    key: 'validateCategory',
    value: function validateCategory(name, label) {
      if (!name) {
        throw new Error('Category has undefined name');
      }
      if (name === '') {
        throw new Error('Category has empty name');
      }
      if (this.hasCategory(name)) {
        throw new Error('Category has already been registered');
      }

      return true;
    }
  }, {
    key: 'hasCategory',
    value: function hasCategory(categoryName) {
      return this.categories.hasOwnProperty(categoryName);
    }
  }]);

  return Catalog;
}();

exports.default = Catalog;