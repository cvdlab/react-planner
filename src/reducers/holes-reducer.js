import { Hole } from '../class/export';
import {
  SELECT_TOOL_DRAWING_HOLE,
  UPDATE_DRAWING_HOLE,
  END_DRAWING_HOLE,
  BEGIN_DRAGGING_HOLE,
  UPDATE_DRAGGING_HOLE,
  END_DRAGGING_HOLE,
  SELECT_HOLE,
} from '../constants';

export default function (state, action) {
  switch (action.type) {
    case SELECT_TOOL_DRAWING_HOLE:
      return Hole.selectToolDrawingHole(state, action.sceneComponentType).updatedState;

    case UPDATE_DRAWING_HOLE:
      return Hole.updateDrawingHole(state, action.layerID, action.x, action.y).updatedState;

    case END_DRAWING_HOLE:
      return Hole.endDrawingHole(state, action.layerID, action.x, action.y).updatedState;

    case BEGIN_DRAGGING_HOLE:
      return Hole.beginDraggingHole(state, action.layerID, action.holeID, action.x, action.y).updatedState;

    case UPDATE_DRAGGING_HOLE:
      return Hole.updateDraggingHole(state, action.x, action.y).updatedState;

    case END_DRAGGING_HOLE:
      return Hole.endDraggingHole(state, action.x, action.y).updatedState;

    case SELECT_HOLE:
      return Hole.select( state, action.layerID, action.holeID ).updatedState;

    default:
      return state;
  }
}
