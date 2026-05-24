import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect, ReactReduxContext } from 'react-redux';

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
import { PlannerContext } from './context';
import './styles/export';

type Props = {
  translator?: Translator;
  catalog?: Catalog;
  allowProjectFileSupport?: boolean;
  plugins?: (...args: any[]) => any[];
  autosaveKey?: string;
  autosaveDelay?: number;
  width: number;
  height: number;
  stateExtractor: (...args: any[]) => any;
  toolbarButtons?: any[];
  sidebarComponents?: any[];
  footerbarComponents?: any[];
  customContents?: any;
  softwareSignature?: string;
};

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

class ReactPlanner extends Component<any, any> {

  static contextType = ReactReduxContext;

  static defaultProps = {
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

  componentDidMount() {
    let { store } = (this.context as any);
    let { projectActions, catalog, stateExtractor, plugins } = this.props;
    plugins.forEach((plugin: any) => plugin(store, stateExtractor));
    projectActions.initCatalog(catalog);
  }

  componentDidUpdate(_prevProps: any) {
    let { stateExtractor, state, projectActions, catalog } = this.props;
    let plannerState = stateExtractor(state);
    let catalogReady = plannerState.getIn(['catalog', 'ready']);
    if (!catalogReady) {
      projectActions.initCatalog(catalog);
    }
  }

  getContextValue() {
    return {
      ...objectsMap(actions, (actionNamespace: string) => (this.props as any)[actionNamespace]),
      translator: this.props.translator,
      catalog: this.props.catalog,
    };
  }

  render() {
    let { width, height, state, stateExtractor, ...props } = this.props;

    let contentW = width - toolbarW - sidebarW;
    let toolbarH = height - footerBarH;
    let contentH = height - footerBarH;
    let sidebarH = height - footerBarH;

    let extractedState = stateExtractor(state);

    return (
      <PlannerContext.Provider value={this.getContextValue()}>
        <div style={{ ...wrapperStyle, height }}>
          <Toolbar width={toolbarW} height={toolbarH} state={extractedState} {...props} />
          <Content width={contentW} height={contentH} state={extractedState} {...props} onWheel={(event: any) => event.preventDefault()} />
          <Sidebar width={sidebarW} height={sidebarH} state={extractedState} {...props} />
          <FooterBar width={width} height={footerBarH} state={extractedState} {...props} />
        </div>
      </PlannerContext.Provider>
    );
  }
}


//redux connect
function mapStateToProps(reduxState: any) {
  return {
    state: reduxState
  };
}

function mapDispatchToProps(dispatch: any) {
  return objectsMap(actions, (actionNamespace: string) => bindActionCreators((actions as any)[actionNamespace], dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactPlanner);
