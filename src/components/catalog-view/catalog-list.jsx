import React from 'react';
import PropTypes from 'prop-types';
import CatalogItem from './catalog-item';
import CatalogPageItem from './catalog-page-item';
import {Seq} from 'immutable'
import ContentContainer from '../style/content-container';
import ContentTitle from '../style/content-title';

const STYLE_ITEMS = {
  display: "flex",
  flexFlow: "row wrap",
};


export default function CatalogList({width, height, state}, {catalog, translator}) {

  let page = state.catalog.page;
  let currentCategory = catalog.getCategory(page);
  let categoriesToDisplay = currentCategory.categories;
  let elementsToDisplay = currentCategory.elements;

  return (
    <ContentContainer width={width} height={height}>
      <ContentTitle>{translator.t('Catalog')}</ContentTitle>
      <div style={STYLE_ITEMS}>
        {categoriesToDisplay.map(category => <CatalogPageItem key={category.name} page={category} oldPage={catalog.categories[page]}/>)}
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
};
