import React, { Component } from 'react';
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

  getChildContext() {
    return {
      ...objectsMap(actions, (actionNamespace: string) => (this.props as any)[actionNamespace]),
      translator: this.props.translator,
      catalog: this.props.catalog,
    };
  }

  componentWillMount() {
    let { store } = (this.context as any);
    let { projectActions, catalog, stateExtractor, plugins } = this.props;
    plugins.forEach((plugin: any) => plugin(store, stateExtractor));
    projectActions.initCatalog(catalog);
  }

  componentWillReceiveProps(nextProps: any) {
    let { stateExtractor, state, projectActions, catalog } = nextProps;
    let plannerState = stateExtractor(state);
    let catalogReady = plannerState.getIn(['catalog', 'ready']);
    if (!catalogReady) {
      projectActions.initCatalog(catalog);
    }
  }

  render() {
    let { width, height, state, stateExtractor, ...props } = this.props;

    let contentW = width - toolbarW - sidebarW;
    let toolbarH = height - footerBarH;
    let contentH = height - footerBarH;
    let sidebarH = height - footerBarH;

    let extractedState = stateExtractor(state);

    return (
      <div style={{ ...wrapperStyle, height }}>
        <Toolbar width={toolbarW} height={toolbarH} state={extractedState} {...props} />
        <Content width={contentW} height={contentH} state={extractedState} {...props} onWheel={(event: any) => event.preventDefault()} />
        <Sidebar width={sidebarW} height={sidebarH} state={extractedState} {...props} />
        <FooterBar width={width} height={footerBarH} state={extractedState} {...props} />
      </div>
    );
  }
}

(ReactPlanner as any).propTypes = {
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

(ReactPlanner as any).contextTypes = {
  store: PropTypes.object.isRequired,
};

(ReactPlanner as any).childContextTypes = {
  ...objectsMap(actions, () => PropTypes.object),
  translator: PropTypes.object,
  catalog: PropTypes.object,
};

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
