'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propertyLenghtMeasure = require('../../../../catalog/properties/property-lenght-measure');

var _propertyLenghtMeasure2 = _interopRequireDefault(_propertyLenghtMeasure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HoleAttributesEditor(_ref, _ref2) {
  var element = _ref.element,
      _onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state;
  var translator = _ref2.translator;

  var offsetA = attributeFormData.has('offsetA') ? attributeFormData.get('offsetA') : element.offsetA;
  var offsetB = attributeFormData.has('offsetB') ? attributeFormData.get('offsetB') : element.offsetA;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_propertyLenghtMeasure2.default, {
      value: offsetA,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('offsetA', mapped);
      },
      configs: { label: 'Offset 1', min: 0, max: Infinity },
      state: state
    }),
    _react2.default.createElement(_propertyLenghtMeasure2.default, {
      value: offsetB,
      onUpdate: function onUpdate(mapped) {
        return _onUpdate('offsetB', mapped);
      },
      configs: { label: 'Offset 2', min: 0, max: Infinity },
      state: state
    })
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