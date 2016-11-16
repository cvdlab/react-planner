import React, {PropTypes, Component} from 'react';
import {Seq, Iterable} from 'immutable';

const STYLE_WRAPPER_BUTTONS = {textAlign: "right"};
const STYLE_BUTTON_UNSELECT = {backgroundColor: "gray", border: 0, color: "white", margin: "3px"};
const STYLE_BUTTON_RESET = {backgroundColor: "gray", border: 0, color: "white", margin: "3px"};
const STYLE_BUTTON_SAVE = {backgroundColor: "green", border: 0, color: "white", margin: "3px"};
const STYLE_BUTTON_REMOVE = {backgroundColor: "red", border: 0, color: "white", margin: "3px"};

class PropertiesEditor extends Component {

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

  save() {
    let {state} = this;
    let {element, layer} = this.props;
    let {editingActions, catalog} = this.context;

    let properties = Seq(state).map(data => data.currentValue).toMap().toJS();
    editingActions.setProperties(properties);
  }

  render() {
    let {state, context: {editingActions, catalog}} = this;

    let renderInputElement = (inputElement, propertyName, value, configs)=> {
      let {Viewer, Editor} = catalog.propertyTypes[inputElement];

      return React.createElement(Editor, {
        key: propertyName,
        propertyName,
        value,
        configs,
        onUpdate: value => this.updateProperty(propertyName, value)
      });
    };

    return (
      <div>
        { Seq(state).entrySeq().map(([propertyName, {currentValue, inputElement, configs}]) =>
          renderInputElement(inputElement, propertyName, currentValue, configs)) }

        <div style={STYLE_WRAPPER_BUTTONS}>
          <button style={STYLE_BUTTON_UNSELECT} onClick={event => editingActions.unselectAll()}>Unselect</button>
          <button style={STYLE_BUTTON_REMOVE} onClick={event => editingActions.remove()}>Remove</button>
          <button style={STYLE_BUTTON_RESET} onClick={event => this.reset()}>Reset</button>
          <button style={STYLE_BUTTON_SAVE} onClick={event => this.save()}>Save</button>
        </div>
      </div>
    )
  }

}

PropertiesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired
};

PropertiesEditor.contextTypes = {
  editingActions: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};
