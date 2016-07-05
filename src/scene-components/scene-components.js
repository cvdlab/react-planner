import {WindowGeneric} from './holes/window-generic';
import {DoorGeneric} from './holes/door-generic';
import {AreaGeneric} from './areas/area-generic';
import {WallGeneric} from './lines/wall-generic';

export default {
  holes: {
    windowGeneric: WindowGeneric,
    doorGeneric: DoorGeneric
  },
  lines: {
    wallGeneric: WallGeneric
  },
  areas: {
    areaGeneric: AreaGeneric
  }
}
