import {WindowGeneric} from './holes/window-generic';
import {DoorGeneric} from './holes/door-generic';
import {AreaGeneric} from './areas/area-generic';
import {WallGeneric} from './lines/wall-generic';

export default {
  holes: {
    default: WindowGeneric,
    windowGeneric: WindowGeneric,
    doorGeneric: DoorGeneric
  },
  lines: {
    default: WallGeneric,
    wallGeneric: WallGeneric
  },
  areas: {
    default: AreaGeneric,
    areaGeneric: AreaGeneric
  }
}
