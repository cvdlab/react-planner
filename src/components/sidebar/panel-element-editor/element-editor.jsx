import React, { useState, useEffect, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { Map, fromJS } from 'immutable';
import AttributesEditor from './attributes-editor/attributes-editor';
import { GeometryUtils, MathUtils } from '../../../utils/export';
import * as SharedStyle from '../../../styles/shared-style';
import convert from 'convert-units';
import { MdContentCopy, MdContentPaste } from 'react-icons/md';
import ReactPlannerContext from '../../../utils/react-planner-context';

const PRECISION = 2;

const attrPorpSeparatorStyle = {
  margin: '0.5em 0.25em 0.5em 0',
  border: '2px solid ' + SharedStyle.SECONDARY_COLOR.alt,
  position: 'relative',
  height: '2.5em',
  borderRadius: '2px'
};

const headActionStyle = {
  position: 'absolute',
  right: '0.5em',
  top: '0.5em'
};

const iconHeadStyle = {
  float: 'right',
  margin: '-3px 4px 0px 0px',
  padding: 0,
  cursor: 'pointer',
  fontSize: '1.4em'
};

const ElementEditor = ({ state: appState, element, layer }) => {
  const { projectActions, catalog, translator } = useContext(ReactPlannerContext);

  const initAttrData = (element, layer, state) => {
    element = typeof element.misc === 'object' ? element.set('misc', new Map(element.misc)) : element;

    switch (element.prototype) {
      case 'items': {
        return new Map(element);
      }
      case 'lines': {
        let v_a = layer.vertices.get(element.vertices.get(0));
        let v_b = layer.vertices.get(element.vertices.get(1));

        let distance = GeometryUtils.pointsDistance(v_a.x, v_a.y, v_b.x, v_b.y);
        let _unit = element.misc.get('_unitLength') || catalog.unit;
        let _length = convert(distance).from(catalog.unit).to(_unit);

        return new Map({
          vertexOne: v_a,
          vertexTwo: v_b,
          lineLength: new Map({ length: distance, _length, _unit }),
        });
      }
      case 'holes': {
        let line = layer.lines.get(element.line);
        let { x: x0, y: y0 } = layer.vertices.get(line.vertices.get(0));
        let { x: x1, y: y1 } = layer.vertices.get(line.vertices.get(1));
        let lineLength = GeometryUtils.pointsDistance(x0, y0, x1, y1);
        let startAt = lineLength * element.offset - element.properties.get('width').get('length') / 2;

        let _unitA = element.misc.get('_unitA') || catalog.unit;
        let _lengthA = convert(startAt).from(catalog.unit).to(_unitA);

        let endAt = lineLength - lineLength * element.offset - element.properties.get('width').get('length') / 2;
        let _unitB = element.misc.get('_unitB') || catalog.unit;
        let _lengthB = convert(endAt).from(catalog.unit).to(_unitB);

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

  const initPropData = (element, layer, state) => {
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

  const [attributesFormData, setAttributesFormData] = useState(initAttrData(element, layer, appState));
  const [propertiesFormData, setPropertiesFormData] = useState(initPropData(element, layer, appState));

  useEffect(() => {
    setAttributesFormData(initAttrData(element, layer, appState));
    setPropertiesFormData(initPropData(element, layer, appState));
  }, [element, layer, appState]);

  const updateAttribute = (attributeName, value) => {
    let _attributesFormData = attributesFormData;

    switch (element.prototype) {
      case 'items': {
        _attributesFormData = _attributesFormData.set(attributeName, value);
        break;
      }
      case 'lines': {
        switch (attributeName) {
          case 'lineLength':
            {
              let v_0 = _attributesFormData.get('vertexOne');
              let v_1 = _attributesFormData.get('vertexTwo');

              let [v_a, v_b] = GeometryUtils.orderVertices([v_0, v_1]);

              let v_b_new = GeometryUtils.extendLine(v_a.x, v_a.y, v_b.x, v_b.y, value.get('length'), PRECISION);

              _attributesFormData = _attributesFormData.withMutations(attr => {
                attr.set(v_0 === v_a ? 'vertexTwo' : 'vertexOne', v_b.merge(v_b_new));
                attr.set('lineLength', value);
              });
              break;
            }
          case 'vertexOne':
          case 'vertexTwo':
            {
              _attributesFormData = _attributesFormData.withMutations(attr => {
                attr.set(attributeName, attr.get(attributeName).merge(value));

                let newDistance = GeometryUtils.verticesDistance(attr.get('vertexOne'), attr.get('vertexTwo'));

                attr.mergeIn(['lineLength'], attr.get('lineLength').merge({
                  'length': newDistance,
                  '_length': convert(newDistance).from(catalog.unit).to(attr.get('lineLength').get('_unit'))
                }));
              });
              break;
            }
          default:
            {
              _attributesFormData = _attributesFormData.set(attributeName, value);
              break;
            }
        }
        break;
      }
      case 'holes': {
        switch (attributeName) {
          case 'offsetA':
            {
              let line = layer.lines.get(element.line);

              let orderedVertices = GeometryUtils.orderVertices([
                layer.vertices.get(line.vertices.get(0)),
                layer.vertices.get(line.vertices.get(1))
              ]);

              let [{ x: x0, y: y0 }, { x: x1, y: y1 }] = orderedVertices;

              let alpha = GeometryUtils.angleBetweenTwoPoints(x0, y0, x1, y1);
              let lineLength = GeometryUtils.pointsDistance(x0, y0, x1, y1);
              let widthLength = element.properties.get('width').get('length');
              let halfWidthLength = widthLength / 2;

              let lengthValue = value.get('length');
              lengthValue = Math.max(lengthValue, 0);
              lengthValue = Math.min(lengthValue, lineLength - widthLength);

              let xp = (lengthValue + halfWidthLength) * Math.cos(alpha) + x0;
              let yp = (lengthValue + halfWidthLength) * Math.sin(alpha) + y0;

              let offset = GeometryUtils.pointPositionOnLineSegment(x0, y0, x1, y1, xp, yp);

              let endAt = MathUtils.toFixedFloat(lineLength - (lineLength * offset) - halfWidthLength, PRECISION);
              let offsetUnit = _attributesFormData.getIn(['offsetB', '_unit']);

              let offsetB = new Map({
                length: endAt,
                _length: convert(endAt).from(catalog.unit).to(offsetUnit),
                _unit: offsetUnit
              });

              _attributesFormData = _attributesFormData.set('offsetB', offsetB).set('offset', offset);

              let offsetAttribute = new Map({
                length: MathUtils.toFixedFloat(lengthValue, PRECISION),
                _unit: value.get('_unit'),
                _length: MathUtils.toFixedFloat(convert(lengthValue).from(catalog.unit).to(value.get('_unit')), PRECISION)
              });

              _attributesFormData = _attributesFormData.set(attributeName, offsetAttribute);

              break;
            }
          case 'offsetB':
            {
              let line = layer.lines.get(element.line);

              let orderedVertices = GeometryUtils.orderVertices([
                layer.vertices.get(line.vertices.get(0)),
                layer.vertices.get(line.vertices.get(1))
              ]);

              let [{ x: x0, y: y0 }, { x: x1, y: y1 }] = orderedVertices;

              let alpha = GeometryUtils.angleBetweenTwoPoints(x0, y0, x1, y1);
              let lineLength = GeometryUtils.pointsDistance(x0, y0, x1, y1);
              let widthLength = element.properties.get('width').get('length');
              let halfWidthLength = widthLength / 2;

              let lengthValue = value.get('length');
              lengthValue = Math.max(lengthValue, 0);
              lengthValue = Math.min(lengthValue, lineLength - widthLength);

              let xp = x1 - (lengthValue + halfWidthLength) * Math.cos(alpha);
              let yp = y1 - (lengthValue + halfWidthLength) * Math.sin(alpha);

              let offset = GeometryUtils.pointPositionOnLineSegment(x0, y0, x1, y1, xp, yp);

              let startAt = MathUtils.toFixedFloat((lineLength * offset) - halfWidthLength, PRECISION);
              let offsetUnit = _attributesFormData.getIn(['offsetA', '_unit']);

              let offsetA = new Map({
                length: startAt,
                _length: convert(startAt).from(catalog.unit).to(offsetUnit),
                _unit: offsetUnit
              });

              _attributesFormData = _attributesFormData.set('offsetA', offsetA).set('offset', offset);

              let offsetAttribute = new Map({
                length: MathUtils.toFixedFloat(lengthValue, PRECISION),
                _unit: value.get('_unit'),
                _length: MathUtils.toFixedFloat(convert(lengthValue).from(catalog.unit).to(value.get('_unit')), PRECISION)
              });

              _attributesFormData = _attributesFormData.set(attributeName, offsetAttribute);

              break;
            }
          default:
            {
              _attributesFormData = _attributesFormData.set(attributeName, value);
              break;
            }
        };
        break;
      }
      default:
        break;
    }

    setAttributesFormData(_attributesFormData);
    save({ attributesFormData: _attributesFormData });
  }

  const updateProperty = (propertyName, value) => {
    let _propertiesFormData = propertiesFormData;
    _propertiesFormData = _propertiesFormData.setIn([propertyName, 'currentValue'], value);
    setPropertiesFormData(_propertiesFormData);
    save({ propertiesFormData: _propertiesFormData });
  }

  const reset = () => {
    setPropertiesFormData(initPropData(element, layer, state));
  }

  const save = ({ propertiesFormData, attributesFormData }) => {

    if (propertiesFormData) {
      let properties = propertiesFormData.map(data => {
        return data.get('currentValue');
      });

      projectActions.setProperties(properties);
    }

    if (attributesFormData) {
      switch (element.prototype) {
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
  }

  const copyProperties = (properties) => {
    projectActions.copyProperties(properties);
  }

  const pasteProperties = () => {
    projectActions.pasteProperties();
  }

  return (
    <div>

      <AttributesEditor
        element={element}
        onUpdate={updateAttribute}
        attributeFormData={attributesFormData}
        state={appState}
      />

      <div style={attrPorpSeparatorStyle}>
        <div style={headActionStyle}>
          <div title={translator.t('Copy')} style={iconHeadStyle} onClick={e => copyProperties(element.properties)}><MdContentCopy /></div>
          {
            appState.get('clipboardProperties') && appState.get('clipboardProperties').size ?
              <div title={translator.t('Paste')} style={iconHeadStyle} onClick={e => pasteProperties()}><MdContentPaste /></div> : null
          }
        </div>
      </div>

      {propertiesFormData.entrySeq()
        .map(([propertyName, data]) => {

          let currentValue = data.get('currentValue'), configs = data.get('configs');

          let { Editor } = catalog.getPropertyType(configs.type);

          return <Editor
            key={propertyName}
            propertyName={propertyName}
            value={currentValue}
            configs={configs}
            onUpdate={value => updateProperty(propertyName, value)}
            state={appState}
            sourceElement={element}
            internalState={{ attributesFormData, propertiesFormData }}
          />
        })
      }

    </div>
  )
}

ElementEditor.propTypes = {
  state: PropTypes.object.isRequired,
  element: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired
};

export default memo(ElementEditor, (prevProps, nextProps) => {
  return prevProps.state.clipboardProperties.hashCode() !== nextProps.state.clipboardProperties.hashCode()
});

