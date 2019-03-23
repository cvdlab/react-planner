var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _STYLE_DESCRIPTION;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaPlusCircle as IconAdd } from 'react-icons/fa';
import * as SharedStyle from '../../shared-style';

var STYLE_BOX = {
  width: '14em',
  height: '14em',
  padding: '0.625em',
  background: '#f7f7f9',
  border: '1px solid #e1e1e8',
  cursor: 'pointer',
  position: 'relative',
  boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)',
  borderRadius: '2px',
  transition: 'all .15s ease-in-out',
  WebkitTransition: 'all .15s ease-in-out',
  alignSelf: 'center',
  justifySelf: 'center'
};

var STYLE_BOX_HOVER = _extends({}, STYLE_BOX, {
  background: SharedStyle.SECONDARY_COLOR.main
});

var STYLE_TITLE = {
  width: '100%',
  textAlign: 'center',
  display: 'block',
  marginBottom: '.5em',
  textTransform: 'capitalize'
};

var STYLE_TITLE_HOVER = _extends({}, STYLE_TITLE, {
  color: SharedStyle.COLORS.white
});

var STYLE_IMAGE_CONTAINER = {
  width: '100%',
  height: '8em',
  position: 'relative',
  overflow: 'hidden',
  border: 'solid 1px #e6e6e6',
  padding: 0,
  margin: 0,
  marginBottom: '5px'
};

var STYLE_IMAGE = {
  position: 'absolute',
  background: '#222',
  width: '100%',
  height: '100%',
  backgroundSize: 'contain',
  backgroundPosition: '50% 50%',
  backgroundColor: SharedStyle.COLORS.white,
  backgroundRepeat: 'no-repeat',
  transition: 'all .2s ease-in-out'
};

var STYLE_IMAGE_HOVER = _extends({}, STYLE_IMAGE, {
  transform: 'scale(1.2)'
});

var STYLE_PLUS_HOVER = {
  marginTop: '1.5em',
  color: SharedStyle.SECONDARY_COLOR.main,
  fontSize: '2em',
  opacity: '0.7',
  width: '100%'
};

var STYLE_DESCRIPTION = (_STYLE_DESCRIPTION = {
  display: 'block'
}, _defineProperty(_STYLE_DESCRIPTION, 'display', '-webkit-box'), _defineProperty(_STYLE_DESCRIPTION, 'height', '2em'), _defineProperty(_STYLE_DESCRIPTION, 'margin', '0 auto'), _defineProperty(_STYLE_DESCRIPTION, 'fontSize', '0.75em'), _defineProperty(_STYLE_DESCRIPTION, 'fontStyle', 'italic'), _defineProperty(_STYLE_DESCRIPTION, 'lineHeight', '1em'), _defineProperty(_STYLE_DESCRIPTION, 'WebkitLineClamp', '2'), _defineProperty(_STYLE_DESCRIPTION, 'WebkitBoxOrient', 'vertical'), _defineProperty(_STYLE_DESCRIPTION, 'overflow', 'hidden'), _defineProperty(_STYLE_DESCRIPTION, 'textOverflow', 'ellipsis'), _STYLE_DESCRIPTION);

var STYLE_TAGS = {
  listStyle: 'none',
  margin: '0px',
  padding: '0px',
  fontSize: '11px',
  marginBottom: '3px'
};

var STYLE_TAG = {
  display: 'inline-block',
  background: '#337ab7',
  color: SharedStyle.COLORS.white,
  padding: '1px 4px',
  marginRight: '3px',
  borderRadius: '3px'
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

      switch (element.prototype) {
        case 'lines':
          this.context.linesActions.selectToolDrawingLine(element.name);
          break;
        case 'items':
          this.context.itemsActions.selectToolDrawingItem(element.name);
          break;
        case 'holes':
          this.context.holesActions.selectToolDrawingHole(element.name);
          break;
      }

      this.context.projectActions.pushLastSelectedCatalogElementToHistory(element);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var element = this.props.element;
      var hover = this.state.hover;

      return React.createElement(
        'div',
        {
          style: hover ? STYLE_BOX_HOVER : STYLE_BOX,
          onClick: function onClick(e) {
            return _this2.select();
          },
          onMouseEnter: function onMouseEnter(e) {
            return _this2.setState({ hover: true });
          },
          onMouseLeave: function onMouseLeave(e) {
            return _this2.setState({ hover: false });
          }
        },
        React.createElement(
          'b',
          { style: !hover ? STYLE_TITLE : STYLE_TITLE_HOVER },
          element.info.title
        ),
        React.createElement(
          'div',
          { style: STYLE_IMAGE_CONTAINER },
          React.createElement(
            'div',
            { style: _extends({}, !hover ? STYLE_IMAGE : STYLE_IMAGE_HOVER, { backgroundImage: 'url(' + element.info.image + ')' }) },
            hover ? React.createElement(IconAdd, { style: STYLE_PLUS_HOVER }) : null
          )
        ),
        React.createElement(
          'ul',
          { style: STYLE_TAGS },
          element.info.tag.map(function (tag, index) {
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
        )
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
  holesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};