var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CatalogItem from './catalog-item';
import CatalogBreadcrumb from './catalog-breadcrumb';
import CatalogPageItem from './catalog-page-item';
import CatalogTurnBackPageItem from './catalog-turn-back-page-item';
import ContentContainer from '../style/content-container';
import ContentTitle from '../style/content-title';
import * as SharedStyle from '../../shared-style';

var containerStyle = {
  position: 'fixed',
  width: 'calc( 100% - 51px)',
  height: 'calc( 100% - 20px)',
  backgroundColor: '#FFF',
  padding: '1em',
  left: 50,
  overflowY: 'auto',
  overflowX: 'hidden',
  zIndex: 10
};

var itemsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(14em, 1fr))',
  gridGap: '10px',
  marginTop: '1em'
};

var searchContainer = {
  width: '100%',
  height: '3em',
  padding: '0.625em',
  background: '#f7f7f9',
  border: '1px solid #e1e1e8',
  cursor: 'pointer',
  position: 'relative',
  boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)',
  borderRadius: '2px',
  transition: 'all .2s ease-in-out',
  WebkitTransition: 'all .2s ease-in-out',
  marginBottom: '1em'
};

var searchText = {
  width: '8em',
  display: 'inline-block'
};

var searchInput = {
  width: 'calc( 100% - 10em )',
  height: '2em',
  margin: '0',
  padding: '0 1em',
  border: '1px solid #EEE'
};

var historyContainer = _extends({}, searchContainer, {
  padding: '0.2em 0.625em'
});

var historyElementStyle = {
  width: 'auto',
  height: '2em',
  lineHeight: '2em',
  textAlign: 'center',
  borderRadius: '1em',
  display: 'inline-block',
  cursor: 'pointer',
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  color: SharedStyle.PRIMARY_COLOR.text_main,
  textTransform: 'capitalize',
  margin: '0.25em',
  padding: '0 1em'
};

var CatalogList = function (_Component) {
  _inherits(CatalogList, _Component);

  function CatalogList(props, context) {
    _classCallCheck(this, CatalogList);

    var _this = _possibleConstructorReturn(this, (CatalogList.__proto__ || Object.getPrototypeOf(CatalogList)).call(this, props));

    var page = props.state.catalog.page;
    var currentCategory = context.catalog.getCategory(page);
    var categoriesToDisplay = currentCategory.categories;
    var elementsToDisplay = currentCategory.elements.filter(function (element) {
      return element.info.visibility ? element.info.visibility.catalog : true;
    });

    _this.state = {
      categories: currentCategory.categories,
      elements: elementsToDisplay,
      matchString: '',
      matchedElements: []
    };
    return _this;
  }

  _createClass(CatalogList, [{
    key: 'flattenCategories',
    value: function flattenCategories(categories) {
      var toRet = [];

      for (var x = 0; x < categories.length; x++) {
        var curr = categories[x];
        toRet = toRet.concat(curr.elements);
        if (curr.categories.length) toRet = toRet.concat(this.flattenCategories(curr.categories));
      }

      return toRet;
    }
  }, {
    key: 'matcharray',
    value: function matcharray(text) {

      var array = this.state.elements.concat(this.flattenCategories(this.state.categories));

      var filtered = [];

      if (text != '') {
        var regexp = new RegExp(text, 'i');
        for (var i = 0; i < array.length; i++) {
          if (regexp.test(array[i].info.title)) {
            filtered.push(array[i]);
          }
        }
      }

      this.setState({
        matchString: text,
        matchedElements: filtered
      });
    }
  }, {
    key: 'select',
    value: function select(element) {

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

      var page = this.props.state.catalog.page;
      var currentCategory = this.context.catalog.getCategory(page);
      var categoriesToDisplay = currentCategory.categories;
      var elementsToDisplay = currentCategory.elements.filter(function (element) {
        return element.info.visibility ? element.info.visibility.catalog : true;
      });

      var breadcrumbComponent = null;

      if (page !== 'root') {

        var breadcrumbsNames = [];

        this.props.state.catalog.path.forEach(function (pathName) {
          breadcrumbsNames.push({
            name: _this2.context.catalog.getCategory(pathName).label,
            action: function action() {
              return projectActions.goBackToCatalogPage(pathName);
            }
          });
        });

        breadcrumbsNames.push({ name: currentCategory.label, action: '' });

        breadcrumbComponent = React.createElement(CatalogBreadcrumb, { names: breadcrumbsNames });
      }

      var pathSize = this.props.state.catalog.path.size;

      var turnBackButton = pathSize > 0 ? React.createElement(CatalogTurnBackPageItem, { key: pathSize, page: this.context.catalog.categories[this.props.state.catalog.path.get(pathSize - 1)] }) : null;

      var selectedHistory = this.props.state.get('selectedElementsHistory');
      var selectedHistoryElements = selectedHistory.map(function (el, ind) {
        return React.createElement(
          'div',
          { key: ind, style: historyElementStyle, title: el.name, onClick: function onClick() {
              return _this2.select(el);
            } },
          el.name
        );
      });

      return React.createElement(
        ContentContainer,
        { width: this.props.width, height: this.props.height, style: _extends({}, containerStyle, this.props.style) },
        React.createElement(
          ContentTitle,
          null,
          this.context.translator.t('Catalog')
        ),
        breadcrumbComponent,
        React.createElement(
          'div',
          { style: searchContainer },
          React.createElement(
            'span',
            { style: searchText },
            this.context.translator.t('Search Element')
          ),
          React.createElement('input', { type: 'text', style: searchInput, onChange: function onChange(e) {
              _this2.matcharray(e.target.value);
            } })
        ),
        selectedHistory.size ? React.createElement(
          'div',
          { style: historyContainer },
          React.createElement(
            'span',
            null,
            this.context.translator.t('Last Selected')
          ),
          selectedHistoryElements
        ) : null,
        React.createElement(
          'div',
          { style: itemsStyle },
          this.state.matchString === '' ? [turnBackButton, categoriesToDisplay.map(function (cat) {
            return React.createElement(CatalogPageItem, { key: cat.name, page: cat, oldPage: currentCategory });
          }), elementsToDisplay.map(function (elem) {
            return React.createElement(CatalogItem, { key: elem.name, element: elem });
          })] : this.state.matchedElements.map(function (elem) {
            return React.createElement(CatalogItem, { key: elem.name, element: elem });
          })
        )
      );
    }
  }]);

  return CatalogList;
}(Component);

export default CatalogList;


CatalogList.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object
};

CatalogList.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};