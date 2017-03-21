var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes, Component } from 'react';
import ContentTitle from '../style/content-title';
import ContentContainer from '../style/content-container';
import FormLabel from '../style/form-label';
import FormBlock from '../style/form-block';
import FormNumberInput from '../style/form-number-input';
import FormTextInput from '../style/form-text-input';
import FormSlider from '../style/form-slider';

import FormSubmitButton from '../style/form-submit-button';
import CancelButton from '../style/cancel-button';
import DeleteButton from '../style/delete-button';

var LayerConfigurator = function (_Component) {
  _inherits(LayerConfigurator, _Component);

  function LayerConfigurator(props, context) {
    _classCallCheck(this, LayerConfigurator);

    var _this = _possibleConstructorReturn(this, (LayerConfigurator.__proto__ || Object.getPrototypeOf(LayerConfigurator)).call(this, props, context));

    var state = props.state;
    var scene = state.scene;
    var layerID = scene.selectedLayer;
    var layer = scene.layers.get(layerID);

    _this.state = {
      layerID: scene.selectedLayer,
      dataName: layer.name,
      dataOpacity: layer.opacity,
      dataAltitude: layer.altitude,
      dataOrder: layer.order
    };
    return _this;
  }

  _createClass(LayerConfigurator, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var state = nextProps.state;
      var scene = state.scene;
      var layerID = scene.selectedLayer;

      if (layerID === this.props.layerID) return;

      var layer = scene.layers.get(layerID);

      this.setState({
        layerID: scene.selectedLayer,
        dataName: layer.name,
        dataOpacity: layer.opacity,
        dataAltitude: layer.altitude,
        dataOrder: layer.order
      });
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      event.preventDefault();

      var sceneActions = this.context.sceneActions;
      var _state = this.state,
          layerID = _state.layerID,
          dataName = _state.dataName,
          dataOpacity = _state.dataOpacity,
          dataAltitude = _state.dataAltitude,
          dataOrder = _state.dataOrder;

      dataName = dataName.trim();
      dataOpacity = parseFloat(dataOpacity);
      dataAltitude = parseInt(dataAltitude);
      dataOrder = parseFloat(dataOrder);

      if (dataName.length <= 0 || dataOpacity < 0 || dataOpacity > 1 || dataAltitude < 0 || dataOrder < 0) {
        alert('Configuration not valid');
      } else {
        sceneActions.setLayerProperties(layerID, {
          name: dataName,
          opacity: dataOpacity,
          altitude: dataAltitude,
          order: dataOrder
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          width = _props.width,
          height = _props.height;
      var _state2 = this.state,
          layerID = _state2.layerID,
          dataName = _state2.dataName,
          dataOpacity = _state2.dataOpacity,
          dataAltitude = _state2.dataAltitude,
          dataOrder = _state2.dataOrder;
      var _context = this.context,
          projectActions = _context.projectActions,
          sceneActions = _context.sceneActions,
          translator = _context.translator;


      return React.createElement(
        ContentContainer,
        { width: width, height: height },
        React.createElement(
          ContentTitle,
          null,
          translator.t("Layer config")
        ),
        React.createElement(
          'form',
          { onSubmit: function onSubmit(e) {
              return _this2.onSubmit(e);
            } },
          React.createElement(
            FormBlock,
            null,
            React.createElement(
              FormLabel,
              { htmlFor: 'name' },
              translator.t("name")
            ),
            React.createElement(FormTextInput, { id: 'name', placeholder: 'name', value: dataName,
              onChange: function onChange(e) {
                return _this2.setState({ dataName: e.target.value });
              } })
          ),
          React.createElement(
            FormBlock,
            null,
            React.createElement(
              FormLabel,
              { htmlFor: 'opacity' },
              translator.t("opacity")
            ),
            React.createElement(FormSlider, { min: 0, max: 100, value: Math.round(dataOpacity * 100),
              onChange: function onChange(e) {
                return _this2.setState({ dataOpacity: e.target.value / 100 });
              } })
          ),
          React.createElement(
            FormBlock,
            null,
            React.createElement(
              FormLabel,
              { htmlFor: 'altitude' },
              translator.t("altitude")
            ),
            React.createElement(FormNumberInput, { id: 'altitude', placeholder: 'altitude', value: dataAltitude,
              onChange: function onChange(e) {
                return _this2.setState({ dataAltitude: e.target.value });
              } })
          ),
          React.createElement(
            FormBlock,
            null,
            React.createElement(
              FormLabel,
              { htmlFor: 'order' },
              translator.t("order")
            ),
            React.createElement(FormNumberInput, { id: 'order', placeholder: 'order', value: dataOrder,
              onChange: function onChange(e) {
                return _this2.setState({ dataOrder: e.target.value });
              } })
          ),
          React.createElement(
            'table',
            { style: { float: 'right' } },
            React.createElement(
              'tbody',
              null,
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'td',
                  null,
                  React.createElement(
                    DeleteButton,
                    { size: 'large', onClick: function onClick(e) {
                        return sceneActions.removeLayer(layerID);
                      } },
                    translator.t("Delete")
                  )
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement(
                    CancelButton,
                    { size: 'large', onClick: function onClick(e) {
                        return projectActions.rollback();
                      } },
                    translator.t("Cancel")
                  ),
                  '              '
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement(
                    FormSubmitButton,
                    { size: 'large' },
                    translator.t("Save")
                  ),
                  '              '
                )
              )
            )
          )
        )
      );
    }
  }]);

  return LayerConfigurator;
}(Component);

export default LayerConfigurator;


LayerConfigurator.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};

LayerConfigurator.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  sceneActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};