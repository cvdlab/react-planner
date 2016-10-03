'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = VolumesSummary;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _calculateVolumes = require('../../utils/calculate-volumes');

var _calculateVolumes2 = _interopRequireDefault(_calculateVolumes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE_CONTAINER = {
  padding: "0 20px",
  overflowY: "scroll"
};

var STYLE_TABLE = {
  width: "100%",
  borderCollapse: "collapse",
  borderTop: "1px solid #aaa"
};

var STYLE_CELL = {
  borderBottom: "1px solid #aaa",
  borderLeft: "1px solid #aaa",
  borderRight: "1px solid #aaa",
  padding: "4px 5px",
  fontSize: "12px",
  textAlign: "left"
};

var STYLE_HEADER = _extends({}, STYLE_CELL, {
  fontSize: "13px"
});

function VolumesSummary(_ref) {
  var width = _ref.width;
  var height = _ref.height;
  var scene = _ref.scene;


  var calculatedVolumes = (0, _calculateVolumes2.default)(scene);

  return _react2.default.createElement(
    'div',
    { style: _extends({ width: width, height: height }, STYLE_CONTAINER) },
    _react2.default.createElement(
      'table',
      { style: STYLE_TABLE },
      _react2.default.createElement(
        'thead',
        null,
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'th',
            { style: _extends({ width: "5%" }, STYLE_HEADER) },
            'ID'
          ),
          _react2.default.createElement(
            'th',
            { style: _extends({ width: "5%" }, STYLE_HEADER) },
            'Element'
          ),
          _react2.default.createElement(
            'th',
            { style: _extends({ width: "15%" }, STYLE_HEADER) },
            'Layer'
          ),
          _react2.default.createElement(
            'th',
            { style: _extends({ width: "15%" }, STYLE_HEADER) },
            'Type'
          ),
          _react2.default.createElement(
            'th',
            { style: _extends({ width: "20%" }, STYLE_HEADER) },
            'Base'
          ),
          _react2.default.createElement(
            'th',
            { style: _extends({ width: "20%" }, STYLE_HEADER) },
            'Volume'
          ),
          _react2.default.createElement(
            'th',
            { style: _extends({ width: "20%" }, STYLE_HEADER) },
            'Composition'
          )
        )
      ),
      _react2.default.createElement(
        'tbody',
        null,
        calculatedVolumes.map(function (_ref2) {
          var id = _ref2.id;
          var elementID = _ref2.elementID;
          var layerID = _ref2.layerID;
          var type = _ref2.type;
          var prototype = _ref2.prototype;
          var volume = _ref2.volume;
          var composition = _ref2.composition;
          return _react2.default.createElement(
            'tr',
            { key: id },
            _react2.default.createElement(
              'td',
              { style: STYLE_CELL },
              id
            ),
            _react2.default.createElement(
              'td',
              { style: STYLE_CELL },
              elementID
            ),
            _react2.default.createElement(
              'td',
              { style: STYLE_CELL },
              layerID
            ),
            _react2.default.createElement(
              'td',
              { style: STYLE_CELL },
              type
            ),
            _react2.default.createElement(
              'td',
              { style: STYLE_CELL },
              prototype
            ),
            _react2.default.createElement(
              'td',
              { style: STYLE_CELL },
              volume,
              ' m\xB3'
            ),
            _react2.default.createElement(
              'td',
              { style: STYLE_CELL },
              composition
            )
          );
        })
      )
    )
  );
}

VolumesSummary.propTypes = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  scene: _react.PropTypes.object.isRequired
};

VolumesSummary.contextTypes = {};