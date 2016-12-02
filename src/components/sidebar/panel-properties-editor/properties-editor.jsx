import React, {PropTypes, Component} from 'react';
import {Seq, Iterable} from 'immutable';
import FormSubmitButton from '../../style/form-submit-button';
import CancelButton from '../../style/cancel-button';
import DeleteButton from '../../style/delete-button';
import Button from '../../style/button';

const STYLE_WRAPPER_BUTTONS = {textAlign: "right"};
const STYLE_BUTTON_UNSELECT = {backgroundColor: "gray", border: 0, color: "white", margin: "3px"};
const STYLE_BUTTON_RESET = {backgroundColor: "gray", border: 0, color: "white", margin: "3px"};
const STYLE_BUTTON_SAVE = {backgroundColor: "green", border: 0, color: "white", margin: "3px"};
const STYLE_BUTTON_REMOVE = {backgroundColor: "red", border: 0, color: "white", margin: "3px"};

export default class PropertiesEditor extends Component {

  constructor(props, context) {
    super(props, context);
    this.calculateDefaultState = this.calculateDefaultState.bind(this);
    this.reset = this.reset.bind(this);
    this.save = this.save.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.state = this.calculateDefaultState();
  }

  calculateDefaultState() {
    let {element} = this.props;
    let {catalog} = this.context;
    let catalogElement = catalog.getElement(element.type);

    return Seq(catalogElement.properties).map((configs, propertyName) => {

      let currentValue = element.properties.has(propertyName)
        ? (v => Iterable.isIterable(v) ? v.toJS() : v)(element.properties.get(propertyName))
        : configs.defaultValue;

      return {
        currentValue,
        inputElement: configs.type,
        configs
      }
    }).toJS();
  }

  updateProperty(propertyName, value) {
    this.setState({
      [propertyName]: {
        ...this.state[propertyName],
        currentValue: value
      }
    });
  }

  reset() {
    let state = this.calculateDefaultState();
    this.setState(state);
  }

  save(event) {
    event.preventDefault();
    let {state} = this;
    let {element, layer} = this.props;
    let {editingActions, catalog} = this.context;

    let properties = Seq(state).map(data => data.currentValue).toMap().toJS();
    editingActions.setProperties(properties);
  }

  render() {
    let {state, context: {editingActions, catalog}, props:{state: appState}, context:{translator}} = this;

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
        { Seq(state).entrySeq().map(([propertyName, {currentValue, inputElement, configs}]) =>
          renderInputElement(inputElement, propertyName, currentValue, configs)) }

        <div style={STYLE_WRAPPER_BUTTONS}>
          <div style={{marginRight: "3px", display: "inline-block"}}>
            <Button size="small" onClick={e => editingActions.unselectAll()}>{translator.t("Unselect")}</Button>
          </div>
          <div style={{marginRight: "3px", display: "inline-block"}}>
            <DeleteButton size="small" onClick={e => editingActions.remove()}>{translator.t("Delete")}</DeleteButton>
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
  editingActions: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
