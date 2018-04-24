import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM
} from '../../constants';
import * as SharedStyle from '../../shared-style';

const VISIBILITY_MODE = {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM
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

    return (
      <Panel name={this.context.translator.t('Groups')} opened={true}>
        <div style={{padding: '5px 15px'}}>
          <p>Groups tab</p>
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
  projectActions: PropTypes.object.isRequired
};
