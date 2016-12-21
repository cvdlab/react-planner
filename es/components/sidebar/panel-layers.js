var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { PropTypes } from 'react';
import Panel from './panel';
import IconVisible from 'react-icons/lib/fa/eye';
import IconHide from 'react-icons/lib/fa/eye-slash';
import IconAdd from 'react-icons/lib/ti/plus';
import IconEdit from 'react-icons/lib/fa/pencil';

var STYLE_LAYER_WRAPPER = {
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  background: "#3A3A3E",
  borderBottom: "1px solid #000",
  height: "30px",
  padding: "5px 15px 5px 15px"
};

var STYLE_LAYER_ACTIVE = _extends({}, STYLE_LAYER_WRAPPER, {
  background: "#415375"
});

var STYLE_ICON = {
  width: "10%",
  fontSize: "18px"
};

var STYLE_NAME = {
  width: "90%",
  verticalAlign: "center",
  padding: "0 5px"
};

var STYLE_ADD_WRAPPER = {
  display: "block",
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
  padding: "0px 15px"
};

var STYLE_ADD_LABEL = {
  fontSize: "10px",
  marginLeft: "5px"
};

var STYLE_EDIT_BUTTON = {
  cursor: "pointer",
  marginLeft: "5px",
  border: "0px",
  background: "none",
  color: "#fff",
  fontSize: "14px",
  outline: "0px"
};

export default function PanelLayers(_ref, _ref2) {
  var _ref$state = _ref.state,
      scene = _ref$state.scene,
      mode = _ref$state.mode;
  var sceneActions = _ref2.sceneActions,
      translator = _ref2.translator;


  var addClick = function addClick(event) {
    sceneActions.addLayer();
    event.stopPropagation();
  };

  return React.createElement(
    Panel,
    { name: translator.t("Layers") },
    scene.layers.entrySeq().map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          layerID = _ref4[0],
          layer = _ref4[1];

      var isCurrentLayer = layerID === scene.selectedLayer;
      var style = isCurrentLayer ? STYLE_LAYER_ACTIVE : STYLE_LAYER_WRAPPER;
      var icon = layer.visible || layerID === scene.selectedLayer ? React.createElement(IconVisible, null) : React.createElement(IconHide, { style: { color: "#a5a1a1" } });

      var selectClick = function selectClick(event) {
        return sceneActions.selectLayer(layerID);
      };
      var configureClick = function configureClick(event) {
        return sceneActions.openLayerConfigurator(layer.id);
      };

      var swapVisibility = function swapVisibility(event) {
        sceneActions.setLayerProperties(layerID, { visible: !layer.visible });
        event.stopPropagation();
      };

      var iconRendered = isCurrentLayer ? React.createElement('div', { style: STYLE_ICON }) : React.createElement(
        'div',
        { style: STYLE_ICON, onClick: swapVisibility },
        icon
      );

      return React.createElement(
        'div',
        { style: style, key: layerID, onClick: selectClick, onDoubleClick: configureClick },
        iconRendered,
        React.createElement(
          'div',
          { style: STYLE_NAME },
          layer.name,
          ' [h:',
          layer.altitude,
          ']',
          React.createElement(
            'button',
            { onClick: configureClick, style: STYLE_EDIT_BUTTON, title: translator.t("Configure layer")
            },
            React.createElement(IconEdit, null)
          )
        )
      );
    }),
    React.createElement(
      'a',
      { href: 'javascript:;', style: STYLE_ADD_WRAPPER, key: 'add', onClick: addClick },
      React.createElement(IconAdd, null),
      React.createElement(
        'span',
        { style: STYLE_ADD_LABEL },
        translator.t("New layer")
      )
    )
  );
}

PanelLayers.propTypes = {
  state: PropTypes.object.isRequired
};

PanelLayers.contextTypes = {
  sceneActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};