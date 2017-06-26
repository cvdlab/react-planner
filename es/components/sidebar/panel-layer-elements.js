var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import { MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE, MODE_ROTATING_ITEM } from '../../constants';

var typeId = { display: 'inline-block', top: '-.3em', position: 'relative', paddingLeft: '.25em' };

export default function PanelLayerElement(_ref, _ref2) {
  var _ref$state = _ref.state,
      scene = _ref$state.scene,
      mode = _ref$state.mode;
  var editingActions = _ref2.editingActions,
      translator = _ref2.translator;


  if (![MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_ROTATING_ITEM, MODE_UPLOADING_IMAGE, MODE_FITTING_IMAGE].includes(mode)) return null;

  var layer = scene.layers.get(scene.selectedLayer);

  var renderTrackHorizontal = function renderTrackHorizontal(_ref3) {
    var style = _ref3.style,
        props = _objectWithoutProperties(_ref3, ['style']);

    return React.createElement('div', _extends({}, props, { style: _extends({}, style, { backgroundColor: 'blue' }) }));
  };

  return React.createElement(
    Panel,
    { name: translator.t("Elements on layer {0}", layer.name) },
    React.createElement(
      'div',
      { key: 1, style: { background: "#3a3a3e" } },
      React.createElement(
        'div',
        { style: { height: "100px", overflowY: "auto", padding: '0.25em 1.15em', cursor: 'pointer' },
          onWheel: function onWheel(e) {
            return e.stopPropagation();
          } },
        layer.lines.entrySeq().map(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              lineID = _ref5[0],
              line = _ref5[1];

          return React.createElement(
            'div',
            { key: lineID, onClick: function onClick(e) {
                return editingActions.selectLine(layer.id, line.id);
              } },
            React.createElement('input', { type: 'checkbox', checked: line.selected, readOnly: true }),
            React.createElement(
              'div',
              { style: typeId },
              line.type,
              ' ',
              line.id
            )
          );
        }),
        layer.holes.entrySeq().map(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
              holeID = _ref7[0],
              hole = _ref7[1];

          return React.createElement(
            'div',
            { key: holeID, onClick: function onClick(e) {
                return editingActions.selectHole(layer.id, hole.id);
              } },
            React.createElement('input', { type: 'checkbox', checked: hole.selected, readOnly: true }),
            React.createElement(
              'div',
              { style: typeId },
              hole.type,
              ' ',
              hole.id
            )
          );
        }),
        layer.items.entrySeq().map(function (_ref8) {
          var _ref9 = _slicedToArray(_ref8, 2),
              itemID = _ref9[0],
              item = _ref9[1];

          return React.createElement(
            'div',
            { key: itemID, onClick: function onClick(e) {
                return editingActions.selectItem(layer.id, item.id);
              } },
            React.createElement('input', { type: 'checkbox', checked: item.selected, readOnly: true }),
            React.createElement(
              'div',
              { style: typeId },
              item.type,
              ' ',
              item.id
            )
          );
        })
      )
    )
  );
}

PanelLayerElement.propTypes = {
  state: PropTypes.object.isRequired
};

PanelLayerElement.contextTypes = {
  sceneActions: PropTypes.object.isRequired,
  editingActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};