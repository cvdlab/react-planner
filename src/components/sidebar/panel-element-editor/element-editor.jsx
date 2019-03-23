import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, fromJS} from 'immutable';
import AttributesEditor from './attributes-editor/attributes-editor';
import { GeometryUtils, MathUtils } from '../../../utils/export';
import * as SharedStyle from '../../../shared-style';
import convert from 'convert-units';
import {MdContentCopy, MdContentPaste} from 'react-icons/md';

const PRECISION = 2;

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

  shouldComponentUpdate(nextProps, nextState) {
    if(
      this.state.attributesFormData.hashCode() !== nextState.attributesFormData.hashCode() ||
      this.state.propertiesFormData.hashCode() !== nextState.propertiesFormData.hashCode() ||
      this.props.state.clipboardProperties.hashCode() !== nextProps.state.clipboardProperties.hashCode()
    ) return true;

    return false;
  }

  componentWillReceiveProps({ element, layer, state }) {
    let { prototype, id } = element;
    let scene = this.props.state.get('scene');
    let selectedLayer = scene.getIn(['layers', scene.get('selectedLayer')]);
    let selected = selectedLayer.getIn([prototype, id]);

    if( selectedLayer.hashCode() !== layer.hashCode() ) this.setState({
      attributesFormData: this.initAttrData(element, layer, state),
      propertiesFormData: this.initPropData(element, layer, state)
    });
  }

  initAttrData(element, layer, state) {

    element = typeof element.misc === 'object' ? element.set('misc', new Map(element.misc)) : element;

    switch (element.prototype) {
      case 'items': {
        return new Map(element);
      }
      case 'lines': {
        let v_a = layer.vertices.get(element.vertices.get(0));
        let v_b = layer.vertices.get(element.vertices.get(1));

        let distance = GeometryUtils.pointsDistance(v_a.x, v_a.y, v_b.x, v_b.y);
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
        let lineLength = GeometryUtils.pointsDistance(x0, y0, x1, y1);
        let startAt = lineLength * element.offset - element.properties.get('width').get('length') / 2;

        let _unitA = element.misc.get('_unitA') || this.context.catalog.unit;
        let _lengthA = convert(startAt).from(this.context.catalog.unit).to(_unitA);

        let endAt = lineLength - lineLength * element.offset - element.properties.get('width').get('length') / 2;
        let _unitB = element.misc.get('_unitB') || this.context.catalog.unit;
        let _lengthB = convert(endAt).from(this.context.catalog.unit).to(_unitB);

        return new Map({
          offset: element.offset,
          offsetA: new Map({
            length: MathUtils.toFixedFloat(startAt, PRECISION),
            _length: MathUtils.toFixedFloat(_lengthA, PRECISION),
            _unit: _unitA
          }),
          offsetB: new Map({
            length: MathUtils.toFixedFloat(endAt, PRECISION),
            _length: MathUtils.toFixedFloat(_lengthB, PRECISION),
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

            let [v_a, v_b] = GeometryUtils.orderVertices([v_0, v_1]);

            let v_b_new = GeometryUtils.extendLine(v_a.x, v_a.y, v_b.x, v_b.y, value.get('length'), PRECISION);

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

              let newDistance = GeometryUtils.verticesDistance(attr.get('vertexOne'), attr.get('vertexTwo'));

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
            let line = this.props.layer.lines.get(this.props.element.line);

            let orderedVertices = GeometryUtils.orderVertices([
              this.props.layer.vertices.get(line.vertices.get(0)),
              this.props.layer.vertices.get(line.vertices.get(1))
            ]);

            let [ {x: x0, y: y0}, {x: x1, y: y1} ] = orderedVertices;

            let alpha = GeometryUtils.angleBetweenTwoPoints(x0, y0, x1, y1);
            let lineLength = GeometryUtils.pointsDistance(x0, y0, x1, y1);
            let widthLength = this.props.element.properties.get('width').get('length');
            let halfWidthLength = widthLength / 2;

            let lengthValue = value.get('length');
            lengthValue = Math.max(lengthValue, 0);
            lengthValue = Math.min(lengthValue, lineLength - widthLength);

            let xp = (lengthValue + halfWidthLength) * Math.cos(alpha) + x0;
            let yp = (lengthValue + halfWidthLength) * Math.sin(alpha) + y0;

            let offset = GeometryUtils.pointPositionOnLineSegment(x0, y0, x1, y1, xp, yp);

            let endAt = MathUtils.toFixedFloat(lineLength - (lineLength * offset) - halfWidthLength, PRECISION);
            let offsetUnit = attributesFormData.getIn(['offsetB', '_unit']);

            let offsetB = new Map({
              length: endAt,
              _length: convert(endAt).from(this.context.catalog.unit).to(offsetUnit),
              _unit: offsetUnit
            });

            attributesFormData = attributesFormData.set('offsetB', offsetB).set('offset', offset);

            let offsetAttribute = new Map({
              length: MathUtils.toFixedFloat(lengthValue, PRECISION),
              _unit: value.get('_unit'),
              _length: MathUtils.toFixedFloat(convert(lengthValue).from(this.context.catalog.unit).to(value.get('_unit')), PRECISION)
            });

            attributesFormData = attributesFormData.set(attributeName, offsetAttribute);

            break;
          }
          case 'offsetB':
          {
            let line = this.props.layer.lines.get(this.props.element.line);

            let orderedVertices = GeometryUtils.orderVertices([
              this.props.layer.vertices.get(line.vertices.get(0)),
              this.props.layer.vertices.get(line.vertices.get(1))
            ]);

            let [ {x: x0, y: y0}, {x: x1, y: y1} ] = orderedVertices;

            let alpha = GeometryUtils.angleBetweenTwoPoints(x0, y0, x1, y1);
            let lineLength = GeometryUtils.pointsDistance(x0, y0, x1, y1);
            let widthLength = this.props.element.properties.get('width').get('length');
            let halfWidthLength = widthLength / 2;

            let lengthValue = value.get('length');
            lengthValue = Math.max(lengthValue, 0);
            lengthValue = Math.min(lengthValue, lineLength - widthLength);

            let xp = x1 - (lengthValue + halfWidthLength) * Math.cos(alpha);
            let yp = y1 - (lengthValue + halfWidthLength) * Math.sin(alpha);

            let offset = GeometryUtils.pointPositionOnLineSegment(x0, y0, x1, y1, xp, yp);

            let startAt = MathUtils.toFixedFloat((lineLength * offset) - halfWidthLength, PRECISION);
            let offsetUnit = attributesFormData.getIn(['offsetA', '_unit']);

            let offsetA = new Map({
              length: startAt,
              _length: convert(startAt).from(this.context.catalog.unit).to(offsetUnit),
              _unit: offsetUnit
            });

            attributesFormData = attributesFormData.set('offsetA', offsetA).set('offset', offset);

            let offsetAttribute = new Map({
              length: MathUtils.toFixedFloat(lengthValue, PRECISION),
              _unit: value.get('_unit'),
              _length: MathUtils.toFixedFloat(convert(lengthValue).from(this.context.catalog.unit).to(value.get('_unit')), PRECISION)
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
    this.save({attributesFormData});
  }

  updateProperty(propertyName, value) {
    let {state: {propertiesFormData}} = this;
    propertiesFormData = propertiesFormData.setIn([propertyName, 'currentValue'], value);
    this.setState({propertiesFormData});
    this.save({propertiesFormData});
  }

  reset() {
    this.setState({propertiesFormData: this.initPropData(this.props.element, this.props.layer, this.props.state)});
  }

  save({propertiesFormData, attributesFormData}) {

    if( propertiesFormData ) {
      let properties = propertiesFormData.map(data => {
        return data.get('currentValue');
      });

      this.context.projectActions.setProperties(properties);
    }

    if( attributesFormData ) {
      switch (this.props.element.prototype) {
        case 'items': {
          this.context.projectActions.setItemsAttributes(attributesFormData);
          break;
        }
        case 'lines': {
          this.context.projectActions.setLinesAttributes(attributesFormData);
          break;
        }
        case 'holes': {
          this.context.projectActions.setHolesAttributes(attributesFormData);
          break;
        }
      }
    }
  }

  copyProperties( properties ) {
    this.context.projectActions.copyProperties( properties );
  }

  pasteProperties() {
    this.context.projectActions.pasteProperties();
  }

  render() {
    let {
      state: {propertiesFormData, attributesFormData},
      context: {projectActions, catalog, translator},
      props: {state: appState, element},
    } = this;

    return (
      <div>

        <AttributesEditor
          element={element}
          onUpdate={this.updateAttribute}
          attributeFormData={attributesFormData}
          state={appState}
        />

        <div style={attrPorpSeparatorStyle}>
          <div style={headActionStyle}>
            <div title={translator.t('Copy')} style={iconHeadStyle} onClick={ e => this.copyProperties(element.properties) }><MdContentCopy /></div>
            {
              appState.get('clipboardProperties') && appState.get('clipboardProperties').size ?
                <div title={translator.t('Paste')} style={iconHeadStyle} onClick={ e => this.pasteProperties() }><MdContentPaste /></div> : null
            }
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

      </div>
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
