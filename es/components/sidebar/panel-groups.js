var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import * as SharedStyle from '../../shared-style';
import { TiPlus, TiDelete } from 'react-icons/ti';
import { FaTrash, FaEye, FaLink, FaUnlink } from 'react-icons/fa';
import { Map } from 'immutable';

import { MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE, MODE_ROTATING_ITEM } from '../../constants';

var VISIBILITY_MODE = {
  MODE_IDLE: MODE_IDLE, MODE_2D_ZOOM_IN: MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT: MODE_2D_ZOOM_OUT, MODE_2D_PAN: MODE_2D_PAN, MODE_3D_VIEW: MODE_3D_VIEW, MODE_3D_FIRST_PERSON: MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE: MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE: MODE_DRAWING_LINE, MODE_DRAWING_HOLE: MODE_DRAWING_HOLE, MODE_DRAWING_ITEM: MODE_DRAWING_ITEM, MODE_DRAGGING_LINE: MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX: MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM: MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE: MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE: MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE: MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM: MODE_ROTATING_ITEM
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
  padding: '0 1em',
  marginLeft: '1px'
};

var iconColStyle = { width: '2em', textAlign: 'center' };
var styleHoverColor = { color: SharedStyle.SECONDARY_COLOR.main };
var styleEditButtonHover = _extends({}, styleEditButton, styleHoverColor);
var styleAddLabel = { fontSize: '10px', marginLeft: '5px' };
var styleEyeVisible = { fontSize: '1.25em' };
var styleEyeHidden = _extends({}, styleEyeVisible, { color: '#a5a1a1' });
var newLayerLableStyle = { fontSize: '1.3em', cursor: 'pointer', textAlign: 'center' };
var newLayerLableHoverStyle = _extends({}, newLayerLableStyle, styleHoverColor);

var PanelGroups = function (_Component) {
  _inherits(PanelGroups, _Component);

  function PanelGroups(props, context) {
    _classCallCheck(this, PanelGroups);

    var _this = _possibleConstructorReturn(this, (PanelGroups.__proto__ || Object.getPrototypeOf(PanelGroups)).call(this, props, context));

    _this.state = {
      newEmptyHover: false,
      newSelectedHover: false
    };
    return _this;
  }

  _createClass(PanelGroups, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.groups.hashCode() !== nextProps.groups.hashCode() || this.props.layers.hashCode() !== nextProps.layers.hashCode() || this.props.mode !== nextProps.mode;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          mode = _props.mode,
          groups = _props.groups,
          layers = _props.layers;


      if (!VISIBILITY_MODE[mode]) return null;

      return React.createElement(
        Panel,
        { name: this.context.translator.t('Groups'), opened: groups.size > 0 },
        groups.size ? React.createElement(
          'table',
          { style: tablegroupStyle },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement('th', { colSpan: '4' }),
              React.createElement(
                'th',
                null,
                this.context.translator.t('Elements')
              ),
              React.createElement(
                'th',
                null,
                this.context.translator.t('Name')
              )
            )
          ),
          React.createElement(
            'tbody',
            null,
            groups.entrySeq().map(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  groupID = _ref2[0],
                  group = _ref2[1];

              var selectClick = function selectClick(e) {
                return _this2.context.groupsActions.selectGroup(groupID);
              };

              var swapVisibility = function swapVisibility(e) {
                e.stopPropagation();
                _this2.context.groupsActions.setGroupProperties(groupID, new Map({ visible: !group.get('visible') }));
              };

              var chainToGroup = function chainToGroup(e) {
                layers.forEach(function (layer) {

                  var layerID = layer.get('id');
                  var layerElements = {
                    'lines': layer.get('lines'),
                    'items': layer.get('items'),
                    'holes': layer.get('holes'),
                    'areas': layer.get('areas')
                  };

                  var _loop = function _loop(elementPrototype) {
                    var ElementList = layerElements[elementPrototype];
                    ElementList.filter(function (el) {
                      return el.get('selected');
                    }).forEach(function (element) {
                      _this2.context.groupsActions.addToGroup(groupID, layerID, elementPrototype, element.get('id'));
                    });
                  };

                  for (var elementPrototype in layerElements) {
                    _loop(elementPrototype);
                  }
                });

                selectClick(e);
              };

              var isCurrentgroup = group.get('selected');
              var shouldHighlight = isCurrentgroup;
              var rowStyle = !shouldHighlight ? null : styleHoverColor;

              var dimension = group.get('elements').reduce(function (sum, layer) {
                return sum + layer.reduce(function (lSum, elProt) {
                  return lSum + elProt.size;
                }, 0);
              }, 0);

              return React.createElement(
                'tr',
                {
                  key: groupID,
                  style: rowStyle
                },
                React.createElement(
                  'td',
                  { style: iconColStyle, title: _this2.context.translator.t('Toggle Group Visibility') },
                  React.createElement(FaEye, {
                    onClick: swapVisibility,
                    style: !group.get('visible') ? styleEyeHidden : styleEyeVisible
                  })
                ),
                React.createElement(
                  'td',
                  { style: iconColStyle, title: _this2.context.translator.t('Chain selected Elements to Group') },
                  React.createElement(FaLink, {
                    onClick: chainToGroup,
                    style: !shouldHighlight ? styleEditButton : styleEditButtonHover
                  })
                ),
                React.createElement(
                  'td',
                  { style: iconColStyle, title: _this2.context.translator.t('Un-chain all Group\'s Elements and remove Group') },
                  React.createElement(FaUnlink, {
                    onClick: function onClick(e) {
                      return _this2.context.groupsActions.removeGroup(groupID);
                    },
                    style: !shouldHighlight ? styleEditButton : styleEditButtonHover
                  })
                ),
                React.createElement(
                  'td',
                  { style: iconColStyle, title: _this2.context.translator.t('Delete group and all Elements') },
                  React.createElement(FaTrash, {
                    onClick: function onClick(e) {
                      return _this2.context.groupsActions.removeGroupAndDeleteElements(groupID);
                    },
                    style: !shouldHighlight ? styleEditButton : styleEditButtonHover
                  })
                ),
                React.createElement(
                  'td',
                  { onClick: selectClick, style: { width: '0em', textAlign: 'center' } },
                  dimension
                ),
                React.createElement(
                  'td',
                  { onClick: selectClick },
                  group.get('name')
                )
              );
            })
          )
        ) : null,
        React.createElement(
          'table',
          { style: { width: '100%', marginTop: '0.1em' } },
          React.createElement(
            'tbody',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                {
                  style: !this.state.newEmptyHover ? newLayerLableStyle : newLayerLableHoverStyle,
                  onMouseOver: function onMouseOver() {
                    return _this2.setState({ newEmptyHover: true });
                  },
                  onMouseOut: function onMouseOut() {
                    return _this2.setState({ newEmptyHover: false });
                  },
                  onClick: function onClick(e) {
                    return _this2.context.groupsActions.addGroup();
                  }
                },
                React.createElement(TiPlus, null),
                React.createElement(
                  'b',
                  { style: styleAddLabel },
                  this.context.translator.t('New Empty Group')
                )
              ),
              React.createElement(
                'td',
                {
                  style: !this.state.newSelectedHover ? newLayerLableStyle : newLayerLableHoverStyle,
                  onMouseOver: function onMouseOver() {
                    return _this2.setState({ newSelectedHover: true });
                  },
                  onMouseOut: function onMouseOut() {
                    return _this2.setState({ newSelectedHover: false });
                  },
                  onClick: function onClick(e) {
                    return _this2.context.groupsActions.addGroupFromSelected();
                  }
                },
                React.createElement(TiPlus, null),
                React.createElement(
                  'b',
                  { style: styleAddLabel },
                  this.context.translator.t('New Group from selected')
                )
              )
            )
          )
        )
      );
    }
  }]);

  return PanelGroups;
}(Component);

export default PanelGroups;


PanelGroups.propTypes = {
  mode: PropTypes.string.isRequired,
  groups: PropTypes.object.isRequired,
  layers: PropTypes.object.isRequired
};

PanelGroups.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  groupsActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};