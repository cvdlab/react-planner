var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdNavigateBefore } from 'react-icons/md';
import * as SharedStyle from '../../shared-style';

var STYLE_BOX = {
  width: '14em',
  height: '14em',
  padding: '0.625em',
  background: '#f7f7f9',
  border: '1px solid #e1e1e8',
  margin: '0.3em',
  cursor: 'pointer',
  position: 'relative',
  boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)',
  borderRadius: '2px',
  transition: 'all .2s ease-in-out',
  WebkitTransition: 'all .2s ease-in-out'
};

var STYLE_BOX_HOVER = _extends({}, STYLE_BOX, {
  background: SharedStyle.SECONDARY_COLOR.main
});

var STYLE_BACK = {
  position: 'absolute',
  color: SharedStyle.COLORS.black,
  fontSize: '5em',
  width: '100%'
};

var STYLE_BACK_HOVER = _extends({}, STYLE_BACK, {
  color: SharedStyle.SECONDARY_COLOR.main
});

var CONTAINER_DIV = {
  background: SharedStyle.COLORS.white,
  marginBottom: '5px',
  border: 'solid 1px #e6e6e6',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

var CatalogTurnBackPageItem = function (_Component) {
  _inherits(CatalogTurnBackPageItem, _Component);

  function CatalogTurnBackPageItem(props) {
    _classCallCheck(this, CatalogTurnBackPageItem);

    var _this = _possibleConstructorReturn(this, (CatalogTurnBackPageItem.__proto__ || Object.getPrototypeOf(CatalogTurnBackPageItem)).call(this, props));

    _this.state = { hover: false };
    return _this;
  }

  _createClass(CatalogTurnBackPageItem, [{
    key: 'changePage',
    value: function changePage(newPage) {
      this.context.projectActions.goBackToCatalogPage(newPage);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var page = this.props.page;
      var hover = this.state.hover;

      return React.createElement(
        'div',
        {
          style: hover ? STYLE_BOX_HOVER : STYLE_BOX,
          onClick: function onClick(e) {
            return _this2.changePage(page.name);
          },
          onMouseEnter: function onMouseEnter(e) {
            return _this2.setState({ hover: true });
          },
          onMouseLeave: function onMouseLeave(e) {
            return _this2.setState({ hover: false });
          }
        },
        React.createElement(
          'div',
          { style: CONTAINER_DIV },
          React.createElement(MdNavigateBefore, { style: !hover ? STYLE_BACK : STYLE_BACK_HOVER })
        )
      );
    }
  }]);

  return CatalogTurnBackPageItem;
}(Component);

export default CatalogTurnBackPageItem;


CatalogTurnBackPageItem.propTypes = {
  page: PropTypes.object.isRequired
};

CatalogTurnBackPageItem.contextTypes = {
  projectActions: PropTypes.object.isRequired
};