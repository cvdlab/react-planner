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
import { MODE_IDLE, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_VIEWING_CATALOG, MODE_CONFIGURING_PROJECT } from '../../utils/constants';
import * as SharedStyle from '../../styles/shared-style';
var ASIDE_STYLE = {
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
var sortButtonsCb = function sortButtonsCb(a, b) {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }
  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }
  return a.index - b.index;
};
var mapButtonsCb = function mapButtonsCb(el, ind) {
  return /*#__PURE__*/React.createElement(If, {
    key: ind,
    condition: el.condition,
    style: {
      position: 'relative'
    }
  }, el.dom);
};
var Toolbar = function Toolbar(_ref) {
  var state = _ref.state,
    toolbarButtons = _ref.toolbarButtons,
    allowProjectFileSupport = _ref.allowProjectFileSupport;
  var _useContext = useContext(ReactPlannerContext),
    projectActions = _useContext.projectActions,
    viewer3DActions = _useContext.viewer3DActions,
    translator = _useContext.translator;
  var mode = state.get('mode');
  var sorter = [{
    index: 0,
    condition: allowProjectFileSupport,
    dom: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: false,
      tooltip: translator.t('New project'),
      onClick: function onClick(event) {
        return confirm(translator.t('Would you want to start a new Project?')) ? projectActions.newProject() : null;
      }
    }, /*#__PURE__*/React.createElement(NewSVG, null), "New")
  }, {
    index: 1,
    condition: allowProjectFileSupport,
    dom: /*#__PURE__*/React.createElement(ToolbarSaveButton, {
      state: state
    })
  }, {
    index: 2,
    condition: allowProjectFileSupport,
    dom: /*#__PURE__*/React.createElement(ToolbarLoadButton, {
      state: state
    })
  }, {
    index: 3,
    condition: true,
    dom: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: [MODE_VIEWING_CATALOG].includes(mode),
      tooltip: translator.t('Open catalog'),
      onClick: function onClick(event) {
        return projectActions.openCatalog();
      }
    }, /*#__PURE__*/React.createElement(CatalogSVG, null), "Catalog")
  }, {
    index: 4,
    condition: true,
    dom: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: [MODE_IDLE].includes(mode),
      tooltip: translator.t('2D View'),
      onClick: function onClick(event) {
        return projectActions.setMode(MODE_IDLE);
      }
    }, /*#__PURE__*/React.createElement(Icon2DSVG, null), "2D")
  }, {
    index: 5,
    condition: true,
    dom: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: [MODE_3D_VIEW].includes(mode),
      tooltip: translator.t('3D View'),
      onClick: function onClick(event) {
        return viewer3DActions.selectTool3DView();
      }
    }, /*#__PURE__*/React.createElement(Icon3DSVG, null), "3D")
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
    index: 6,
    condition: true,
    dom: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: false,
      tooltip: translator.t('Undo (CTRL-Z)'),
      onClick: function onClick(event) {
        return projectActions.undo();
      }
    }, /*#__PURE__*/React.createElement(UndoSVG, null), "Undo")
  }, {
    index: 7,
    condition: true,
    dom: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: false,
      tooltip: translator.t('Redo (CTRL-Y)'),
      onClick: function onClick(event) {
        return projectActions.redo();
      }
    }, /*#__PURE__*/React.createElement(RedoSVG, null), "Redo")
  }, {
    index: 8,
    condition: true,
    dom: /*#__PURE__*/React.createElement(ToolbarButton, {
      active: [MODE_CONFIGURING_PROJECT].includes(mode),
      tooltip: translator.t('Configure project'),
      onClick: function onClick(event) {
        return projectActions.openProjectConfigurator();
      }
    }, /*#__PURE__*/React.createElement(SettingsSVG, null), "Settings")
  }];
  sorter = sorter.concat(toolbarButtons.map(function (Component, key) {
    return Component.prototype ?
    //if is a react component
    {
      condition: true,
      dom: /*#__PURE__*/React.createElement(Component, {
        mode: mode,
        state: state,
        key: key
      })
    } : {
      //else is a sortable toolbar button
      index: Component.index,
      condition: Component.condition,
      dom: /*#__PURE__*/React.createElement(Component.dom, {
        mode: mode,
        state: state,
        key: key
      })
    };
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 30,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: ASIDE_STYLE,
    className: "toolbar"
  }, sorter.sort(sortButtonsCb).map(mapButtonsCb)));
};
Toolbar.propTypes = {
  state: PropTypes.object.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array
};
export default /*#__PURE__*/memo(Toolbar, function (prevProps, nextProps) {
  return prevProps.state.hashCode() === nextProps.state.hashCode();
});