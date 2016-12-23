import Catalog from './catalog/catalog';
import Translator from './translator/translator';
import ToolbarButton from './components/toolbar/toolbar-button';
import Ruler from './components/viewer2d/ruler';
import * as Models from './models';
import State2DViewer from './components/viewer2d/state';
import reducer from './reducers/reducer';
import ReactPlanner from './react-planner';
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

var ElementsFactories = { WallFactory: WallFactory, AreaFactory: AreaFactory };
var StyleComponents = {
  Button: Button, CancelButton: CancelButton, ContentContainer: ContentContainer, ContentTitle: ContentTitle, DeleteButton: DeleteButton, FormBlock: FormBlock,
  FormColorInput: FormColorInput, FormLabel: FormLabel, FormNumberInput: FormNumberInput, FormSelect: FormSelect, FormSlider: FormSlider, FormSubmitButton: FormSubmitButton, FormTextInput: FormTextInput
};

console.info('react-planner started'); //MIT LICENSE COMPLIANT

export { Catalog, Translator, ToolbarButton, Ruler, Models, State2DViewer, reducer, ReactPlanner, Plugins, ElementsFactories, StyleComponents };