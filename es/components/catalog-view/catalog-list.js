var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import CatalogItem from './catalog-item';
import CatalogBreadcrumb from './catalog-breadcrumb';
import CatalogPageItem from './catalog-page-item';
import CatalogTurnBackPageItem from './catalog-turn-back-page-item';
import ContentContainer from '../style/content-container';
import ContentTitle from '../style/content-title';

var CONTAINER_STYLE = {
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

var STYLE_ITEMS = {
  display: 'flex',
  flexFlow: 'row wrap'
};

export default function CatalogList(_ref, _ref2) {
  var width = _ref.width,
      height = _ref.height,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      state = _ref.state;
  var catalog = _ref2.catalog,
      translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var page = state.catalog.page;
  var currentCategory = catalog.getCategory(page);
  var categoriesToDisplay = currentCategory.categories;
  var elementsToDisplay = currentCategory.elements;

  var breadcrumbComponent = null;

  if (page !== 'root') {

    var breadcrumbsNames = [];

    state.catalog.path.forEach(function (pathName) {
      breadcrumbsNames.push({
        name: catalog.getCategory(pathName).label,
        action: function action() {
          return projectActions.goBackToCatalogPage(pathName);
        }
      });
    });

    breadcrumbsNames.push({ name: currentCategory.label, action: '' });

    breadcrumbComponent = React.createElement(CatalogBreadcrumb, { names: breadcrumbsNames });
  }

  var pathSize = state.catalog.path.size;

  var turnBackButton = pathSize > 0 ? React.createElement(CatalogTurnBackPageItem, { page: catalog.categories[state.catalog.path.get(pathSize - 1)] }) : null;

  return React.createElement(
    ContentContainer,
    { width: width, height: height, style: _extends({}, CONTAINER_STYLE, style) },
    React.createElement(
      ContentTitle,
      null,
      translator.t('Catalog')
    ),
    breadcrumbComponent,
    React.createElement(
      'div',
      { style: STYLE_ITEMS },
      turnBackButton,
      categoriesToDisplay.map(function (category) {
        return React.createElement(CatalogPageItem, { key: category.name, page: category,
          oldPage: currentCategory });
      }),
      elementsToDisplay.filter(function (element) {
        return element.prototype !== 'areas';
      }).map(function (element) {
        return React.createElement(CatalogItem, { key: element.name, element: element });
      })
    )
  );
}

CatalogList.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object
};

CatalogList.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};