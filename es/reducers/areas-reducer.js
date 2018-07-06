import { Area } from '../class/export';
import { SELECT_AREA } from '../constants';

export default function (state, action) {
  switch (action.type) {
    case SELECT_AREA:
      return Area.select(state, action.layerID, action.areaID).updatedState;
    default:
      return state;
  }
}