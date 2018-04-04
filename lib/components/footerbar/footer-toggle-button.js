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

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var toggleButtonStyle = {
  width: '5.5em',
  color: '#CCC',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  border: '1px solid transparent',
  margin: '-1px 5px 0 5px',
  borderRadius: '2px',
  display: 'inline-block'
};

var toggleButtonStyleOver = _extends({}, toggleButtonStyle, {
  backgroundColor: '#1c82c6',
  border: '1px solid #FFF',
  color: SharedStyle.COLORS.white
});

var FooterToggleButton = function (_Component) {
  _inherits(FooterToggleButton, _Component);

  function FooterToggleButton(props) {
    _classCallCheck(this, FooterToggleButton);

    var _this = _possibleConstructorReturn(this, (FooterToggleButton.__proto__ || Object.getPrototypeOf(FooterToggleButton)).call(this, props));

    _this.state = {
      over: false,
      active: _this.props.toggleState || false
    };
    return _this;
  }

  _createClass(FooterToggleButton, [{
    key: 'toggleOver',
    value: function toggleOver(e) {
      this.setState({ over: true });
    }
  }, {
    key: 'toggleOut',
    value: function toggleOut(e) {
      this.setState({ over: false });
    }
  }, {
    key: 'toggle',
    value: function toggle(e) {
      var isActive = !this.state.active;
      this.setState({ active: isActive });

      if (isActive) {
        this.props.toggleOn();
      } else {
        this.props.toggleOff();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.over != nextState.over) return true;
      if (this.state.active != nextState.active) return true;
      if (this.props.toggleState != nextProps.toggleState) return true;

      return false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.toggleState != this.props.toggleState) this.state.active = nextProps.toggleState;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          style: this.state.over || this.state.active ? toggleButtonStyleOver : toggleButtonStyle,
          onMouseOver: function onMouseOver(e) {
            return _this2.toggleOver(e);
          },
          onMouseOut: function onMouseOut(e) {
            return _this2.toggleOut(e);
          },
          onClick: function onClick(e) {
            return _this2.toggle(e);
          },
          title: this.props.title
        },
        this.props.text
      );
    }
  }]);

  return FooterToggleButton;
}(_react.Component);

exports.default = FooterToggleButton;


FooterToggleButton.propTypes = {
  state: _propTypes2.default.object.isRequired,
  toggleOn: _propTypes2.default.func.isRequired,
  toggleOff: _propTypes2.default.func.isRequired,
  text: _propTypes2.default.string.isRequired,
  toggleState: _propTypes2.default.bool,
  title: _propTypes2.default.string
};

FooterToggleButton.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  viewer2DActions: _propTypes2.default.object.isRequired,
  viewer3DActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};