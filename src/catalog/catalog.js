import {Seq} from 'immutable';
import {Line, Area, Hole, Item} from '../models';

export default class Catalog {

  constructor(){
    this.elements = {};
  }

  getElement(type) {

    if (this.hasElement(type)) {
      return this.elements[type];
    }

    throw new Error(`Element ${type} does not exist in catalog`);
  }

  registerElement(json) {
    if(this.validateElement(json)){
      this.elements[json.name] = json;
    }
  }

  validateElement(json) {
    if (!json.hasOwnProperty('name')) throw new Error(`Element not valid`);

    let name = json.name;
    if (!json.hasOwnProperty('prototype')) throw new Error(`Element ${name} doesn't have prototype`);
    if (!json.hasOwnProperty('info')) throw new Error(`Element ${name} doesn't have info`);
    if (!json.hasOwnProperty('render2D')) throw new Error(`Element ${name} doesn't have render2D handler`);
    if (!json.hasOwnProperty('render3D')) throw new Error(`Element ${name} doesn't have render3D handler`);
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
