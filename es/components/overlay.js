import React from 'react';
import PropTypes from 'prop-types';
export default function Overlay(_ref) {
  var width = _ref.width,
    height = _ref.height,
    state = _ref.state,
    customOverlays = _ref.customOverlays;
  var mode = state.get('mode');
  return /*#__PURE__*/React.createElement(React.Fragment, null, customOverlays.filter(function (overlay) {
    return overlay.modes.includes(mode);
  }).map(function (overlay) {
    var Overlay = overlay.component;
    return /*#__PURE__*/React.createElement(Overlay, {
      key: overlay.key,
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