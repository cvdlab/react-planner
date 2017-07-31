import React from 'react';
import PropTypes from 'prop-types';
import Arrow from 'react-icons/lib/md/keyboard-arrow-right';

const CatalogBreadcrumb = ({names}) => {
  let labelNames = [];
  for (let i = 0; i < names.length - 1; i++) {

    let cursor = 'default';
    if (names[i].hasOwnProperty('action')) {
      cursor = 'pointer';
    }

    labelNames.push(<div key={i} style={{display: 'flex'}}>
      <div style={{fontSize: '20px', cursor: cursor}}
           onClick={names[i].action}>{names[i].name}
      </div>
      <div style={{marginLeft: '10px', marginRight: '10px'}}><Arrow style={{fill: '#000', fontSize: 24}}/></div>
    </div>);
  }

  let cursor = 'default';
  if (names[names.length - 1].hasOwnProperty('action')) {
    cursor = 'pointer';
  }

  labelNames.push(<div key={names.length - 1} style={{display: 'flex'}}>
    <div style={{fontSize: '20px', cursor: cursor}}
         onClick={names[names.length - 1].action}><b>{names[names.length - 1].name}</b>
    </div>
  </div>);

  return (
    <div style={{margin: '50px', display: 'flex'}}>
      {labelNames}
    </div>
  )
};

CatalogBreadcrumb.propTypes = {
  names: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CatalogBreadcrumb;
