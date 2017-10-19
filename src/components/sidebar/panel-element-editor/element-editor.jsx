import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, fromJS} from 'immutable';
import FormSubmitButton from '../../style/form-submit-button';
import CancelButton from '../../style/cancel-button';
import DeleteButton from '../../style/delete-button';
import AttributesEditor from './attributes-editor/attributes-editor';
import * as geometry from '../../../utils/geometry.js';
import * as math from '../../../utils/math.js';
import * as SharedStyle from '../../../shared-style';
import convert from 'convert-units';
import MdContentCopy from 'react-icons/lib/md/content-copy';
import MdContentPaste from 'react-icons/lib/md/content-paste';
import diff from 'immutablediff';

const tableStyle = {
  marginTop: '10px',
  marginRight: '0px',
  marginLeft: 'auto'
};

const attrPorpSeparatorStyle = {
  margin: '0.5em 0.25em 0.5em 0',
  border: '2px solid ' + SharedStyle.SECONDARY_COLOR.alt,
  position:'relative',
  height:'2.5em',
  borderRadius:'2px'
};

const headActionStyle = {
  position:'absolute',
  right:'0.5em',
  top:'0.5em'
};

const iconHeadStyle = {
  float:'right',
  margin:'-3px 4px 0px 0px',
  padding:0,
  cursor:'pointer',
  fontSize:'1.4em'
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
          rotation: math.toFixedFloat(element.rotation, 2)
        });
      }
      case 'lines': {
        let v_a = layer.vertices.get(element.vertices.get(0));
        let v_b = layer.vertices.get(element.vertices.get(1));

        let distance = geometry.pointsDistance(v_a.x, v_a.y, v_b.x, v_b.y);
        let _unit = element.misc.get('_unitLength') || this.context.catalog.unit;
        let _length = convert(distance).from(this.context.catalog.unit).to(_unit);

        return new Map({
          vertexOne: v_a,
          vertexTwo: v_b,
          lineLength: new Map({length: distance, _length, _unit}),
        });
      }
      case 'holes': {
        let line = layer.lines.get(element.line);
        let {x: x0, y: y0} = layer.vertices.get(line.vertices.get(0));
        let {x: x1, y: y1} = layer.vertices.get(line.vertices.get(1));
        let lineLength = geometry.pointsDistance(x0, y0, x1, y1);
        let startAt = lineLength * element.offset - element.properties.get('width').get('length') / 2;

        let _unitA = element.misc.get('_unitA') || this.context.catalog.unit;
        let _lengthA = convert(startAt).from(this.context.catalog.unit).to(_unitA);

        let endAt = lineLength - lineLength * element.offset - element.properties.get('width').get('length') / 2;
        let _unitB = element.misc.get('_unitB') || this.context.catalog.unit;
        let _lengthB = convert(endAt).from(this.context.catalog.unit).to(_unitB);

        return new Map({
          offset: element.offset,
          offsetA: new Map({
            length: math.toFixedFloat(startAt, 2),
            _length: math.toFixedFloat(_lengthA, 2),
            _unit: _unitA
          }),
          offsetB: new Map({
            length: math.toFixedFloat(endAt, 2),
            _length: math.toFixedFloat(_lengthB, 2),
            _unit: _unitB
          })
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
        currentValue: element.properties.has(name) ? element.properties.get(name) : fromJS(catalogElement.properties[name].defaultValue),
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
        switch(attributeName)
        {
          case 'lineLength':
          {
            let v_0 = attributesFormData.get('vertexOne');
            let v_1 = attributesFormData.get('vertexTwo');

            let [v_a, v_b] = geometry.orderVertices([v_0, v_1]);

            let v_b_new = geometry.extendLine(v_a.x, v_a.y, v_b.x, v_b.y, value.get('length'), 2);

            attributesFormData = attributesFormData.withMutations(attr => {
              attr.set(v_0 === v_a ? 'vertexTwo' : 'vertexOne', v_b.merge(v_b_new));
              attr.set('lineLength', value);
            });
            break;
          }
          case 'vertexOne':
          case 'vertexTwo':
          {
            attributesFormData = attributesFormData.withMutations(attr => {
              attr.set(attributeName, attr.get(attributeName).merge(value));

              let newDistance = geometry.verticesDistance(attr.get('vertexOne'), attr.get('vertexTwo'));

              attr.mergeIn(['lineLength'], attr.get('lineLength').merge({
                'length': newDistance,
                '_length': convert(newDistance).from(this.context.catalog.unit).to(attr.get('lineLength').get('_unit'))
              }));
            });
            break;
          }
          default:
          {
            attributesFormData = attributesFormData.set(attributeName, value);
            break;
          }
        }
        break;
      }
      case 'holes': {
        switch( attributeName )
        {
          case 'offsetA':
          {
            let offset;
            let line = this.props.layer.lines.get(this.props.element.line);

            let orderedVertices = geometry.orderVertices([this.props.layer.vertices.get(line.vertices.get(0)),
              this.props.layer.vertices.get(line.vertices.get(1))]);

            let {x: x0, y: y0} = orderedVertices[0];
            let {x: x1, y: y1} = orderedVertices[1];

            let alpha = Math.atan2(y1 - y0, x1 - x0);
            let lineLength = geometry.pointsDistance(x0, y0, x1, y1);

            let lengthValue = value.get('length');
            lengthValue = Math.max(lengthValue, 0);
            lengthValue = Math.min(lengthValue, lineLength - this.props.element.properties.get('width').get('length'));

            let xp = (lengthValue +
              this.props.element.properties.get('width').get('length') / 2) * Math.cos(alpha) + x0;
            let yp = (lengthValue +
              this.props.element.properties.get('width').get('length') / 2) * Math.sin(alpha) + y0;

            offset = geometry.pointPositionOnLineSegment(x0, y0, x1, y1, xp, yp);

            let endAt = math.toFixedFloat(lineLength - (lineLength * offset) - this.props.element.properties.get('width').get('length') / 2, 2);

            let offsetB = new Map({
              length: endAt,
              _length: convert(endAt).from(this.context.catalog.unit).to(attributesFormData.get('offsetB').get('_unit')),
              _unit: attributesFormData.get('offsetB').get('_unit')
            });

            attributesFormData = attributesFormData.set('offsetB', offsetB).set('offset', offset);

            let offsetAttribute = new Map({
              length: math.toFixedFloat(lengthValue, 2),
              _unit: value.get('_unit'),
              _length: math.toFixedFloat(convert(lengthValue).from(this.context.catalog.unit).to(value.get('_unit')), 2)
            });

            attributesFormData = attributesFormData.set(attributeName, offsetAttribute);

            break;
          }
          case 'offsetB':
          {
            let offset;
            let line = this.props.layer.lines.get(this.props.element.line);

            let orderedVertices = geometry.orderVertices([this.props.layer.vertices.get(line.vertices.get(0)),
              this.props.layer.vertices.get(line.vertices.get(1))]);

            let {x: x0, y: y0} = orderedVertices[0];
            let {x: x1, y: y1} = orderedVertices[1];

            let alpha = Math.atan2(y1 - y0, x1 - x0);
            let lineLength = geometry.pointsDistance(x0, y0, x1, y1);

            let lengthValue = value.get('length');
            lengthValue = Math.max(lengthValue, 0);
            lengthValue = Math.min(lengthValue, lineLength - this.props.element.properties.get('width').get('length'));

            let xp = x1 - (lengthValue +
              this.props.element.properties.get('width').get('length') / 2) * Math.cos(alpha);
            let yp = y1 - (lengthValue +
              this.props.element.properties.get('width').get('length') / 2) * Math.sin(alpha);

            offset = geometry.pointPositionOnLineSegment(x0, y0, x1, y1, xp, yp);

            let startAt = math.toFixedFloat((lineLength * offset) - this.props.element.properties.get('width').get('length') / 2, 2);

            let offsetA = new Map({
              length: startAt,
              _length: convert(startAt).from(this.context.catalog.unit).to(attributesFormData.get('offsetA').get('_unit')),
              _unit: attributesFormData.get('offsetA').get('_unit')
            });

            attributesFormData = attributesFormData.set('offsetA', offsetA).set('offset', offset);

            let offsetAttribute = new Map({
              length: math.toFixedFloat(lengthValue, 2),
              _unit: value.get('_unit'),
              _length: math.toFixedFloat(convert(lengthValue).from(this.context.catalog.unit).to(value.get('_unit')), 2)
            });

            attributesFormData = attributesFormData.set(attributeName, offsetAttribute);

            break;
          }
          default:
          {
            attributesFormData = attributesFormData.set(attributeName, value);
            break;
          }
        };
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
    this.setState({propertiesFormData: this.initPropData(this.props.element, this.props.layer, this.props.state)});
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

  copyProperties( properties ) {
    this.context.projectActions.copyProperties( properties );
  };

  pasteProperties() {
    this.context.projectActions.pasteProperties();
  };

  render() {
    let {
      state: {propertiesFormData, attributesFormData},
      context: {projectActions, catalog, translator},
      props: {state: appState, element},
    } = this;

    return (
      <form onSubmit={e => this.save(e)}>

        <AttributesEditor element={element}
                          onUpdate={this.updateAttribute}
                          attributeFormData={attributesFormData}
                          state={appState}/>

        <div style={attrPorpSeparatorStyle}>
          <div style={headActionStyle}>
            <div title={translator.t('Copy')} style={iconHeadStyle} onClick={ e => this.copyProperties(element.properties) }><MdContentCopy /></div>
            { appState.get('clipboardProperties') ? <div title={translator.t('Paste')} style={iconHeadStyle} onClick={ e => this.pasteProperties() }><MdContentPaste /></div> : null }
          </div>
        </div>

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
              sourceElement={element}
              internalState={this.state}
            />
          })
        }

        <table style={tableStyle}>
          <tbody>
          <tr>
            <td>
              <DeleteButton size="small" onClick={e => projectActions.remove()}>{translator.t('Delete')}</DeleteButton>
            </td>
            <td>
              <CancelButton size="small" onClick={e => this.reset()}>{translator.t('Reset')}</CancelButton>
            </td>
            <td>
              <FormSubmitButton size="small">{translator.t('Save')}</FormSubmitButton>
            </td>
          </tr>
          </tbody>
        </table>

      </form>
    )
  }

  componentWillReceiveProps({ element, layer, state }) {
    let { prototype, id } = element;
    let scene = this.props.state.get('scene');
    let selectedLayer = scene.getIn(['layers', scene.get('selectedLayer')]);
    let selected = selectedLayer.getIn([prototype, id]);

    if( diff( element, selected ).size ) this.setState({
      attributesFormData: this.initAttrData(element, layer, state),
      propertiesFormData: this.initPropData(element, layer, state)
    });
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
