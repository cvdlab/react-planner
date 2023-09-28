import React from 'react';
import PropTypes from 'prop-types';

export default function Overlays({ width, height, state, customOverlays }) {
  return (
    <>
      {
        customOverlays.map(overlay => {
          let Overlay = overlay.component;
          return <Overlay width={width} height={height} state={state} />
        })
      }
    </>
  )
}

Overlays.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  customOverlays: PropTypes.arrayOf(PropTypes.object),
};
