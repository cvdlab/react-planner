import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import ReactPlannerContext from '../../utils/react-planner-context';
import NewSVG from './icons/new.svg';
import CatalogSVG from './icons/catalog.svg';
import Icon2DSVG from './icons/2D.svg';
import Icon3DSVG from './icons/3D.svg';
import UndoSVG from './icons/undo.svg';
import RedoSVG from './icons/redo.svg';
import SettingsSVG from './icons/settings.svg';
import ToolbarButton from './toolbar-button';
import ToolbarSaveButton from './toolbar-save-button';
import ToolbarLoadButton from './toolbar-load-button';
import If from '../../utils/react-if';
import {
  MODE_IDLE,
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  MODE_VIEWING_CATALOG,
  MODE_CONFIGURING_PROJECT
} from '../../utils/constants';
import * as SharedStyle from '../../styles/shared-style';

const ASIDE_STYLE = {
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  fontSize: '10px',
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  border: '2px solid',
  borderRadius: '30px',
  borderColor: SharedStyle.PRIMARY_COLOR.alt,
  padding: '10px',
  zIndex: 99999
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

const mapButtonsCb = (el, ind) => {
  return (
    <If
      key={ind}
      condition={el.condition}
      style={{ position: 'relative' }}
    >
      {el.dom}
    </If>
  );
};

const Toolbar = ({ state, toolbarButtons, allowProjectFileSupport }) => {
  const { projectActions, viewer3DActions, translator } = useContext(ReactPlannerContext);

  let mode = state.get('mode');

  let sorter = [
    {
      index: 0, condition: allowProjectFileSupport,
      dom:
        <ToolbarButton
          active={false}
          tooltip={translator.t('New project')}
          onClick={event => confirm(translator.t('Would you want to start a new Project?')) ? projectActions.newProject() : null}>
          <NewSVG />
          New
        </ToolbarButton>
    },
    {
      index: 1, condition: allowProjectFileSupport,
      dom: <ToolbarSaveButton state={state} />
    },
    {
      index: 2, condition: allowProjectFileSupport,
      dom: <ToolbarLoadButton state={state} />
    },
    {
      index: 3, condition: true,
      dom:
        <ToolbarButton
          active={[MODE_VIEWING_CATALOG].includes(mode)}
          tooltip={translator.t('Open catalog')}
          onClick={event => projectActions.openCatalog()}>
          <CatalogSVG />
          Catalog
        </ToolbarButton>
    },
    {
      index: 4, condition: true,
      dom:
        <ToolbarButton
          active={[MODE_IDLE].includes(mode)}
          tooltip={translator.t('2D View')}
          onClick={event => projectActions.setMode(MODE_IDLE)}>
          <Icon2DSVG />
          2D
        </ToolbarButton>
    },
    {
      index: 5, condition: true,
      dom:
        <ToolbarButton
          active={[MODE_3D_VIEW].includes(mode)}
          tooltip={translator.t('3D View')}
          onClick={event => viewer3DActions.selectTool3DView()}>
          <Icon3DSVG />
          3D
        </ToolbarButton>
    },
    // TODO(react-planner #16)
    // {
    //   index: 6, condition: true, dom: <ToolbarButton
    //     active={[MODE_3D_FIRST_PERSON].includes(mode)}
    //     tooltip={translator.t('3D First Person')}
    //     onClick={event => viewer3DActions.selectTool3DFirstPerson()}>
    //     <MdDirectionsRun />
    //   </ToolbarButton>
    // },
    {
      index: 6, condition: true,
      dom:
        <ToolbarButton
          active={false}
          tooltip={translator.t('Undo (CTRL-Z)')}
          onClick={event => projectActions.undo()}>
          <UndoSVG />
          Undo
        </ToolbarButton>
    },
    {
      index: 7, condition: true,
      dom:
        <ToolbarButton
          active={false}
          tooltip={translator.t('Redo (CTRL-Y)')}
          onClick={event => projectActions.redo()}>
          <RedoSVG />
          Redo
        </ToolbarButton>
    },
    {
      index: 8, condition: true,
      dom:
        <ToolbarButton
          active={[MODE_CONFIGURING_PROJECT].includes(mode)}
          tooltip={translator.t('Configure project')}
          onClick={event => projectActions.openProjectConfigurator()}>
          <SettingsSVG />
          Settings
        </ToolbarButton>
    }
  ];

  sorter = sorter.concat(toolbarButtons.map((Component, key) => {
    return Component.prototype ? //if is a react component
      {
        condition: true,
        dom: React.createElement(Component, { mode, state, key })
      } :
      {                           //else is a sortable toolbar button
        index: Component.index,
        condition: Component.condition,
        dom: React.createElement(Component.dom, { mode, state, key })
      };
  }));

  return (
    <div style={{ position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
      <aside style={ASIDE_STYLE} className='toolbar'>
        {sorter.sort(sortButtonsCb).map(mapButtonsCb)}
      </aside>
    </div>
  );

}

Toolbar.propTypes = {
  state: PropTypes.object.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array
};

export default memo(Toolbar, (prevProps, nextProps) => {
  return prevProps.state.hashCode() === nextProps.state.hashCode()
});
