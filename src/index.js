import Catalog from './catalog/catalog';
import Translator from './translator/translator';
import ToolbarButton from './components/toolbar/toolbar-button';
import Ruler from './components/viewer2d/ruler';
import * as Models from './models';
import State2DViewer from './components/viewer2d/state';
import reducer from './reducers/reducer';
import ReactPlanner from './react-planner';
import Content from './components/content';
import Plugins from './plugins/plugins';
import WallFactory from './catalog/factories/wall-factory';
import AreaFactory from './catalog/factories/area-factory';
import Button from './components/style/button';
import CancelButton from './components/style/cancel-button';
import ContentContainer from './components/style/content-container';
import ContentTitle from './components/style/content-title';
import DeleteButton from './components/style/delete-button';
import FormBlock from './components/style/form-block';
import FormColorInput from './components/style/form-color-input';
import FormLabel from './components/style/form-label';
import FormNumberInput from './components/style/form-number-input';
import FormSelect from './components/style/form-select';
import FormSlider from './components/style/form-slider';
import FormSubmitButton from './components/style/form-submit-button';
import FormTextInput from './components/style/form-text-input';
import * as ReactPlannerConstants from './constants';
import * as ReactPlannerSharedStyle from './shared-style';
import {VERSION} from './version';

import ReactPlannerActions from './actions/actions';

import ReactPlannerAreasReducer from './reducers/areas-reducer';
import ReactPlannerHolesReducer from './reducers/holes-reducer';
import ReactPlannerItemsReducer from './reducers/items-reducer';
import ReactPlannerLinesReducer from './reducers/lines-reducer';
import ReactPlannerProjectReducer from './reducers/project-reducer';
import ReactPlannerSceneReducer from './reducers/scene-reducer';
import ReactPlannerVerticesReducer from './reducers/vertices-reducer';
import ReactPlannerViewer2dReducer from './reducers/viewer2d-reducer';
import ReactPlannerViewer3dReducer from './reducers/viewer3d-reducer';

let ElementsFactories = {WallFactory, AreaFactory};
let StyleComponents = {
  Button, CancelButton, ContentContainer, ContentTitle, DeleteButton, FormBlock,
  FormColorInput, FormLabel, FormNumberInput, FormSelect, FormSlider, FormSubmitButton, FormTextInput
};

console.info(`react-planner ${VERSION} started`); //MIT LICENSE COMPLIANT

let ReactPlannerReducers = {
  ReactPlannerAreasReducer,
  ReactPlannerHolesReducer,
  ReactPlannerItemsReducer,
  ReactPlannerLinesReducer,
  ReactPlannerProjectReducer,
  ReactPlannerSceneReducer,
  ReactPlannerVerticesReducer,
  ReactPlannerViewer2dReducer,
  ReactPlannerViewer3dReducer
};

export {
  Catalog,
  Translator,
  ToolbarButton,
  Ruler,
  Models,
  State2DViewer,
  reducer,
  ReactPlanner,
  Content as ReactPlannerContent,
  Plugins,
  ElementsFactories,
  StyleComponents,
  ReactPlannerConstants,
  ReactPlannerReducers,
  ReactPlannerActions,
  ReactPlannerSharedStyle
};
