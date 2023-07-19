import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../styles/shared-style';
import { FaTimes as IconClose } from 'react-icons/fa';

const labelContainerStyle = {
  width: 'auto',
  display: 'inline-block',
  margin: 0,
  padding: '0px 5px 0px 0px'
};

const toggleButtonStyle = {
  color: SharedStyle.PRIMARY_COLOR.alt,
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none'
};

const toggleButtonStyleOver = {
  ...toggleButtonStyle,
  color: SharedStyle.COLORS.white
};

const contentContainerStyleActive = {
  position: 'fixed',
  width: 'calc( 100% - 2px )',
  height: '40%',
  left: 0,
  bottom: 20,
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  borderTop: SharedStyle.PRIMARY_COLOR.border,
  zIndex: 0,
  padding: 0,
  margin: 0,
  transition: 'all 300ms ease'
};

const contentContainerStyleInactive = {
  ...contentContainerStyleActive,
  visibility: 'hidden',
  height: 0
};

const contentHeaderStyle = {
  position: 'relative',
  width: '100%',
  height: '2em',
  top: 0,
  left: 0,
  borderBottom: SharedStyle.PRIMARY_COLOR.border
};

const titleStyle = {
  position: 'relative',
  height: '2em',
  lineHeight: '2em',
  marginLeft: '1em'
};

const contentAreaStyle = {
  position: 'relative',
  width: '100%',
  height: 'calc( 100% - 2em )',
  padding: '1em',
  overflowY: 'auto'
};

const iconCloseStyleOut = {
  position: 'absolute',
  width: '2em',
  height: '2em',
  right: 0,
  top: 0,
  padding: '0.5em',
  borderLeft: SharedStyle.PRIMARY_COLOR.border,
  cursor: 'pointer'
};

const iconCloseStyleOver = {
  ...iconCloseStyleOut,
  color: SharedStyle.COLORS.white,
  backgroundColor: SharedStyle.SECONDARY_COLOR.alt
};

const iconStyle = {
  width: '15px',
  height: '15px',
  marginTop: '-2px',
  marginRight: '2px'
};

const textStyle = {
  position: 'relative'
}

const FooterContentButton = ({ state, text, textStyle, icon, iconStyle, content, toggleState = false, title, titleStyle }) => {
  const [over, setOver] = useState(false);
  const [closeOver, setCloseOver] = useState(false);
  const [active, setActive] = useState(toggleState);

  const toggleOver = () => setOver(true);
  const toggleOut = () => setOver(false);
  const toggleCloseOver = () => setCloseOver(true);
  const toggleCloseOut = () => setCloseOver(false);

  const toggle = () => {
    const isActive = !active;
    setActive(isActive);
  };

  useEffect(() => {
    setActive(toggleState);
  }, [toggleState]);

  const LabelIcon = icon || null;
  const labelIconStyle = iconStyle || {};
  const labelTextStyle = textStyle || {};
  const inputTitleStyle = titleStyle || {};

  return (
    <div style={labelContainerStyle}>
      <div
        style={over || active ? toggleButtonStyleOver : toggleButtonStyle}
        onMouseOver={toggleOver}
        onMouseOut={toggleOut}
        onClick={toggle}
        title={title}
      >
        <LabelIcon style={{ ...labelIconStyle, ...iconStyle }} />
        <span style={{ ...textStyle, ...labelTextStyle }}>{text}</span>
      </div>
      <div style={active ? contentContainerStyleActive : contentContainerStyleInactive}>
        <div style={contentHeaderStyle}>
          <b style={{ ...titleStyle, ...inputTitleStyle }}>{title}</b>
          <IconClose
            style={closeOver ? iconCloseStyleOver : iconCloseStyleOut}
            onMouseOver={toggleCloseOver}
            onMouseOut={toggleCloseOut}
            onClick={toggle}
          />
        </div>
        <div style={contentAreaStyle}>
          {content}
        </div>
      </div>
    </div>
  );
};

FooterContentButton.propTypes = {
  state: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
  icon: PropTypes.func,
  iconStyle: PropTypes.object,
  content: PropTypes.array.isRequired,
  toggleState: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: PropTypes.object
};

export default FooterContentButton;