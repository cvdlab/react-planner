function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import ReactPlannerContext from '../../utils/react-planner-context';
import { MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE, MODE_ROTATING_ITEM } from '../../utils/constants';
import * as SharedStyle from '../../styles/shared-style';
import { MdSearch } from 'react-icons/md';
var VISIBILITY_MODE = {
  MODE_IDLE: MODE_IDLE,
  MODE_2D_ZOOM_IN: MODE_2D_ZOOM_IN,
  MODE_2D_ZOOM_OUT: MODE_2D_ZOOM_OUT,
  MODE_2D_PAN: MODE_2D_PAN,
  MODE_3D_VIEW: MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON: MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE: MODE_WAITING_DRAWING_LINE,
  MODE_DRAWING_LINE: MODE_DRAWING_LINE,
  MODE_DRAWING_HOLE: MODE_DRAWING_HOLE,
  MODE_DRAWING_ITEM: MODE_DRAWING_ITEM,
  MODE_DRAGGING_LINE: MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX: MODE_DRAGGING_VERTEX,
  MODE_DRAGGING_ITEM: MODE_DRAGGING_ITEM,
  MODE_DRAGGING_HOLE: MODE_DRAGGING_HOLE,
  MODE_FITTING_IMAGE: MODE_FITTING_IMAGE,
  MODE_UPLOADING_IMAGE: MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM: MODE_ROTATING_ITEM
};
var contentArea = {
  height: 'auto',
  maxHeight: '15em',
  overflowY: 'auto',
  padding: '0.25em 1.15em',
  cursor: 'pointer',
  marginBottom: '1em',
  userSelect: 'none'
};
var elementStyle = {
  width: 'auto',
  height: '2.5em',
  margin: '0.25em 0.25em 0 0',
  padding: '0.5em',
  textAlign: 'center',
  display: 'inline-block',
  border: '1px solid #CCC',
  borderRadius: '0.2em'
};
var elementSelectedStyle = _objectSpread(_objectSpread({}, elementStyle), {}, {
  color: SharedStyle.SECONDARY_COLOR.main,
  borderColor: SharedStyle.SECONDARY_COLOR.main
});
var categoryDividerStyle = {
  paddingBottom: '0.5em',
  borderBottom: '1px solid #888'
};
var tableSearchStyle = {
  width: '100%',
  marginTop: '0.8em'
};
var searchIconStyle = {
  fontSize: '1.5em'
};
var searchInputStyle = {
  fontSize: '1em',
  width: '100%',
  height: '1em',
  padding: '1em 0.5em'
};
var PanelLayerElement = function PanelLayerElement(_ref) {
  var mode = _ref.mode,
    layers = _ref.layers,
    selectedLayer = _ref.selectedLayer;
  var _useContext = useContext(ReactPlannerContext),
    translator = _useContext.translator,
    itemsActions = _useContext.itemsActions,
    linesActions = _useContext.linesActions,
    holesActions = _useContext.holesActions;
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    matchString = _useState2[0],
    setMatchString = _useState2[1];
  var _useState3 = useState({
      lines: new Map(),
      holes: new Map(),
      items: new Map()
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    elements = _useState4[0],
    setElements = _useState4[1];
  var _useState5 = useState(elements),
    _useState6 = _slicedToArray(_useState5, 2),
    matchedElements = _useState6[0],
    setMatchedElements = _useState6[1];
  useEffect(function () {
    var layer = layers.get(selectedLayer);
    var newElements = {
      lines: layer.lines,
      holes: layer.holes,
      items: layer.items
    };
    setElements(newElements);
    if (matchString !== '') {
      var regexp = new RegExp(matchString, 'i');
      var filterCb = function filterCb(el) {
        return regexp.test(el.get('name'));
      };
      setMatchedElements({
        lines: newElements.lines.filter(filterCb),
        holes: newElements.holes.filter(filterCb),
        items: newElements.items.filter(filterCb)
      });
    } else {
      setMatchedElements(newElements);
    }
  }, [layers, selectedLayer]);
  var matchArray = function matchArray(text) {
    if (text === '') {
      setMatchString('');
      setMatchedElements(elements);
      return;
    }
    var regexp = new RegExp(text, 'i');
    var filterCb = function filterCb(el) {
      return regexp.test(el.get('name'));
    };
    setMatchString(text);
    setMatchedElements({
      lines: elements.lines.filter(filterCb),
      holes: elements.holes.filter(filterCb),
      items: elements.items.filter(filterCb)
    });
  };
  if (!VISIBILITY_MODE[mode]) return null;
  var layer = layers.get(selectedLayer);
  return /*#__PURE__*/React.createElement(Panel, {
    name: translator.t('Elements on layer {0}', layer.name)
  }, /*#__PURE__*/React.createElement("div", {
    style: contentArea,
    onWheel: function onWheel(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: tableSearchStyle
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(MdSearch, {
    style: searchIconStyle
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    style: searchInputStyle,
    onChange: function onChange(e) {
      matchArray(e.target.value);
    }
  }))))), matchedElements.lines.size ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: categoryDividerStyle
  }, translator.t('Lines')), matchedElements.lines.entrySeq().map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      lineID = _ref3[0],
      line = _ref3[1];
    return /*#__PURE__*/React.createElement("div", {
      key: lineID,
      onClick: function onClick(e) {
        return linesActions.selectLine(layer.id, line.id);
      },
      style: line.selected ? elementSelectedStyle : elementStyle
    }, line.name);
  })) : null, matchedElements.holes.size ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: categoryDividerStyle
  }, translator.t('Holes')), matchedElements.holes.entrySeq().map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      holeID = _ref5[0],
      hole = _ref5[1];
    return /*#__PURE__*/React.createElement("div", {
      key: holeID,
      onClick: function onClick(e) {
        return holesActions.selectHole(layer.id, hole.id);
      },
      style: hole.selected ? elementSelectedStyle : elementStyle
    }, hole.name);
  })) : null, matchedElements.items.size ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: categoryDividerStyle
  }, translator.t('Items')), matchedElements.items.entrySeq().map(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
      itemID = _ref7[0],
      item = _ref7[1];
    return /*#__PURE__*/React.createElement("div", {
      key: itemID,
      onClick: function onClick(e) {
        return itemsActions.selectItem(layer.id, item.id);
      },
      style: item.selected ? elementSelectedStyle : elementStyle
    }, item.name);
  })) : null));
};
PanelLayerElement.propTypes = {
  mode: PropTypes.string.isRequired,
  layers: PropTypes.object.isRequired
};
export default PanelLayerElement;