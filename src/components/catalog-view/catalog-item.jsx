import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlusCircle as IconAdd } from 'react-icons/fa';
import * as SharedStyle from '../../styles/shared-style';
import ReactPlannerContext from '../../utils/react-planner-context';

const STYLE_BOX = {
  width: '14em',
  height: '14em',
  padding: '0.625em',
  background: '#f7f7f9',
  border: '1px solid #e1e1e8',
  cursor: 'pointer',
  position: 'relative',
  boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)',
  borderRadius: '2px',
  transition: 'all .15s ease-in-out',
  WebkitTransition: 'all .15s ease-in-out',
  alignSelf: 'center',
  justifySelf: 'center',
};

const STYLE_BOX_HOVER = {
  ...STYLE_BOX,
  background: SharedStyle.SECONDARY_COLOR.main
};

const STYLE_TITLE = {
  width: '100%',
  textAlign: 'center',
  display: 'block',
  marginBottom: '.5em',
  textTransform: 'capitalize'
};

const STYLE_TITLE_HOVER = {
  ...STYLE_TITLE,
  color: SharedStyle.COLORS.white
};

const STYLE_IMAGE_CONTAINER = {
  width: '100%',
  height: '8em',
  position: 'relative',
  overflow: 'hidden',
  border: 'solid 1px #e6e6e6',
  padding: 0,
  margin: 0,
  marginBottom: '5px'
};

const STYLE_IMAGE = {
  position: 'absolute',
  background: '#222',
  width: '100%',
  height: '100%',
  backgroundSize: 'contain',
  backgroundPosition: '50% 50%',
  backgroundColor: SharedStyle.COLORS.white,
  backgroundRepeat: 'no-repeat',
  transition: 'all .2s ease-in-out'
};

const STYLE_IMAGE_HOVER = {
  ...STYLE_IMAGE,
  transform: 'scale(1.2)'
};

const STYLE_PLUS_HOVER = {
  marginTop: '1.5em',
  color: SharedStyle.SECONDARY_COLOR.main,
  fontSize: '2em',
  opacity: '0.7',
  width: '100%'
};

const STYLE_DESCRIPTION = {
  display: 'block',
  display: '-webkit-box',
  height: '2em',
  margin: '0 auto',
  fontSize: '0.75em',
  fontStyle: 'italic',
  lineHeight: '1em',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const STYLE_TAGS = {
  listStyle: 'none',
  margin: '0px',
  padding: '0px',
  fontSize: '11px',
  marginBottom: '3px'
};

const STYLE_TAG = {
  display: 'inline-block',
  background: '#337ab7',
  color: SharedStyle.COLORS.white,
  padding: '1px 4px',
  marginRight: '3px',
  borderRadius: '3px'
};

const CatalogItem = ({ element }) => {
  const [hover, setHover] = useState(false);
  const { linesActions, itemsActions, holesActions, projectActions } = useContext(ReactPlannerContext);
  const [img, setImg] = useState("");

  // TODO(pg): workaround to be able to use image in next.js app
  useEffect(() => {
    if (element.info.image && element.info.image.default) {
      setImg(element.info.image.default.src);
    } else {
      setImg(element.info.image);
    }
  }, [element.info.image]);

  const select = () => {
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

  return (
    <div
      style={hover ? STYLE_BOX_HOVER : STYLE_BOX}
      onClick={select}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <b style={!hover ? STYLE_TITLE : STYLE_TITLE_HOVER}>{element.info.title}</b>
      <div style={STYLE_IMAGE_CONTAINER}>
        <div style={{ ...(!hover ? STYLE_IMAGE : STYLE_IMAGE_HOVER), backgroundImage: 'url(' + img + ')' }}>
          {hover ? <IconAdd style={STYLE_PLUS_HOVER} /> : null}
        </div>
      </div>
      <ul style={STYLE_TAGS}>
        {element.info.tag.map((tag, index) => <li style={STYLE_TAG} key={index}>{tag}</li>)}
      </ul>
      <div style={STYLE_DESCRIPTION}>{element.info.description}</div>
    </div>
  );
}

CatalogItem.propTypes = {
  element: PropTypes.object.isRequired,
};

export default CatalogItem;