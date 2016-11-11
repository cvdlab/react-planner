import {
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  SELECT_TOOL_3D_VIEW,
  SELECT_TOOL_3D_FIRST_PERSON
} from '../constants';

import {rollback} from './project-reducer';

export default function (state, action) {
  switch (action.type) {
    case SELECT_TOOL_3D_VIEW:
      return rollback(state).set('mode', MODE_3D_VIEW);

    case SELECT_TOOL_3D_FIRST_PERSON:
      return rollback(state).set('mode', MODE_3D_FIRST_PERSON);

    default:
      return state;
  }
}
