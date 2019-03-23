import React from 'react';
import PropTypes from 'prop-types';
import {MdArrowBack as Arrow} from 'react-icons/md';
import * as SharedStyle from '../../shared-style';

const breadcrumbStyle = {
  margin: '1.5em',
  display: 'flex'
};

const breadcrumbTextStyle = {
  fontSize: '20px',
  cursor: 'pointer'
};

const breadcrumbLastTextStyle = {
  ...breadcrumbTextStyle,
  fontWeight:'bolder',
  color:SharedStyle.SECONDARY_COLOR.main
};

const breadcrumbTabStyle = {
  fill: SharedStyle.COLORS.black,
  fontSize: '24px',
  marginLeft: '10px',
  marginRight: '10px'
};

const CatalogBreadcrumb = ({ names }) => {

  let labelNames = names.map((name, ind) => {

    let lastElement = ind === names.length - 1;

    return <div key={ind} style={{ display: 'flex' }}>
        <div style={ !lastElement ? breadcrumbTextStyle : breadcrumbLastTextStyle } onClick={name.action || null}>{name.name}</div>
        { !lastElement ? <Arrow style={breadcrumbTabStyle} /> : null }
    </div>
  });

  return <div style={breadcrumbStyle}>{labelNames}</div>;
};

CatalogBreadcrumb.propTypes = {
  names: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CatalogBreadcrumb;
