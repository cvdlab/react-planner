var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes, Component } from 'react';
import IconAdd from 'react-icons/lib/fa/plus-circle';
import If from '../../utils/react-if';
import { Seq } from 'immutable';

var STYLE_BOX = {
  width: "13.75em",
  height: "13.75em",
  padding: "0.625em",
  background: "#f7f7f9",
  border: "1px solid #e1e1e8",
  margin: "0.3em",
  cursor: "pointer",
  position: "relative",
  boxShadow: "0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)",
  borderRadius: "2px"
};

var STYLE_BOX_HOVER = _extends({}, STYLE_BOX, {
  background: "#1ca6fc"
});

var STYLE_IMAGE = {
  background: "#222",
  marginBottom: "5px",
  border: "solid 1px #e6e6e6",
  width: '100%',
  height: '8em',
  backgroundSize: 'contain',
  backgroundPosition: '50% 50%',
  backgroundColor: '#FFF',
  backgroundRepeat: 'no-repeat'
};

var STYLE_PLUS_HOVER = {
  marginTop: '1.5em',
  color: "#1ca6fc",
  fontSize: "2em",
  opacity: "0.7",
  width: '100%'
};

var STYLE_DESCRIPTION = {
  fontSize: "0.75em"
};

var STYLE_ICON = {
  position: "absolute",
  bottom: "5px",
  right: "10px"
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
      var _context = this.context,
          linesActions = _context.linesActions,
          holesActions = _context.holesActions,
          itemsActions = _context.itemsActions;


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

      return React.createElement(
        'div',
        { style: hover ? STYLE_BOX_HOVER : STYLE_BOX,
          onClick: function onClick(e) {
            return _this2.select();
          },
          onMouseEnter: function onMouseEnter(e) {
            return _this2.setState({ hover: true });
          },
          onMouseLeave: function onMouseLeave(e) {
            return _this2.setState({ hover: false });
          } },
        React.createElement(
          'div',
          { style: _extends({}, STYLE_IMAGE, { backgroundImage: 'url(' + element.info.image + ')' }) },
          hover ? React.createElement(IconAdd, { style: STYLE_PLUS_HOVER }) : null
        ),
        React.createElement(
          'b',
          null,
          element.info.title
        ),
        React.createElement(
          'ul',
          { style: STYLE_TAGS },
          new Seq(element.info.tag).map(function (tag, index) {
            return React.createElement(
              'li',
              { style: STYLE_TAG, key: index },
              tag
            );
          })
        ),
        React.createElement(
          'div',
          { style: STYLE_DESCRIPTION },
          element.info.description
        ),
        React.createElement(IconAdd, { style: STYLE_ICON })
      );
    }
  }]);

  return CatalogItem;
}(Component);

export default CatalogItem;


CatalogItem.propTypes = {
  element: PropTypes.object.isRequired
};

CatalogItem.contextTypes = {
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired
};