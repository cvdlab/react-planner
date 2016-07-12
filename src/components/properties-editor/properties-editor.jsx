import React, {Component, PropTypes} from 'react';
import {Seq, Map} from 'immutable';


const STYLE_UL = {listStyle: "none", padding: "0px"};
const STYLE_LI = {marginBottom: "5px"};
const STYLE_LABEL = {width: "70px", display: "inline-block"};
const STYLE_INPUT = {width: "100px"};
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
        inputElement: configs.type
      }
    }).toJS();
  }

  updateProperty(propertyName, value) {
    this.setState({
      [propertyName]: {
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
    let {element} = this.props;
    let {editingActions} = this.context;

    let properties = Seq(state).map(configs => configs.currentValue).toMap().toJS();
    editingActions.setProperties(element.prototype, 'layer-floor-1', element.id, properties);
  }

  render() {
    let {state, context: {editingActions}} = this;

    return (
      <div>
        <ul style={STYLE_UL}>
          { Seq(state).entrySeq().map(([propertyName, {currentValue, inputElement}]) =>
            <li style={STYLE_LI} key={propertyName}>
              <label style={STYLE_LABEL}>{propertyName}</label>
              <input type="text" style={STYLE_INPUT} value={currentValue}
                     onChange={event => this.updateProperty(propertyName, event.target.value)}/>
            </li>
          )}
        </ul>

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
  element: PropTypes.object.isRequired
};

PropertiesEditor.contextTypes = {
  editingActions: PropTypes.object.isRequired,
  sceneComponents: PropTypes.object.isRequired
};
