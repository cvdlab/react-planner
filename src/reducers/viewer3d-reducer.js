import {
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  SELECT_TOOL_3D_VIEW,
  SELECT_TOOL_3D_FIRST_PERSON
} from '../constants';
import { Project } from '../class/export';
import { history } from '../utils/export';

export default function (state, action) {

  state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });

  switch (action.type) {
    case SELECT_TOOL_3D_VIEW:
      state = Project.rollback( state ).updatedState;
      state = Project.setMode( state, MODE_3D_VIEW ).updatedState;
      return state;

    case SELECT_TOOL_3D_FIRST_PERSON:
      state = Project.rollback( state ).updatedState;
      state = Project.setMode( state, MODE_3D_FIRST_PERSON ).updatedState;
      return state;

    default:
      return state;
  }
}
