'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STYLE_WRAPPER_BUTTONS = { textAlign: "right" };
var STYLE_BUTTON_UNSELECT = { backgroundColor: "gray", border: 0, color: "white", margin: "3px" };
var STYLE_BUTTON_RESET = { backgroundColor: "gray", border: 0, color: "white", margin: "3px" };
var STYLE_BUTTON_SAVE = { backgroundColor: "green", border: 0, color: "white", margin: "3px" };
var STYLE_BUTTON_REMOVE = { backgroundColor: "red", border: 0, color: "white", margin: "3px" };

var PropertiesEditor = function (_Component) {
  _inherits(PropertiesEditor, _Component);

  function PropertiesEditor(props, context) {
    _classCallCheck(this, PropertiesEditor);

    var _this = _possibleConstructorReturn(this, (PropertiesEditor.__proto__ || Object.getPrototypeOf(PropertiesEditor)).call(this, props, context));

    _this.calculateDefaultState = _this.calculateDefaultState.bind(_this);
    _this.reset = _this.reset.bind(_this);
    _this.save = _this.save.bind(_this);
    _this.updateProperty = _this.updateProperty.bind(_this);
    _this.state = _this.calculateDefaultState();
    return _this;
  }

  _createClass(PropertiesEditor, [{
    key: 'calculateDefaultState',
    value: function calculateDefaultState() {
      var element = this.props.element;
      var catalog = this.context.catalog;

      var catalogElement = catalog.getElement(element.type);

      return (0, _immutable.Seq)(catalogElement.properties).map(function (configs, propertyName) {

        var currentValue = element.properties.has(propertyName) ? function (v) {
          return _immutable.Iterable.isIterable(v) ? v.toJS() : v;
        }(element.properties.get(propertyName)) : configs.defaultValue;

        return {
          currentValue: currentValue,
          inputElement: configs.type,
          configs: configs
        };
      }).toJS();
    }
  }, {
    key: 'updateProperty',
    value: function updateProperty(propertyName, value) {
      this.setState(_defineProperty({}, propertyName, _extends({}, this.state[propertyName], {
        currentValue: value
      })));
    }
  }, {
    key: 'reset',
    value: function reset() {
      var state = this.calculateDefaultState();
      this.setState(state);
    }
  }, {
    key: 'save',
    value: function save() {
      var state = this.state;
      var _props = this.props,
          element = _props.element,
          layer = _props.layer;
      var _context = this.context,
          editingActions = _context.editingActions,
          catalog = _context.catalog;


      var properties = (0, _immutable.Seq)(state).map(function (data) {
        return data.currentValue;
      }).toMap().toJS();
      editingActions.setProperties(properties);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var state = this.state,
          _context2 = this.context,
          editingActions = _context2.editingActions,
          catalog = _context2.catalog,
          appState = this.props.state;


      var renderInputElement = function renderInputElement(inputElement, propertyName, value, configs) {
        var _catalog$propertyType = catalog.propertyTypes[inputElement],
            Viewer = _catalog$propertyType.Viewer,
            Editor = _catalog$propertyType.Editor;


        return _react2.default.createElement(Editor, {
          key: propertyName,
          propertyName: propertyName,
          value: value,
          configs: configs,
          onUpdate: function onUpdate(value) {
            return _this2.updateProperty(propertyName, value);
          },
          state: appState
        });
      };

      return _react2.default.createElement(
        'div',
        null,
        (0, _immutable.Seq)(state).entrySeq().map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              propertyName = _ref2[0],
              _ref2$ = _ref2[1],
              currentValue = _ref2$.currentValue,
              inputElement = _ref2$.inputElement,
              configs = _ref2$.configs;

          return renderInputElement(inputElement, propertyName, currentValue, configs);
        }),
        _react2.default.createElement(
          'div',
          { style: STYLE_WRAPPER_BUTTONS },
          _react2.default.createElement(
            'button',
            { style: STYLE_BUTTON_UNSELECT, onClick: function onClick(event) {
                return editingActions.unselectAll();
              } },
            'Unselect'
          ),
          _react2.default.createElement(
            'button',
            { style: STYLE_BUTTON_REMOVE, onClick: function onClick(event) {
                return editingActions.remove();
              } },
            'Remove'
          ),
          _react2.default.createElement(
            'button',
            { style: STYLE_BUTTON_RESET, onClick: function onClick(event) {
                return _this2.reset();
              } },
            'Reset'
          ),
          _react2.default.createElement(
            'button',
            { style: STYLE_BUTTON_SAVE, onClick: function onClick(event) {
                return _this2.save();
              } },
            'Save'
          )
        )
      );
    }
  }]);

  return PropertiesEditor;
}(_react.Component);

PropertiesEditor.propTypes = {
  state: _react.PropTypes.object.isRequired,
  element: _react.PropTypes.object.isRequired,
  layer: _react.PropTypes.object.isRequired
};

PropertiesEditor.contextTypes = {
  editingActions: _react.PropTypes.object.isRequired,
  catalog: _react.PropTypes.object.isRequired
};