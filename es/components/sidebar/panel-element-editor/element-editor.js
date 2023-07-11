function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import React, { useState, useEffect, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { Map, fromJS } from 'immutable';
import AttributesEditor from './attributes-editor/attributes-editor';
import { GeometryUtils, MathUtils } from '../../../utils/export';
import * as SharedStyle from '../../../shared-style';
import convert from 'convert-units';
import { MdContentCopy, MdContentPaste } from 'react-icons/md';
import ReactPlannerContext from '../../../react-planner-context';
var PRECISION = 2;
var attrPorpSeparatorStyle = {
  margin: '0.5em 0.25em 0.5em 0',
  border: '2px solid ' + SharedStyle.SECONDARY_COLOR.alt,
  position: 'relative',
  height: '2.5em',
  borderRadius: '2px'
};
var headActionStyle = {
  position: 'absolute',
  right: '0.5em',
  top: '0.5em'
};
var iconHeadStyle = {
  "float": 'right',
  margin: '-3px 4px 0px 0px',
  padding: 0,
  cursor: 'pointer',
  fontSize: '1.4em'
};
var ElementEditor = function ElementEditor(_ref) {
  var appState = _ref.state,
    element = _ref.element,
    layer = _ref.layer;
  var _useContext = useContext(ReactPlannerContext),
    projectActions = _useContext.projectActions,
    catalog = _useContext.catalog,
    translator = _useContext.translator;
  var initAttrData = function initAttrData(element, layer, state) {
    console.log('ElementEditor initAttrData', element, layer, state);
    element = _typeof(element.misc) === 'object' ? element.set('misc', new Map(element.misc)) : element;
    switch (element.prototype) {
      case 'items':
        {
          console.log('ElementEditor initAttrData items', element);
          return new Map(element);
        }
      case 'lines':
        {
          var v_a = layer.vertices.get(element.vertices.get(0));
          var v_b = layer.vertices.get(element.vertices.get(1));
          var distance = GeometryUtils.pointsDistance(v_a.x, v_a.y, v_b.x, v_b.y);
          var _unit = element.misc.get('_unitLength') || catalog.unit;
          var _length = convert(distance).from(catalog.unit).to(_unit);
          return new Map({
            vertexOne: v_a,
            vertexTwo: v_b,
            lineLength: new Map({
              length: distance,
              _length: _length,
              _unit: _unit
            })
          });
        }
      case 'holes':
        {
          var line = layer.lines.get(element.line);
          var _layer$vertices$get = layer.vertices.get(line.vertices.get(0)),
            x0 = _layer$vertices$get.x,
            y0 = _layer$vertices$get.y;
          var _layer$vertices$get2 = layer.vertices.get(line.vertices.get(1)),
            x1 = _layer$vertices$get2.x,
            y1 = _layer$vertices$get2.y;
          var lineLength = GeometryUtils.pointsDistance(x0, y0, x1, y1);
          var startAt = lineLength * element.offset - element.properties.get('width').get('length') / 2;
          var _unitA = element.misc.get('_unitA') || catalog.unit;
          var _lengthA = convert(startAt).from(catalog.unit).to(_unitA);
          var endAt = lineLength - lineLength * element.offset - element.properties.get('width').get('length') / 2;
          var _unitB = element.misc.get('_unitB') || catalog.unit;
          var _lengthB = convert(endAt).from(catalog.unit).to(_unitB);
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
      case 'areas':
        {
          return new Map({});
        }
      default:
        return null;
    }
  };
  var initPropData = function initPropData(element, layer, state) {
    var catalogElement = catalog.getElement(element.type);
    var mapped = {};
    for (var name in catalogElement.properties) {
      mapped[name] = new Map({
        currentValue: element.properties.has(name) ? element.properties.get(name) : fromJS(catalogElement.properties[name].defaultValue),
        configs: catalogElement.properties[name]
      });
    }
    return new Map(mapped);
  };
  var _useState = useState(initAttrData(element, layer, appState)),
    _useState2 = _slicedToArray(_useState, 2),
    attributesFormData = _useState2[0],
    setAttributesFormData = _useState2[1];
  var _useState3 = useState(initPropData(element, layer, appState)),
    _useState4 = _slicedToArray(_useState3, 2),
    propertiesFormData = _useState4[0],
    setPropertiesFormData = _useState4[1];
  useEffect(function () {
    setAttributesFormData(initAttrData(element, layer, appState));
    setPropertiesFormData(initPropData(element, layer, appState));
  }, [element, layer, appState]);
  var updateAttribute = function updateAttribute(attributeName, value) {
    var _attributesFormData = attributesFormData;
    switch (element.prototype) {
      case 'items':
        {
          _attributesFormData = _attributesFormData.set(attributeName, value);
          break;
        }
      case 'lines':
        {
          switch (attributeName) {
            case 'lineLength':
              {
                var v_0 = _attributesFormData.get('vertexOne');
                var v_1 = _attributesFormData.get('vertexTwo');
                var _GeometryUtils$orderV = GeometryUtils.orderVertices([v_0, v_1]),
                  _GeometryUtils$orderV2 = _slicedToArray(_GeometryUtils$orderV, 2),
                  v_a = _GeometryUtils$orderV2[0],
                  v_b = _GeometryUtils$orderV2[1];
                var v_b_new = GeometryUtils.extendLine(v_a.x, v_a.y, v_b.x, v_b.y, value.get('length'), PRECISION);
                _attributesFormData = _attributesFormData.withMutations(function (attr) {
                  attr.set(v_0 === v_a ? 'vertexTwo' : 'vertexOne', v_b.merge(v_b_new));
                  attr.set('lineLength', value);
                });
                break;
              }
            case 'vertexOne':
            case 'vertexTwo':
              {
                _attributesFormData = _attributesFormData.withMutations(function (attr) {
                  attr.set(attributeName, attr.get(attributeName).merge(value));
                  var newDistance = GeometryUtils.verticesDistance(attr.get('vertexOne'), attr.get('vertexTwo'));
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
      case 'holes':
        {
          switch (attributeName) {
            case 'offsetA':
              {
                var line = layer.lines.get(element.line);
                var orderedVertices = GeometryUtils.orderVertices([layer.vertices.get(line.vertices.get(0)), layer.vertices.get(line.vertices.get(1))]);
                var _orderedVertices = _slicedToArray(orderedVertices, 2),
                  _orderedVertices$ = _orderedVertices[0],
                  x0 = _orderedVertices$.x,
                  y0 = _orderedVertices$.y,
                  _orderedVertices$2 = _orderedVertices[1],
                  x1 = _orderedVertices$2.x,
                  y1 = _orderedVertices$2.y;
                var alpha = GeometryUtils.angleBetweenTwoPoints(x0, y0, x1, y1);
                var lineLength = GeometryUtils.pointsDistance(x0, y0, x1, y1);
                var widthLength = element.properties.get('width').get('length');
                var halfWidthLength = widthLength / 2;
                var lengthValue = value.get('length');
                lengthValue = Math.max(lengthValue, 0);
                lengthValue = Math.min(lengthValue, lineLength - widthLength);
                var xp = (lengthValue + halfWidthLength) * Math.cos(alpha) + x0;
                var yp = (lengthValue + halfWidthLength) * Math.sin(alpha) + y0;
                var offset = GeometryUtils.pointPositionOnLineSegment(x0, y0, x1, y1, xp, yp);
                var endAt = MathUtils.toFixedFloat(lineLength - lineLength * offset - halfWidthLength, PRECISION);
                var offsetUnit = _attributesFormData.getIn(['offsetB', '_unit']);
                var offsetB = new Map({
                  length: endAt,
                  _length: convert(endAt).from(catalog.unit).to(offsetUnit),
                  _unit: offsetUnit
                });
                _attributesFormData = _attributesFormData.set('offsetB', offsetB).set('offset', offset);
                var offsetAttribute = new Map({
                  length: MathUtils.toFixedFloat(lengthValue, PRECISION),
                  _unit: value.get('_unit'),
                  _length: MathUtils.toFixedFloat(convert(lengthValue).from(catalog.unit).to(value.get('_unit')), PRECISION)
                });
                _attributesFormData = _attributesFormData.set(attributeName, offsetAttribute);
                break;
              }
            case 'offsetB':
              {
                var _line = layer.lines.get(element.line);
                var _orderedVertices2 = GeometryUtils.orderVertices([layer.vertices.get(_line.vertices.get(0)), layer.vertices.get(_line.vertices.get(1))]);
                var _orderedVertices3 = _slicedToArray(_orderedVertices2, 2),
                  _orderedVertices3$ = _orderedVertices3[0],
                  _x2 = _orderedVertices3$.x,
                  _y = _orderedVertices3$.y,
                  _orderedVertices3$2 = _orderedVertices3[1],
                  _x3 = _orderedVertices3$2.x,
                  _y2 = _orderedVertices3$2.y;
                var _alpha = GeometryUtils.angleBetweenTwoPoints(_x2, _y, _x3, _y2);
                var _lineLength = GeometryUtils.pointsDistance(_x2, _y, _x3, _y2);
                var _widthLength = element.properties.get('width').get('length');
                var _halfWidthLength = _widthLength / 2;
                var _lengthValue = value.get('length');
                _lengthValue = Math.max(_lengthValue, 0);
                _lengthValue = Math.min(_lengthValue, _lineLength - _widthLength);
                var _xp = _x3 - (_lengthValue + _halfWidthLength) * Math.cos(_alpha);
                var _yp = _y2 - (_lengthValue + _halfWidthLength) * Math.sin(_alpha);
                var _offset = GeometryUtils.pointPositionOnLineSegment(_x2, _y, _x3, _y2, _xp, _yp);
                var startAt = MathUtils.toFixedFloat(_lineLength * _offset - _halfWidthLength, PRECISION);
                var _offsetUnit = _attributesFormData.getIn(['offsetA', '_unit']);
                var offsetA = new Map({
                  length: startAt,
                  _length: convert(startAt).from(catalog.unit).to(_offsetUnit),
                  _unit: _offsetUnit
                });
                _attributesFormData = _attributesFormData.set('offsetA', offsetA).set('offset', _offset);
                var _offsetAttribute = new Map({
                  length: MathUtils.toFixedFloat(_lengthValue, PRECISION),
                  _unit: value.get('_unit'),
                  _length: MathUtils.toFixedFloat(convert(_lengthValue).from(catalog.unit).to(value.get('_unit')), PRECISION)
                });
                _attributesFormData = _attributesFormData.set(attributeName, _offsetAttribute);
                break;
              }
            default:
              {
                _attributesFormData = _attributesFormData.set(attributeName, value);
                break;
              }
          }
          ;
          break;
        }
      default:
        break;
    }
    setAttributesFormData(_attributesFormData);
    save({
      attributesFormData: attributesFormData
    });
  };
  var updateProperty = function updateProperty(propertyName, value) {
    var _propertiesFormData = propertiesFormData;
    _propertiesFormData = _propertiesFormData.setIn([propertyName, 'currentValue'], value);
    setPropertiesFormData(_propertiesFormData);
    save({
      propertiesFormData: propertiesFormData
    });
  };
  var reset = function reset() {
    setPropertiesFormData(initPropData(element, layer, state));
  };
  var save = function save(_ref2) {
    var propertiesFormData = _ref2.propertiesFormData,
      attributesFormData = _ref2.attributesFormData;
    if (propertiesFormData) {
      var properties = propertiesFormData.map(function (data) {
        return data.get('currentValue');
      });
      projectActions.setProperties(properties);
    }
    if (attributesFormData) {
      switch (element.prototype) {
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
  };
  var copyProperties = function copyProperties(properties) {
    projectActions.copyProperties(properties);
  };
  var pasteProperties = function pasteProperties() {
    projectActions.pasteProperties();
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AttributesEditor, {
    element: element,
    onUpdate: updateAttribute,
    attributeFormData: attributesFormData,
    state: appState
  }), /*#__PURE__*/React.createElement("div", {
    style: attrPorpSeparatorStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: headActionStyle
  }, /*#__PURE__*/React.createElement("div", {
    title: translator.t('Copy'),
    style: iconHeadStyle,
    onClick: function onClick(e) {
      return copyProperties(element.properties);
    }
  }, /*#__PURE__*/React.createElement(MdContentCopy, null)), appState.get('clipboardProperties') && appState.get('clipboardProperties').size ? /*#__PURE__*/React.createElement("div", {
    title: translator.t('Paste'),
    style: iconHeadStyle,
    onClick: function onClick(e) {
      return pasteProperties();
    }
  }, /*#__PURE__*/React.createElement(MdContentPaste, null)) : null)), propertiesFormData.entrySeq().map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      propertyName = _ref4[0],
      data = _ref4[1];
    var currentValue = data.get('currentValue'),
      configs = data.get('configs');
    var _catalog$getPropertyT = catalog.getPropertyType(configs.type),
      Editor = _catalog$getPropertyT.Editor;
    return /*#__PURE__*/React.createElement(Editor, {
      key: propertyName,
      propertyName: propertyName,
      value: currentValue,
      configs: configs,
      onUpdate: function onUpdate(value) {
        return updateProperty(propertyName, value);
      },
      state: appState,
      sourceElement: element,
      internalState: {
        attributesFormData: attributesFormData,
        propertiesFormData: propertiesFormData
      }
    });
  }));
};
ElementEditor.propTypes = {
  state: PropTypes.object.isRequired,
  element: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired
};
export default /*#__PURE__*/memo(ElementEditor, function (prevProps, nextProps) {
  return prevProps.state.clipboardProperties.hashCode() !== nextProps.state.clipboardProperties.hashCode();
});