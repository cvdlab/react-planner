import React, {PropTypes, Component} from 'react';
import {Map, Seq, Iterable, fromJS} from 'immutable';
import FormSubmitButton from '../../style/form-submit-button';
import CancelButton from '../../style/cancel-button';
import DeleteButton from '../../style/delete-button';
import Button from '../../style/button';


export default class PropertiesEditor extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {formData: this.calculateInitialFormData()};
  }

  calculateInitialFormData() {
    let {element} = this.props;
    let {catalog} = this.context;
    let catalogElement = catalog.getElement(element.type);

    return new Map(catalogElement.properties)
      .map((configs, propertyName) => {
        let currentValue = element.properties.has(propertyName)
          ? element.properties.get(propertyName)
          : fromJS(configs.defaultValue);

        return new Map({
          currentValue,
          configs
        })
      });
  }

  updateProperty(propertyName, value) {
    let {state: {formData}} = this;
    formData = formData.setIn([propertyName, 'currentValue'], value);
    this.setState({formData});
  }

  reset() {
    let state = this.calculateInitialFormData();
    this.setState({formData: this.calculateInitialFormData()});
  }

  save(event) {
    event.preventDefault();
    let {state: {formData}, context: {projectActions}} = this;
    let properties = formData.map(data => data.get('currentValue'));
    projectActions.setProperties(properties);
  }

  render() {
    let {
      state: {formData},
      context: {projectActions, catalog, translator},
      props:{state: appState},
    } = this;

    let renderInputElement = (inputElement, propertyName, value, configs) => {
      let {Viewer, Editor} = catalog.propertyTypes[inputElement];

      return <Editor
        key={propertyName}
        propertyName={propertyName}
        value={value}
        configs={configs}
        onUpdate={value => this.updateProperty(propertyName, value)}
        state={appState}
      />
    };

    return (
      <form onSubmit={e => this.save(e)}>
        { formData.entrySeq()
          .map(([propertyName, data]) => {

            let currentValue = data.get('currentValue'), configs = data.get('configs');

            let {Viewer, Editor} = catalog.getPropertyType(configs.type);

            return <Editor
              key={propertyName}
              propertyName={propertyName}
              value={currentValue}
              configs={configs}
              onUpdate={value => this.updateProperty(propertyName, value)}
              state={appState}
            />
          })
        }

        <div style={{textAlign: "right"}}>
          {/*<div style={{marginRight: "3px", display: "inline-block"}}>
            <Button size="small" onClick={e => projectActions.unselectAll()}>{translator.t("Unselect")}</Button>
          </div>*/}
          <div style={{marginRight: "3px", display: "inline-block"}}>
            <DeleteButton size="small" onClick={e => projectActions.remove()}>{translator.t("Delete")}</DeleteButton>
          </div>
          <div style={{marginRight: "3px", display: "inline-block"}}>
            <CancelButton size="small" onClick={e => this.reset()}>{translator.t("Reset")}</CancelButton>
          </div>
          <FormSubmitButton size="small">{translator.t("Save")}</FormSubmitButton>
        </div>
      </form>
    )
  }

}

PropertiesEditor.propTypes = {
  state: PropTypes.object.isRequired,
  element: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired
};

PropertiesEditor.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
