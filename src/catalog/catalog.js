import PropertyColor from './properties/property-color';
import PropertyEnum from './properties/property-enum';
import PropertyString from './properties/property-string';
import PropertyNumber from './properties/property-number';
import PropertyLengthMeasure from './properties/property-lenght-measure';
import {UNIT_CENTIMETER} from '../constants';

export default class Catalog {

  constructor(unit = UNIT_CENTIMETER) {
    this.elements = {};
    this.propertyTypes = {};
    this.unit = unit;

    this.registerPropertyType('color', PropertyColor, PropertyColor);
    this.registerPropertyType('enum', PropertyEnum, PropertyEnum);
    this.registerPropertyType('string', PropertyString, PropertyString);
    this.registerPropertyType('number', PropertyNumber, PropertyNumber);
    this.registerPropertyType('length-measure', PropertyLengthMeasure, PropertyLengthMeasure);
  }

  getElement(type) {
    if (this.hasElement(type)) {
      return this.elements[type];
    }
    throw new Error(`Element ${type} does not exist in catalog`);
  }

  getPropertyType(type) {
    if (this.propertyTypes.hasOwnProperty(type)) {
      return this.propertyTypes[type];
    }
    throw new Error(`Element ${type} does not exist in catalog`);
  }

  registerElement(json) {
    json.properties = json.properties || {};
    if (this.validateElement(json)) {
      this.elements[json.name] = json;
    }
  }

  registerPropertyType(propertyType, propertyViewer, propertyEditor) {
    this.propertyTypes[propertyType] = {
      type: propertyType,
      Viewer: propertyViewer,
      Editor: propertyEditor
    }
  }

  validateElement(json) {
    if (!json.hasOwnProperty('name')) throw new Error(`Element not valid`);

    let name = json.name;
    if (!json.hasOwnProperty('prototype')) throw new Error(`Element ${name} doesn't have prototype`);

    if (!json.hasOwnProperty('info')) throw new Error(`Element ${name} doesn't have info`);
    if (!json.info.hasOwnProperty('tag')) throw new Error(`Element ${name} doesn't have tag`);
    if (!json.info.hasOwnProperty('group')) throw new Error(`Element ${name} doesn't have group`);
    if (!json.info.hasOwnProperty('description')) throw new Error(`Element ${name} doesn't have description`);
    if (!json.info.hasOwnProperty('image')) throw new Error(`Element ${name} doesn't have image`);

    if (!json.hasOwnProperty('render2D')) throw new Error(`Element ${name} doesn't have render2D handler`);
    if (!json.hasOwnProperty('render3D')) throw new Error(`Element ${name} doesn't have render3D handler`);
    if (!json.hasOwnProperty('properties')) throw new Error(`Element ${name} doesn't have properties`);

    for (let propertyName in json.properties) {
      let propertyConfigs = json.properties[propertyName];
      if (!propertyConfigs.hasOwnProperty('type')) throw new Error(`Element ${name}, Property ${propertyName} doesn't have type`);
      if (!propertyConfigs.hasOwnProperty('defaultValue')) throw new Error(`Element ${name}, Property ${propertyName} doesn't have defaultValue`);
    }

    return true;
  }

  hasElement(type) {
    return this.elements.hasOwnProperty(type);
  }

}
