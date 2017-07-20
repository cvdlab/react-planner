var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import { MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE, MODE_ROTATING_ITEM } from '../../constants';

var typeId = { display: 'inline-block', top: '-.35em', position: 'relative', paddingLeft: '.25em' };
var typeIdSelected = _extends({}, typeId, { color: 'rgb(28, 166, 252)' });
var contentArea = { height: '100px', overflowY: 'auto', padding: '0.25em 1.15em', cursor: 'pointer' };

export default function PanelLayerElement(_ref, _ref2) {
  var _ref$state = _ref.state,
      scene = _ref$state.scene,
      mode = _ref$state.mode;
  var linesActions = _ref2.linesActions,
      holesActions = _ref2.holesActions,
      itemsActions = _ref2.itemsActions,
      translator = _ref2.translator;


  if (![MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_ROTATING_ITEM, MODE_UPLOADING_IMAGE, MODE_FITTING_IMAGE].includes(mode)) return null;

  var layer = scene.layers.get(scene.selectedLayer);

  return React.createElement(
    Panel,
    { name: translator.t('Elements on layer {0}', layer.name) },
    React.createElement(
      'div',
      { style: contentArea,
        onWheel: function onWheel(e) {
          return e.stopPropagation();
        } },
      layer.lines.entrySeq().map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            lineID = _ref4[0],
            line = _ref4[1];

        return React.createElement(
          'div',
          { key: lineID, onClick: function onClick(e) {
              return linesActions.selectLine(layer.id, line.id);
            } },
          React.createElement('input', { type: 'checkbox', checked: line.selected, readOnly: true }),
          React.createElement(
            'div',
            { style: line.selected ? typeIdSelected : typeId },
            line.type,
            ' ',
            line.name
          )
        );
      }),
      layer.holes.entrySeq().map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            holeID = _ref6[0],
            hole = _ref6[1];

        return React.createElement(
          'div',
          { key: holeID, onClick: function onClick(e) {
              return holesActions.selectHole(layer.id, hole.id);
            } },
          React.createElement('input', { type: 'checkbox', checked: hole.selected, readOnly: true }),
          React.createElement(
            'div',
            { style: hole.selected ? typeIdSelected : typeId },
            hole.type,
            ' ',
            hole.name
          )
        );
      }),
      layer.items.entrySeq().map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            itemID = _ref8[0],
            item = _ref8[1];

        return React.createElement(
          'div',
          { key: itemID, onClick: function onClick(e) {
              return itemsActions.selectItem(layer.id, item.id);
            } },
          React.createElement('input', { type: 'checkbox', checked: item.selected, readOnly: true }),
          React.createElement(
            'div',
            { style: item.selected ? typeIdSelected : typeId },
            item.type,
            ' ',
            item.name
          )
        );
      })
    )
  );
}

PanelLayerElement.propTypes = {
  state: PropTypes.object.isRequired
};

PanelLayerElement.contextTypes = {
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};