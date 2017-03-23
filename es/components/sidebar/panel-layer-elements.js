var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { PropTypes } from 'react';
import Panel from './panel';
import { MODE_VIEWING_CATALOG, MODE_CONFIGURING_PROJECT, MODE_CONFIGURING_LAYER } from '../../constants';

export default function PanelLayerElement(_ref, _ref2) {
  var _ref$state = _ref.state,
      scene = _ref$state.scene,
      mode = _ref$state.mode;
  var editingActions = _ref2.editingActions,
      translator = _ref2.translator;


  if ([MODE_VIEWING_CATALOG, MODE_CONFIGURING_PROJECT, MODE_CONFIGURING_LAYER].includes(mode)) return null;

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
      { key: 1, style: { background: "#3a3a3e", padding: "5px 15px 5px 15px" } },
      React.createElement(
        'div',
        { style: { height: "100px", overflowY: "auto" }, onWheel: function onWheel(e) {
            return e.stopPropagation();
          } },
        layer.lines.entrySeq().map(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              lineID = _ref5[0],
              line = _ref5[1];

          return React.createElement(
            'div',
            { key: lineID, style: { cursor: "pointer" },
              onClick: function onClick(event) {
                return editingActions.selectLine(layer.id, line.id);
              } },
            React.createElement('input', { type: 'checkbox', checked: line.selected, readOnly: true }),
            line.type,
            ' ',
            line.id
          );
        }),
        layer.holes.entrySeq().map(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
              holeID = _ref7[0],
              hole = _ref7[1];

          return React.createElement(
            'div',
            { key: holeID, style: { cursor: "pointer" },
              onClick: function onClick(event) {
                return editingActions.selectHole(layer.id, hole.id);
              } },
            React.createElement('input', { type: 'checkbox', checked: hole.selected, readOnly: true }),
            hole.type,
            ' ',
            hole.id
          );
        }),
        layer.items.entrySeq().map(function (_ref8) {
          var _ref9 = _slicedToArray(_ref8, 2),
              itemID = _ref9[0],
              item = _ref9[1];

          return React.createElement(
            'div',
            { key: itemID, style: { cursor: "pointer" },
              onClick: function onClick(event) {
                return editingActions.selectItem(layer.id, item.id);
              } },
            React.createElement('input', { type: 'checkbox', checked: item.selected, readOnly: true }),
            item.type,
            ' ',
            item.id
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