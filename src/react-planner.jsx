import React, { useContext, useEffect } from 'react';
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
import ReactPlannerContext from './utils/react-planner-context';
import Overlays from './components/overlays';

const { Toolbar } = ToolbarComponents;
const { Sidebar } = SidebarComponents;
const { FooterBar } = FooterBarComponents;

const footerBarH = 20;

const wrapperStyle = {
  display: 'flex',
  flexFlow: 'row nowrap',
  height: '100%'
};

function ReactPlannerContent(props) {
  const { width, height, state, stateExtractor, ...otherProps } = props;

  const contentH = height - footerBarH;

  const extractedState = stateExtractor(state);
  const contextValue = useContext(ReactPlannerContext); // Step 3: Access the context value using useContext

  useEffect(() => {
    let { store } = contextValue;
    let { projectActions, catalog, stateExtractor, plugins } = props;
    plugins.forEach(plugin => plugin(store, stateExtractor));
    projectActions.initCatalog(catalog);
  }, []);

  useEffect(() => {
    const { stateExtractor, state, projectActions, catalog } = props;
    const plannerState = stateExtractor(state);
    const catalogReady = plannerState.getIn(['catalog', 'ready']);
    if (!catalogReady) {
      projectActions.initCatalog(catalog);
    }
  }, [props]);

  return (
    <div style={{ ...wrapperStyle }}>
      <Overlays width={width} height={contentH} state={extractedState} {...otherProps} />
      <Toolbar state={extractedState} {...otherProps} />
      <Content width={width} height={contentH} state={extractedState} {...otherProps} onWheel={event => event.preventDefault()} />
      <Sidebar state={extractedState} {...otherProps} />
      <FooterBar width={width} height={footerBarH} state={extractedState} {...otherProps} />
    </div>
  );
}

ReactPlannerContent.propTypes = {
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
  customOverlays: PropTypes.arrayOf(PropTypes.object),
  customActions: PropTypes.object,
  softwareSignature: PropTypes.string,
};

// Step 3: Wrap the component tree with the Provider component
function ReactPlanner(props) {
  const { state, translator, catalog, projectActions, sceneActions, linesActions, holesActions, verticesActions, itemsActions, areaActions, viewer2DActions, viewer3DActions, groupsActions, ...customActions } = props;

  return (
    <ReactPlannerContext.Provider value={{
      state, translator, catalog, 
      projectActions, sceneActions, linesActions, 
      holesActions, verticesActions, itemsActions, 
      areaActions, viewer2DActions, viewer3DActions, 
      groupsActions, ...customActions, store: props.store
    }}>
      <ReactPlannerContent {...props} />
    </ReactPlannerContext.Provider>
  );
}

// Step 4: Define defaultProps directly on the component function
ReactPlanner.defaultProps = {
  translator: new Translator(),
  catalog: new Catalog(),
  plugins: [],
  allowProjectFileSupport: true,
  toolbarButtons: [],
  sidebarComponents: [],
  footerbarComponents: [],
  customContents: {},
  customOverlays: [],
  customActions: {},
  softwareSignature: `React-Planner ${VERSION}`,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReactPlanner);
