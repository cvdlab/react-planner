import React from 'react';
import PropTypes from 'prop-types';
import CatalogItem from './catalog-item';
import CatalogBreadcrumb from './catalog-breadcrumb';
import CatalogPageItem from './catalog-page-item';
import CatalogTurnBackPageItem from './catalog-turn-back-page-item';
import ContentContainer from '../style/content-container';
import ContentTitle from '../style/content-title';

var STYLE_ITEMS = {
  display: "flex",
  flexFlow: "row wrap"
};

export default function CatalogList(_ref, _ref2) {
  var width = _ref.width,
      height = _ref.height,
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

    breadcrumbsNames.push({ name: currentCategory.label, action: "" });

    breadcrumbComponent = React.createElement(CatalogBreadcrumb, { names: breadcrumbsNames });
  }

  var pathSize = state.catalog.path.size;

  var turnBackButton = pathSize > 0 ? React.createElement(CatalogTurnBackPageItem, { page: catalog.categories[state.catalog.path.get(pathSize - 1)] }) : null;

  return React.createElement(
    ContentContainer,
    { width: width, height: height },
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
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};

CatalogList.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};