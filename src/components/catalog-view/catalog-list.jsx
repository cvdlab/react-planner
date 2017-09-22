import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CatalogItem from './catalog-item';
import CatalogBreadcrumb from './catalog-breadcrumb';
import CatalogPageItem from './catalog-page-item';
import CatalogTurnBackPageItem from './catalog-turn-back-page-item';
import ContentContainer from '../style/content-container';
import ContentTitle from '../style/content-title';

const containerStyle = {
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

const itemsStyle = {
  display: 'flex',
  flexFlow: 'row wrap'
};

const searchContainer = {
  width: '100%',
  height: '3em',
  padding: '0.625em',
  background: '#f7f7f9',
  border: '1px solid #e1e1e8',
  margin: '0.3em',
  cursor: 'pointer',
  position: 'relative',
  boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)',
  borderRadius: '2px',
  transition: 'all .2s ease-in-out',
  WebkitTransition: 'all .2s ease-in-out'
};

const searchText = {
  width: '8em',
  display: 'inline-block'
};

const searchInput = {
  width: 'calc( 100% - 10em )',
  height: '2em',
  margin: '0',
  padding: '0 1em',
  border: '1px solid #EEE'
};

export default class CatalogList extends Component {

  constructor(props, context) {
    super(props);

    let page = props.state.catalog.page;
    let currentCategory = context.catalog.getCategory(page);
    let categoriesToDisplay = currentCategory.categories;
    let elementsToDisplay = currentCategory.elements.filter(element => element.prototype !== 'areas');

    this.state = {
      categories: currentCategory.categories,
      elements: elementsToDisplay,
      matchString: '',
      matchedElements: []
    };
  }

  flattenCategories( categories ) {
    let toRet = [];

    for( let x = 0; x < categories.length; x++ )
    {
      let curr = categories[x];
      toRet = toRet.concat( curr.elements );
      if( curr.categories.length ) toRet = toRet.concat( this.flattenCategories ( curr.categories ) );
    }

    return toRet;
  }

  matcharray( text ) {

    let array = this.state.elements.concat( this.flattenCategories( this.state.categories ) );

    let filtered = [];

    if( text != '' ) {
      let regexp = new RegExp( text, 'i');
      for (let i = 0; i < array.length; i++) {
        if (regexp.test(array[i].info.title)) {
          filtered.push(array[i]);
        }
      }
    }

    this.setState({
      matchString: text,
      matchedElements: filtered
    });
  };

  render() {

    let page = this.props.state.catalog.page;
    let currentCategory = this.context.catalog.getCategory(page);
    let categoriesToDisplay = currentCategory.categories;
    let elementsToDisplay = currentCategory.elements.filter(element => element.prototype !== 'areas');

    let breadcrumbComponent = null;

    if (page !== 'root') {

      let breadcrumbsNames = [];

      this.props.state.catalog.path.forEach(pathName => {
        breadcrumbsNames.push({
          name: this.context.catalog.getCategory(pathName).label,
          action: () => projectActions.goBackToCatalogPage(pathName)
        });
      });

      breadcrumbsNames.push({name: currentCategory.label, action: ''});

      breadcrumbComponent = (<CatalogBreadcrumb names={breadcrumbsNames}/>);
    }

    let pathSize = this.props.state.catalog.path.size;

    let turnBackButton = pathSize > 0 ? (
      <CatalogTurnBackPageItem key={pathSize} page={this.context.catalog.categories[this.props.state.catalog.path.get(pathSize - 1)]}/>) : null;

    return (
      <ContentContainer width={this.props.width} height={this.props.height} style={{...containerStyle, ...this.props.style}}>
        <ContentTitle>{this.context.translator.t('Catalog')}</ContentTitle>
        {breadcrumbComponent}
        <div style={searchContainer}>
          <span style={searchText}>{this.context.translator.t('Search Element')}</span>
          <input type="text" style={searchInput} onChange={( e ) => { this.matcharray( e.target.value ); } }/>
        </div>
        <div style={itemsStyle}>
          {
            this.state.matchString === '' ? [
              turnBackButton,
              categoriesToDisplay.map(cat => <CatalogPageItem key={cat.name} page={cat} oldPage={currentCategory}/>),
              elementsToDisplay.map(elem => <CatalogItem key={elem.name} element={elem}/>)
            ] :
            this.state.matchedElements.map(elem => <CatalogItem key={elem.name} element={elem}/>)
          }
        </div>
      </ContentContainer>
    )
  }
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
