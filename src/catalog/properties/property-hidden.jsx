import React, {PropTypes} from 'react';

export default function PropertyHidden({value, onUpdate, configs, sourceElement}) {
  return null
}

PropertyHidden.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object
};
