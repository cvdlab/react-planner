var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    this.propertyTypes = {};
    this.unit = unit;

    this.registerPropertyType('color', PropertyColor, PropertyColor);
    this.registerPropertyType('enum', PropertyEnum, PropertyEnum);
    this.registerPropertyType('string', PropertyString, PropertyString);
    this.registerPropertyType('number', PropertyNumber, PropertyNumber);
    this.registerPropertyType('length-measure', PropertyLengthMeasure, PropertyLengthMeasure);
    this.registerPropertyType('toggle', PropertyToggle, PropertyToggle);
    this.registerPropertyType('checkbox', PropertyCheckbox, PropertyCheckbox);
    this.registerPropertyType('hidden', PropertyHidden, PropertyHidden);
    this.registerPropertyType('read-only', PropertyReadOnly, PropertyReadOnly);
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

export default Catalog;