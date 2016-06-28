import {
  SELECT_TOOL_EDIT,
  MODE_IDLE
} from '../constants';

export default function (state, action) {
  switch (action.type) {
    case SELECT_TOOL_EDIT:
      return state.set('mode', MODE_IDLE);
  }
}
