function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Panel from '../panel';
import { Seq } from 'immutable';
import { MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE, MODE_ROTATING_ITEM } from '../../../constants';
import { FormSelect } from '../../../components/style/export';
import { Group } from '../../../class/export';
import ReactPlannerContext from '../../../react-planner-context';
var tableStyle = {
  width: '100%'
};
var firstTdStyle = {
  width: '6em'
};
var PanelMultiElementsEditor = function PanelMultiElementsEditor(_ref) {
  var state = _ref.state;
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    selectedGroupID = _useState2[0],
    setSelectedGroupID = _useState2[1];
  var _useContext = useContext(ReactPlannerContext),
    groupsActions = _useContext.groupsActions;
  var mode = state.mode;
  if (![MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_ROTATING_ITEM, MODE_UPLOADING_IMAGE, MODE_FITTING_IMAGE].includes(mode)) return null;
  var groups = state.getIn(['scene', 'groups']);

  //TODO change in multi-layer check
  var selectedLayer = state.getIn(['scene', 'selectedLayer']);
  var selecteds = state.getIn(['scene', 'layers', selectedLayer, 'selected']);
  var addSelectToGroup = function addSelectToGroup(state, groupID, layerID, selecteds) {
    if (!groupID || groupID === '' || !selecteds || !selecteds.size) return;
    console.log('need to be added to group', groupID, 'elements', selecteds);

    /*let selectedJs = selecteds.toJS();
     for( let lineID in selectedJs.lines ) Group.addElement( state, groupID, layerID, 'lines', lineID );*/
  };

  return /*#__PURE__*/React.createElement(Panel, {
    name: 'Multiselected',
    opened: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '5px 15px'
    }
  }, /*#__PURE__*/React.createElement("p", null, "Multiselection tab"), /*#__PURE__*/React.createElement("table", {
    style: tableStyle
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: firstTdStyle
  }, "Add to Group"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FormSelect, {
    value: selectedGroupID,
    onChange: function onChange(e) {
      return setSelectedGroupID(e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    key: 0,
    value: ''
  }), groups.entrySeq().map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      groupID = _ref3[0],
      group = _ref3[1];
    return /*#__PURE__*/React.createElement("option", {
      key: groupID,
      value: groupID
    }, group.get('name'));
  }))), /*#__PURE__*/React.createElement("td", {
    style: {
      cursor: 'pointer',
      padding: '0.5em 0',
      textAlign: 'center'
    },
    onClick: function onClick(e) {
      if (!selectedGroupID || selectedGroupID === '' || !selecteds || !selecteds.size) return;
      var selectedJs = selecteds.toJS();
      for (var x = 0; x < selectedJs.lines.length; x++) groupsActions.addToGroup(selectedGroupID, selectedLayer, 'lines', selectedJs.lines[x]);
    }
  }, "+"))))));
};
PanelMultiElementsEditor.propTypes = {
  state: PropTypes.object.isRequired
};
export default PanelMultiElementsEditor;