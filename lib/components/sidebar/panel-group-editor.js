'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _panel = require('./panel');

var _panel2 = _interopRequireDefault(_panel);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _export = require('../style/export');

var _immutable = require('immutable');

var _fa = require('react-icons/fa');

var _constants = require('../../constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VISIBILITY_MODE = {
  MODE_IDLE: _constants.MODE_IDLE, MODE_2D_ZOOM_IN: _constants.MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT: _constants.MODE_2D_ZOOM_OUT, MODE_2D_PAN: _constants.MODE_2D_PAN, MODE_3D_VIEW: _constants.MODE_3D_VIEW, MODE_3D_FIRST_PERSON: _constants.MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE: _constants.MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE: _constants.MODE_DRAWING_LINE, MODE_DRAWING_HOLE: _constants.MODE_DRAWING_HOLE, MODE_DRAWING_ITEM: _constants.MODE_DRAWING_ITEM, MODE_DRAGGING_LINE: _constants.MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX: _constants.MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM: _constants.MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE: _constants.MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE: _constants.MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE: _constants.MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM: _constants.MODE_ROTATING_ITEM
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

      return _react2.default.createElement(
        _panel2.default,
        { name: this.context.translator.t('Group [{0}]', group.get('name')), opened: true },
        _react2.default.createElement(
          'div',
          { style: { padding: '5px 15px' } },
          _react2.default.createElement(
            'table',
            { style: tableStyle },
            _react2.default.createElement(
              'tbody',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  { style: firstTdStyle },
                  this.context.translator.t('Name')
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(_export.FormTextInput, {
                    value: group.get('name'),
                    onChange: function onChange(e) {
                      return _this2.context.groupsActions.setGroupAttributes(_this2.props.groupID, new _immutable.Map({ 'name': e.target.value }));
                    },
                    style: inputStyle
                  })
                )
              ),
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  { style: firstTdStyle },
                  'X'
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(_export.FormNumberInput, {
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
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  { style: firstTdStyle },
                  'Y'
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(_export.FormNumberInput, {
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
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  { style: firstTdStyle },
                  this.context.translator.t('Rotation')
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(_export.FormNumberInput, {
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
          elements.size ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'p',
              { style: { textAlign: 'center', borderBottom: SharedStyle.PRIMARY_COLOR.border, paddingBottom: '1em' } },
              this.context.translator.t('Group\'s Elements')
            ),
            _react2.default.createElement(
              'table',
              { style: tablegroupStyle },
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement('th', { style: iconColStyle }),
                  _react2.default.createElement(
                    'th',
                    null,
                    this.context.translator.t('Layer')
                  ),
                  _react2.default.createElement(
                    'th',
                    null,
                    this.context.translator.t('Prototype')
                  ),
                  _react2.default.createElement(
                    'th',
                    null,
                    this.context.translator.t('Name')
                  )
                )
              ),
              _react2.default.createElement(
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

                      return _react2.default.createElement(
                        'tr',
                        {
                          key: elementID
                        },
                        _react2.default.createElement(
                          'td',
                          { style: iconColStyle, title: _this2.context.translator.t('Un-chain Element from Group') },
                          _react2.default.createElement(_fa.FaUnlink, {
                            onClick: function onClick(e) {
                              return _this2.context.groupsActions.removeFromGroup(_this2.props.groupID, layerID, elementPrototype, elementID);
                            },
                            style: styleEditButton
                          })
                        ),
                        _react2.default.createElement(
                          'td',
                          { style: { textAlign: 'center' } },
                          layerID
                        ),
                        _react2.default.createElement(
                          'td',
                          { style: { textAlign: 'center', textTransform: 'capitalize' } },
                          elementPrototype
                        ),
                        _react2.default.createElement(
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
}(_react.Component);

exports.default = PanelGroupEditor;


PanelGroupEditor.propTypes = {
  state: _propTypes2.default.object.isRequired,
  groupID: _propTypes2.default.string
};

PanelGroupEditor.contextTypes = {
  catalog: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  groupsActions: _propTypes2.default.object.isRequired,
  projectActions: _propTypes2.default.object.isRequired
};