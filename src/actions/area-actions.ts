import { SELECT_AREA } from "../constants";

export function selectArea(layerID: string, areaID: string) {
  return {
    type: SELECT_AREA,
    layerID,
    areaID,
  };
}
