import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlannerContext from '../../utils/react-planner-context';
import CatalogItem from './catalog-item';
import CatalogBreadcrumb from './catalog-breadcrumb';
import CatalogPageItem from './catalog-page-item';
import CatalogTurnBackPageItem from './catalog-turn-back-page-item';
import ContentContainer from '../style/content-container';
import ContentTitle from '../style/content-title';
import * as SharedStyle from '../../styles/shared-style';

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
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(14em, 1fr))',
  gridGap: '10px',
  marginTop: '1em'
};

const searchContainer = {
  width: '100%',
  height: '3em',
  padding: '0.625em',
  background: '#f7f7f9',
  border: '1px solid #e1e1e8',
  cursor: 'pointer',
  position: 'relative',
  boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)',
  borderRadius: '2px',
  transition: 'all .2s ease-in-out',
  WebkitTransition: 'all .2s ease-in-out',
  marginBottom: '1em'
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

const historyContainer = {
  ...searchContainer,
  padding: '0.2em 0.625em'
};

const historyElementStyle = {
  width: 'auto',
  height: '2em',
  lineHeight: '2em',
  textAlign:'center',
  borderRadius: '1em',
  display: 'inline-block',
  cursor: 'pointer',
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  color: SharedStyle.PRIMARY_COLOR.text_main,
  textTransform: 'capitalize',
  margin: '0.25em',
  padding: '0 1em'
};

const CatalogList = ({ state, width, height, style }) => {
  const { catalog, translator, itemsActions, linesActions, holesActions, projectActions } = useContext(ReactPlannerContext);
  const currentCategory = catalog.getCategory(state.catalog.page);
  const categoriesToDisplay = currentCategory.categories;
  const elementsToDisplay = currentCategory.elements.filter(element => element.info.visibility ? element.info.visibility.catalog : true );

  const [categories, setCategories] = useState(currentCategory.categories);
  const [elements, setElements] = useState(elementsToDisplay);
  const [matchString, setMatchString] = useState('');
  const [matchedElements, setMatchedElements] = useState([]);

  const flattenCategories = ( categories ) => {
    let toRet = [];

    for( let x = 0; x < categories.length; x++ )
    {
      let curr = categories[x];
      toRet = toRet.concat( curr.elements );
      if( curr.categories.length ) toRet = toRet.concat( flattenCategories ( curr.categories ) );
    }

    return toRet;
  }

  const matcharray = ( text ) => {

    let array = elements.concat( flattenCategories( categories ) );

    let filtered = [];

    if( text != '' ) {
      let regexp = new RegExp( text, 'i');
      for (let i = 0; i < array.length; i++) {
        if (regexp.test(array[i].info.title)) {
          filtered.push(array[i]);
        }
      }
    }

    setMatchString(text);
    setMatchedElements(filtered);
  };

  const select = ( element ) => {

    switch (element.prototype) {
      case 'lines':
        linesActions.selectToolDrawingLine(element.name);
        break;
      case 'items':
        itemsActions.selectToolDrawingItem(element.name);
        break;
      case 'holes':
        holesActions.selectToolDrawingHole(element.name);
        break;
    }

    projectActions.pushLastSelectedCatalogElementToHistory(element);
  }

  let breadcrumbComponent = null;
  const page = state.catalog.page;

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
    <CatalogTurnBackPageItem key={pathSize} page={catalog.categories[state.catalog.path.get(pathSize - 1)]}/>) : null;


  let selectedHistory = state.get('selectedElementsHistory');
  let selectedHistoryElements = selectedHistory.map( ( el, ind ) =>
    <div key={ind} style={historyElementStyle} title={el.name} onClick={() => select(el) }>{el.name}</div>
  );

  return (
    <ContentContainer width={width} height={height} style={{...containerStyle, ...style}}>
      <ContentTitle>{translator.t('Catalog')}</ContentTitle>
      {breadcrumbComponent}
      <div style={searchContainer}>
        <span style={searchText}>{translator.t('Search Element')}</span>
        <input type="text" style={searchInput} onChange={( e ) => { matcharray( e.target.value ); } }/>
      </div>
      { selectedHistory.size ?
        <div style={historyContainer}>
          <span>{translator.t('Last Selected')}</span>
          {selectedHistoryElements}
        </div> :
        null
      }
      <div style={itemsStyle}>
        {
          matchString === '' ? [
            turnBackButton,
            categoriesToDisplay.map(cat => <CatalogPageItem key={cat.name} page={cat} oldPage={currentCategory}/>),
            elementsToDisplay.map(elem => <CatalogItem key={elem.name} element={elem}/>)
          ] :
          matchedElements.map(elem => <CatalogItem key={elem.name} element={elem}/>)
        }
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

export default CatalogList;