'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _panel = require('./panel');

var _panel2 = _interopRequireDefault(_panel);

var _ti = require('react-icons/ti');

var _fa = require('react-icons/fa');

var _export = require('../style/export');

var _constants = require('../../constants');

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VISIBILITY_MODE = {
  MODE_IDLE: _constants.MODE_IDLE, MODE_2D_ZOOM_IN: _constants.MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT: _constants.MODE_2D_ZOOM_OUT, MODE_2D_PAN: _constants.MODE_2D_PAN,
  MODE_3D_VIEW: _constants.MODE_3D_VIEW, MODE_3D_FIRST_PERSON: _constants.MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE: _constants.MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE: _constants.MODE_DRAWING_LINE, MODE_DRAWING_HOLE: _constants.MODE_DRAWING_HOLE, MODE_DRAWING_ITEM: _constants.MODE_DRAWING_ITEM,
  MODE_DRAGGING_LINE: _constants.MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX: _constants.MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM: _constants.MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE: _constants.MODE_DRAGGING_HOLE,
  MODE_ROTATING_ITEM: _constants.MODE_ROTATING_ITEM, MODE_UPLOADING_IMAGE: _constants.MODE_UPLOADING_IMAGE, MODE_FITTING_IMAGE: _constants.MODE_FITTING_IMAGE
};

var styleEditButton = {
  cursor: 'pointer',
  marginLeft: '5px',
  border: '0px',
  background: 'none',
  color: SharedStyle.COLORS.white,
  fontSize: '14px',
  outline: '0px'
};

var tableLayerStyle = {
  width: '100%',
  cursor: 'pointer',
  overflowY: 'auto',
  maxHeight: '20em',
  display: 'block',
  padding: '0 1em',
  marginLeft: '1px'
};

var iconColStyle = { width: '2em' };
var styleHoverColor = { color: SharedStyle.SECONDARY_COLOR.main };
var styleEditButtonHover = _extends({}, styleEditButton, styleHoverColor);
var styleAddLabel = { fontSize: '10px', marginLeft: '5px' };
var styleEyeVisible = { fontSize: '1.25em' };
var styleEyeHidden = _extends({}, styleEyeVisible, { color: '#a5a1a1' });
var firstTdStyle = { width: '6em' };
var newLayerLableStyle = { margin: '0.5em 0', fontSize: '1.3em', cursor: 'pointer', textAlign: 'center' };
var newLayerLableHoverStyle = _extends({}, newLayerLableStyle, styleHoverColor);
var layerInputTableStyle = { width: '100%', borderSpacing: '2px 0', padding: '5px 15px' };
var inputTableButtonStyle = { float: 'right', marginTop: '0.5em', borderSpacing: '0' };

var PanelLayers = function (_Component) {
  _inherits(PanelLayers, _Component);

  function PanelLayers(props) {
    _classCallCheck(this, PanelLayers);

    var _this = _possibleConstructorReturn(this, (PanelLayers.__proto__ || Object.getPrototypeOf(PanelLayers)).call(this, props));

    _this.state = {
      headHovered: false,
      layerAddUIVisible: false,
      editingLayer: new _immutable.Map()
    };
    return _this;
  }

  _createClass(PanelLayers, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.state.scene.layers.size !== nextProps.state.scene.layers.size || nextState.layerAddUIVisible != this.state.layerAddUIVisible || this.state.editingLayer.hashCode() !== nextState.editingLayer.hashCode() || this.props.state.sceneHistory.hashCode() !== nextProps.state.sceneHistory.hashCode()) return true;

      return false;
    }
  }, {
    key: 'addLayer',
    value: function addLayer(e) {
      e.stopPropagation();
      if (!this.state.layerAddUIVisible) {
        this.context.sceneActions.addLayer('', 0);
        this.setState({ layerAddUIVisible: false });
      } else this.setState({ layerAddUIVisible: !this.state.layerAddUIVisible });
    }
  }, {
    key: 'resetLayerMod',
    value: function resetLayerMod(e) {
      e.stopPropagation();
      this.setState({ layerAddUIVisible: false, editingLayer: new _immutable.Map() });
    }
  }, {
    key: 'updateLayer',
    value: function updateLayer(e, layerData) {
      e.stopPropagation();

      var _layerData$toJS = layerData.toJS(),
          id = _layerData$toJS.id,
          name = _layerData$toJS.name,
          opacity = _layerData$toJS.opacity,
          altitude = _layerData$toJS.altitude,
          order = _layerData$toJS.order;

      altitude = parseInt(altitude);

      this.context.sceneActions.setLayerProperties(id, { name: name, opacity: opacity, altitude: altitude, order: order });
      this.setState({ layerAddUIVisible: false, editingLayer: new _immutable.Map() });
    }
  }, {
    key: 'delLayer',
    value: function delLayer(e, layerID) {
      e.stopPropagation();
      this.context.sceneActions.removeLayer(layerID);
      this.setState({ layerAddUIVisible: false, editingLayer: new _immutable.Map() });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!VISIBILITY_MODE[this.props.state.mode]) return null;

      var scene = this.props.state.scene;
      var isLastLayer = scene.layers.size === 1;

      return _react2.default.createElement(
        _panel2.default,
        { name: this.context.translator.t('Layers') },
        _react2.default.createElement(
          'table',
          { style: tableLayerStyle },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement('th', { colSpan: '3' }),
              _react2.default.createElement(
                'th',
                null,
                this.context.translator.t('Altitude')
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
            scene.layers.entrySeq().map(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  layerID = _ref2[0],
                  layer = _ref2[1];

              var selectClick = function selectClick(e) {
                return _this2.context.sceneActions.selectLayer(layerID);
              };
              var configureClick = function configureClick(e) {
                return _this2.setState({ editingLayer: layer, layerAddUIVisible: true });
              };

              var swapVisibility = function swapVisibility(e) {
                e.stopPropagation();
                _this2.context.sceneActions.setLayerProperties(layerID, { visible: !layer.visible });
              };

              var isCurrentLayer = layerID === scene.selectedLayer;

              return _react2.default.createElement(
                'tr',
                {
                  key: layerID,
                  onClick: selectClick,
                  onDoubleClick: configureClick,
                  style: !isCurrentLayer ? null : styleHoverColor
                },
                _react2.default.createElement(
                  'td',
                  { style: iconColStyle },
                  !isCurrentLayer ? _react2.default.createElement(_fa.FaEye, {
                    onClick: swapVisibility,
                    style: !layer.visible ? styleEyeHidden : styleEyeVisible
                  }) : null
                ),
                _react2.default.createElement(
                  'td',
                  { style: iconColStyle },
                  _react2.default.createElement(_fa.FaPencilAlt, {
                    onClick: configureClick,
                    style: !isCurrentLayer ? styleEditButton : styleEditButtonHover,
                    title: _this2.context.translator.t('Configure layer')
                  })
                ),
                _react2.default.createElement(
                  'td',
                  { style: iconColStyle },
                  !isLastLayer ? _react2.default.createElement(_fa.FaTrash, {
                    onClick: function onClick(e) {
                      return _this2.delLayer(e, layerID);
                    },
                    style: !isCurrentLayer ? styleEditButton : styleEditButtonHover,
                    title: _this2.context.translator.t('Delete layer')
                  }) : null
                ),
                _react2.default.createElement(
                  'td',
                  { style: { width: '6em', textAlign: 'center' } },
                  '[ h : ',
                  layer.altitude,
                  ' ]'
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  layer.name
                )
              );
            })
          )
        ),
        _react2.default.createElement(
          'p',
          {
            style: !this.state.headHovered ? newLayerLableStyle : newLayerLableHoverStyle,
            onMouseOver: function onMouseOver() {
              return _this2.setState({ headHovered: true });
            },
            onMouseOut: function onMouseOut() {
              return _this2.setState({ headHovered: false });
            },
            onClick: function onClick(e) {
              return _this2.addLayer(e);
            }
          },
          !this.state.layerAddUIVisible ? _react2.default.createElement(_ti.TiPlus, null) : _react2.default.createElement(_ti.TiDelete, null),
          _react2.default.createElement(
            'b',
            { style: styleAddLabel },
            this.context.translator.t('New layer')
          )
        ),
        this.state.layerAddUIVisible && this.state.editingLayer ? _react2.default.createElement(
          'table',
          { style: layerInputTableStyle },
          _react2.default.createElement(
            'tbody',
            null,
            _react2.default.createElement(
              'tr',
              { style: { marginTop: '1em' } },
              _react2.default.createElement(
                'td',
                { style: firstTdStyle },
                this.context.translator.t('Name'),
                ':'
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(_export.FormTextInput, {
                  value: this.state.editingLayer.get('name'),
                  onChange: function onChange(e) {
                    return _this2.setState({ editingLayer: _this2.state.editingLayer.merge({ name: e.target.value }) });
                  }
                })
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: firstTdStyle },
                this.context.translator.t('opacity'),
                ':'
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(_export.FormSlider, {
                  min: 0,
                  max: 100,
                  value: Math.round(this.state.editingLayer.get('opacity') * 100),
                  onChange: function onChange(e) {
                    return _this2.setState({ editingLayer: _this2.state.editingLayer.merge({ opacity: e.target.value / 100 }) });
                  }
                })
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: firstTdStyle },
                this.context.translator.t('altitude'),
                ':'
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(_export.FormNumberInput, {
                  value: this.state.editingLayer.get('altitude'),
                  onChange: function onChange(e) {
                    return _this2.setState({ editingLayer: _this2.state.editingLayer.merge({ altitude: e.target.value }) });
                  }
                })
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: firstTdStyle },
                this.context.translator.t('order'),
                ':'
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(_export.FormNumberInput, {
                  value: this.state.editingLayer.get('order'),
                  onChange: function onChange(e) {
                    return _this2.setState({ editingLayer: _this2.state.editingLayer.merge({ order: e.target.value }) });
                  }
                })
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { colSpan: '2' },
                _react2.default.createElement(
                  'table',
                  { style: inputTableButtonStyle },
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                          _export.CancelButton,
                          { size: 'small', onClick: function onClick(e) {
                              _this2.resetLayerMod(e);
                            } },
                          this.context.translator.t('Reset')
                        )
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                          _export.FormSubmitButton,
                          { size: 'small', onClick: function onClick(e) {
                              _this2.updateLayer(e, _this2.state.editingLayer);
                            } },
                          this.context.translator.t('Save')
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        ) : null
      );
    }
  }]);

  return PanelLayers;
}(_react.Component);

exports.default = PanelLayers;


PanelLayers.propTypes = {
  state: _propTypes2.default.object.isRequired
};

PanelLayers.contextTypes = {
  sceneActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};