function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useState, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import ReactPlannerContext from '../../utils/react-planner-context';
import * as SharedStyle from '../../styles/shared-style';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaPencil, FaTrash, FaTimes } from 'react-icons/fa';
import { FormNumberInput } from '../../components/style/export';
var tabStyle = {
  margin: '1em'
};
var iconStyle = {
  fontSize: '14px',
  margin: '2px',
  cursor: 'pointer'
};
var addGuideStyle = {
  cursor: 'pointer',
  height: '2em'
};
var tableTabStyle = {
  width: '100%',
  textAlign: 'center'
};
var PanelGuides = function PanelGuides(_ref) {
  var state = _ref.state;
  var _useContext = useContext(ReactPlannerContext),
    projectActions = _useContext.projectActions,
    translator = _useContext.translator;
  var guides = state.scene.guides;
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    addHGVisible = _useState2[0],
    setAddHGVisible = _useState2[1];
  var _useState3 = useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    addVGVisible = _useState4[0],
    setAddVGVisible = _useState4[1];
  var _useState5 = useState(true),
    _useState6 = _slicedToArray(_useState5, 2),
    addCGVisible = _useState6[0],
    setAddCGVisible = _useState6[1];
  return /*#__PURE__*/React.createElement(Panel, {
    name: translator.t('Guides')
  }, /*#__PURE__*/React.createElement(Tabs, {
    id: "guidesTabs",
    style: tabStyle
  }, /*#__PURE__*/React.createElement(TabList, null, /*#__PURE__*/React.createElement(Tab, null, translator.t('Horizontal')), /*#__PURE__*/React.createElement(Tab, null, translator.t('Vertical'))), /*#__PURE__*/React.createElement(TabPanel, null, /*#__PURE__*/React.createElement("table", {
    style: tableTabStyle
  }, /*#__PURE__*/React.createElement("tbody", null, guides.get('horizontal').entrySeq().map(function (_ref2, ind) {
    var _ref3 = _slicedToArray(_ref2, 2),
      hgKey = _ref3[0],
      hgVal = _ref3[1];
    return /*#__PURE__*/React.createElement("tr", {
      key: hgKey
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        width: '2em'
      }
    }, ind + 1), /*#__PURE__*/React.createElement("td", null, hgVal), /*#__PURE__*/React.createElement("td", {
      style: {
        width: '5em'
      }
    }, /*#__PURE__*/React.createElement(FaTrash, {
      style: iconStyle,
      onClick: function onClick(e) {
        return projectActions.removeHorizontalGuide(hgKey);
      }
    })));
  }), addHGVisible ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "3",
    style: addGuideStyle,
    onClick: function onClick(e) {
      return setAddHGVisible(false);
    }
  }, translator.t('+ Add Horizontal Giude'))) : /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "2"
  }, /*#__PURE__*/React.createElement(FormNumberInput, {
    value: 0,
    onChange: function onChange(e) {
      projectActions.addHorizontalGuide(e.target.value);
      return setAddHGVisible(true);
    },
    min: 0,
    max: state.getIn(['scene', 'height'])
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FaTimes, {
    style: iconStyle,
    onClick: function onClick(e) {
      return setAddHGVisible(true);
    }
  })))))), /*#__PURE__*/React.createElement(TabPanel, null, /*#__PURE__*/React.createElement("table", {
    style: tableTabStyle
  }, /*#__PURE__*/React.createElement("tbody", null, guides.get('vertical').entrySeq().map(function (_ref4, ind) {
    var _ref5 = _slicedToArray(_ref4, 2),
      hgKey = _ref5[0],
      hgVal = _ref5[1];
    return /*#__PURE__*/React.createElement("tr", {
      key: hgKey
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        width: '2em'
      }
    }, ind + 1), /*#__PURE__*/React.createElement("td", null, hgVal), /*#__PURE__*/React.createElement("td", {
      style: {
        width: '5em'
      }
    }, /*#__PURE__*/React.createElement(FaTrash, {
      style: iconStyle,
      onClick: function onClick(e) {
        return projectActions.removeVerticalGuide(hgKey);
      }
    })));
  }), addVGVisible ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "3",
    style: addGuideStyle,
    onClick: function onClick(e) {
      return setAddVGVisible(false);
    }
  }, translator.t('+ Add Vertical Giude'))) : /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "2"
  }, /*#__PURE__*/React.createElement(FormNumberInput, {
    value: 0,
    onChange: function onChange(e) {
      projectActions.addVerticalGuide(e.target.value);
      return setAddVGVisible(true);
    },
    min: 0,
    max: state.getIn(['scene', 'height'])
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FaTimes, {
    style: iconStyle,
    onClick: function onClick(e) {
      return setAddVGVisible(true);
    }
  }))))))));
};
PanelGuides.propTypes = {
  state: PropTypes.object.isRequired
};
export default /*#__PURE__*/memo(PanelGuides, function (prevProps, nextProps) {
  return prevProps.state.getIn(['scene', 'guides']).hashCode() !== nextProps.state.getIn(['scene', 'guides']).hashCode();
});