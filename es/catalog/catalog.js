var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import PropertyColor from './properties/property-color';
import PropertyEnum from './properties/property-enum';
import PropertyString from './properties/property-string';
import PropertyNumber from './properties/property-number';
import PropertyLengthMeasure from './properties/property-lenght-measure';
import PropertyToggle from './properties/property-toggle';
import PropertyCheckbox from './properties/property-checkbox';
import PropertyHidden from './properties/property-hidden';
import PropertyReadOnly from './properties/property-read-only';

import { UNIT_CENTIMETER } from '../constants';

var Catalog = function () {
  function Catalog() {
    var unit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : UNIT_CENTIMETER;

    _classCallCheck(this, Catalog);

    this.elements = {};
    this.categories = { root: { name: 'root', label: '/', elements: [], categories: [] } };
    this.propertyTypes = {};
    this.unit = unit;

    this.registerMultiplePropertyType([['color', PropertyColor, PropertyColor], ['enum', PropertyEnum, PropertyEnum], ['string', PropertyString, PropertyString], ['number', PropertyNumber, PropertyNumber], ['length-measure', PropertyLengthMeasure, PropertyLengthMeasure], ['toggle', PropertyToggle, PropertyToggle], ['checkbox', PropertyCheckbox, PropertyCheckbox], ['hidden', PropertyHidden, PropertyHidden], ['read-only', PropertyReadOnly, PropertyReadOnly]]);
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
    key: 'registerPropertyType',
    value: function registerPropertyType(propertyType, propertyViewer, propertyEditor) {
      this.propertyTypes[propertyType] = {
        type: propertyType,
        Viewer: propertyViewer,
        Editor: propertyEditor
      };
    }
  }, {
    key: 'registerMultiplePropertyType',
    value: function registerMultiplePropertyType(propertyTypeArray) {
      var _this = this;

      propertyTypeArray.forEach(function (el) {
        return _this.registerPropertyType.apply(_this, _toConsumableArray(el));
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
    value: function registerCategory(name, label) {
      if (this.validateCategory(name, label)) {
        this.categories[name] = { name: name, label: label, categories: [], elements: [] };
        this.categories.root.categories.push(this.categories[name]);
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
      var i = void 0;
      for (i = 0; i < this.categories[categoryName].elements.length; i++) {
        if (this.categories[categoryName].elements[i].name === elementName) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: 'validateCategory',
    value: function validateCategory(name, label) {
      if (name === "") {
        throw new Error('Category has empty name');
      } else if (this.categories[name]) {
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

export default Catalog;