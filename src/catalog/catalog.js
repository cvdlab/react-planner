import {Seq} from 'immutable';
import {Line, Area, Hole, Item} from '../models';

export default class Catalog {

  constructor(){
    this.elements = {};
    this.propertyTypes = {};
  }

  getElement(type) {

    if (this.hasElement(type)) {
      return this.elements[type];
    }

    throw new Error(`Element ${type} does not exist in catalog`);
  }

  registerElement(json) {
    json.properties = json.properties || {};
    if(this.validateElement(json)){
      this.elements[json.name] = json;
    }
  }

  registerPropertyType(propertyType, propertyViewer, propertyEditor){
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
    if (!json.hasOwnProperty('render2D')) throw new Error(`Element ${name} doesn't have render2D handler`);
    if (!json.hasOwnProperty('render3D')) throw new Error(`Element ${name} doesn't have render3D handler`);
    if (!json.hasOwnProperty('properties')) throw new Error(`Element ${name} doesn't have properties`);

    for(let propertyName in json.properties){
      let propertyConfigs = json.properties[propertyName];
      if (!propertyConfigs.hasOwnProperty('type')) throw new Error(`Element ${name}, Property ${propertyName} doesn't have type`);
      if (!propertyConfigs.hasOwnProperty('defaultValue')) throw new Error(`Element ${name}, Property ${propertyName} doesn't have defaultValue`);
    }

    return true;
  }

  createElement(type, options){
    let element = this.getElement(type);

    let properties = new Seq(element.properties)
      .map(value => value.defaultValue)
      .toMap();

    options = {...options, properties};

    switch (element.prototype) {
      case 'lines':
        return new Line(options);

      case 'holes':
        return new Hole(options);

      case 'areas':
        return new Area(options);

      case 'items':
        return new Item(options);

      default:
        throw new Error('prototype not valid');
    }
  }

  hasElement(type) {
    return this.elements.hasOwnProperty(type);
  }

}
