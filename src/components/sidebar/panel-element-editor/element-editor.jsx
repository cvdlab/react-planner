import React, { PropTypes, Component } from 'react';
import { Map, Seq, Iterable, fromJS } from 'immutable';
import FormSubmitButton from '../../style/form-submit-button';
import CancelButton from '../../style/cancel-button';
import DeleteButton from '../../style/delete-button';
import Button from '../../style/button';
import AttributesEditor from './attributes-editor/attributes-editor';

let tableStyle = {
  width: '100%'
};

export default class ElementEditor extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      attributesFormData: this.initAttrData(),
      propertiesFormData: this.initPropData()
    };

    this.updateAttribute = this.updateAttribute.bind( this );
  }

  initAttrData() {

    switch( this.props.element.prototype )
    {
      case 'items':
      {
        return new Map({
            x:this.props.element.x,
            y:this.props.element.y,
            rotation:this.props.element.rotation
        });
      }
      case 'lines':
      {
        return new Map({
            vertexOne: this.props.layer.vertices.get( this.props.element.vertices.get('0') ),
            vertexTwo: this.props.layer.vertices.get( this.props.element.vertices.get('1') )
        });
      }
      case 'holes':
      {
        return new Map({
          offset: this.props.element.offset
        });
      }
      case 'areas':
      {
        return new Map({});
      }
      default: return null;
    }



  }

  initPropData() {
    let {element} = this.props;
    let {catalog} = this.context;
    let catalogElement = catalog.getElement(element.type);

    var mapped = {};
    for (var name in catalogElement.properties) {
      mapped[name] = new Map({
        currentValue: element.properties.has(name) ? element.properties.get(name) : fromJS(curr.defaultValue),
        configs: catalogElement.properties[name]
      });
    }

    return new Map(mapped);
  }

  updateAttribute(AttributeName, value) {
    switch( this.props.element.prototype )
    {
      case 'items':
      {
        let {state: {attributesFormData}} = this;
        attributesFormData = attributesFormData.set( AttributeName, value );
        this.setState({ attributesFormData });
        break;
      }
      case 'lines':
      {
        let {state: {attributesFormData}} = this;
        attributesFormData = attributesFormData.set( AttributeName, attributesFormData.get( AttributeName ).merge( value ) );
        this.setState({ attributesFormData });
        break;
      }
      case 'holes':
      {
        let {state: {attributesFormData}} = this;
        attributesFormData = attributesFormData.set( AttributeName, value );
        this.setState({ attributesFormData });
        break;
      }
      default: break;
    }
  }

  updateProperty(propertyName, value) {
    let {state: {propertiesFormData}} = this;
    propertiesFormData = propertiesFormData.setIn([propertyName, 'currentValue'], value);
    this.setState({ propertiesFormData });
  }

  reset() {
    this.setState({ propertiesFormData: this.initPropData() });
  }

  save(event) {
    event.preventDefault();
    let {state: {propertiesFormData, attributesFormData}, context: {projectActions}} = this;

    let properties = propertiesFormData.map(data => { return data.get('currentValue'); });

    projectActions.setProperties(properties);
    switch( this.props.element.prototype )
    {
      case 'items':
      {
        projectActions.setItemsAttributes(attributesFormData);
        break;
      }
      case 'lines':
      {
        projectActions.setLinesAttributes(attributesFormData);
        break;
      }
      case 'holes':
      {
        projectActions.setHolesAttributes(attributesFormData);
        break;
      }
    }
  }

  render() {
    let {
      state: {propertiesFormData, attributesFormData},
      context: {projectActions, catalog, translator},
      props: {state: appState},
    } = this;

    return (
      <form onSubmit={e => this.save(e)}>

        <AttributesEditor element={this.props.element} onUpdate={this.updateAttribute} attributeFormData={attributesFormData}/>

        {propertiesFormData.entrySeq()
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

        <table style={tableStyle}>
          <tbody>
            <tr>
              <td><DeleteButton size="small" onClick={e => projectActions.remove()}>{translator.t("Delete")}</DeleteButton></td>
              <td><CancelButton size="small" onClick={e => this.reset()}>{translator.t("Reset")}</CancelButton></td>
              <td><FormSubmitButton size="small">{translator.t("Save")}</FormSubmitButton></td>
            </tr>
          </tbody>
        </table>

      </form>
    )
  }

}

ElementEditor.propTypes = {
  state: PropTypes.object.isRequired,
  element: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired
};

ElementEditor.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
