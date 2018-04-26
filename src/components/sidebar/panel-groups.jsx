import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import * as SharedStyle from '../../shared-style';

import {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM
} from '../../constants';

const VISIBILITY_MODE = {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM
};

const elementStyle = {
  width: 'auto',
  height: '2.5em',
  margin: '0.25em 0.25em 0 0',
  padding: '0.5em',
  textAlign: 'center',
  display: 'inline-block',
  border: '1px solid #CCC',
  borderRadius: '0.2em',
  cursor: 'pointer'
};

const elementSelectedStyle = {
  ...elementStyle,
  color: SharedStyle.SECONDARY_COLOR.main,
  borderColor: SharedStyle.SECONDARY_COLOR.main,
};

export default class PanelGroups extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillReceiveProps( nextProps, nexttContext ) {
  }

  render() {
    if (!VISIBILITY_MODE[this.props.state.mode]) return null;

    /*

    <div
            onClick={e => this.context.groupsActions.selectGroup(0)}
            style={false ? elementSelectedStyle : elementStyle}
          >
            Group Test
          </div>*/
    let groups = this.props.state.getIn(['scene', 'groups']);

    return (
      <Panel name={this.context.translator.t('Groups')} opened={true}>
        <div style={{padding: '5px 15px'}}>
          <div style={{cursor:'pointer', fontSize:'2em'}} title="Add Group" onClick={
            e => this.context.groupsActions.addGroup()
          }>++++++</div>
          {
            groups.size ? groups.entrySeq().map( ([ groupID, group ]) =>
              <div
                key={groupID}
                onClick={e => this.context.groupsActions.selectGroup(groupID)}
                style={ group.get('selected') ? elementSelectedStyle : elementStyle }
                title={ group.get('elements').size ? group.get('name') : 'Empty Group' }
              >
                <div style={{ color: ( group.get('elements').size ? 'auto' : 'red' ) }}>{group.get('name')}</div>
              </div>
            ) : null
          }
        </div>
      </Panel>
    )
  }

}

PanelGroups.propTypes = {
  state: PropTypes.object.isRequired
};

PanelGroups.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  groupsActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};
