'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _export = require('./export');

var _export2 = require('../utils/export');

var _immutable = require('immutable');

var _constants = require('../constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Item = function () {
  function Item() {
    _classCallCheck(this, Item);
  }

  _createClass(Item, null, [{
    key: 'create',
    value: function create(state, layerID, type, x, y, width, height, rotation) {
      var itemID = _export2.IDBroker.acquireID();

      var item = state.catalog.factoryElement(type, {
        id: itemID,
        name: _export2.NameGenerator.generateName('items', state.catalog.getIn(['elements', type, 'info', 'title'])),
        type: type,
        height: height,
        width: width,
        x: x,
        y: y,
        rotation: rotation
      });

      state = state.setIn(['scene', 'layers', layerID, 'items', itemID], item);

      return { updatedState: state, item: item };
    }
  }, {
    key: 'select',
    value: function select(state, layerID, itemID) {
      state = _export.Layer.select(state, layerID).updatedState;
      state = _export.Layer.selectElement(state, layerID, 'items', itemID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'remove',
    value: function remove(state, layerID, itemID) {
      state = this.unselect(state, layerID, itemID).updatedState;
      state = _export.Layer.removeElement(state, layerID, 'items', itemID).updatedState;

      state.getIn(['scene', 'groups']).forEach(function (group) {
        return state = _export.Group.removeElement(state, group.id, layerID, 'items', itemID).updatedState;
      });

      return { updatedState: state };
    }
  }, {
    key: 'unselect',
    value: function unselect(state, layerID, itemID) {
      state = _export.Layer.unselect(state, layerID, 'items', itemID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'selectToolDrawingItem',
    value: function selectToolDrawingItem(state, sceneComponentType) {
      state = state.merge({
        mode: _constants.MODE_DRAWING_ITEM,
        drawingSupport: new _immutable.Map({
          type: sceneComponentType
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateDrawingItem',
    value: function updateDrawingItem(state, layerID, x, y) {
      if (state.hasIn(['drawingSupport', 'currentID'])) {
        state = state.updateIn(['scene', 'layers', layerID, 'items', state.getIn(['drawingSupport', 'currentID'])], function (item) {
          return item.merge({ x: x, y: y });
        });
      } else {
        var _create = this.create(state, layerID, state.getIn(['drawingSupport', 'type']), x, y, 200, 100, 0),
            stateI = _create.updatedState,
            item = _create.item;

        state = Item.select(stateI, layerID, item.id).updatedState;
        state = state.setIn(['drawingSupport', 'currentID'], item.id);
      }

      return { updatedState: state };
    }
  }, {
    key: 'endDrawingItem',
    value: function endDrawingItem(state, layerID, x, y) {
      var catalog = state.catalog;
      state = this.updateDrawingItem(state, layerID, x, y, catalog).updatedState;
      state = _export.Layer.unselectAll(state, layerID).updatedState;
      state = state.merge({
        drawingSupport: (0, _immutable.Map)({
          type: state.drawingSupport.get('type')
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'beginDraggingItem',
    value: function beginDraggingItem(state, layerID, itemID, x, y) {

      var item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

      state = state.merge({
        mode: _constants.MODE_DRAGGING_ITEM,
        draggingSupport: (0, _immutable.Map)({
          layerID: layerID,
          itemID: itemID,
          startPointX: x,
          startPointY: y,
          originalX: item.x,
          originalY: item.y
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateDraggingItem',
    value: function updateDraggingItem(state, x, y) {
      var _state = state,
          draggingSupport = _state.draggingSupport,
          scene = _state.scene;


      var layerID = draggingSupport.get('layerID');
      var itemID = draggingSupport.get('itemID');
      var startPointX = draggingSupport.get('startPointX');
      var startPointY = draggingSupport.get('startPointY');
      var originalX = draggingSupport.get('originalX');
      var originalY = draggingSupport.get('originalY');

      var diffX = startPointX - x;
      var diffY = startPointY - y;

      var item = scene.getIn(['layers', layerID, 'items', itemID]);
      item = item.merge({
        x: originalX - diffX,
        y: originalY - diffY
      });

      state = state.merge({
        scene: scene.mergeIn(['layers', layerID, 'items', itemID], item)
      });

      return { updatedState: state };
    }
  }, {
    key: 'endDraggingItem',
    value: function endDraggingItem(state, x, y) {
      state = this.updateDraggingItem(state, x, y).updatedState;
      state = state.merge({ mode: _constants.MODE_IDLE });

      return { updatedState: state };
    }
  }, {
    key: 'beginRotatingItem',
    value: function beginRotatingItem(state, layerID, itemID, x, y) {
      state = state.merge({
        mode: _constants.MODE_ROTATING_ITEM,
        rotatingSupport: (0, _immutable.Map)({
          layerID: layerID,
          itemID: itemID
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateRotatingItem',
    value: function updateRotatingItem(state, x, y) {
      var _state2 = state,
          rotatingSupport = _state2.rotatingSupport,
          scene = _state2.scene;


      var layerID = rotatingSupport.get('layerID');
      var itemID = rotatingSupport.get('itemID');
      var item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

      var deltaX = x - item.x;
      var deltaY = y - item.y;
      var rotation = Math.atan2(deltaY, deltaX) * 180 / Math.PI - 90;

      if (-5 < rotation && rotation < 5) rotation = 0;
      if (-95 < rotation && rotation < -85) rotation = -90;
      if (-185 < rotation && rotation < -175) rotation = -180;
      if (85 < rotation && rotation < 90) rotation = 90;
      if (-270 < rotation && rotation < -265) rotation = 90;

      item = item.merge({
        rotation: rotation
      });

      state = state.merge({
        scene: scene.mergeIn(['layers', layerID, 'items', itemID], item)
      });

      return { updatedState: state };
    }
  }, {
    key: 'endRotatingItem',
    value: function endRotatingItem(state, x, y) {
      state = this.updateRotatingItem(state, x, y).updatedState;
      state = state.merge({ mode: _constants.MODE_IDLE });

      return { updatedState: state };
    }
  }, {
    key: 'setProperties',
    value: function setProperties(state, layerID, itemID, properties) {
      state = state.mergeIn(['scene', 'layers', layerID, 'items', itemID, 'properties'], properties);

      return { updatedState: state };
    }
  }, {
    key: 'setJsProperties',
    value: function setJsProperties(state, layerID, itemID, properties) {
      return this.setProperties(state, layerID, itemID, (0, _immutable.fromJS)(properties));
    }
  }, {
    key: 'updateProperties',
    value: function updateProperties(state, layerID, itemID, properties) {
      properties.forEach(function (v, k) {
        if (state.hasIn(['scene', 'layers', layerID, 'items', itemID, 'properties', k])) state = state.mergeIn(['scene', 'layers', layerID, 'items', itemID, 'properties', k], v);
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateJsProperties',
    value: function updateJsProperties(state, layerID, itemID, properties) {
      return this.updateProperties(state, layerID, itemID, (0, _immutable.fromJS)(properties));
    }
  }, {
    key: 'setAttributes',
    value: function setAttributes(state, layerID, itemID, itemAttributes) {
      state = state.mergeIn(['scene', 'layers', layerID, 'items', itemID], itemAttributes);
      return { updatedState: state };
    }
  }, {
    key: 'setJsAttributes',
    value: function setJsAttributes(state, layerID, itemID, itemAttributes) {
      itemAttributes = (0, _immutable.fromJS)(itemAttributes);
      return this.setAttributes(state, layerID, itemID, itemAttributes);
    }
  }]);

  return Item;
}();

exports.default = Item;