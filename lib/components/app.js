"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactDimensions = require('react-dimensions');

var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

var _actions = require('../actions/actions');

var _actions2 = _interopRequireDefault(_actions);

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var ctx = {
        catalog: this.props.catalog,
        customActions: this.props.customActions
      };

      for (var actionGroupName in _actions2.default) {
        ctx[actionGroupName] = this.props[actionGroupName];
      }

      return ctx;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      window.ReactPlanner = _extends({
        store: this.props.store,
        getState: function getState() {
          return _this2.props.store.getState().toJS();
        }
      }, _actions2.default, {
        customActions: this.props.customActions,
        do: function _do(actions) {
          var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

          actions = actions.reverse();
          var dispatch = _this2.props.store.dispatch;
          var dispatchAction = function dispatchAction() {
            console.info('There are other ' + actions.length + ' actions on stack');
            if (actions.length === 0) return;
            dispatch(actions.pop());
            if (actions.length === 0) return;
            setTimeout(dispatchAction, delay);
          };
          setTimeout(dispatchAction, 0);
        }
      });
      console.groupCollapsed("ReactPlanner");
      console.info("ReactPlanner is ready");
      console.info("console.log(ReactPlanner)");
      console.log(window.ReactPlanner);
      console.groupEnd();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var containerWidth = _props.containerWidth;
      var containerHeight = _props.containerHeight;

      var props = _objectWithoutProperties(_props, ['containerWidth', 'containerHeight']);

      return _react2.default.createElement(_layout2.default, _extends({ width: containerWidth, height: containerHeight }, props));
    }
  }]);

  return App;
}(_react2.default.Component);

App.childContextTypes = {
  catalog: _react.PropTypes.object,
  customActions: _react.PropTypes.object
};
for (var actionName in _actions2.default) {
  App.childContextTypes[actionName] = _react.PropTypes.object;
}

function mapStateToProps(state) {
  return { state: state };
}

function mapDispatchToProps(dispatch) {
  var dispatchableActions = {};
  for (var actionGroupName in _actions2.default) {
    dispatchableActions[actionGroupName] = (0, _redux.bindActionCreators)(_actions2.default[actionGroupName], dispatch);
  }
  return dispatchableActions;
}

App = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);
App = (0, _reactDimensions2.default)()(App);
exports.default = App;