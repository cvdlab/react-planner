import React, {PropTypes} from 'react';
import CatalogItem from './catalog-item.jsx';
import {Seq} from 'immutable'


const STYLE_CONTAINER = {
  padding: "0 20px",
  overflowY: "scroll"
};

const STYLE_ITEMS = {
  display: "flex",
  flexFlow: "row wrap",
};


export default function CatalogList({width, height}, {catalog}) {
  return (
    <div style={{width, height, ...STYLE_CONTAINER}}>
      <h2>Catalog</h2>
      <div style={STYLE_ITEMS}>
        {Seq(catalog.elements)
          .entrySeq()
          .filter(([name, element]) => element.prototype !== 'areas')
          .map(([name, element]) => <CatalogItem key={name} element={element}/>)}
      </div>
    </div>
  )
}

CatalogList.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

CatalogList.contextTypes = {
  catalog: PropTypes.object.isRequired,
};
