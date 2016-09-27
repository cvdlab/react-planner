import {WindowGeneric} from './holes/window-generic';
import {DoorGeneric} from './holes/door-generic';
import {AreaGeneric} from './areas/area-generic';
import {WallGeneric} from './lines/wall-generic';
import {ItemGeneric} from './items/item-generic';

const elements = {
  //holes
  defaultHole: WindowGeneric,
  windowGeneric: WindowGeneric,
  doorGeneric: DoorGeneric,

  //lines
  defaultLine: WallGeneric,
  wallGeneric: WallGeneric,

  //area
  defaultArea: AreaGeneric,
  areaGeneric: AreaGeneric,

  //items
  itemGeneric: ItemGeneric
};

export default class Catalog {

  constructor(){
    this.elements = {};
  }

  getElement(type) {

    if (this.hasElement(type)) {
      return elements[type];
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

  hasElement(type) {
    return this.elements.hasOwnProperty(type);
  }

}
