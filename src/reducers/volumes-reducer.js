import {
  SELECT_TOOL_VOLUMES_SUMMARY,
  MODE_VOLUMES_SUMMARY
} from '../constants';

export default function (state, action) {
  switch (action.type) {
    case SELECT_TOOL_VOLUMES_SUMMARY:
      return state.set('mode', MODE_VOLUMES_SUMMARY);

    default:
      return state;
  }
}
