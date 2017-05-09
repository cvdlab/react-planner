'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = PropertyEnum;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _formSelect = require('../../components/style/form-select');

var _formSelect2 = _interopRequireDefault(_formSelect);

var _formLabel = require('../../components/style/form-label');

var _formLabel2 = _interopRequireDefault(_formLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableStyle = { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" };
var firstTdStyle = { width: '6em' };

function PropertyEnum(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement,
      internalState = _ref.internalState;

  return _react2.default.createElement(
    'table',
    { className: 'PropertyEnum', style: tableStyle },
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
            _formSelect2.default,
            { value: value, onChange: function onChange(event) {
                return onUpdate(event.target.value);
              } },
            (0, _immutable.Seq)(configs.values).entrySeq().map(function (_ref2) {
              var _ref3 = _slicedToArray(_ref2, 2),
                  key = _ref3[0],
                  value = _ref3[1];

              return _react2.default.createElement(
                'option',
                { key: key, value: key },
                value
              );
            })
          )
        )
      )
    )
  );
}

PropertyEnum.propTypes = {
  value: _react.PropTypes.any.isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  configs: _react.PropTypes.object.isRequired,
  sourceElement: _react.PropTypes.object,
  internalState: _react.PropTypes.object
};