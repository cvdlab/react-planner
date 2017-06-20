'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactPlannerReducers = exports.ReactPlannerConstants = exports.StyleComponents = exports.ElementsFactories = exports.Plugins = exports.ReactPlannerContent = exports.ReactPlanner = exports.reducer = exports.State2DViewer = exports.Models = exports.Ruler = exports.ToolbarButton = exports.Translator = exports.Catalog = undefined;

var _catalog = require('./catalog/catalog');

var _catalog2 = _interopRequireDefault(_catalog);

var _translator = require('./translator/translator');

var _translator2 = _interopRequireDefault(_translator);

var _toolbarButton = require('./components/toolbar/toolbar-button');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _ruler = require('./components/viewer2d/ruler');

var _ruler2 = _interopRequireDefault(_ruler);

var _models = require('./models');

var Models = _interopRequireWildcard(_models);

var _state = require('./components/viewer2d/state');

var _state2 = _interopRequireDefault(_state);

var _reducer = require('./reducers/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _reactPlanner = require('./react-planner');

var _reactPlanner2 = _interopRequireDefault(_reactPlanner);

var _content = require('./components/content');

var _content2 = _interopRequireDefault(_content);

var _plugins = require('./plugins/plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _wallFactory = require('./catalog/factories/wall-factory');

var _wallFactory2 = _interopRequireDefault(_wallFactory);

var _areaFactory = require('./catalog/factories/area-factory');

var _areaFactory2 = _interopRequireDefault(_areaFactory);

var _button = require('./components/style/button');

var _button2 = _interopRequireDefault(_button);

var _cancelButton = require('./components/style/cancel-button');

var _cancelButton2 = _interopRequireDefault(_cancelButton);

var _contentContainer = require('./components/style/content-container');

var _contentContainer2 = _interopRequireDefault(_contentContainer);

var _contentTitle = require('./components/style/content-title');

var _contentTitle2 = _interopRequireDefault(_contentTitle);

var _deleteButton = require('./components/style/delete-button');

var _deleteButton2 = _interopRequireDefault(_deleteButton);

var _formBlock = require('./components/style/form-block');

var _formBlock2 = _interopRequireDefault(_formBlock);

var _formColorInput = require('./components/style/form-color-input');

var _formColorInput2 = _interopRequireDefault(_formColorInput);

var _formLabel = require('./components/style/form-label');

var _formLabel2 = _interopRequireDefault(_formLabel);

var _formNumberInput = require('./components/style/form-number-input');

var _formNumberInput2 = _interopRequireDefault(_formNumberInput);

var _formSelect = require('./components/style/form-select');

var _formSelect2 = _interopRequireDefault(_formSelect);

var _formSlider = require('./components/style/form-slider');

var _formSlider2 = _interopRequireDefault(_formSlider);

var _formSubmitButton = require('./components/style/form-submit-button');

var _formSubmitButton2 = _interopRequireDefault(_formSubmitButton);

var _formTextInput = require('./components/style/form-text-input');

var _formTextInput2 = _interopRequireDefault(_formTextInput);

var _constants = require('./constants');

var ReactPlannerConstants = _interopRequireWildcard(_constants);

var _version = require('./version');

var _areasReducer = require('./reducers/areas-reducer');

var _areasReducer2 = _interopRequireDefault(_areasReducer);

var _holesReducer = require('./reducers/holes-reducer');

var _holesReducer2 = _interopRequireDefault(_holesReducer);

var _itemsReducer = require('./reducers/items-reducer');

var _itemsReducer2 = _interopRequireDefault(_itemsReducer);

var _linesReducer = require('./reducers/lines-reducer');

var _linesReducer2 = _interopRequireDefault(_linesReducer);

var _projectReducer = require('./reducers/project-reducer');

var _projectReducer2 = _interopRequireDefault(_projectReducer);

var _sceneReducer = require('./reducers/scene-reducer');

var _sceneReducer2 = _interopRequireDefault(_sceneReducer);

var _verticesReducer = require('./reducers/vertices-reducer');

var _verticesReducer2 = _interopRequireDefault(_verticesReducer);

var _viewer2dReducer = require('./reducers/viewer2d-reducer');

var _viewer2dReducer2 = _interopRequireDefault(_viewer2dReducer);

var _viewer3dReducer = require('./reducers/viewer3d-reducer');

var _viewer3dReducer2 = _interopRequireDefault(_viewer3dReducer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ElementsFactories = { WallFactory: _wallFactory2.default, AreaFactory: _areaFactory2.default };
var StyleComponents = {
  Button: _button2.default, CancelButton: _cancelButton2.default, ContentContainer: _contentContainer2.default, ContentTitle: _contentTitle2.default, DeleteButton: _deleteButton2.default, FormBlock: _formBlock2.default,
  FormColorInput: _formColorInput2.default, FormLabel: _formLabel2.default, FormNumberInput: _formNumberInput2.default, FormSelect: _formSelect2.default, FormSlider: _formSlider2.default, FormSubmitButton: _formSubmitButton2.default, FormTextInput: _formTextInput2.default
};

console.info('react-planner ' + _version.VERSION + ' started'); //MIT LICENSE COMPLIANT

var ReactPlannerReducers = {
  ReactPlannerAreasReducer: _areasReducer2.default,
  ReactPlannerHolesReducer: _holesReducer2.default,
  ReactPlannerItemsReducer: _itemsReducer2.default,
  ReactPlannerLinesReducer: _linesReducer2.default,
  ReactPlannerProjectReducer: _projectReducer2.default,
  ReactPlannerSceneReducer: _sceneReducer2.default,
  ReactPlannerVerticesReducer: _verticesReducer2.default,
  ReactPlannerViewer2dReducer: _viewer2dReducer2.default,
  ReactPlannerViewer3dReducer: _viewer3dReducer2.default
};

exports.Catalog = _catalog2.default;
exports.Translator = _translator2.default;
exports.ToolbarButton = _toolbarButton2.default;
exports.Ruler = _ruler2.default;
exports.Models = Models;
exports.State2DViewer = _state2.default;
exports.reducer = _reducer2.default;
exports.ReactPlanner = _reactPlanner2.default;
exports.ReactPlannerContent = _content2.default;
exports.Plugins = _plugins2.default;
exports.ElementsFactories = ElementsFactories;
exports.StyleComponents = StyleComponents;
exports.ReactPlannerConstants = ReactPlannerConstants;
exports.ReactPlannerReducers = ReactPlannerReducers;