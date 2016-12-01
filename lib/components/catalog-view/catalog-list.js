'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = CatalogList;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _catalogItem = require('./catalog-item');

var _catalogItem2 = _interopRequireDefault(_catalogItem);

var _immutable = require('immutable');

var _contentContainer = require('../style/content-container');

var _contentContainer2 = _interopRequireDefault(_contentContainer);

var _contentTitle = require('../style/content-title');

var _contentTitle2 = _interopRequireDefault(_contentTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE_ITEMS = {
  display: "flex",
  flexFlow: "row wrap"
};

function CatalogList(_ref, _ref2) {
  var width = _ref.width,
      height = _ref.height,
      state = _ref.state;
  var catalog = _ref2.catalog;

  return _react2.default.createElement(
    _contentContainer2.default,
    { width: width, height: height },
    _react2.default.createElement(
      _contentTitle2.default,
      null,
      'Layer config'
    ),
    _react2.default.createElement(
      'div',
      { style: STYLE_ITEMS },
      (0, _immutable.Seq)(catalog.elements).entrySeq().filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            name = _ref4[0],
            element = _ref4[1];

        return element.prototype !== 'areas';
      }).map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            name = _ref6[0],
            element = _ref6[1];

        return _react2.default.createElement(_catalogItem2.default, { key: name, element: element });
      })
    )
  );
}

CatalogList.propTypes = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  state: _react.PropTypes.object.isRequired
};

CatalogList.contextTypes = {
  catalog: _react.PropTypes.object.isRequired
};