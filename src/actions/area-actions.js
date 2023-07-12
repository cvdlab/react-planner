import {SELECT_AREA} from '../utils/constants';

export function selectArea(layerID, areaID) {
  return {
    type: SELECT_AREA,
    layerID,
    areaID
  }
}
