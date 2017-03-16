import React, {PropTypes, Component} from 'react';
import {Map, fromJS} from 'immutable';
import FormSubmitButton from '../../style/form-submit-button';
import CancelButton from '../../style/cancel-button';
import DeleteButton from '../../style/delete-button';
import AttributesEditor from './attributes-editor/attributes-editor';
import * as geometry from '../../../utils/geometry.js';
import convert from 'convert-units';
import {UNIT_CENTIMETER} from "../../../constants";

let tableStyle = {
  width: '100%'
};

export default class ElementEditor extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      attributesFormData: this.initAttrData(this.props.element, this.props.layer, this.props.state),
      propertiesFormData: this.initPropData(this.props.element, this.props.layer, this.props.state)
    };

    this.updateAttribute = this.updateAttribute.bind(this);
  }

  initAttrData(element, layer, state) {

    element = typeof element.misc === 'object' ? element.set('misc', new Map(element.misc)) : element;

    switch (element.prototype) {
      case 'items': {
        return new Map({
          x: element.x,
          y: element.y,
          rotation: element.rotation
        });
      }
      case 'lines': {
        let v_a = layer.vertices.get(element.vertices.get('0'));
        let v_b = layer.vertices.get(element.vertices.get('1'));

        return new Map({
          vertexOne: v_a,
          vertexTwo: v_b,
          lineLength: geometry.pointsDistance(v_a.x, v_a.y, v_b.x, v_b.y)
        });
      }
      case 'holes': {
        let line = layer.lines.get(element.line);
        let {x: x0, y:y0} = layer.vertices.get(line.vertices.get(0));
        let {x: x1, y:y1} = layer.vertices.get(line.vertices.get(1));
        let lineLength = geometry.pointsDistance(x0, y0, x1, y1);
        let startAt = lineLength * element.offset - element.properties.get('width').get('length') / 2;

        let _unitA = element.misc.get('_unitA') || UNIT_CENTIMETER;
        let _lengthA = convert(startAt).from(UNIT_CENTIMETER).to(_unitA);

        let endAt = lineLength - lineLength * element.offset - element.properties.get('width').get('length') / 2;
        let _unitB = element.misc.get('_unitB') || UNIT_CENTIMETER;
        let _lengthB = convert(endAt).from(UNIT_CENTIMETER).to(_unitB);

        return new Map({
          offset: element.offset,
          offsetA: new Map({length: element.offset, _length: _lengthA, _unit: _unitA}),
          offsetB: new Map({length: element.offset, _length: _lengthB, _unit: _unitB})
        });
      }
      case 'areas': {
        return new Map({});
      }
      default:
        return null;
    }


  }

  initPropData(element, layer, state) {
    let {catalog} = this.context;
    let catalogElement = catalog.getElement(element.type);

    let mapped = {};
    for (let name in catalogElement.properties) {
      mapped[name] = new Map({
        currentValue: element.properties.has(name) ? element.properties.get(name) : fromJS(curr.defaultValue),
        configs: catalogElement.properties[name]
      });
    }

    return new Map(mapped);
  }

  updateAttribute(attributeName, value) {

    let {attributesFormData} = this.state;

    switch (this.props.element.prototype) {
      case 'items': {
        attributesFormData = attributesFormData.set(attributeName, value);
        break;
      }
      case 'lines': {
        if (attributeName === 'lineLength') {
          let v_0 = attributesFormData.get('vertexOne');
          let v_1 = attributesFormData.get('vertexTwo');

          let [v_a, v_b] = geometry.orderVertices([v_0, v_1]);

          let v_b_new = geometry.extendLine(v_a.x, v_a.y, v_b.x, v_b.y, value);

          attributesFormData = attributesFormData.withMutations(attr => {
            attr.set(v_0 === v_a ? 'vertexTwo' : 'vertexOne', v_b.merge(v_b_new));
            attr.set('lineLength', value);
          });
        }
        else {
          attributesFormData = attributesFormData.set(attributeName, attributesFormData.get(attributeName).merge(value));

          let v_0 = attributesFormData.get('vertexOne');
          let v_1 = attributesFormData.get('vertexTwo');

          attributesFormData = attributesFormData.set('lineLength', geometry.pointsDistance(v_0.x, v_0.y, v_1.x, v_1.y));
        }
        break;
      }
      case 'holes': {
        let offset;
        if (attributeName === 'offsetA') {

          let line = this.props.layer.lines.get(this.props.element.line);
          let {x: x0, y:y0} = this.props.layer.vertices.get(line.vertices.get(0));
          let {x: x1, y:y1} = this.props.layer.vertices.get(line.vertices.get(1));
          let alpha = Math.atan2(y1 - y0, x1 - x0);

          let xp = (attributesFormData.get('offsetA').get('length') +
            this.props.element.properties.get('width').get('length')) * Math.cos(alpha) + x0;
          let yp = (attributesFormData.get('offsetA').get('length') +
            this.props.element.properties.get('width').get('length')) * Math.sin(alpha) + y0;
          offset = geometry.pointPositionOnLineSegment(x0, y0, x1, y1, xp, yp);
          console.log(xp, yp, offset);
        } else if (attributeName === 'offsetB') {

        }
        attributesFormData = attributesFormData.set(attributeName, value).set('offset', offset);
        break;
      }
      default:
        break;
    }
    this.setState({attributesFormData});
  }

  updateProperty(propertyName, value) {
    let {state: {propertiesFormData}} = this;
    propertiesFormData = propertiesFormData.setIn([propertyName, 'currentValue'], value);
    this.setState({propertiesFormData});
  }

  reset() {
    this.setState({propertiesFormData: this.initPropData()});
  }

  save(event) {
    event.preventDefault();
    let {state: {propertiesFormData, attributesFormData}, context: {projectActions}} = this;

    let properties = propertiesFormData.map(data => {
      return data.get('currentValue');
    });

    projectActions.setProperties(properties);
    switch (this.props.element.prototype) {
      case 'items': {
        projectActions.setItemsAttributes(attributesFormData);
        break;
      }
      case 'lines': {
        projectActions.setLinesAttributes(attributesFormData);
        break;
      }
      case 'holes': {
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

        <AttributesEditor element={this.props.element}
                          onUpdate={this.updateAttribute}
                          attributeFormData={attributesFormData}/>

        {propertiesFormData.entrySeq()
          .map(([propertyName, data]) => {

            let currentValue = data.get('currentValue'), configs = data.get('configs');

            let {Editor} = catalog.getPropertyType(configs.type);

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
            <td><DeleteButton size="small"
                              onClick={e => projectActions.remove()}>{translator.t("Delete")}</DeleteButton></td>
            <td><CancelButton size="small" onClick={e => this.reset()}>{translator.t("Reset")}</CancelButton></td>
            <td><FormSubmitButton size="small">{translator.t("Save")}</FormSubmitButton></td>
          </tr>
          </tbody>
        </table>

      </form>
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({attributesFormData: this.initAttrData(nextProps.element, nextProps.layer, nextProps.state)});
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
