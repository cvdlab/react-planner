import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../styles/shared-style';

const toggleButtonStyle = {
  width: '5.5em',
  color: SharedStyle.PRIMARY_COLOR.alt,
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  border: '1px solid transparent',
  margin: '-1px 5px 0 5px',
  borderRadius: '2px',
  display: 'inline-block'
};

const toggleButtonStyleOver = {
  ...toggleButtonStyle,
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  border: '1px solid #FFF',
  color: SharedStyle.COLORS.white
};

const FooterToggleButton = ({ toggleOn, toggleOff, text, toggleState = false, title }) => {
  const [over, setOver] = useState(false);
  const [active, setActive] = useState(toggleState);

  const toggleOver = () => setOver(true);
  const toggleOut = () => setOver(false);

  const toggle = () => {
    const isActive = !active;
    setActive(isActive);

    if (isActive) {
      toggleOn();
    } else {
      toggleOff();
    }
  };

  useEffect(() => {
    setActive(toggleState);
  }, [toggleState]);

  return (
    <div
      style={over || active ? toggleButtonStyleOver : toggleButtonStyle}
      onMouseOver={toggleOver}
      onMouseOut={toggleOut}
      onClick={toggle}
      title={title}
    >
      {text}
    </div>
  );
};

FooterToggleButton.propTypes = {
  state: PropTypes.object.isRequired,
  toggleOn: PropTypes.func.isRequired,
  toggleOff: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  toggleState: PropTypes.bool,
  title: PropTypes.string
};

export default FooterToggleButton;
