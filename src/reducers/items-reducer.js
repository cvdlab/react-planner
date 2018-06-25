import { Item } from '../class/export';
import { history } from '../utils/export';
import {
  SELECT_TOOL_DRAWING_ITEM,
  UPDATE_DRAWING_ITEM,
  END_DRAWING_ITEM,
  BEGIN_DRAGGING_ITEM,
  UPDATE_DRAGGING_ITEM,
  END_DRAGGING_ITEM,
  BEGIN_ROTATING_ITEM,
  UPDATE_ROTATING_ITEM,
  END_ROTATING_ITEM,
  SELECT_ITEM
} from '../constants';

export default function (state, action) {
  switch (action.type) {
    case SELECT_ITEM:
      return Item.select(state, action.layerID, action.itemID).updatedState;

    case SELECT_TOOL_DRAWING_ITEM:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Item.selectToolDrawingItem(state, action.sceneComponentType).updatedState;

    case UPDATE_DRAWING_ITEM:
      return Item.updateDrawingItem(state, action.layerID, action.x, action.y).updatedState;

    case END_DRAWING_ITEM:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Item.endDrawingItem(state, action.layerID, action.x, action.y).updatedState;

    case BEGIN_DRAGGING_ITEM:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Item.beginDraggingItem(state, action.layerID, action.itemID, action.x, action.y).updatedState;

    case UPDATE_DRAGGING_ITEM:
      return Item.updateDraggingItem(state, action.x, action.y).updatedState;

    case END_DRAGGING_ITEM:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Item.endDraggingItem(state, action.x, action.y).updatedState;

    case BEGIN_ROTATING_ITEM:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Item.beginRotatingItem(state, action.layerID, action.itemID, action.x, action.y).updatedState;

    case UPDATE_ROTATING_ITEM:
      return Item.updateRotatingItem(state, action.x, action.y).updatedState;

    case END_ROTATING_ITEM:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Item.endRotatingItem(state, action.x, action.y).updatedState;

    default:
      return state;
  }
}
