"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _immutable = require("immutable");
var _attributesEditor = _interopRequireDefault(require("./attributes-editor/attributes-editor"));
var _export = require("../../../utils/export");
var SharedStyle = _interopRequireWildcard(require("../../../styles/shared-style"));
var _convertUnits = _interopRequireDefault(require("convert-units"));
var _md = require("react-icons/md");
var _reactPlannerContext = _interopRequireDefault(require("../../../utils/react-planner-context"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
  var _useContext = (0, _react.useContext)(_reactPlannerContext["default"]),
    projectActions = _useContext.projectActions,
    catalog = _useContext.catalog,
    translator = _useContext.translator;
  var initAttrData = function initAttrData(element, layer, state) {
    console.log('ElementEditor initAttrData', element, layer, state);
    element = _typeof(element.misc) === 'object' ? element.set('misc', new _immutable.Map(element.misc)) : element;
    switch (element.prototype) {
      case 'items':
        {
          console.log('ElementEditor initAttrData items', element);
          return new _immutable.Map(element);
        }
      case 'lines':
        {
          var v_a = layer.vertices.get(element.vertices.get(0));
          var v_b = layer.vertices.get(element.vertices.get(1));
          var distance = _export.GeometryUtils.pointsDistance(v_a.x, v_a.y, v_b.x, v_b.y);
          var _unit = element.misc.get('_unitLength') || catalog.unit;
          var _length = (0, _convertUnits["default"])(distance).from(catalog.unit).to(_unit);
          return new _immutable.Map({
            vertexOne: v_a,
            vertexTwo: v_b,
            lineLength: new _immutable.Map({
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
          var lineLength = _export.GeometryUtils.pointsDistance(x0, y0, x1, y1);
          var startAt = lineLength * element.offset - element.properties.get('width').get('length') / 2;
          var _unitA = element.misc.get('_unitA') || catalog.unit;
          var _lengthA = (0, _convertUnits["default"])(startAt).from(catalog.unit).to(_unitA);
          var endAt = lineLength - lineLength * element.offset - element.properties.get('width').get('length') / 2;
          var _unitB = element.misc.get('_unitB') || catalog.unit;
          var _lengthB = (0, _convertUnits["default"])(endAt).from(catalog.unit).to(_unitB);
          return new _immutable.Map({
            offset: element.offset,
            offsetA: new _immutable.Map({
              length: _export.MathUtils.toFixedFloat(startAt, PRECISION),
              _length: _export.MathUtils.toFixedFloat(_lengthA, PRECISION),
              _unit: _unitA
            }),
            offsetB: new _immutable.Map({
              length: _export.MathUtils.toFixedFloat(endAt, PRECISION),
              _length: _export.MathUtils.toFixedFloat(_lengthB, PRECISION),
              _unit: _unitB
            })
          });
        }
      case 'areas':
        {
          return new _immutable.Map({});
        }
      default:
        return null;
    }
  };
  var initPropData = function initPropData(element, layer, state) {
    var catalogElement = catalog.getElement(element.type);
    var mapped = {};
    for (var name in catalogElement.properties) {
      mapped[name] = new _immutable.Map({
        currentValue: element.properties.has(name) ? element.properties.get(name) : (0, _immutable.fromJS)(catalogElement.properties[name].defaultValue),
        configs: catalogElement.properties[name]
      });
    }
    return new _immutable.Map(mapped);
  };
  var _useState = (0, _react.useState)(initAttrData(element, layer, appState)),
    _useState2 = _slicedToArray(_useState, 2),
    attributesFormData = _useState2[0],
    setAttributesFormData = _useState2[1];
  var _useState3 = (0, _react.useState)(initPropData(element, layer, appState)),
    _useState4 = _slicedToArray(_useState3, 2),
    propertiesFormData = _useState4[0],
    setPropertiesFormData = _useState4[1];
  (0, _react.useEffect)(function () {
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
                var _GeometryUtils$orderV = _export.GeometryUtils.orderVertices([v_0, v_1]),
                  _GeometryUtils$orderV2 = _slicedToArray(_GeometryUtils$orderV, 2),
                  v_a = _GeometryUtils$orderV2[0],
                  v_b = _GeometryUtils$orderV2[1];
                var v_b_new = _export.GeometryUtils.extendLine(v_a.x, v_a.y, v_b.x, v_b.y, value.get('length'), PRECISION);
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
                  var newDistance = _export.GeometryUtils.verticesDistance(attr.get('vertexOne'), attr.get('vertexTwo'));
                  attr.mergeIn(['lineLength'], attr.get('lineLength').merge({
                    'length': newDistance,
                    '_length': (0, _convertUnits["default"])(newDistance).from(catalog.unit).to(attr.get('lineLength').get('_unit'))
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
                var orderedVertices = _export.GeometryUtils.orderVertices([layer.vertices.get(line.vertices.get(0)), layer.vertices.get(line.vertices.get(1))]);
                var _orderedVertices = _slicedToArray(orderedVertices, 2),
                  _orderedVertices$ = _orderedVertices[0],
                  x0 = _orderedVertices$.x,
                  y0 = _orderedVertices$.y,
                  _orderedVertices$2 = _orderedVertices[1],
                  x1 = _orderedVertices$2.x,
                  y1 = _orderedVertices$2.y;
                var alpha = _export.GeometryUtils.angleBetweenTwoPoints(x0, y0, x1, y1);
                var lineLength = _export.GeometryUtils.pointsDistance(x0, y0, x1, y1);
                var widthLength = element.properties.get('width').get('length');
                var halfWidthLength = widthLength / 2;
                var lengthValue = value.get('length');
                lengthValue = Math.max(lengthValue, 0);
                lengthValue = Math.min(lengthValue, lineLength - widthLength);
                var xp = (lengthValue + halfWidthLength) * Math.cos(alpha) + x0;
                var yp = (lengthValue + halfWidthLength) * Math.sin(alpha) + y0;
                var offset = _export.GeometryUtils.pointPositionOnLineSegment(x0, y0, x1, y1, xp, yp);
                var endAt = _export.MathUtils.toFixedFloat(lineLength - lineLength * offset - halfWidthLength, PRECISION);
                var offsetUnit = _attributesFormData.getIn(['offsetB', '_unit']);
                var offsetB = new _immutable.Map({
                  length: endAt,
                  _length: (0, _convertUnits["default"])(endAt).from(catalog.unit).to(offsetUnit),
                  _unit: offsetUnit
                });
                _attributesFormData = _attributesFormData.set('offsetB', offsetB).set('offset', offset);
                var offsetAttribute = new _immutable.Map({
                  length: _export.MathUtils.toFixedFloat(lengthValue, PRECISION),
                  _unit: value.get('_unit'),
                  _length: _export.MathUtils.toFixedFloat((0, _convertUnits["default"])(lengthValue).from(catalog.unit).to(value.get('_unit')), PRECISION)
                });
                _attributesFormData = _attributesFormData.set(attributeName, offsetAttribute);
                break;
              }
            case 'offsetB':
              {
                var _line = layer.lines.get(element.line);
                var _orderedVertices2 = _export.GeometryUtils.orderVertices([layer.vertices.get(_line.vertices.get(0)), layer.vertices.get(_line.vertices.get(1))]);
                var _orderedVertices3 = _slicedToArray(_orderedVertices2, 2),
                  _orderedVertices3$ = _orderedVertices3[0],
                  _x2 = _orderedVertices3$.x,
                  _y = _orderedVertices3$.y,
                  _orderedVertices3$2 = _orderedVertices3[1],
                  _x3 = _orderedVertices3$2.x,
                  _y2 = _orderedVertices3$2.y;
                var _alpha = _export.GeometryUtils.angleBetweenTwoPoints(_x2, _y, _x3, _y2);
                var _lineLength = _export.GeometryUtils.pointsDistance(_x2, _y, _x3, _y2);
                var _widthLength = element.properties.get('width').get('length');
                var _halfWidthLength = _widthLength / 2;
                var _lengthValue = value.get('length');
                _lengthValue = Math.max(_lengthValue, 0);
                _lengthValue = Math.min(_lengthValue, _lineLength - _widthLength);
                var _xp = _x3 - (_lengthValue + _halfWidthLength) * Math.cos(_alpha);
                var _yp = _y2 - (_lengthValue + _halfWidthLength) * Math.sin(_alpha);
                var _offset = _export.GeometryUtils.pointPositionOnLineSegment(_x2, _y, _x3, _y2, _xp, _yp);
                var startAt = _export.MathUtils.toFixedFloat(_lineLength * _offset - _halfWidthLength, PRECISION);
                var _offsetUnit = _attributesFormData.getIn(['offsetA', '_unit']);
                var offsetA = new _immutable.Map({
                  length: startAt,
                  _length: (0, _convertUnits["default"])(startAt).from(catalog.unit).to(_offsetUnit),
                  _unit: _offsetUnit
                });
                _attributesFormData = _attributesFormData.set('offsetA', offsetA).set('offset', _offset);
                var _offsetAttribute = new _immutable.Map({
                  length: _export.MathUtils.toFixedFloat(_lengthValue, PRECISION),
                  _unit: value.get('_unit'),
                  _length: _export.MathUtils.toFixedFloat((0, _convertUnits["default"])(_lengthValue).from(catalog.unit).to(value.get('_unit')), PRECISION)
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
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_attributesEditor["default"], {
    element: element,
    onUpdate: updateAttribute,
    attributeFormData: attributesFormData,
    state: appState
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: attrPorpSeparatorStyle
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: headActionStyle
  }, /*#__PURE__*/_react["default"].createElement("div", {
    title: translator.t('Copy'),
    style: iconHeadStyle,
    onClick: function onClick(e) {
      return copyProperties(element.properties);
    }
  }, /*#__PURE__*/_react["default"].createElement(_md.MdContentCopy, null)), appState.get('clipboardProperties') && appState.get('clipboardProperties').size ? /*#__PURE__*/_react["default"].createElement("div", {
    title: translator.t('Paste'),
    style: iconHeadStyle,
    onClick: function onClick(e) {
      return pasteProperties();
    }
  }, /*#__PURE__*/_react["default"].createElement(_md.MdContentPaste, null)) : null)), propertiesFormData.entrySeq().map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      propertyName = _ref4[0],
      data = _ref4[1];
    var currentValue = data.get('currentValue'),
      configs = data.get('configs');
    var _catalog$getPropertyT = catalog.getPropertyType(configs.type),
      Editor = _catalog$getPropertyT.Editor;
    return /*#__PURE__*/_react["default"].createElement(Editor, {
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
  state: _propTypes["default"].object.isRequired,
  element: _propTypes["default"].object.isRequired,
  layer: _propTypes["default"].object.isRequired
};
var _default = /*#__PURE__*/(0, _react.memo)(ElementEditor, function (prevProps, nextProps) {
  return prevProps.state.clipboardProperties.hashCode() !== nextProps.state.clipboardProperties.hashCode();
});
exports["default"] = _default;