'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _contentTitle = require('../style/content-title');

var _contentTitle2 = _interopRequireDefault(_contentTitle);

var _contentContainer = require('../style/content-container');

var _contentContainer2 = _interopRequireDefault(_contentContainer);

var _formLabel = require('../style/form-label');

var _formLabel2 = _interopRequireDefault(_formLabel);

var _formBlock = require('../style/form-block');

var _formBlock2 = _interopRequireDefault(_formBlock);

var _formNumberInput = require('../style/form-number-input');

var _formNumberInput2 = _interopRequireDefault(_formNumberInput);

var _formTextInput = require('../style/form-text-input');

var _formTextInput2 = _interopRequireDefault(_formTextInput);

var _formSlider = require('../style/form-slider');

var _formSlider2 = _interopRequireDefault(_formSlider);

var _formSubmitButton = require('../style/form-submit-button');

var _formSubmitButton2 = _interopRequireDefault(_formSubmitButton);

var _cancelButton = require('../style/cancel-button');

var _cancelButton2 = _interopRequireDefault(_cancelButton);

var _deleteButton = require('../style/delete-button');

var _deleteButton2 = _interopRequireDefault(_deleteButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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


      return _react2.default.createElement(
        _contentContainer2.default,
        { width: width, height: height },
        _react2.default.createElement(
          _contentTitle2.default,
          null,
          translator.t("Layer config")
        ),
        _react2.default.createElement(
          'form',
          { onSubmit: function onSubmit(e) {
              return _this2.onSubmit(e);
            } },
          _react2.default.createElement(
            _formBlock2.default,
            null,
            _react2.default.createElement(
              _formLabel2.default,
              { htmlFor: 'name' },
              translator.t("name")
            ),
            _react2.default.createElement(_formTextInput2.default, { id: 'name', placeholder: 'name', value: dataName,
              onChange: function onChange(e) {
                return _this2.setState({ dataName: e.target.value });
              } })
          ),
          _react2.default.createElement(
            _formBlock2.default,
            null,
            _react2.default.createElement(
              _formLabel2.default,
              { htmlFor: 'opacity' },
              translator.t("opacity")
            ),
            _react2.default.createElement(_formSlider2.default, { min: 0, max: 100, value: Math.round(dataOpacity * 100),
              onChange: function onChange(e) {
                return _this2.setState({ dataOpacity: e.target.value / 100 });
              } })
          ),
          _react2.default.createElement(
            _formBlock2.default,
            null,
            _react2.default.createElement(
              _formLabel2.default,
              { htmlFor: 'altitude' },
              translator.t("altitude")
            ),
            _react2.default.createElement(_formNumberInput2.default, { id: 'altitude', placeholder: 'altitude', value: dataAltitude,
              onChange: function onChange(e) {
                return _this2.setState({ dataAltitude: e.target.value });
              } })
          ),
          _react2.default.createElement(
            _formBlock2.default,
            null,
            _react2.default.createElement(
              _formLabel2.default,
              { htmlFor: 'order' },
              translator.t("order")
            ),
            _react2.default.createElement(_formNumberInput2.default, { id: 'order', placeholder: 'order', value: dataOrder,
              onChange: function onChange(e) {
                return _this2.setState({ dataOrder: e.target.value });
              } })
          ),
          _react2.default.createElement(
            'table',
            { style: { float: 'right' } },
            _react2.default.createElement(
              'tbody',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    _deleteButton2.default,
                    { size: 'large', onClick: function onClick(e) {
                        return sceneActions.removeLayer(layerID);
                      } },
                    translator.t("Delete")
                  )
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    _cancelButton2.default,
                    { size: 'large', onClick: function onClick(e) {
                        return projectActions.rollback();
                      } },
                    translator.t("Cancel")
                  ),
                  '              '
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    _formSubmitButton2.default,
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
}(_react.Component);

exports.default = LayerConfigurator;


LayerConfigurator.propTypes = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  state: _react.PropTypes.object.isRequired
};

LayerConfigurator.contextTypes = {
  projectActions: _react.PropTypes.object.isRequired,
  sceneActions: _react.PropTypes.object.isRequired,
  translator: _react.PropTypes.object.isRequired
};