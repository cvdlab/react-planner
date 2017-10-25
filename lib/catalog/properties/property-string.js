'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PropertyString;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _export = require('../../components/style/export');

var _sharedPropertyStyle = require('./shared-property-style');

var _sharedPropertyStyle2 = _interopRequireDefault(_sharedPropertyStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableStyle = { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" };
var firstTdStyle = { width: '6em', textTransform: 'capitalize' };

function PropertyString(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement,
      internalState = _ref.internalState,
      state = _ref.state;


  var update = function update(val) {

    if (configs.hook) {
      return configs.hook(val, sourceElement, internalState, state).then(function (_val) {
        return onUpdate(_val);
      });
    }

    return onUpdate(val);
  };

  return _react2.default.createElement(
    'table',
    { className: 'PropertyString', style: _sharedPropertyStyle2.default.tableStyle },
    _react2.default.createElement(
      'tbody',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          { style: _sharedPropertyStyle2.default.firstTdStyle },
          _react2.default.createElement(
            _export.FormLabel,
            null,
            configs.label
          )
        ),
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(_export.FormTextInput, {
            value: value,
            onChange: function onChange(event) {
              return update(event.target.value);
            } })
        )
      )
    )
  );
}

PropertyString.propTypes = {
  value: _propTypes2.default.any.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  configs: _propTypes2.default.object.isRequired,
  sourceElement: _propTypes2.default.object,
  internalState: _propTypes2.default.object,
  state: _propTypes2.default.object.isRequired
};