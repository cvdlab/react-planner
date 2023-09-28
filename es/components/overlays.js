import React from 'react';
import PropTypes from 'prop-types';
export default function Overlays(_ref) {
  var width = _ref.width,
    height = _ref.height,
    state = _ref.state,
    customOverlays = _ref.customOverlays;
  return /*#__PURE__*/React.createElement(React.Fragment, null, customOverlays.map(function (overlay) {
    var Overlay = overlay.component;
    return /*#__PURE__*/React.createElement(Overlay, {
      width: width,
      height: height,
      state: state
    });
  }));
}
Content.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  customOverlays: PropTypes.arrayOf(PropTypes.object)
};