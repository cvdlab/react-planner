import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {MdNavigateBefore} from 'react-icons/md';
import * as SharedStyle from '../../styles/shared-style';
import ReactPlannerContext from '../../utils/react-planner-context';

const STYLE_BOX = {
  width: '14em',
  height: '14em',
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

const STYLE_BOX_HOVER = {
  ...STYLE_BOX,
  background: SharedStyle.SECONDARY_COLOR.main
};

const STYLE_BACK = {
  position: 'absolute',
  color: SharedStyle.COLORS.black,
  fontSize: '5em',
  width: '100%'
};

const STYLE_BACK_HOVER = {
  ...STYLE_BACK,
  color: SharedStyle.SECONDARY_COLOR.main
};

const CONTAINER_DIV = {
  background: SharedStyle.COLORS.white,
  marginBottom: '5px',
  border: 'solid 1px #e6e6e6',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const CatalogTurnBackPageItem = ({ page }) => {
  const [hover, setHover] = useState(false);
  const { projectActions } = useContext(ReactPlannerContext);

  const changePage = (newPage) => {
    projectActions.goBackToCatalogPage(newPage)
  }

  return (
    <div
      style={hover ? STYLE_BOX_HOVER : STYLE_BOX}
      onClick={() => changePage(page.name)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={CONTAINER_DIV}>
        <MdNavigateBefore style={ !hover ? STYLE_BACK : STYLE_BACK_HOVER}/>
      </div>
    </div>
  );
}

CatalogTurnBackPageItem.propTypes = {
  page: PropTypes.object.isRequired
};

export default CatalogTurnBackPageItem;
