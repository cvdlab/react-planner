"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_LAYER_PROPERTIES = exports.SET_ITEMS_ATTRIBUTES = exports.SET_HOLES_ATTRIBUTES = exports.SET_GROUP_PROPERTIES = exports.SET_GROUP_BARYCENTER = exports.SET_GROUP_ATTRIBUTES = exports.SELECT_TOOL_ZOOM_OUT = exports.SELECT_TOOL_ZOOM_IN = exports.SELECT_TOOL_UPLOAD_IMAGE = exports.SELECT_TOOL_PAN = exports.SELECT_TOOL_EDIT = exports.SELECT_TOOL_DRAWING_LINE = exports.SELECT_TOOL_DRAWING_ITEM = exports.SELECT_TOOL_DRAWING_HOLE = exports.SELECT_TOOL_3D_VIEW = exports.SELECT_TOOL_3D_FIRST_PERSON = exports.SELECT_LINE = exports.SELECT_LAYER = exports.SELECT_ITEM = exports.SELECT_HOLE = exports.SELECT_GROUP = exports.SELECT_AREA = exports.SCENE_ACTIONS = exports.SAVE_PROJECT = exports.ROLLBACK = exports.REMOVE_VERTICAL_GUIDE = exports.REMOVE_LAYER = exports.REMOVE_HORIZONTAL_GUIDE = exports.REMOVE_GROUP_AND_DELETE_ELEMENTS = exports.REMOVE_GROUP = exports.REMOVE_FROM_GROUP = exports.REMOVE_CIRCULAR_GUIDE = exports.REMOVE = exports.REDO = exports.PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY = exports.PROJECT_ACTIONS = exports.PASTE_PROPERTIES = exports.OPEN_PROJECT_CONFIGURATOR = exports.OPEN_CATALOG = exports.NEW_PROJECT = exports.MODE_WAITING_DRAWING_LINE = exports.MODE_VIEWING_CATALOG = exports.MODE_UPLOADING_IMAGE = exports.MODE_SNAPPING = exports.MODE_ROTATING_ITEM = exports.MODE_IDLE = exports.MODE_FITTING_IMAGE = exports.MODE_DRAWING_LINE = exports.MODE_DRAWING_ITEM = exports.MODE_DRAWING_HOLE = exports.MODE_DRAGGING_VERTEX = exports.MODE_DRAGGING_LINE = exports.MODE_DRAGGING_ITEM = exports.MODE_DRAGGING_HOLE = exports.MODE_CONFIGURING_PROJECT = exports.MODE_3D_VIEW = exports.MODE_3D_FIRST_PERSON = exports.MODE_2D_ZOOM_OUT = exports.MODE_2D_ZOOM_IN = exports.MODE_2D_PAN = exports.LOAD_PROJECT = exports.LINE_ACTIONS = exports.KEYBOARD_BUTTON_CODE = exports.ITEMS_ACTIONS = exports.INIT_CATALOG = exports.HOLE_ACTIONS = exports.GROUP_TRANSLATE = exports.GROUP_ROTATE = exports.GROUP_ACTIONS = exports.GO_BACK_TO_CATALOG_PAGE = exports.EPSILON = exports.END_UPLOADING_IMAGE = exports.END_ROTATING_ITEM = exports.END_FITTING_IMAGE = exports.END_DRAWING_LINE = exports.END_DRAWING_ITEM = exports.END_DRAWING_HOLE = exports.END_DRAGGING_VERTEX = exports.END_DRAGGING_LINE = exports.END_DRAGGING_ITEM = exports.END_DRAGGING_HOLE = exports.COPY_PROPERTIES = exports.CHANGE_CATALOG_PAGE = exports.BEGIN_UPLOADING_IMAGE = exports.BEGIN_ROTATING_ITEM = exports.BEGIN_FITTING_IMAGE = exports.BEGIN_DRAWING_LINE = exports.BEGIN_DRAGGING_VERTEX = exports.BEGIN_DRAGGING_LINE = exports.BEGIN_DRAGGING_ITEM = exports.BEGIN_DRAGGING_HOLE = exports.AREA_ACTIONS = exports.ALTERATE_STATE = exports.ADD_VERTICAL_GUIDE = exports.ADD_TO_GROUP = exports.ADD_LAYER = exports.ADD_HORIZONTAL_GUIDE = exports.ADD_GROUP_FROM_SELECTED = exports.ADD_GROUP = exports.ADD_CIRCULAR_GUIDE = void 0;
exports.VIEWER3D_ACTIONS = exports.VIEWER2D_ACTIONS = exports.VERTEX_ACTIONS = exports.UPDATE_ZOOM_SCALE = exports.UPDATE_ROTATING_ITEM = exports.UPDATE_MOUSE_COORDS = exports.UPDATE_DRAWING_LINE = exports.UPDATE_DRAWING_ITEM = exports.UPDATE_DRAWING_HOLE = exports.UPDATE_DRAGGING_VERTEX = exports.UPDATE_DRAGGING_LINE = exports.UPDATE_DRAGGING_ITEM = exports.UPDATE_DRAGGING_HOLE = exports.UPDATE_2D_CAMERA = exports.UNSELECT_GROUP = exports.UNSELECT_ALL = exports.UNIT_MILLIMETER = exports.UNIT_MILE = exports.UNIT_METER = exports.UNIT_INCH = exports.UNIT_FOOT = exports.UNIT_CENTIMETER = exports.UNITS_LENGTH = exports.UNDO = exports.TOGGLE_SNAP = exports.THROW_WARNING = exports.THROW_ERROR = exports.SET_PROPERTIES = exports.SET_PROJECT_PROPERTIES = exports.SET_MODE = exports.SET_LINES_ATTRIBUTES = void 0;
// ACTIONS project
var NEW_PROJECT = 'NEW_PROJECT';
exports.NEW_PROJECT = NEW_PROJECT;
var LOAD_PROJECT = 'LOAD_PROJECT';
exports.LOAD_PROJECT = LOAD_PROJECT;
var SAVE_PROJECT = 'SAVE_PROJECT';
exports.SAVE_PROJECT = SAVE_PROJECT;
var OPEN_CATALOG = 'OPEN_CATALOG';
exports.OPEN_CATALOG = OPEN_CATALOG;
var SELECT_TOOL_EDIT = 'SELECT_TOOL_EDIT';
exports.SELECT_TOOL_EDIT = SELECT_TOOL_EDIT;
var UNSELECT_ALL = 'UNSELECT_ALL';
exports.UNSELECT_ALL = UNSELECT_ALL;
var SET_PROPERTIES = 'SET_PROPERTIES';
exports.SET_PROPERTIES = SET_PROPERTIES;
var SET_ITEMS_ATTRIBUTES = 'SET_ITEMS_ATTRIBUTES';
exports.SET_ITEMS_ATTRIBUTES = SET_ITEMS_ATTRIBUTES;
var SET_LINES_ATTRIBUTES = 'SET_LINES_ATTRIBUTES';
exports.SET_LINES_ATTRIBUTES = SET_LINES_ATTRIBUTES;
var SET_HOLES_ATTRIBUTES = 'SET_HOLES_ATTRIBUTES';
exports.SET_HOLES_ATTRIBUTES = SET_HOLES_ATTRIBUTES;
var REMOVE = 'REMOVE';
exports.REMOVE = REMOVE;
var UNDO = 'UNDO';
exports.UNDO = UNDO;
var REDO = 'REDO';
exports.REDO = REDO;
var ROLLBACK = 'ROLLBACK';
exports.ROLLBACK = ROLLBACK;
var SET_PROJECT_PROPERTIES = 'SET_PROJECT_PROPERTIES';
exports.SET_PROJECT_PROPERTIES = SET_PROJECT_PROPERTIES;
var OPEN_PROJECT_CONFIGURATOR = 'OPEN_PROJECT_CONFIGURATOR';
exports.OPEN_PROJECT_CONFIGURATOR = OPEN_PROJECT_CONFIGURATOR;
var INIT_CATALOG = 'INIT_CATALOG';
exports.INIT_CATALOG = INIT_CATALOG;
var UPDATE_MOUSE_COORDS = 'UPDATE_MOUSE_COORDS';
exports.UPDATE_MOUSE_COORDS = UPDATE_MOUSE_COORDS;
var UPDATE_ZOOM_SCALE = 'UPDATE_ZOOM_SCALE';
exports.UPDATE_ZOOM_SCALE = UPDATE_ZOOM_SCALE;
var TOGGLE_SNAP = 'TOGGLE_SNAP';
exports.TOGGLE_SNAP = TOGGLE_SNAP;
var CHANGE_CATALOG_PAGE = 'CHANGE_CATALOG_PAGE';
exports.CHANGE_CATALOG_PAGE = CHANGE_CATALOG_PAGE;
var GO_BACK_TO_CATALOG_PAGE = 'GO_BACK_TO_CATALOG_PAGE';
exports.GO_BACK_TO_CATALOG_PAGE = GO_BACK_TO_CATALOG_PAGE;
var THROW_ERROR = 'THROW_ERROR';
exports.THROW_ERROR = THROW_ERROR;
var THROW_WARNING = 'THROW_WARNING';
exports.THROW_WARNING = THROW_WARNING;
var COPY_PROPERTIES = 'COPY_PROPERTIES';
exports.COPY_PROPERTIES = COPY_PROPERTIES;
var PASTE_PROPERTIES = 'PASTE_PROPERTIES';
exports.PASTE_PROPERTIES = PASTE_PROPERTIES;
var PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY = 'PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY';
exports.PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY = PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY;
var ALTERATE_STATE = 'ALTERATE_STATE';
exports.ALTERATE_STATE = ALTERATE_STATE;
var SET_MODE = 'SET_MODE';
exports.SET_MODE = SET_MODE;
var ADD_HORIZONTAL_GUIDE = 'ADD_HORIZONTAL_GUIDE';
exports.ADD_HORIZONTAL_GUIDE = ADD_HORIZONTAL_GUIDE;
var ADD_VERTICAL_GUIDE = 'ADD_VERTICAL_GUIDE';
exports.ADD_VERTICAL_GUIDE = ADD_VERTICAL_GUIDE;
var ADD_CIRCULAR_GUIDE = 'ADD_CIRCULAR_GUIDE';
exports.ADD_CIRCULAR_GUIDE = ADD_CIRCULAR_GUIDE;
var REMOVE_HORIZONTAL_GUIDE = 'REMOVE_HORIZONTAL_GUIDE';
exports.REMOVE_HORIZONTAL_GUIDE = REMOVE_HORIZONTAL_GUIDE;
var REMOVE_VERTICAL_GUIDE = 'REMOVE_VERTICAL_GUIDE';
exports.REMOVE_VERTICAL_GUIDE = REMOVE_VERTICAL_GUIDE;
var REMOVE_CIRCULAR_GUIDE = 'REMOVE_CIRCULAR_GUIDE';

// ACTIONS viewer2D
exports.REMOVE_CIRCULAR_GUIDE = REMOVE_CIRCULAR_GUIDE;
var SELECT_TOOL_ZOOM_IN = 'SELECT_TOOL_ZOOM_IN';
exports.SELECT_TOOL_ZOOM_IN = SELECT_TOOL_ZOOM_IN;
var SELECT_TOOL_ZOOM_OUT = 'SELECT_TOOL_ZOOM_OUT';
exports.SELECT_TOOL_ZOOM_OUT = SELECT_TOOL_ZOOM_OUT;
var SELECT_TOOL_PAN = 'SELECT_TOOL_PAN';
exports.SELECT_TOOL_PAN = SELECT_TOOL_PAN;
var UPDATE_2D_CAMERA = 'UPDATE_2D_CAMERA';

//ACTIONS viewer3D
exports.UPDATE_2D_CAMERA = UPDATE_2D_CAMERA;
var SELECT_TOOL_3D_VIEW = 'SELECT_TOOL_3D_VIEW';
exports.SELECT_TOOL_3D_VIEW = SELECT_TOOL_3D_VIEW;
var SELECT_TOOL_3D_FIRST_PERSON = 'SELECT_TOOL_3D_FIRST_PERSON';

//ACTIONS items
exports.SELECT_TOOL_3D_FIRST_PERSON = SELECT_TOOL_3D_FIRST_PERSON;
var SELECT_TOOL_DRAWING_ITEM = 'SELECT_TOOL_DRAWING_ITEM';
exports.SELECT_TOOL_DRAWING_ITEM = SELECT_TOOL_DRAWING_ITEM;
var UPDATE_DRAWING_ITEM = 'UPDATE_DRAWING_ITEM';
exports.UPDATE_DRAWING_ITEM = UPDATE_DRAWING_ITEM;
var END_DRAWING_ITEM = 'END_DRAWING_ITEM';
exports.END_DRAWING_ITEM = END_DRAWING_ITEM;
var BEGIN_DRAGGING_ITEM = 'BEGIN_DRAGGING_ITEM';
exports.BEGIN_DRAGGING_ITEM = BEGIN_DRAGGING_ITEM;
var UPDATE_DRAGGING_ITEM = 'UPDATE_DRAGGING_ITEM';
exports.UPDATE_DRAGGING_ITEM = UPDATE_DRAGGING_ITEM;
var END_DRAGGING_ITEM = 'END_DRAGGING_ITEM';
exports.END_DRAGGING_ITEM = END_DRAGGING_ITEM;
var BEGIN_ROTATING_ITEM = 'BEGIN_ROTATING_ITEM';
exports.BEGIN_ROTATING_ITEM = BEGIN_ROTATING_ITEM;
var UPDATE_ROTATING_ITEM = 'UPDATE_ROTATING_ITEM';
exports.UPDATE_ROTATING_ITEM = UPDATE_ROTATING_ITEM;
var END_ROTATING_ITEM = 'END_ROTATING_ITEM';

//ACTIONS groups
exports.END_ROTATING_ITEM = END_ROTATING_ITEM;
var ADD_GROUP = 'ADD_GROUP';
exports.ADD_GROUP = ADD_GROUP;
var ADD_GROUP_FROM_SELECTED = 'ADD_GROUP_FROM_SELECTED';
exports.ADD_GROUP_FROM_SELECTED = ADD_GROUP_FROM_SELECTED;
var SELECT_GROUP = 'SELECT_GROUP';
exports.SELECT_GROUP = SELECT_GROUP;
var UNSELECT_GROUP = 'UNSELECT_GROUP';
exports.UNSELECT_GROUP = UNSELECT_GROUP;
var ADD_TO_GROUP = 'ADD_TO_GROUP';
exports.ADD_TO_GROUP = ADD_TO_GROUP;
var REMOVE_FROM_GROUP = 'REMOVE_FROM_GROUP';
exports.REMOVE_FROM_GROUP = REMOVE_FROM_GROUP;
var SET_GROUP_PROPERTIES = 'SET_GROUP_PROPERTIES';
exports.SET_GROUP_PROPERTIES = SET_GROUP_PROPERTIES;
var SET_GROUP_ATTRIBUTES = 'SET_GROUP_ATTRIBUTES';
exports.SET_GROUP_ATTRIBUTES = SET_GROUP_ATTRIBUTES;
var SET_GROUP_BARYCENTER = 'SET_GROUP_BARYCENTER';
exports.SET_GROUP_BARYCENTER = SET_GROUP_BARYCENTER;
var REMOVE_GROUP = 'REMOVE_GROUP';
exports.REMOVE_GROUP = REMOVE_GROUP;
var REMOVE_GROUP_AND_DELETE_ELEMENTS = 'REMOVE_GROUP_AND_DELETE_ELEMENTS';
exports.REMOVE_GROUP_AND_DELETE_ELEMENTS = REMOVE_GROUP_AND_DELETE_ELEMENTS;
var GROUP_TRANSLATE = 'GROUP_TRANSLATE';
exports.GROUP_TRANSLATE = GROUP_TRANSLATE;
var GROUP_ROTATE = 'GROUP_ROTATE';

//ACTION drawings
exports.GROUP_ROTATE = GROUP_ROTATE;
var SELECT_HOLE = 'SELECT_HOLE';
exports.SELECT_HOLE = SELECT_HOLE;
var SELECT_AREA = 'SELECT_AREA';
exports.SELECT_AREA = SELECT_AREA;
var SELECT_ITEM = 'SELECT_ITEM';
exports.SELECT_ITEM = SELECT_ITEM;
var SELECT_LINE = 'SELECT_LINE';
exports.SELECT_LINE = SELECT_LINE;
var SELECT_TOOL_DRAWING_LINE = 'SELECT_TOOL_DRAWING_LINE';
exports.SELECT_TOOL_DRAWING_LINE = SELECT_TOOL_DRAWING_LINE;
var BEGIN_DRAWING_LINE = 'BEGIN_DRAWING_LINE';
exports.BEGIN_DRAWING_LINE = BEGIN_DRAWING_LINE;
var UPDATE_DRAWING_LINE = 'UPDATE_DRAWING_LINE';
exports.UPDATE_DRAWING_LINE = UPDATE_DRAWING_LINE;
var END_DRAWING_LINE = 'END_DRAWING_LINE';
exports.END_DRAWING_LINE = END_DRAWING_LINE;
var SELECT_TOOL_DRAWING_HOLE = 'SELECT_TOOL_DRAWING_HOLE';
exports.SELECT_TOOL_DRAWING_HOLE = SELECT_TOOL_DRAWING_HOLE;
var UPDATE_DRAWING_HOLE = 'UPDATE_DRAWING_HOLE'; //SHOULD BE SLPITTED IN BEGIN_DRAWING_HOLE AND UPDATE_DRAWING_HOLE
exports.UPDATE_DRAWING_HOLE = UPDATE_DRAWING_HOLE;
var END_DRAWING_HOLE = 'END_DRAWING_HOLE';
exports.END_DRAWING_HOLE = END_DRAWING_HOLE;
var BEGIN_DRAGGING_LINE = 'BEGIN_DRAGGING_LINE';
exports.BEGIN_DRAGGING_LINE = BEGIN_DRAGGING_LINE;
var UPDATE_DRAGGING_LINE = 'UPDATE_DRAGGING_LINE';
exports.UPDATE_DRAGGING_LINE = UPDATE_DRAGGING_LINE;
var END_DRAGGING_LINE = 'END_DRAGGING_LINE';
exports.END_DRAGGING_LINE = END_DRAGGING_LINE;
var SELECT_TOOL_UPLOAD_IMAGE = 'SELECT_TOOL_UPLOAD_IMAGE';
exports.SELECT_TOOL_UPLOAD_IMAGE = SELECT_TOOL_UPLOAD_IMAGE;
var BEGIN_UPLOADING_IMAGE = 'BEGIN_UPLOADING_IMAGE';
exports.BEGIN_UPLOADING_IMAGE = BEGIN_UPLOADING_IMAGE;
var END_UPLOADING_IMAGE = 'END_UPLOADING_IMAGE';
exports.END_UPLOADING_IMAGE = END_UPLOADING_IMAGE;
var BEGIN_FITTING_IMAGE = 'BEGIN_FITTING_IMAGE';
exports.BEGIN_FITTING_IMAGE = BEGIN_FITTING_IMAGE;
var END_FITTING_IMAGE = 'END_FITTING_IMAGE';
exports.END_FITTING_IMAGE = END_FITTING_IMAGE;
var BEGIN_DRAGGING_HOLE = 'BEGIN_DRAGGING_HOLE';
exports.BEGIN_DRAGGING_HOLE = BEGIN_DRAGGING_HOLE;
var UPDATE_DRAGGING_HOLE = 'UPDATE_DRAGGING_HOLE';
exports.UPDATE_DRAGGING_HOLE = UPDATE_DRAGGING_HOLE;
var END_DRAGGING_HOLE = 'END_DRAGGING_HOLE';

//ACTIONS vertices
exports.END_DRAGGING_HOLE = END_DRAGGING_HOLE;
var BEGIN_DRAGGING_VERTEX = 'BEGIN_DRAGGING_VERTEX';
exports.BEGIN_DRAGGING_VERTEX = BEGIN_DRAGGING_VERTEX;
var UPDATE_DRAGGING_VERTEX = 'UPDATE_DRAGGING_VERTEX';
exports.UPDATE_DRAGGING_VERTEX = UPDATE_DRAGGING_VERTEX;
var END_DRAGGING_VERTEX = 'END_DRAGGING_VERTEX';

//ACTIONS scene
exports.END_DRAGGING_VERTEX = END_DRAGGING_VERTEX;
var SET_LAYER_PROPERTIES = 'SET_LAYER_PROPERTIES';
exports.SET_LAYER_PROPERTIES = SET_LAYER_PROPERTIES;
var ADD_LAYER = 'ADD_LAYER';
exports.ADD_LAYER = ADD_LAYER;
var SELECT_LAYER = 'SELECT_LAYER';
exports.SELECT_LAYER = SELECT_LAYER;
var REMOVE_LAYER = 'REMOVE_LAYER';

//GROUPING ACTIONS
exports.REMOVE_LAYER = REMOVE_LAYER;
var PROJECT_ACTIONS = {
  NEW_PROJECT: NEW_PROJECT,
  LOAD_PROJECT: LOAD_PROJECT,
  SAVE_PROJECT: SAVE_PROJECT,
  OPEN_CATALOG: OPEN_CATALOG,
  SELECT_TOOL_EDIT: SELECT_TOOL_EDIT,
  UNSELECT_ALL: UNSELECT_ALL,
  SET_PROPERTIES: SET_PROPERTIES,
  SET_ITEMS_ATTRIBUTES: SET_ITEMS_ATTRIBUTES,
  SET_LINES_ATTRIBUTES: SET_LINES_ATTRIBUTES,
  SET_HOLES_ATTRIBUTES: SET_HOLES_ATTRIBUTES,
  REMOVE: REMOVE,
  UNDO: UNDO,
  REDO: REDO,
  ROLLBACK: ROLLBACK,
  SET_PROJECT_PROPERTIES: SET_PROJECT_PROPERTIES,
  OPEN_PROJECT_CONFIGURATOR: OPEN_PROJECT_CONFIGURATOR,
  INIT_CATALOG: INIT_CATALOG,
  UPDATE_MOUSE_COORDS: UPDATE_MOUSE_COORDS,
  UPDATE_ZOOM_SCALE: UPDATE_ZOOM_SCALE,
  TOGGLE_SNAP: TOGGLE_SNAP,
  CHANGE_CATALOG_PAGE: CHANGE_CATALOG_PAGE,
  GO_BACK_TO_CATALOG_PAGE: GO_BACK_TO_CATALOG_PAGE,
  THROW_ERROR: THROW_ERROR,
  THROW_WARNING: THROW_WARNING,
  COPY_PROPERTIES: COPY_PROPERTIES,
  PASTE_PROPERTIES: PASTE_PROPERTIES,
  PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY: PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY,
  ALTERATE_STATE: ALTERATE_STATE,
  SET_MODE: SET_MODE,
  ADD_HORIZONTAL_GUIDE: ADD_HORIZONTAL_GUIDE,
  ADD_VERTICAL_GUIDE: ADD_VERTICAL_GUIDE,
  ADD_CIRCULAR_GUIDE: ADD_CIRCULAR_GUIDE,
  REMOVE_HORIZONTAL_GUIDE: REMOVE_HORIZONTAL_GUIDE,
  REMOVE_VERTICAL_GUIDE: REMOVE_VERTICAL_GUIDE,
  REMOVE_CIRCULAR_GUIDE: REMOVE_CIRCULAR_GUIDE
};
exports.PROJECT_ACTIONS = PROJECT_ACTIONS;
var VIEWER2D_ACTIONS = {
  SELECT_TOOL_ZOOM_IN: SELECT_TOOL_ZOOM_IN,
  SELECT_TOOL_ZOOM_OUT: SELECT_TOOL_ZOOM_OUT,
  SELECT_TOOL_PAN: SELECT_TOOL_PAN,
  UPDATE_2D_CAMERA: UPDATE_2D_CAMERA
};
exports.VIEWER2D_ACTIONS = VIEWER2D_ACTIONS;
var VIEWER3D_ACTIONS = {
  SELECT_TOOL_3D_VIEW: SELECT_TOOL_3D_VIEW,
  SELECT_TOOL_3D_FIRST_PERSON: SELECT_TOOL_3D_FIRST_PERSON
};
exports.VIEWER3D_ACTIONS = VIEWER3D_ACTIONS;
var ITEMS_ACTIONS = {
  SELECT_ITEM: SELECT_ITEM,
  SELECT_TOOL_DRAWING_ITEM: SELECT_TOOL_DRAWING_ITEM,
  UPDATE_DRAWING_ITEM: UPDATE_DRAWING_ITEM,
  END_DRAWING_ITEM: END_DRAWING_ITEM,
  BEGIN_DRAGGING_ITEM: BEGIN_DRAGGING_ITEM,
  UPDATE_DRAGGING_ITEM: UPDATE_DRAGGING_ITEM,
  END_DRAGGING_ITEM: END_DRAGGING_ITEM,
  BEGIN_ROTATING_ITEM: BEGIN_ROTATING_ITEM,
  UPDATE_ROTATING_ITEM: UPDATE_ROTATING_ITEM,
  END_ROTATING_ITEM: END_ROTATING_ITEM
};
exports.ITEMS_ACTIONS = ITEMS_ACTIONS;
var HOLE_ACTIONS = {
  SELECT_HOLE: SELECT_HOLE,
  SELECT_TOOL_DRAWING_HOLE: SELECT_TOOL_DRAWING_HOLE,
  UPDATE_DRAWING_HOLE: UPDATE_DRAWING_HOLE,
  END_DRAWING_HOLE: END_DRAWING_HOLE,
  BEGIN_DRAGGING_HOLE: BEGIN_DRAGGING_HOLE,
  UPDATE_DRAGGING_HOLE: UPDATE_DRAGGING_HOLE,
  END_DRAGGING_HOLE: END_DRAGGING_HOLE
};
exports.HOLE_ACTIONS = HOLE_ACTIONS;
var LINE_ACTIONS = {
  SELECT_LINE: SELECT_LINE,
  SELECT_TOOL_DRAWING_LINE: SELECT_TOOL_DRAWING_LINE,
  BEGIN_DRAWING_LINE: BEGIN_DRAWING_LINE,
  UPDATE_DRAWING_LINE: UPDATE_DRAWING_LINE,
  END_DRAWING_LINE: END_DRAWING_LINE,
  BEGIN_DRAGGING_LINE: BEGIN_DRAGGING_LINE,
  UPDATE_DRAGGING_LINE: UPDATE_DRAGGING_LINE,
  END_DRAGGING_LINE: END_DRAGGING_LINE
};
exports.LINE_ACTIONS = LINE_ACTIONS;
var AREA_ACTIONS = {
  SELECT_AREA: SELECT_AREA
};
exports.AREA_ACTIONS = AREA_ACTIONS;
var GROUP_ACTIONS = {
  ADD_GROUP: ADD_GROUP,
  ADD_GROUP_FROM_SELECTED: ADD_GROUP_FROM_SELECTED,
  SELECT_GROUP: SELECT_GROUP,
  UNSELECT_GROUP: UNSELECT_GROUP,
  ADD_TO_GROUP: ADD_TO_GROUP,
  REMOVE_FROM_GROUP: REMOVE_FROM_GROUP,
  SET_GROUP_PROPERTIES: SET_GROUP_PROPERTIES,
  SET_GROUP_ATTRIBUTES: SET_GROUP_ATTRIBUTES,
  SET_GROUP_BARYCENTER: SET_GROUP_BARYCENTER,
  REMOVE_GROUP: REMOVE_GROUP,
  REMOVE_GROUP_AND_DELETE_ELEMENTS: REMOVE_GROUP_AND_DELETE_ELEMENTS,
  GROUP_TRANSLATE: GROUP_TRANSLATE,
  GROUP_ROTATE: GROUP_ROTATE
};
exports.GROUP_ACTIONS = GROUP_ACTIONS;
var SCENE_ACTIONS = {
  ADD_LAYER: ADD_LAYER,
  SET_LAYER_PROPERTIES: SET_LAYER_PROPERTIES,
  SELECT_LAYER: SELECT_LAYER,
  REMOVE_LAYER: REMOVE_LAYER
};
exports.SCENE_ACTIONS = SCENE_ACTIONS;
var VERTEX_ACTIONS = {
  BEGIN_DRAGGING_VERTEX: BEGIN_DRAGGING_VERTEX,
  UPDATE_DRAGGING_VERTEX: UPDATE_DRAGGING_VERTEX,
  END_DRAGGING_VERTEX: END_DRAGGING_VERTEX
};

//MODES
exports.VERTEX_ACTIONS = VERTEX_ACTIONS;
var MODE_IDLE = 'MODE_IDLE';
exports.MODE_IDLE = MODE_IDLE;
var MODE_2D_ZOOM_IN = 'MODE_2D_ZOOM_IN';
exports.MODE_2D_ZOOM_IN = MODE_2D_ZOOM_IN;
var MODE_2D_ZOOM_OUT = 'MODE_2D_ZOOM_OUT';
exports.MODE_2D_ZOOM_OUT = MODE_2D_ZOOM_OUT;
var MODE_2D_PAN = 'MODE_2D_PAN';
exports.MODE_2D_PAN = MODE_2D_PAN;
var MODE_3D_VIEW = 'MODE_3D_VIEW';
exports.MODE_3D_VIEW = MODE_3D_VIEW;
var MODE_3D_FIRST_PERSON = 'MODE_3D_FIRST_PERSON';
exports.MODE_3D_FIRST_PERSON = MODE_3D_FIRST_PERSON;
var MODE_WAITING_DRAWING_LINE = 'MODE_WAITING_DRAWING_LINE';
exports.MODE_WAITING_DRAWING_LINE = MODE_WAITING_DRAWING_LINE;
var MODE_DRAGGING_LINE = 'MODE_DRAGGING_LINE';
exports.MODE_DRAGGING_LINE = MODE_DRAGGING_LINE;
var MODE_DRAGGING_VERTEX = 'MODE_DRAGGING_VERTEX';
exports.MODE_DRAGGING_VERTEX = MODE_DRAGGING_VERTEX;
var MODE_DRAGGING_ITEM = 'MODE_DRAGGING_ITEM';
exports.MODE_DRAGGING_ITEM = MODE_DRAGGING_ITEM;
var MODE_DRAGGING_HOLE = 'MODE_DRAGGING_HOLE';
exports.MODE_DRAGGING_HOLE = MODE_DRAGGING_HOLE;
var MODE_DRAWING_LINE = 'MODE_DRAWING_LINE';
exports.MODE_DRAWING_LINE = MODE_DRAWING_LINE;
var MODE_DRAWING_HOLE = 'MODE_DRAWING_HOLE';
exports.MODE_DRAWING_HOLE = MODE_DRAWING_HOLE;
var MODE_DRAWING_ITEM = 'MODE_DRAWING_ITEM';
exports.MODE_DRAWING_ITEM = MODE_DRAWING_ITEM;
var MODE_ROTATING_ITEM = 'MODE_ROTATING_ITEM';
exports.MODE_ROTATING_ITEM = MODE_ROTATING_ITEM;
var MODE_UPLOADING_IMAGE = 'MODE_UPLOADING_IMAGE';
exports.MODE_UPLOADING_IMAGE = MODE_UPLOADING_IMAGE;
var MODE_FITTING_IMAGE = 'MODE_FITTING_IMAGE';
exports.MODE_FITTING_IMAGE = MODE_FITTING_IMAGE;
var MODE_VIEWING_CATALOG = 'MODE_VIEWING_CATALOG';
exports.MODE_VIEWING_CATALOG = MODE_VIEWING_CATALOG;
var MODE_CONFIGURING_PROJECT = 'MODE_CONFIGURING_PROJECT';

//Thinking about it...
//https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Proxy
/*
let MODE_DEF = [
  'IDLE',
  '2D_ZOOM_IN',
  '2D_ZOOM_OUT',
  '2D_PAN',
  '3D_VIEW',
  '3D_FIRST_PERSON',
  'WAITING_DRAWING_LINE',
  'DRAGGING_LINE',
  'DRAGGING_VERTEX',
  'DRAGGING_ITEM',
  'DRAGGING_HOLE',
  'DRAWING_LINE',
  'DRAWING_HOLE',
  'DRAWING_ITEM',
  'ROTATING_ITEM',
  'UPLOADING_IMAGE',
  'FITTING_IMAGE',
  'VIEWING_CATALOG',
  'CONFIGURING_PROJECT',
];

export const MODE = new Proxy( MODE_DEF, { get: (target, name) => { return target.indexOf(name) !== -1 ? name : null } } );
*/
exports.MODE_CONFIGURING_PROJECT = MODE_CONFIGURING_PROJECT;
var MODE_SNAPPING = [MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE, MODE_ROTATING_ITEM];

//UNITS
exports.MODE_SNAPPING = MODE_SNAPPING;
var UNIT_MILLIMETER = 'mm';
exports.UNIT_MILLIMETER = UNIT_MILLIMETER;
var UNIT_CENTIMETER = 'cm';
exports.UNIT_CENTIMETER = UNIT_CENTIMETER;
var UNIT_METER = 'm';
exports.UNIT_METER = UNIT_METER;
var UNIT_INCH = 'in';
exports.UNIT_INCH = UNIT_INCH;
var UNIT_FOOT = 'ft';
exports.UNIT_FOOT = UNIT_FOOT;
var UNIT_MILE = 'mi';
exports.UNIT_MILE = UNIT_MILE;
var UNITS_LENGTH = [UNIT_MILLIMETER, UNIT_CENTIMETER, UNIT_METER, UNIT_INCH, UNIT_FOOT, UNIT_MILE];
exports.UNITS_LENGTH = UNITS_LENGTH;
var EPSILON = 1e-6;
exports.EPSILON = EPSILON;
var KEYBOARD_BUTTON_CODE = {
  DELETE: 46,
  BACKSPACE: 8,
  ESC: 27,
  Z: 90,
  ALT: 18,
  C: 67,
  V: 86,
  CTRL: 17,
  ENTER: 13,
  TAB: 9
};
exports.KEYBOARD_BUTTON_CODE = KEYBOARD_BUTTON_CODE;