function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ContentTitle, ContentContainer, FormLabel, FormBlock, FormNumberInput, FormSubmitButton, CancelButton } from '../style/export';
import ReactPlannerContext from '../../utils/react-planner-context';
var ProjectConfigurator = function ProjectConfigurator(_ref) {
  var width = _ref.width,
    height = _ref.height,
    state = _ref.state;
  var _useContext = useContext(ReactPlannerContext),
    projectActions = _useContext.projectActions,
    translator = _useContext.translator;
  var scene = state.scene;
  var _useState = useState(scene.width),
    _useState2 = _slicedToArray(_useState, 2),
    dataWidth = _useState2[0],
    setDataWidth = _useState2[1];
  var _useState3 = useState(scene.height),
    _useState4 = _slicedToArray(_useState3, 2),
    dataHeight = _useState4[0],
    setDataHeight = _useState4[1];
  var onSubmit = function onSubmit(event) {
    event.preventDefault();
    var width = parseInt(dataWidth);
    var height = parseInt(dataHeight);
    if (width <= 100 || height <= 100) {
      alert('Scene size too small');
    } else {
      projectActions.setProjectProperties({
        width: width,
        height: height
      });
    }
  };
  return /*#__PURE__*/React.createElement(ContentContainer, {
    width: width,
    height: height
  }, /*#__PURE__*/React.createElement(ContentTitle, null, translator.t('Project config')), /*#__PURE__*/React.createElement("form", {
    onSubmit: onSubmit
  }, /*#__PURE__*/React.createElement(FormBlock, null, /*#__PURE__*/React.createElement(FormLabel, {
    htmlFor: "width"
  }, translator.t('width')), /*#__PURE__*/React.createElement(FormNumberInput, {
    id: "width",
    placeholder: "width",
    value: dataWidth,
    onChange: function onChange(e) {
      return setDataWidth(e.target.value);
    }
  })), /*#__PURE__*/React.createElement(FormBlock, null, /*#__PURE__*/React.createElement(FormLabel, {
    htmlFor: "height"
  }, translator.t('height')), /*#__PURE__*/React.createElement(FormNumberInput, {
    id: "height",
    placeholder: "height",
    value: dataHeight,
    onChange: function onChange(e) {
      return setDataHeight(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("table", {
    style: {
      "float": 'right'
    }
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CancelButton, {
    size: "large",
    onClick: function onClick(e) {
      return projectActions.rollback();
    }
  }, translator.t('Cancel'))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FormSubmitButton, {
    size: "large"
  }, translator.t('Save'))))))));
};
ProjectConfigurator.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};
export default ProjectConfigurator;