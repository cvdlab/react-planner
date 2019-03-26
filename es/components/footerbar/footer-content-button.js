var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { FaTimes as IconClose } from 'react-icons/fa';

var labelContainerStyle = {
  width: 'auto',
  display: 'inline-block',
  margin: 0,
  padding: '0px 5px 0px 0px'
};

var toggleButtonStyle = {
  color: '#CCC',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none'
};

var toggleButtonStyleOver = _extends({}, toggleButtonStyle, {
  color: SharedStyle.COLORS.white
});

var contentContainerStyleActive = {
  position: 'fixed',
  width: 'calc( 100% - 2px )',
  height: '40%',
  left: 0,
  bottom: 20,
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  borderTop: SharedStyle.PRIMARY_COLOR.border,
  zIndex: 0,
  padding: 0,
  margin: 0,
  transition: 'all 300ms ease'
};

var contentContainerStyleInactive = _extends({}, contentContainerStyleActive, {
  visibility: 'hidden',
  height: 0
});

var contentHeaderStyle = {
  position: 'relative',
  width: '100%',
  height: '2em',
  top: 0,
  left: 0,
  borderBottom: SharedStyle.PRIMARY_COLOR.border
};

var titleStyle = {
  position: 'relative',
  height: '2em',
  lineHeight: '2em',
  marginLeft: '1em'
};

var contentAreaStyle = {
  position: 'relative',
  width: '100%',
  height: 'calc( 100% - 2em )',
  padding: '1em',
  overflowY: 'auto'
};

var iconCloseStyleOut = {
  position: 'absolute',
  width: '2em',
  height: '2em',
  right: 0,
  top: 0,
  padding: '0.5em',
  borderLeft: SharedStyle.PRIMARY_COLOR.border,
  cursor: 'pointer'
};

var iconCloseStyleOver = _extends({}, iconCloseStyleOut, {
  color: SharedStyle.COLORS.white,
  backgroundColor: SharedStyle.SECONDARY_COLOR.alt
});

var iconStyle = {
  width: '15px',
  height: '15px',
  marginTop: '-2px',
  marginRight: '2px'
};

var textStyle = {
  position: 'relative'
};

var FooterContentButton = function (_Component) {
  _inherits(FooterContentButton, _Component);

  function FooterContentButton(props) {
    _classCallCheck(this, FooterContentButton);

    var _this = _possibleConstructorReturn(this, (FooterContentButton.__proto__ || Object.getPrototypeOf(FooterContentButton)).call(this, props));

    _this.state = {
      over: false,
      closeOver: false,
      active: _this.props.toggleState || false
    };
    return _this;
  }

  _createClass(FooterContentButton, [{
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
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.over != nextState.over) return true;
      if (this.state.closeOver != nextState.closeOver) return true;
      if (this.state.active != nextState.active) return true;

      if (this.props.content.length != nextProps.content.length) return true;
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

      var s = this.state;
      var p = this.props;

      var LabelIcon = p.icon || null;
      var labelIconStyle = p.iconStyle || {};
      var labelTextStyle = p.textStyle || {};
      var inputTitleStyle = p.titleStyle || {};

      return React.createElement(
        'div',
        { style: labelContainerStyle },
        React.createElement(
          'div',
          {
            style: s.over || s.active ? toggleButtonStyleOver : toggleButtonStyle,
            onClick: function onClick(e) {
              return _this2.toggle(e);
            },
            title: p.title
          },
          React.createElement(LabelIcon, { style: _extends({}, labelIconStyle, iconStyle) }),
          React.createElement(
            'span',
            { style: _extends({}, textStyle, labelTextStyle) },
            p.text
          )
        ),
        React.createElement(
          'div',
          { style: s.active ? contentContainerStyleActive : contentContainerStyleInactive },
          React.createElement(
            'div',
            { style: contentHeaderStyle },
            React.createElement(
              'b',
              { style: _extends({}, titleStyle, inputTitleStyle) },
              p.title
            ),
            React.createElement(IconClose, {
              style: s.closeOver ? iconCloseStyleOver : iconCloseStyleOut,
              onMouseOver: function onMouseOver(e) {
                return _this2.setState({ closeOver: true });
              },
              onMouseOut: function onMouseOut(e) {
                return _this2.setState({ closeOver: false });
              },
              onClick: function onClick(e) {
                return _this2.toggle(e);
              }
            })
          ),
          React.createElement(
            'div',
            { style: contentAreaStyle },
            p.content
          )
        )
      );
    }
  }]);

  return FooterContentButton;
}(Component);

export default FooterContentButton;


FooterContentButton.propTypes = {
  state: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
  icon: PropTypes.func,
  iconStyle: PropTypes.object,
  content: PropTypes.array.isRequired,
  toggleState: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: PropTypes.object
};

FooterContentButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};