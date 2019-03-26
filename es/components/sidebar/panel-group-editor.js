var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import * as SharedStyle from '../../shared-style';
import { FormNumberInput, FormTextInput } from '../style/export';
import { Map } from 'immutable';

import { FaUnlink } from 'react-icons/fa';

import { MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE, MODE_ROTATING_ITEM } from '../../constants';

var VISIBILITY_MODE = {
  MODE_IDLE: MODE_IDLE, MODE_2D_ZOOM_IN: MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT: MODE_2D_ZOOM_OUT, MODE_2D_PAN: MODE_2D_PAN, MODE_3D_VIEW: MODE_3D_VIEW, MODE_3D_FIRST_PERSON: MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE: MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE: MODE_DRAWING_LINE, MODE_DRAWING_HOLE: MODE_DRAWING_HOLE, MODE_DRAWING_ITEM: MODE_DRAWING_ITEM, MODE_DRAGGING_LINE: MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX: MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM: MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE: MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE: MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE: MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM: MODE_ROTATING_ITEM
};

var tableStyle = { width: '100%' };
var firstTdStyle = { width: '6em' };
var inputStyle = { textAlign: 'left' };
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

var iconColStyle = { width: '2em' };

var PanelGroupEditor = function (_Component) {
  _inherits(PanelGroupEditor, _Component);

  function PanelGroupEditor(props, context) {
    _classCallCheck(this, PanelGroupEditor);

    var _this = _possibleConstructorReturn(this, (PanelGroupEditor.__proto__ || Object.getPrototypeOf(PanelGroupEditor)).call(this, props, context));

    _this.state = {};
    return _this;
  }

  _createClass(PanelGroupEditor, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.props.groupID || !VISIBILITY_MODE[this.props.state.mode]) return null;

      var group = this.props.state.getIn(['scene', 'groups', this.props.groupID]);
      var elements = group.get('elements');

      return React.createElement(
        Panel,
        { name: this.context.translator.t('Group [{0}]', group.get('name')), opened: true },
        React.createElement(
          'div',
          { style: { padding: '5px 15px' } },
          React.createElement(
            'table',
            { style: tableStyle },
            React.createElement(
              'tbody',
              null,
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'td',
                  { style: firstTdStyle },
                  this.context.translator.t('Name')
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement(FormTextInput, {
                    value: group.get('name'),
                    onChange: function onChange(e) {
                      return _this2.context.groupsActions.setGroupAttributes(_this2.props.groupID, new Map({ 'name': e.target.value }));
                    },
                    style: inputStyle
                  })
                )
              ),
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'td',
                  { style: firstTdStyle },
                  'X'
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement(FormNumberInput, {
                    value: group.get('x'),
                    onChange: function onChange(e) {
                      return _this2.context.groupsActions.groupTranslate(_this2.props.groupID, e.target.value, group.get('y'));
                    },
                    style: inputStyle,
                    state: this.props.state,
                    precision: 2
                  })
                )
              ),
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'td',
                  { style: firstTdStyle },
                  'Y'
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement(FormNumberInput, {
                    value: group.get('y'),
                    onChange: function onChange(e) {
                      return _this2.context.groupsActions.groupTranslate(_this2.props.groupID, group.get('x'), e.target.value);
                    },
                    style: inputStyle,
                    state: this.props.state,
                    precision: 2
                  })
                )
              ),
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'td',
                  { style: firstTdStyle },
                  this.context.translator.t('Rotation')
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement(FormNumberInput, {
                    value: group.get('rotation'),
                    onChange: function onChange(e) {
                      return _this2.context.groupsActions.groupRotate(_this2.props.groupID, e.target.value);
                    },
                    style: inputStyle,
                    state: this.props.state,
                    precision: 2
                  })
                )
              )
            )
          ),
          elements.size ? React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { style: { textAlign: 'center', borderBottom: SharedStyle.PRIMARY_COLOR.border, paddingBottom: '1em' } },
              this.context.translator.t('Group\'s Elements')
            ),
            React.createElement(
              'table',
              { style: tablegroupStyle },
              React.createElement(
                'thead',
                null,
                React.createElement(
                  'tr',
                  null,
                  React.createElement('th', { style: iconColStyle }),
                  React.createElement(
                    'th',
                    null,
                    this.context.translator.t('Layer')
                  ),
                  React.createElement(
                    'th',
                    null,
                    this.context.translator.t('Prototype')
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
                elements.entrySeq().map(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 2),
                      layerID = _ref2[0],
                      layerElements = _ref2[1];

                  return layerElements.entrySeq().map(function (_ref3) {
                    var _ref4 = _slicedToArray(_ref3, 2),
                        elementPrototype = _ref4[0],
                        ElementList = _ref4[1];

                    return ElementList.valueSeq().map(function (elementID) {
                      var element = _this2.props.state.getIn(['scene', 'layers', layerID, elementPrototype, elementID]);

                      return React.createElement(
                        'tr',
                        {
                          key: elementID
                        },
                        React.createElement(
                          'td',
                          { style: iconColStyle, title: _this2.context.translator.t('Un-chain Element from Group') },
                          React.createElement(FaUnlink, {
                            onClick: function onClick(e) {
                              return _this2.context.groupsActions.removeFromGroup(_this2.props.groupID, layerID, elementPrototype, elementID);
                            },
                            style: styleEditButton
                          })
                        ),
                        React.createElement(
                          'td',
                          { style: { textAlign: 'center' } },
                          layerID
                        ),
                        React.createElement(
                          'td',
                          { style: { textAlign: 'center', textTransform: 'capitalize' } },
                          elementPrototype
                        ),
                        React.createElement(
                          'td',
                          { style: { textAlign: 'center' } },
                          element.name
                        )
                      );
                    });
                  });
                })
              )
            )
          ) : null
        )
      );
    }
  }]);

  return PanelGroupEditor;
}(Component);

export default PanelGroupEditor;


PanelGroupEditor.propTypes = {
  state: PropTypes.object.isRequired,
  groupID: PropTypes.string
};

PanelGroupEditor.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  groupsActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};