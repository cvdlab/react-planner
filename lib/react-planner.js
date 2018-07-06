'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _translator = require('./translator/translator');

var _translator2 = _interopRequireDefault(_translator);

var _catalog = require('./catalog/catalog');

var _catalog2 = _interopRequireDefault(_catalog);

var _export = require('./actions/export');

var _export2 = _interopRequireDefault(_export);

var _objectsUtils = require('./utils/objects-utils');

var _export3 = require('./components/export');

var _version = require('./version');

require('./styles/export');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = _export3.ToolbarComponents.Toolbar;
var Sidebar = _export3.SidebarComponents.Sidebar;
var FooterBar = _export3.FooterBarComponents.FooterBar;


var toolbarW = 50;
var sidebarW = 300;
var footerBarH = 20;

var wrapperStyle = {
  display: 'flex',
  flexFlow: 'row nowrap'
};

var ReactPlanner = function (_Component) {
  _inherits(ReactPlanner, _Component);

  function ReactPlanner() {
    _classCallCheck(this, ReactPlanner);

    return _possibleConstructorReturn(this, (ReactPlanner.__proto__ || Object.getPrototypeOf(ReactPlanner)).apply(this, arguments));
  }

  _createClass(ReactPlanner, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return _extends({}, (0, _objectsUtils.objectsMap)(_export2.default, function (actionNamespace) {
        return _this2.props[actionNamespace];
      }), {
        translator: this.props.translator,
        catalog: this.props.catalog
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var store = this.context.store;
      var _props = this.props,
          projectActions = _props.projectActions,
          catalog = _props.catalog,
          stateExtractor = _props.stateExtractor,
          plugins = _props.plugins;

      plugins.forEach(function (plugin) {
        return plugin(store, stateExtractor);
      });
      projectActions.initCatalog(catalog);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var stateExtractor = nextProps.stateExtractor,
          state = nextProps.state,
          projectActions = nextProps.projectActions,
          catalog = nextProps.catalog;

      var plannerState = stateExtractor(state);
      var catalogReady = plannerState.getIn(['catalog', 'ready']);
      if (!catalogReady) {
        projectActions.initCatalog(catalog);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height,
          state = _props2.state,
          stateExtractor = _props2.stateExtractor,
          props = _objectWithoutProperties(_props2, ['width', 'height', 'state', 'stateExtractor']);

      var contentW = width - toolbarW - sidebarW;
      var toolbarH = height - footerBarH;
      var contentH = height - footerBarH;
      var sidebarH = height - footerBarH;

      var extractedState = stateExtractor(state);

      return _react2.default.createElement(
        'div',
        { style: _extends({}, wrapperStyle, { height: height }) },
        _react2.default.createElement(Toolbar, _extends({ width: toolbarW, height: toolbarH, state: extractedState }, props)),
        _react2.default.createElement(_export3.Content, _extends({ width: contentW, height: contentH, state: extractedState }, props, { onWheel: function onWheel(event) {
            return event.preventDefault();
          } })),
        _react2.default.createElement(Sidebar, _extends({ width: sidebarW, height: sidebarH, state: extractedState }, props)),
        _react2.default.createElement(FooterBar, _extends({ width: width, height: footerBarH, state: extractedState }, props))
      );
    }
  }]);

  return ReactPlanner;
}(_react.Component);

ReactPlanner.propTypes = {
  translator: _propTypes2.default.instanceOf(_translator2.default),
  catalog: _propTypes2.default.instanceOf(_catalog2.default),
  allowProjectFileSupport: _propTypes2.default.bool,
  plugins: _propTypes2.default.arrayOf(_propTypes2.default.func),
  autosaveKey: _propTypes2.default.string,
  autosaveDelay: _propTypes2.default.number,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  stateExtractor: _propTypes2.default.func.isRequired,
  toolbarButtons: _propTypes2.default.array,
  sidebarComponents: _propTypes2.default.array,
  footerbarComponents: _propTypes2.default.array,
  customContents: _propTypes2.default.object,
  softwareSignature: _propTypes2.default.string
};

ReactPlanner.contextTypes = {
  store: _propTypes2.default.object.isRequired
};

ReactPlanner.childContextTypes = _extends({}, (0, _objectsUtils.objectsMap)(_export2.default, function () {
  return _propTypes2.default.object;
}), {
  translator: _propTypes2.default.object,
  catalog: _propTypes2.default.object
});

ReactPlanner.defaultProps = {
  translator: new _translator2.default(),
  catalog: new _catalog2.default(),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: 'React-Planner ' + _version.VERSION,
  toolbarButtons: [],
  sidebarComponents: [],
  footerbarComponents: [],
  customContents: {}
};

//redux connect
function mapStateToProps(reduxState) {
  return {
    state: reduxState
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _objectsUtils.objectsMap)(_export2.default, function (actionNamespace) {
    return (0, _redux.bindActionCreators)(_export2.default[actionNamespace], dispatch);
  });
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReactPlanner);