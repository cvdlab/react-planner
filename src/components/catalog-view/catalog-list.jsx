import React from 'react';
import PropTypes from 'prop-types';
import CatalogItem from './catalog-item';
import CatalogBreadcrumb from './catalog-breadcrumb';
import CatalogPageItem from './catalog-page-item';
import CatalogTurnBackPageItem from './catalog-turn-back-page-item';
import ContentContainer from '../style/content-container';
import ContentTitle from '../style/content-title';

const CONTAINER_STYLE = {
  position: 'fixed',
  width:'calc( 100% - 51px)',
  height:'calc( 100% - 20px)',
  backgroundColor:'#FFF',
  padding:'1em',
  left:50,
  overflowY:'auto',
  overflowX:'hidden',
  zIndex:10
};

const STYLE_ITEMS = {
  display: 'flex',
  flexFlow: 'row wrap',
};

export default function CatalogList({width, height, style = {}, state}, {catalog, translator, projectActions}) {

  let page = state.catalog.page;
  let currentCategory = catalog.getCategory(page);
  let categoriesToDisplay = currentCategory.categories;
  let elementsToDisplay = currentCategory.elements;

  let breadcrumbComponent = null;

  if (page !== 'root') {

    let breadcrumbsNames = [];

    state.catalog.path.forEach(pathName => {
      breadcrumbsNames.push({
        name: catalog.getCategory(pathName).label,
        action: () => projectActions.goBackToCatalogPage(pathName)
      });
    });

    breadcrumbsNames.push({name: currentCategory.label, action: ''});

    breadcrumbComponent = (<CatalogBreadcrumb names={breadcrumbsNames}/>);

  }

  let pathSize = state.catalog.path.size;

  let turnBackButton = pathSize > 0 ? (
    <CatalogTurnBackPageItem page={catalog.categories[state.catalog.path.get(pathSize - 1)]}/>) : null;

  return (
    <ContentContainer width={width} height={height} style={{...CONTAINER_STYLE, ...style}}>
      <ContentTitle>{translator.t('Catalog')}</ContentTitle>
      {breadcrumbComponent}
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
