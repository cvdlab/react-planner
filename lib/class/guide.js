'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircularGuide = exports.VerticalGuide = exports.HorizontalGuide = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _export = require('../utils/export');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HorizontalGuide = function () {
  function HorizontalGuide() {
    _classCallCheck(this, HorizontalGuide);
  }

  _createClass(HorizontalGuide, null, [{
    key: 'create',
    value: function create(state, coordinate) {
      var hGuideID = _export.IDBroker.acquireID();
      state = state.setIn(['scene', 'guides', 'horizontal', hGuideID], coordinate);

      return { updatedState: state };
    }
  }, {
    key: 'remove',
    value: function remove(state, hGuideID) {
      state = state.deleteIn(['scene', 'guides', 'horizontal', hGuideID]);

      return { updatedState: state };
    }
  }]);

  return HorizontalGuide;
}();

;

var VerticalGuide = function () {
  function VerticalGuide() {
    _classCallCheck(this, VerticalGuide);
  }

  _createClass(VerticalGuide, null, [{
    key: 'create',
    value: function create(state, coordinate) {
      var vGuideID = _export.IDBroker.acquireID();
      state = state.setIn(['scene', 'guides', 'vertical', vGuideID], coordinate);

      return { updatedState: state };
    }
  }, {
    key: 'remove',
    value: function remove(state, vGuideID) {
      state = state.deleteIn(['scene', 'guides', 'vertical', vGuideID]);

      return { updatedState: state };
    }
  }]);

  return VerticalGuide;
}();

;

var CircularGuide = function CircularGuide() {
  _classCallCheck(this, CircularGuide);
};

;

exports.HorizontalGuide = HorizontalGuide;
exports.VerticalGuide = VerticalGuide;
exports.CircularGuide = CircularGuide;
exports.default = {
  HorizontalGuide: HorizontalGuide,
  VerticalGuide: VerticalGuide,
  CircularGuide: CircularGuide
};