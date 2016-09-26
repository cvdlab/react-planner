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

  getElement(type) {

    if (this.hasElement(type)) {
      return elements[type];
    }

    throw new Error(`Element ${type} does not exist in catalog`);
  }

  hasElement(type) {
    return elements.hasOwnProperty(type);
  }

}
