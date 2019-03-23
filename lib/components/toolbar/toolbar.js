'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _md = require('react-icons/md');

var _fa = require('react-icons/fa');

var _toolbarButton = require('./toolbar-button');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _toolbarSaveButton = require('./toolbar-save-button');

var _toolbarSaveButton2 = _interopRequireDefault(_toolbarSaveButton);

var _toolbarLoadButton = require('./toolbar-load-button');

var _toolbarLoadButton2 = _interopRequireDefault(_toolbarLoadButton);

var _reactIf = require('../../utils/react-if');

var _reactIf2 = _interopRequireDefault(_reactIf);

var _constants = require('../../constants');

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iconTextStyle = {
  fontSize: '19px',
  textDecoration: 'none',
  fontWeight: 'bold',
  margin: '0px',
  userSelect: 'none'
};

var Icon2D = function Icon2D(_ref) {
  var style = _ref.style;
  return _react2.default.createElement(
    'p',
    { style: _extends({}, iconTextStyle, style) },
    '2D'
  );
};
var Icon3D = function Icon3D(_ref2) {
  var style = _ref2.style;
  return _react2.default.createElement(
    'p',
    { style: _extends({}, iconTextStyle, style) },
    '3D'
  );
};

var ASIDE_STYLE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  padding: '10px'
};

var sortButtonsCb = function sortButtonsCb(a, b) {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

var mapButtonsCb = function mapButtonsCb(el, ind) {
  return _react2.default.createElement(
    _reactIf2.default,
    {
      key: ind,
      condition: el.condition,
      style: { position: 'relative' }
    },
    el.dom
  );
};

var Toolbar = function (_Component) {
  _inherits(Toolbar, _Component);

  function Toolbar(props, context) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props, context));

    _this.state = {};
    return _this;
  }

  _createClass(Toolbar, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.state.mode !== nextProps.state.mode || this.props.height !== nextProps.height || this.props.width !== nextProps.width || this.props.state.alterate !== nextProps.state.alterate;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          state = _props.state,
          width = _props.width,
          height = _props.height,
          toolbarButtons = _props.toolbarButtons,
          allowProjectFileSupport = _props.allowProjectFileSupport,
          _context = this.context,
          projectActions = _context.projectActions,
          viewer3DActions = _context.viewer3DActions,
          translator = _context.translator;


      var mode = state.get('mode');
      var alterate = state.get('alterate');
      var alterateColor = alterate ? SharedStyle.MATERIAL_COLORS[500].orange : '';

      var sorter = [{
        index: 0, condition: allowProjectFileSupport, dom: _react2.default.createElement(
          _toolbarButton2.default,
          {
            active: false,
            tooltip: translator.t('New project'),
            onClick: function onClick(event) {
              return confirm(translator.t('Would you want to start a new Project?')) ? projectActions.newProject() : null;
            } },
          _react2.default.createElement(_fa.FaFile, null)
        )
      }, {
        index: 1, condition: allowProjectFileSupport,
        dom: _react2.default.createElement(_toolbarSaveButton2.default, { state: state })
      }, {
        index: 2, condition: allowProjectFileSupport,
        dom: _react2.default.createElement(_toolbarLoadButton2.default, { state: state })
      }, {
        index: 3, condition: true,
        dom: _react2.default.createElement(
          _toolbarButton2.default,
          {
            active: [_constants.MODE_VIEWING_CATALOG].includes(mode),
            tooltip: translator.t('Open catalog'),
            onClick: function onClick(event) {
              return projectActions.openCatalog();
            } },
          _react2.default.createElement(_fa.FaPlus, null)
        )
      }, {
        index: 4, condition: true, dom: _react2.default.createElement(
          _toolbarButton2.default,
          {
            active: [_constants.MODE_3D_VIEW].includes(mode),
            tooltip: translator.t('3D View'),
            onClick: function onClick(event) {
              return viewer3DActions.selectTool3DView();
            } },
          _react2.default.createElement(Icon3D, null)
        )
      }, {
        index: 5, condition: true, dom: _react2.default.createElement(
          _toolbarButton2.default,
          {
            active: [_constants.MODE_IDLE].includes(mode),
            tooltip: translator.t('2D View'),
            onClick: function onClick(event) {
              return projectActions.setMode(_constants.MODE_IDLE);
            } },
          [_constants.MODE_3D_FIRST_PERSON, _constants.MODE_3D_VIEW].includes(mode) ? _react2.default.createElement(Icon2D, { style: { color: alterateColor } }) : _react2.default.createElement(_fa.FaMousePointer, { style: { color: alterateColor } })
        )
      }, {
        index: 6, condition: true, dom: _react2.default.createElement(
          _toolbarButton2.default,
          {
            active: [_constants.MODE_3D_FIRST_PERSON].includes(mode),
            tooltip: translator.t('3D First Person'),
            onClick: function onClick(event) {
              return viewer3DActions.selectTool3DFirstPerson();
            } },
          _react2.default.createElement(_md.MdDirectionsRun, null)
        )
      }, {
        index: 7, condition: true, dom: _react2.default.createElement(
          _toolbarButton2.default,
          {
            active: false,
            tooltip: translator.t('Undo (CTRL-Z)'),
            onClick: function onClick(event) {
              return projectActions.undo();
            } },
          _react2.default.createElement(_md.MdUndo, null)
        )
      }, {
        index: 8, condition: true, dom: _react2.default.createElement(
          _toolbarButton2.default,
          {
            active: [_constants.MODE_CONFIGURING_PROJECT].includes(mode),
            tooltip: translator.t('Configure project'),
            onClick: function onClick(event) {
              return projectActions.openProjectConfigurator();
            } },
          _react2.default.createElement(_md.MdSettings, null)
        )
      }];

      sorter = sorter.concat(toolbarButtons.map(function (Component, key) {
        return Component.prototype ? //if is a react component
        {
          condition: true,
          dom: _react2.default.createElement(Component, { mode: mode, state: state, key: key })
        } : { //else is a sortable toolbar button
          index: Component.index,
          condition: Component.condition,
          dom: _react2.default.createElement(Component.dom, { mode: mode, state: state, key: key })
        };
      }));

      return _react2.default.createElement(
        'aside',
        { style: _extends({}, ASIDE_STYLE, { maxWidth: width, maxHeight: height }), className: 'toolbar' },
        sorter.sort(sortButtonsCb).map(mapButtonsCb)
      );
    }
  }]);

  return Toolbar;
}(_react.Component);

exports.default = Toolbar;


Toolbar.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  allowProjectFileSupport: _propTypes2.default.bool.isRequired,
  toolbarButtons: _propTypes2.default.array
};

Toolbar.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  viewer2DActions: _propTypes2.default.object.isRequired,
  viewer3DActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};