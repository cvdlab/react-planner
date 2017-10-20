'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propertyLenghtMeasure = require('../../../../catalog/properties/property-lenght-measure');

var _propertyLenghtMeasure2 = _interopRequireDefault(_propertyLenghtMeasure);

var _propertyString = require('../../../../catalog/properties/property-string');

var _propertyString2 = _interopRequireDefault(_propertyString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function HoleAttributesEditor(_ref, _ref2) {
  var element = _ref.element,
      _onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state,
      rest = _objectWithoutProperties(_ref, ['element', 'onUpdate', 'attributeFormData', 'state']);

  var translator = _ref2.translator;

  var name = attributeFormData.has('name') ? attributeFormData.get('name') : element.name;
  var offsetA = attributeFormData.has('offsetA') ? attributeFormData.get('offsetA') : element.offsetA;
  var offsetB = attributeFormData.has('offsetB') ? attributeFormData.get('offsetB') : element.offsetA;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_propertyString2.default, _extends({
      value: name,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('name', mapped);
      },
      configs: { label: 'Nome' },
      state: state
    }, rest)),
    _react2.default.createElement(_propertyLenghtMeasure2.default, _extends({
      value: offsetA,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('offsetA', mapped);
      },
      configs: { label: 'Offset 1', min: 0, max: Infinity, precision: 2 },
      state: state
    }, rest)),
    _react2.default.createElement(_propertyLenghtMeasure2.default, _extends({
      value: offsetB,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('offsetB', mapped);
      },
      configs: { label: 'Offset 2', min: 0, max: Infinity, precision: 2 },
      state: state
    }, rest))
  );
}

exports.default = HoleAttributesEditor;
HoleAttributesEditor.propTypes = {
  element: _propTypes2.default.object.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  attributeFormData: _propTypes2.default.object.isRequired,
  state: _propTypes2.default.object.isRequired
};

HoleAttributesEditor.contextTypes = {
  translator: _propTypes2.default.object.isRequired
};