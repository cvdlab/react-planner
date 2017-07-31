import React from 'react';
import PropTypes from 'prop-types';
import CatalogItem from './catalog-item';
import CatalogBreadcrumb from './catalog-breadcrumb';
import CatalogPageItem from './catalog-page-item';
import CatalogTurnBackPageItem from './catalog-turn-back-page-item';
import ContentContainer from '../style/content-container';
import ContentTitle from '../style/content-title';

const STYLE_ITEMS = {
  display: "flex",
  flexFlow: "row wrap",
};


export default function CatalogList({width, height, state}, {catalog, translator, projectActions}) {

  let page = state.catalog.page;
  let currentCategory = catalog.getCategory(page);
  let categoriesToDisplay = currentCategory.categories;
  let elementsToDisplay = currentCategory.elements;

  let breadcrumbsNames = [];

  state.catalog.path.forEach(pathName => {
    breadcrumbsNames.push({
      name: catalog.getCategory(pathName).label,
      action: () => projectActions.goBackToCatalogPage(pathName)
    });
  });

  breadcrumbsNames.push({name: currentCategory.label, action: ""});

  let pathSize = state.catalog.path.size;

  let turnBackButton = pathSize > 0 ? (
    <CatalogTurnBackPageItem page={catalog.categories[state.catalog.path.get(pathSize - 1)]}/>) : null;

  return (
    <ContentContainer width={width} height={height}>
      <ContentTitle>{translator.t('Catalog')}</ContentTitle>
      <CatalogBreadcrumb names={breadcrumbsNames}/>
      <div style={STYLE_ITEMS}>
        {turnBackButton}
        {categoriesToDisplay.map(category => <CatalogPageItem key={category.name} page={category}
                                                              oldPage={currentCategory}/>)}
        {elementsToDisplay
          .filter(element => element.prototype !== 'areas')
          .map(element => <CatalogItem key={element.name} element={element}/>)}
      </div>
    </ContentContainer>
  )
}

CatalogList.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
};

CatalogList.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};
