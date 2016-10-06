'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Content;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _viewer2d = require('./viewer2d/viewer2d.jsx');

var _viewer2d2 = _interopRequireDefault(_viewer2d);

var _viewer3d = require('./viewer3d/viewer3d');

var _viewer3d2 = _interopRequireDefault(_viewer3d);

var _viewer3dFirstPerson = require('./viewer3d/viewer3d-first-person');

var _viewer3dFirstPerson2 = _interopRequireDefault(_viewer3dFirstPerson);

var _catalogList = require('./catalog-view/catalog-list.jsx');

var _catalogList2 = _interopRequireDefault(_catalogList);

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Content(_ref) {
  var width = _ref.width;
  var height = _ref.height;
  var state = _ref.state;
  var customContents = _ref.customContents;

  var mode = state.get('mode');

  switch (mode) {
    case constants.MODE_3D_VIEW:
      return _react2.default.createElement(_viewer3d2.default, { state: state, width: width, height: height });

    case constants.MODE_3D_FIRST_PERSON:
      return _react2.default.createElement(_viewer3dFirstPerson2.default, { state: state, width: width, height: height });

    case constants.MODE_VIEWING_CATALOG:
      return _react2.default.createElement(_catalogList2.default, { state: state, width: width, height: height });

    case constants.MODE_IDLE:
    case constants.MODE_2D_ZOOM_IN:
    case constants.MODE_2D_ZOOM_OUT:
    case constants.MODE_2D_PAN:
    case constants.MODE_WAITING_DRAWING_LINE:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
    case constants.MODE_DRAGGING_ITEM:
    case constants.MODE_DRAWING_LINE:
    case constants.MODE_DRAWING_HOLE:
    case constants.MODE_DRAWING_ITEM:
    case constants.MODE_DRAGGING_HOLE:
      return _react2.default.createElement(_viewer2d2.default, { state: state, width: width, height: height });

    default:
      if (customContents.hasOwnProperty(mode)) {
        var CustomContent = customContents[mode];
        return _react2.default.createElement(CustomContent, { width: width, height: height, state: state });
      } else {
        throw new Error('Mode ' + mode + ' doesn\'t have a mapped content');
      }
  }
}

Content.propTypes = {
  state: _react2.default.PropTypes.object.isRequired,
  width: _react2.default.PropTypes.number.isRequired,
  height: _react2.default.PropTypes.number.isRequired
};