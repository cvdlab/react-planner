import React from 'react';
import PropTypes from 'prop-types';

export default function PropertyHidden({value, onUpdate, configs, sourceElement, internalState, state}) {
  return null
}

PropertyHidden.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};
