'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PropertyToggle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formLabel = require('../../components/style/form-label');

var _formLabel2 = _interopRequireDefault(_formLabel);

var _button = require('../../components/style/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableStyle = { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" };
var firstTdStyle = { width: '6em' };

function PropertyToggle(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement,
      internalState = _ref.internalState;

  return _react2.default.createElement(
    'table',
    { className: 'PropertyToggle', style: tableStyle },
    _react2.default.createElement(
      'tbody',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          { style: firstTdStyle },
          _react2.default.createElement(
            _formLabel2.default,
            null,
            configs.label
          )
        ),
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(
            _button2.default,
            { onClick: function onClick(e) {
                return onUpdate(!value);
              }, size: 'small' },
            configs.actionName
          )
        )
      )
    )
  );
}

PropertyToggle.propTypes = {
  value: _react.PropTypes.any.isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  configs: _react.PropTypes.object.isRequired,
  sourceElement: _react.PropTypes.object,
  internalState: _react.PropTypes.object
};