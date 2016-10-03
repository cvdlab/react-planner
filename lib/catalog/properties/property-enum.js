'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = PropertyEnum;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PropertyEnum(_ref) {
  var propertyName = _ref.propertyName;
  var value = _ref.value;
  var onUpdate = _ref.onUpdate;
  var configs = _ref.configs;


  return _react2.default.createElement(
    'div',
    { style: { marginBottom: "3px" } },
    _react2.default.createElement(
      'label',
      { style: { width: "30%", display: "inline-block" } },
      propertyName
    ),
    _react2.default.createElement(
      'div',
      { style: { display: "inline-block", width: "70%" } },
      _react2.default.createElement(
        'select',
        { type: 'text', style: { width: "100%" }, value: value, onChange: function onChange(event) {
            return onUpdate(event.target.value);
          } },
        (0, _immutable.Seq)(configs.values).entrySeq().map(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2);

          var key = _ref3[0];
          var value = _ref3[1];
          return _react2.default.createElement(
            'option',
            { key: key, value: key },
            value
          );
        })
      )
    )
  );
}

PropertyEnum.propTypes = {
  propertyName: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.any.isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  configs: _react.PropTypes.object.isRequired
};