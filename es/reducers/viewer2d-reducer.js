function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
import { fitSelection } from 'react-svg-pan-zoom';
import { UPDATE_2D_CAMERA, SELECT_TOOL_PAN, SELECT_TOOL_ZOOM_IN, SELECT_TOOL_ZOOM_OUT, FIT_SELECTION, MODE_2D_PAN, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT } from '../utils/constants';
export default function (state, action) {
  switch (action.type) {
    case UPDATE_2D_CAMERA:
      return state.merge({
        viewer2D: action.value
      });
    case SELECT_TOOL_PAN:
      return state.set('mode', MODE_2D_PAN);
    case SELECT_TOOL_ZOOM_IN:
      return state.set('mode', MODE_2D_ZOOM_IN);
    case SELECT_TOOL_ZOOM_OUT:
      return state.set('mode', MODE_2D_ZOOM_OUT);
    case FIT_SELECTION:
      var viewer2D = state.get('viewer2D');
      return state.merge({
        viewer2D: fitSelection.apply(void 0, [viewer2D].concat(_toConsumableArray(action.value)))
      });
  }
}