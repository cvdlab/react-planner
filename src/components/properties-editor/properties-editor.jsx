import React, {Component, PropTypes} from 'react';
import {Seq, Map} from 'immutable';
import PropertyString from './property-string.jsx';
import PropertyEnum from './property-enum.jsx';
import PropertyColor from './property-color.jsx';
import PropertyNumber from './property-number.jsx';

const STYLE_WRAPPER_BUTTONS = {textAlign: "right"};
const STYLE_BUTTON_UNSELECT = {backgroundColor: "gray", border: 0, color: "white", margin: "3px"};
const STYLE_BUTTON_RESET = {backgroundColor: "gray", border: 0, color: "white", margin: "3px"};
const STYLE_BUTTON_SAVE = {backgroundColor: "green", border: 0, color: "white", margin: "3px"};

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
    let {sceneComponents} = this.context;

    let sceneComponent = sceneComponents[element.type];

    return Seq(sceneComponent.properties).map((configs, propertyName) => {
      return {
        currentValue: element.properties.has(propertyName) ? element.properties.get(propertyName) : configs.defaultValue,
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
    let {editingActions} = this.context;

    let properties = Seq(state).map(configs => configs.currentValue).toMap().toJS();
    editingActions.setProperties(element.prototype, layer.id, element.id, properties);
  }

  render() {
    let {state, context: {editingActions}} = this;

    let renderInputElement = (inputElement, propertyName, value, configs)=> {
      let onChange = event => this.updateProperty(propertyName, event.target.value);

      switch(inputElement){
        case 'enum':
          return <PropertyEnum
            key={propertyName} propertyName={propertyName} value={value} configs={configs} onChange={onChange} />;

        case 'color':
          return <PropertyColor
            key={propertyName} propertyName={propertyName} value={value} configs={configs} onChange={onChange} />;

        case 'number':
          return <PropertyNumber
            key={propertyName} propertyName={propertyName} value={value} configs={configs} onChange={onChange} />;

        case 'string':
        default:
          return <PropertyString
            key={propertyName} propertyName={propertyName} value={value} configs={configs} onChange={onChange} />

      }
    };


    return (
      <div>
          { Seq(state).entrySeq().map(([propertyName, {currentValue, inputElement, configs}]) =>
              renderInputElement(inputElement, propertyName, currentValue, configs)) }

        <div style={STYLE_WRAPPER_BUTTONS}>
          <button style={STYLE_BUTTON_UNSELECT} onClick={event => editingActions.unselectAll()}>Unselect</button>
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
  sceneComponents: PropTypes.object.isRequired
};
