import React, {PropTypes} from 'react';
import ToolbarButton from '../components/toolbar/toolbar-button.jsx';
import Icon from 'react-icons/lib/fa/trash';


export default function ButtonX({mode}, {editingActions}){
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

