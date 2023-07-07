import React, { createContext, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Translator from './translator/translator';
import Catalog from './catalog/catalog';
import actions from './actions/export';
import { objectsMap } from './utils/objects-utils';
import {
  ToolbarComponents,
  Content,
  SidebarComponents,
  FooterBarComponents
} from './components/export';
import { VERSION } from './version';
import './styles/export';
import ReactPlannerContext from './react-planner-context';

const { Toolbar } = ToolbarComponents;
const { Sidebar } = SidebarComponents;
const { FooterBar } = FooterBarComponents;

const toolbarW = 50;
const sidebarW = 300;
const footerBarH = 20;

const wrapperStyle = {
  display: 'flex',
  flexFlow: 'row nowrap'
};

function ReactPlanner(props) {
  const { width, height, state, stateExtractor, ...otherProps } = props;

  const contentW = width - toolbarW - sidebarW;
  const toolbarH = height - footerBarH;
  const contentH = height - footerBarH;
  const sidebarH = height - footerBarH;

  const extractedState = stateExtractor(state);
  const contextValue = useContext(ReactPlannerContext); // Step 3: Access the context value using useContext

  useEffect(() => {
    let { store } = contextValue;
    let { projectActions, catalog, stateExtractor, plugins } = props;
    plugins.forEach(plugin => plugin(store, stateExtractor));
    projectActions.initCatalog(catalog);
  }, []);

  useEffect(() => {
    if (props.state !== state) {
      const { stateExtractor, state, projectActions, catalog } = props;
      const plannerState = stateExtractor(state);
      const catalogReady = plannerState.getIn(['catalog', 'ready']);
      if (!catalogReady) {
        projectActions.initCatalog(catalog);
      }
    }
  }, [props.state]);

  return (
    <div style={{ ...wrapperStyle, height }}>
      <Toolbar width={toolbarW} height={toolbarH} state={extractedState} {...otherProps} />
      <Content width={contentW} height={contentH} state={extractedState} {...otherProps} onWheel={event => event.preventDefault()} />
      <Sidebar width={sidebarW} height={sidebarH} state={extractedState} {...otherProps} />
      <FooterBar width={width} height={footerBarH} state={extractedState} {...otherProps} />
    </div>
  );
}

ReactPlanner.propTypes = {
  translator: PropTypes.instanceOf(Translator),
  catalog: PropTypes.instanceOf(Catalog),
  allowProjectFileSupport: PropTypes.bool,
  plugins: PropTypes.arrayOf(PropTypes.func),
  autosaveKey: PropTypes.string,
  autosaveDelay: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  stateExtractor: PropTypes.func.isRequired,
  toolbarButtons: PropTypes.array,
  sidebarComponents: PropTypes.array,
  footerbarComponents: PropTypes.array,
  customContents: PropTypes.object,
  softwareSignature: PropTypes.string
};

// Step 3: Wrap the component tree with the Provider component
function ReactPlannerWrapper(props) {
  const { state, translator, catalog, projectActions, sceneActions, linesActions, holesActions, verticesActions, itemsActions, areaActions, viewer2DActions, viewer3DActions, groupsActions } = props;

  return (
    <ReactPlannerContext.Provider value={{
      state, translator, catalog, projectActions, sceneActions, linesActions, holesActions, verticesActions, itemsActions, areaActions, viewer2DActions, viewer3DActions, groupsActions, store: props.store
    }}>
      <ReactPlanner {...props} />
    </ReactPlannerContext.Provider>
  );
}

// Step 4: Define defaultProps directly on the component function
ReactPlannerWrapper.defaultProps = {
  translator: new Translator(),
  catalog: new Catalog(),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: `React-Planner ${VERSION}`,
  toolbarButtons: [],
  sidebarComponents: [],
  footerbarComponents: [],
  customContents: {},
};

//redux connect
function mapStateToProps(reduxState) {
  return {
    state: reduxState
  };
}

function mapDispatchToProps(dispatch) {
  return objectsMap(actions, actionNamespace => bindActionCreators(actions[actionNamespace], dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactPlannerWrapper);
