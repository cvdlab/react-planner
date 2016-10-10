import React, {PropTypes} from 'react';
import {ToolbarButton} from '../../../../src/index'; //react-planner
import Icon from 'react-icons/lib/fa/asterisk';


export function ButtonX({mode}, {customActions}){
  return (
    <ToolbarButton active={['MY_CUSTOM_MODE'].includes(mode)} tooltip="sample button" onClick={event => customActions.myaction()}>
      <Icon />
    </ToolbarButton>
  )
}

ButtonX.propTypes = {
  mode: PropTypes.string.isRequired
};

ButtonX.contextTypes = {
  customActions: PropTypes.object
};

