'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _app = require('./app.jsx');

var _app2 = _interopRequireDefault(_app);

var _store = require('../reducers/store');

var _store2 = _interopRequireDefault(_store);

var _autosave = require('../autosave');

var _autosave2 = _interopRequireDefault(_autosave);

var _keyboard = require('../keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _catalog = require('./../catalog/catalog');

var _catalog2 = _interopRequireDefault(_catalog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Planner = function (_Component) {
  _inherits(Planner, _Component);

  function Planner() {
    _classCallCheck(this, Planner);

    return _possibleConstructorReturn(this, (Planner.__proto__ || Object.getPrototypeOf(Planner)).apply(this, arguments));
  }

  _createClass(Planner, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var catalog = _props.catalog;
      var onReady = _props.onReady;
      var customReducer = _props.customReducer;

      var store = (0, _store2.default)({ catalog: catalog }, customReducer);
      (0, _autosave2.default)(store);
      (0, _keyboard2.default)(store);
      onReady(store);
      this.store = store;
    }
  }, {
    key: 'render',
    value: function render() {
      var store = this.store;
      var _props2 = this.props;
      var catalog = _props2.catalog;
      var toolbarButtons = _props2.toolbarButtons;
      var customContents = _props2.customContents;


      return _react2.default.createElement(_app2.default, { store: store, catalog: catalog, toolbarButtons: toolbarButtons, customContents: customContents });
    }
  }]);

  return Planner;
}(_react.Component);

exports.default = Planner;


Planner.propTypes = {
  catalog: _react.PropTypes.instanceOf(_catalog2.default),
  toolbarButtons: _react.PropTypes.array,
  customContents: _react.PropTypes.object,
  customReducer: _react.PropTypes.func,
  onReady: _react.PropTypes.func
};

Planner.defaultProps = {
  catalog: new _catalog2.default(),
  toolbarButtons: [],
  customContents: {},
  onReady: function onReady() {},
  customReducer: function customReducer(state) {
    return state;
  }
};