import React, {PropTypes} from 'react';
import {Planner, Catalog, ToolbarButton} from '../../../src/index';
import Icon from 'react-icons/lib/fa/trash';


function ButtonX({mode}, {editingActions}){
  return (
    <ToolbarButton active={["MODE_3D_VIEW"].includes(mode)} tooltip="3D View" onClick={event => editingActions.remove()}>
      <Icon />
    </ToolbarButton>
  )
};

ButtonX.propTypes = {
  mode: PropTypes.string.isRequired
};

ButtonX.contextTypes = {
  editingActions: PropTypes.object
};



export default [
  ButtonX
];
