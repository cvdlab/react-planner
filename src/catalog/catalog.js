import {WindowGeneric} from './holes/window-generic';
import {DoorGeneric} from './holes/door-generic';
import {AreaGeneric} from './areas/area-generic';
import {WallGeneric} from './lines/wall-generic';

export default {
  //holes
  defaultHole: WindowGeneric,
  windowGeneric: WindowGeneric,
  doorGeneric: DoorGeneric,

  //lines
  defaultLine: WallGeneric,
  wallGeneric: WallGeneric,

  //area
  defaultArea: AreaGeneric,
  areaGeneric: AreaGeneric

}
