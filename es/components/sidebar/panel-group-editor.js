function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import * as SharedStyle from '../../styles/shared-style';
import { FormNumberInput, FormTextInput } from '../style/export';
import { Map } from 'immutable';
import { FaUnlink } from 'react-icons/fa';
import ReactPlannerContext from '../../utils/react-planner-context';
import { MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE, MODE_ROTATING_ITEM } from '../../utils/constants';
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
var tableStyle = {
  width: '100%'
};
var firstTdStyle = {
  width: '6em'
};
var inputStyle = {
  textAlign: 'left'
};
var styleEditButton = {
  marginLeft: '5px',
  border: '0px',
  background: 'none',
  color: SharedStyle.COLORS.white,
  fontSize: '14px',
  outline: '0px'
};
var tablegroupStyle = {
  width: '100%',
  cursor: 'pointer',
  maxHeight: '20em',
  marginLeft: '1px',
  marginTop: '1em'
};
var iconColStyle = {
  width: '2em'
};
var PanelGroupEditor = function PanelGroupEditor(props) {
  var groupID = props.groupID,
    state = props.state;
  var _useContext = useContext(ReactPlannerContext),
    catalog = _useContext.catalog,
    translator = _useContext.translator,
    itemsActions = _useContext.itemsActions,
    linesActions = _useContext.linesActions,
    holesActions = _useContext.holesActions,
    groupsActions = _useContext.groupsActions,
    projectActions = _useContext.projectActions;
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    groupState = _useState2[0],
    setGroupState = _useState2[1];
  useEffect(function () {
    // This is equivalent to componentWillReceiveProps
    if (groupID && VISIBILITY_MODE[state.mode]) {
      var _group = state.getIn(['scene', 'groups', groupID]);
      setGroupState(_group);
    }
  }, [groupID, state.mode]);
  if (!groupID || !VISIBILITY_MODE[state.mode]) return null;
  var group = state.getIn(['scene', 'groups', groupID]);
  var elements = group.get('elements');
  return /*#__PURE__*/React.createElement(Panel, {
    name: translator.t('Group [{0}]', group.get('name')),
    opened: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '5px 15px'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: tableStyle
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: firstTdStyle
  }, translator.t('Name')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FormTextInput, {
    value: group.get('name'),
    onChange: function onChange(e) {
      return groupsActions.setGroupAttributes(groupID, new Map({
        'name': e.target.value
      }));
    },
    style: inputStyle
  }))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: firstTdStyle
  }, "X"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FormNumberInput, {
    value: group.get('x'),
    onChange: function onChange(e) {
      return groupsActions.groupTranslate(groupID, e.target.value, group.get('y'));
    },
    style: inputStyle,
    state: state,
    precision: 2
  }))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: firstTdStyle
  }, "Y"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FormNumberInput, {
    value: group.get('y'),
    onChange: function onChange(e) {
      return groupsActions.groupTranslate(groupID, group.get('x'), e.target.value);
    },
    style: inputStyle,
    state: state,
    precision: 2
  }))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: firstTdStyle
  }, translator.t('Rotation')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(FormNumberInput, {
    value: group.get('rotation'),
    onChange: function onChange(e) {
      return groupsActions.groupRotate(groupID, e.target.value);
    },
    style: inputStyle,
    state: state,
    precision: 2
  }))))), elements.size ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      borderBottom: SharedStyle.PRIMARY_COLOR.border,
      paddingBottom: '1em'
    }
  }, translator.t('Group\'s Elements')), /*#__PURE__*/React.createElement("table", {
    style: tablegroupStyle
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: iconColStyle
  }), /*#__PURE__*/React.createElement("th", null, translator.t('Layer')), /*#__PURE__*/React.createElement("th", null, translator.t('Prototype')), /*#__PURE__*/React.createElement("th", null, translator.t('Name')))), /*#__PURE__*/React.createElement("tbody", null, elements.entrySeq().map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      layerID = _ref2[0],
      layerElements = _ref2[1];
    return layerElements.entrySeq().map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        elementPrototype = _ref4[0],
        ElementList = _ref4[1];
      return ElementList.valueSeq().map(function (elementID) {
        var element = state.getIn(['scene', 'layers', layerID, elementPrototype, elementID]);
        return /*#__PURE__*/React.createElement("tr", {
          key: elementID
        }, /*#__PURE__*/React.createElement("td", {
          style: iconColStyle,
          title: translator.t('Un-chain Element from Group')
        }, /*#__PURE__*/React.createElement(FaUnlink, {
          onClick: function onClick(e) {
            return groupsActions.removeFromGroup(groupID, layerID, elementPrototype, elementID);
          },
          style: styleEditButton
        })), /*#__PURE__*/React.createElement("td", {
          style: {
            textAlign: 'center'
          }
        }, layerID), /*#__PURE__*/React.createElement("td", {
          style: {
            textAlign: 'center',
            textTransform: 'capitalize'
          }
        }, elementPrototype), /*#__PURE__*/React.createElement("td", {
          style: {
            textAlign: 'center'
          }
        }, element.name));
      });
    });
  })))) : null));
};
PanelGroupEditor.propTypes = {
  state: PropTypes.object.isRequired,
  groupID: PropTypes.string
};
export default PanelGroupEditor;