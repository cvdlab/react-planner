'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _plusCircle = require('react-icons/lib/fa/plus-circle');

var _plusCircle2 = _interopRequireDefault(_plusCircle);

var _reactIf = require('../../utils/react-if.jsx');

var _reactIf2 = _interopRequireDefault(_reactIf);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STYLE_BOX = {
  width: "200px",
  height: "200px",
  padding: "10px",
  background: "#f7f7f9",
  border: "1px solid #e1e1e8",
  margin: "5px",
  cursor: "pointer",
  position: "relative",
  boxShadow: "rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px",
  borderRadius: "2px"
};

var STYLE_BOX_HOVER = _extends({}, STYLE_BOX, {
  background: "#1ca6fc"
});

var STYLE_IMAGE = {
  width: "200px",
  height: "130px",
  background: "#222",
  marginBottom: "5px",
  border: "solid 1px #e6e6e6"
};

var STYLE_NAME = {
  fontSize: "16px",
  fontWeight: "bold"
};

var STYLE_DESCRIPTION = {
  fontSize: "12px"
};

var STYLE_ICON = {
  position: "absolute",
  bottom: "5px",
  right: "10px"
};

var STYLE_SELECT = {
  position: "absolute",
  top: "55px",
  color: "#1ca6fc",
  textAlign: "center",
  width: "200px",
  fontSize: "30px",
  opacity: "0.7"
};

var STYLE_TAGS = {
  listStyle: "none",
  margin: "0px",
  padding: "0px",
  fontSize: "11px",
  marginBottom: "3px"
};

var STYLE_TAG = {
  display: "inline-block",
  background: "#337ab7",
  color: "#fff",
  padding: "1px 4px",
  marginRight: "3px",
  borderRadius: "3px"
};

var CatalogItem = function (_Component) {
  _inherits(CatalogItem, _Component);

  function CatalogItem(props) {
    _classCallCheck(this, CatalogItem);

    var _this = _possibleConstructorReturn(this, (CatalogItem.__proto__ || Object.getPrototypeOf(CatalogItem)).call(this, props));

    _this.state = { hover: false };
    return _this;
  }

  _createClass(CatalogItem, [{
    key: 'select',
    value: function select() {
      var element = this.props.element;
      var _context = this.context;
      var linesActions = _context.linesActions;
      var holesActions = _context.holesActions;
      var itemsActions = _context.itemsActions;


      switch (element.prototype) {
        case 'lines':
          linesActions.selectToolDrawingLine(element.name);
          break;
        case 'items':
          itemsActions.selectToolDrawingItem(element.name);
          break;
        case 'holes':
          holesActions.selectToolDrawingHole(element.name);
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var element = this.props.element;
      var hover = this.state.hover;


      return _react2.default.createElement(
        'div',
        { style: hover ? STYLE_BOX_HOVER : STYLE_BOX,
          onClick: function onClick(event) {
            return _this2.select();
          },
          onMouseEnter: function onMouseEnter(e) {
            return _this2.setState({ hover: true });
          },
          onMouseLeave: function onMouseLeave(e) {
            return _this2.setState({ hover: false });
          } },
        _react2.default.createElement('img', { style: STYLE_IMAGE, src: element.info.image }),
        _react2.default.createElement(
          _reactIf2.default,
          { condition: hover },
          _react2.default.createElement(
            'div',
            { style: STYLE_SELECT },
            _react2.default.createElement(_plusCircle2.default, null)
          )
        ),
        _react2.default.createElement(
          'div',
          { style: STYLE_NAME },
          element.name
        ),
        _react2.default.createElement(
          'ul',
          { style: STYLE_TAGS },
          new _immutable.Seq(element.info.tag).map(function (tag, index) {
            return _react2.default.createElement(
              'li',
              { style: STYLE_TAG, key: index },
              tag
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { style: STYLE_DESCRIPTION },
          element.info.description
        ),
        _react2.default.createElement(
          'div',
          { style: STYLE_ICON },
          _react2.default.createElement(_plusCircle2.default, null)
        )
      );
    }
  }]);

  return CatalogItem;
}(_react.Component);

exports.default = CatalogItem;


CatalogItem.propTypes = {
  element: _react.PropTypes.object.isRequired
};

CatalogItem.contextTypes = {
  itemsActions: _react.PropTypes.object.isRequired,
  linesActions: _react.PropTypes.object.isRequired,
  holesActions: _react.PropTypes.object.isRequired
};