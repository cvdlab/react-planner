import {
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  SELECT_TOOL_3D_VIEW,
  SELECT_TOOL_3D_FIRST_PERSON
} from '../constants';
import { Project } from '../class/export';

export default function (state, action) {
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
