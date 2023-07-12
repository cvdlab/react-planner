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
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlannerContext from '../../utils/react-planner-context';
import CatalogItem from './catalog-item';
import CatalogBreadcrumb from './catalog-breadcrumb';
import CatalogPageItem from './catalog-page-item';
import CatalogTurnBackPageItem from './catalog-turn-back-page-item';
import ContentContainer from '../style/content-container';
import ContentTitle from '../style/content-title';
import * as SharedStyle from '../../styles/shared-style';
var containerStyle = {
  position: 'fixed',
  width: 'calc( 100% - 51px)',
  height: 'calc( 100% - 20px)',
  backgroundColor: '#FFF',
  padding: '1em',
  left: 50,
  overflowY: 'auto',
  overflowX: 'hidden',
  zIndex: 10
};
var itemsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(14em, 1fr))',
  gridGap: '10px',
  marginTop: '1em'
};
var searchContainer = {
  width: '100%',
  height: '3em',
  padding: '0.625em',
  background: '#f7f7f9',
  border: '1px solid #e1e1e8',
  cursor: 'pointer',
  position: 'relative',
  boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)',
  borderRadius: '2px',
  transition: 'all .2s ease-in-out',
  WebkitTransition: 'all .2s ease-in-out',
  marginBottom: '1em'
};
var searchText = {
  width: '8em',
  display: 'inline-block'
};
var searchInput = {
  width: 'calc( 100% - 10em )',
  height: '2em',
  margin: '0',
  padding: '0 1em',
  border: '1px solid #EEE'
};
var historyContainer = _objectSpread(_objectSpread({}, searchContainer), {}, {
  padding: '0.2em 0.625em'
});
var historyElementStyle = {
  width: 'auto',
  height: '2em',
  lineHeight: '2em',
  textAlign: 'center',
  borderRadius: '1em',
  display: 'inline-block',
  cursor: 'pointer',
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  color: SharedStyle.PRIMARY_COLOR.text_main,
  textTransform: 'capitalize',
  margin: '0.25em',
  padding: '0 1em'
};
var CatalogList = function CatalogList(_ref) {
  var state = _ref.state,
    width = _ref.width,
    height = _ref.height,
    style = _ref.style;
  var _useContext = useContext(ReactPlannerContext),
    catalog = _useContext.catalog,
    translator = _useContext.translator,
    itemsActions = _useContext.itemsActions,
    linesActions = _useContext.linesActions,
    holesActions = _useContext.holesActions,
    projectActions = _useContext.projectActions;
  var currentCategory = catalog.getCategory(state.catalog.page);
  var categoriesToDisplay = currentCategory.categories;
  var elementsToDisplay = currentCategory.elements.filter(function (element) {
    return element.info.visibility ? element.info.visibility.catalog : true;
  });
  var _useState = useState(currentCategory.categories),
    _useState2 = _slicedToArray(_useState, 2),
    categories = _useState2[0],
    setCategories = _useState2[1];
  var _useState3 = useState(elementsToDisplay),
    _useState4 = _slicedToArray(_useState3, 2),
    elements = _useState4[0],
    setElements = _useState4[1];
  var _useState5 = useState(''),
    _useState6 = _slicedToArray(_useState5, 2),
    matchString = _useState6[0],
    setMatchString = _useState6[1];
  var _useState7 = useState([]),
    _useState8 = _slicedToArray(_useState7, 2),
    matchedElements = _useState8[0],
    setMatchedElements = _useState8[1];
  var flattenCategories = function flattenCategories(categories) {
    var toRet = [];
    for (var x = 0; x < categories.length; x++) {
      var curr = categories[x];
      toRet = toRet.concat(curr.elements);
      if (curr.categories.length) toRet = toRet.concat(flattenCategories(curr.categories));
    }
    return toRet;
  };
  var matcharray = function matcharray(text) {
    var array = elements.concat(flattenCategories(categories));
    var filtered = [];
    if (text != '') {
      var regexp = new RegExp(text, 'i');
      for (var i = 0; i < array.length; i++) {
        if (regexp.test(array[i].info.title)) {
          filtered.push(array[i]);
        }
      }
    }
    setMatchString(text);
    setMatchedElements(filtered);
  };
  var select = function select(element) {
    switch (element.prototype) {
      case 'lines':
        linesActions.selectToolDrawingLine(element.name);
        break;
      case 'items':
        itemsActions.selectToolDrawingItem(element.name);
        break;
      case 'holes':
        holesActions.selectToolDrawingHole(element.name);
        break;
    }
    projectActions.pushLastSelectedCatalogElementToHistory(element);
  };
  var breadcrumbComponent = null;
  var page = state.catalog.page;
  if (page !== 'root') {
    var breadcrumbsNames = [];
    state.catalog.path.forEach(function (pathName) {
      breadcrumbsNames.push({
        name: catalog.getCategory(pathName).label,
        action: function action() {
          return projectActions.goBackToCatalogPage(pathName);
        }
      });
    });
    breadcrumbsNames.push({
      name: currentCategory.label,
      action: ''
    });
    breadcrumbComponent = /*#__PURE__*/React.createElement(CatalogBreadcrumb, {
      names: breadcrumbsNames
    });
  }
  var pathSize = state.catalog.path.size;
  var turnBackButton = pathSize > 0 ? /*#__PURE__*/React.createElement(CatalogTurnBackPageItem, {
    key: pathSize,
    page: catalog.categories[state.catalog.path.get(pathSize - 1)]
  }) : null;
  var selectedHistory = state.get('selectedElementsHistory');
  var selectedHistoryElements = selectedHistory.map(function (el, ind) {
    return /*#__PURE__*/React.createElement("div", {
      key: ind,
      style: historyElementStyle,
      title: el.name,
      onClick: function onClick() {
        return select(el);
      }
    }, el.name);
  });
  return /*#__PURE__*/React.createElement(ContentContainer, {
    width: width,
    height: height,
    style: _objectSpread(_objectSpread({}, containerStyle), style)
  }, /*#__PURE__*/React.createElement(ContentTitle, null, translator.t('Catalog')), breadcrumbComponent, /*#__PURE__*/React.createElement("div", {
    style: searchContainer
  }, /*#__PURE__*/React.createElement("span", {
    style: searchText
  }, translator.t('Search Element')), /*#__PURE__*/React.createElement("input", {
    type: "text",
    style: searchInput,
    onChange: function onChange(e) {
      matcharray(e.target.value);
    }
  })), selectedHistory.size ? /*#__PURE__*/React.createElement("div", {
    style: historyContainer
  }, /*#__PURE__*/React.createElement("span", null, translator.t('Last Selected')), selectedHistoryElements) : null, /*#__PURE__*/React.createElement("div", {
    style: itemsStyle
  }, matchString === '' ? [turnBackButton, categoriesToDisplay.map(function (cat) {
    return /*#__PURE__*/React.createElement(CatalogPageItem, {
      key: cat.name,
      page: cat,
      oldPage: currentCategory
    });
  }), elementsToDisplay.map(function (elem) {
    return /*#__PURE__*/React.createElement(CatalogItem, {
      key: elem.name,
      element: elem
    });
  })] : matchedElements.map(function (elem) {
    return /*#__PURE__*/React.createElement(CatalogItem, {
      key: elem.name,
      element: elem
    });
  })));
};
CatalogList.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object
};
export default CatalogList;