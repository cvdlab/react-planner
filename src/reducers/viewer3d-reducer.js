import {MODE_3D_VIEW, SELECT_TOOL_3D_VIEW} from '../constants';

export default function (state, action) {
  switch (action.type) {
    case SELECT_TOOL_3D_VIEW:
      return state.set('mode', MODE_3D_VIEW);
    default:
      return state;
  }
}
