import React, {PropTypes} from 'react';
import CatalogItem from './catalog-item';
import {Seq} from 'immutable'
import ContentContainer from '../style/content-container';
import ContentTitle from '../style/content-title';

const STYLE_ITEMS = {
  display: "flex",
  flexFlow: "row wrap",
};


export default function CatalogList({width, height, state}, {catalog, translator}) {
  return (
    <ContentContainer width={width} height={height}>
      <ContentTitle>{translator.t('Catalog')}</ContentTitle>
      <div style={STYLE_ITEMS}>
        {Seq(catalog.elements)
          .entrySeq()
          .filter(([name, element]) => element.prototype !== 'areas')
          .map(([name, element]) => <CatalogItem key={name} element={element}/>)}
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
