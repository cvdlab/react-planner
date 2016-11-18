'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _store = require('../reducers/store');

var _store2 = _interopRequireDefault(_store);

var _keyboard = require('../keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _catalog = require('./../catalog/catalog');

var _catalog2 = _interopRequireDefault(_catalog);

var _mergePlugins = require('../utils/merge-plugins');

var _mergePlugins2 = _interopRequireDefault(_mergePlugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Planner = function (_Component) {
  _inherits(Planner, _Component);

  function Planner(props) {
    _classCallCheck(this, Planner);

    var _this = _possibleConstructorReturn(this, (Planner.__proto__ || Object.getPrototypeOf(Planner)).call(this, props));

    var plugins = props.plugins;

    _this.state = _extends({}, (0, _mergePlugins2.default)(plugins));
    return _this;
  }

  _createClass(Planner, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var catalog = this.props.catalog;
      var _state = this.state,
          customReducer = _state.customReducer,
          actionsExtraArgument = _state.actionsExtraArgument,
          onReady = _state.onReady;


      var store = (0, _store2.default)(_extends({}, actionsExtraArgument, { catalog: catalog }), customReducer);
      (0, _keyboard2.default)(store);
      onReady(store);
      this.store = store;
    }
  }, {
    key: 'render',
    value: function render() {
      var store = this.store;
      var catalog = this.props.catalog;
      var _state2 = this.state,
          toolbarButtons = _state2.toolbarButtons,
          customContents = _state2.customContents,
          customActions = _state2.customActions;


      customActions = (0, _redux.bindActionCreators)(customActions, store.dispatch);

      return _react2.default.createElement(_app2.default, {
        store: store,
        catalog: catalog,
        toolbarButtons: toolbarButtons,
        customContents: customContents,
        customActions: customActions });
    }
  }]);

  return Planner;
}(_react.Component);

exports.default = Planner;


Planner.propTypes = {
  catalog: _react.PropTypes.instanceOf(_catalog2.default),
  plugins: _react.PropTypes.arrayOf(_react.PropTypes.object)
};

Planner.defaultProps = {
  catalog: new _catalog2.default(),
  plugins: []
};