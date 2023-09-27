import React from 'react';
import PropTypes from 'prop-types';

export default function Overlay({ width, height, state, customOverlays }) {
  let mode = state.get('mode');

  return (
      <>
      {
        customOverlays.filter(overlay => overlay.modes.includes(mode)).map(overlay => {
          let Overlay = overlay.component;
          return <Overlay key={overlay.key} width={width} height={height} state={state} />
        })
      }
      </>
  )
}

Content.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  customOverlays: PropTypes.arrayOf(PropTypes.object),
};
