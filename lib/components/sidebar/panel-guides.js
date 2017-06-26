'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = PanelGuides;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _panel = require('./panel');

var _panel2 = _interopRequireDefault(_panel);

var _plus = require('react-icons/lib/ti/plus');

var _plus2 = _interopRequireDefault(_plus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE_ADD_WRAPPER = {
  display: "block",
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
  padding: "0px 15px",
  borderTop: "1px solid black"
};

var STYLE_ADD_LABEL = {
  fontSize: "10px",
  marginLeft: "5px"
};

function PanelGuides(_ref) {
  var _ref$state = _ref.state,
      scene = _ref$state.scene,
      mode = _ref$state.mode;

  return _react2.default.createElement(
    _panel2.default,
    { name: 'Guides' },
    _react2.default.createElement(
      'div',
      { key: 1, style: { background: "#3a3a3e", padding: "5px 15px 5px 15px" } },
      scene.guides.entrySeq().map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            guideID = _ref3[0],
            guide = _ref3[1];

        return _react2.default.createElement(
          'div',
          { key: guideID },
          _react2.default.createElement('input', { type: 'checkbox', checked: 'true', readOnly: true }),
          guide.type,
          guide.properties.entrySeq().map(function (_ref4) {
            var _ref5 = _slicedToArray(_ref4, 2),
                key = _ref5[0],
                value = _ref5[1];

            return _react2.default.createElement(
              'span',
              { key: key },
              ' [',
              key,
              ':',
              value,
              '] '
            );
          })
        );
      })
    ),
    _react2.default.createElement(
      'a',
      { href: 'javascript:;', style: STYLE_ADD_WRAPPER, key: 'add',
        onClick: function onClick() {
          return alert('Sorry, but this feature is not supported yet');
        } },
      _react2.default.createElement(_plus2.default, null),
      _react2.default.createElement(
        'span',
        { style: STYLE_ADD_LABEL },
        'New Guide'
      )
    )
  );
}

PanelGuides.propTypes = {
  state: _propTypes2.default.object.isRequired
};

PanelGuides.contextTypes = {};