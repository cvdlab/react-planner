import React, {PropTypes} from 'react';

export default function PropertyHidden({value, onUpdate, configs}) {
  return null
}

PropertyHidden.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};
