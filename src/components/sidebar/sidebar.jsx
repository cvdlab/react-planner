import React from 'react';
import PropTypes from 'prop-types';
import PanelElementEditor from './panel-element-editor/panel-element-editor';
import PanelGroupEditor from './panel-group-editor';
import PanelMultiElementsEditor from './panel-element-editor/panel-multi-elements-editor';
import PanelLayers from './panel-layers';
import PanelGuides from './panel-guides';
import PanelGroups from './panel-groups';
import PanelLayerElements from './panel-layer-elements';
import * as SharedStyle from '../../styles/shared-style';
import If from '../../utils/react-if';

import * as constants from '../../utils/constants';

const STYLE = {
  display: 'block',
  borderRadius: '10px',
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingBottom: '20px',
};

const sortButtonsCb = (a, b) => {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

const mapButtonsCb = (el, ind) => <If key={ind} condition={el.condition} style={{ position: 'relative' }}>{el.dom}</If>;

export default function Sidebar({ state, sidebarComponents }) {

  let mode = state.get('mode');
  let isVisible = true;

  switch (mode) {
    case constants.MODE_VIEWING_CATALOG:
      isVisible = false;
      break;

    case constants.MODE_IDLE:
    case constants.MODE_2D_ZOOM_IN:
    case constants.MODE_2D_ZOOM_OUT:
    case constants.MODE_2D_PAN:
    case constants.MODE_WAITING_DRAWING_LINE:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
    case constants.MODE_DRAGGING_ITEM:
    case constants.MODE_DRAWING_LINE:
    case constants.MODE_DRAWING_HOLE:
    case constants.MODE_DRAWING_ITEM:
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_ROTATING_ITEM:
    case constants.MODE_3D_VIEW:
      isVisible = true;
      break;
    default:
      isVisible = false;
      break;
  }

  let selectedLayer = state.getIn(['scene', 'selectedLayer']);

  //TODO change in multi-layer check
  let selected = state.getIn(['scene', 'layers', selectedLayer, 'selected']);

  let multiselected =
    selected.lines.size > 1 ||
    selected.items.size > 1 ||
    selected.holes.size > 1 ||
    selected.areas.size > 1 ||
    selected.lines.size + selected.items.size + selected.holes.size + selected.areas.size > 1;

  let selectedGroup = state.getIn(['scene', 'groups']).findEntry(g => g.get('selected'));

  let sorter = [
    { index: 0, condition: true, dom: <PanelGuides state={state} /> },
    { index: 1, condition: true, dom: <PanelLayers state={state} /> },
    { index: 2, condition: true, dom: <PanelLayerElements mode={state.mode} layers={state.scene.layers} selectedLayer={state.scene.selectedLayer} /> },
    { index: 3, condition: true, dom: <PanelGroups mode={state.mode} groups={state.scene.groups} layers={state.scene.layers} /> },
    { index: 4, condition: !multiselected, dom: <PanelElementEditor state={state} /> },
    //{ index: 5, condition: multiselected, dom: <PanelMultiElementsEditor state={state} /> },
    { index: 6, condition: !!selectedGroup, dom: <PanelGroupEditor state={state} groupID={selectedGroup ? selectedGroup[0] : null} /> }
  ];

  sorter = sorter.concat(sidebarComponents.map((Component, key) => {
    return Component.prototype ? //if is a react component
      {
        condition: true,
        dom: React.createElement(Component, { state, key })
      } :
      {                           //else is a sortable toolbar button
        index: Component.index,
        condition: Component.condition,
        dom: React.createElement(Component.dom, { state, key })
      };
  }));

  return (
    <div style={{ position: 'fixed', width: 290, right: 14, top: '50%', transform: 'translateY(-50%)', zIndex: 9999 }}>
      {isVisible &&
        <aside
          style={STYLE}
          onKeyDown={event => event.stopPropagation()}
          onKeyUp={event => event.stopPropagation()}
          className="sidebar"
        >
          {sorter.sort(sortButtonsCb).map(mapButtonsCb)}
        </aside>
      }
    </div>
  );
}

Sidebar.propTypes = {
  state: PropTypes.object.isRequired
};
