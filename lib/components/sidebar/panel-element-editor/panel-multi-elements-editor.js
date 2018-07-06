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

var _panel = require('../panel');

var _panel2 = _interopRequireDefault(_panel);

var _immutable = require('immutable');

var _constants = require('../../../constants');

var _export = require('../../../components/style/export');

var _export2 = require('../../../class/export');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tableStyle = { width: '100%' };
var firstTdStyle = { width: '6em' };

var PanelMultiElementsEditor = function (_Component) {
  _inherits(PanelMultiElementsEditor, _Component);

  //export default function PanelMultiElementsEditor({state}, {projectActions, translator}) {
  function PanelMultiElementsEditor(props, context) {
    _classCallCheck(this, PanelMultiElementsEditor);

    var _this = _possibleConstructorReturn(this, (PanelMultiElementsEditor.__proto__ || Object.getPrototypeOf(PanelMultiElementsEditor)).call(this, props, context));

    _this.state = {
      selectedGroupID: ''
    };
    return _this;
  }

  _createClass(PanelMultiElementsEditor, [{
    key: 'addSelectToGroup',
    value: function addSelectToGroup(state, groupID, layerID, selecteds) {
      if (!groupID || groupID === '' || !selecteds || !selecteds.size) return;

      console.log('need to be added to group', groupID, 'elements', selecteds);

      /*let selectedJs = selecteds.toJS();
       for( let lineID in selectedJs.lines ) Group.addElement( state, groupID, layerID, 'lines', lineID );*/
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var mode = this.props.state.mode;


      if (![_constants.MODE_IDLE, _constants.MODE_2D_ZOOM_IN, _constants.MODE_2D_ZOOM_OUT, _constants.MODE_2D_PAN, _constants.MODE_3D_VIEW, _constants.MODE_3D_FIRST_PERSON, _constants.MODE_WAITING_DRAWING_LINE, _constants.MODE_DRAWING_LINE, _constants.MODE_DRAWING_HOLE, _constants.MODE_DRAWING_ITEM, _constants.MODE_DRAGGING_LINE, _constants.MODE_DRAGGING_VERTEX, _constants.MODE_DRAGGING_ITEM, _constants.MODE_DRAGGING_HOLE, _constants.MODE_ROTATING_ITEM, _constants.MODE_UPLOADING_IMAGE, _constants.MODE_FITTING_IMAGE].includes(mode)) return null;

      var groups = this.props.state.getIn(['scene', 'groups']);

      //TODO change in multi-layer check
      var selectedLayer = this.props.state.getIn(['scene', 'selectedLayer']);
      var selecteds = this.props.state.getIn(['scene', 'layers', selectedLayer, 'selected']);

      return _react2.default.createElement(
        _panel2.default,
        { name: 'Multiselected', opened: true },
        _react2.default.createElement(
          'div',
          { style: { padding: '5px 15px' } },
          _react2.default.createElement(
            'p',
            null,
            'Multiselection tab'
          ),
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
                  'Add to Group'
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    _export.FormSelect,
                    { value: this.state.selectedGroupID, onChange: function onChange(e) {
                        return _this2.setState({ 'selectedGroupID': e.target.value });
                      } },
                    _react2.default.createElement('option', { key: 0, value: '' }),
                    groups.entrySeq().map(function (_ref) {
                      var _ref2 = _slicedToArray(_ref, 2),
                          groupID = _ref2[0],
                          group = _ref2[1];

                      return _react2.default.createElement(
                        'option',
                        { key: groupID, value: groupID },
                        group.get('name')
                      );
                    })
                  )
                ),
                _react2.default.createElement(
                  'td',
                  { style: { cursor: 'pointer', padding: '0.5em 0', textAlign: 'center' }, onClick: function onClick(e) {
                      if (!_this2.state.selectedGroupID || _this2.state.selectedGroupID === '' || !selecteds || !selecteds.size) return;

                      var selectedJs = selecteds.toJS();

                      for (var x = 0; x < selectedJs.lines.length; x++) {
                        _this2.context.groupsActions.addToGroup(_this2.state.selectedGroupID, selectedLayer, 'lines', selectedJs.lines[x]);
                      }
                    } },
                  '+'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return PanelMultiElementsEditor;
}(_react.Component);

exports.default = PanelMultiElementsEditor;


PanelMultiElementsEditor.propTypes = {
  state: _propTypes2.default.object.isRequired
};

PanelMultiElementsEditor.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  groupsActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};