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

var _formSubmitButton = require('../style/form-submit-button');

var _formSubmitButton2 = _interopRequireDefault(_formSubmitButton);

var _cancelButton = require('../style/cancel-button');

var _cancelButton2 = _interopRequireDefault(_cancelButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectConfigurator = function (_Component) {
  _inherits(ProjectConfigurator, _Component);

  function ProjectConfigurator(props, context) {
    _classCallCheck(this, ProjectConfigurator);

    var _this = _possibleConstructorReturn(this, (ProjectConfigurator.__proto__ || Object.getPrototypeOf(ProjectConfigurator)).call(this, props, context));

    var scene = props.state.scene;

    _this.state = {
      dataWidth: scene.width,
      dataHeight: scene.height
    };
    return _this;
  }

  _createClass(ProjectConfigurator, [{
    key: 'onSubmit',
    value: function onSubmit(event) {
      event.preventDefault();

      var projectActions = this.context.projectActions;
      var _state = this.state,
          dataWidth = _state.dataWidth,
          dataHeight = _state.dataHeight;

      dataWidth = parseInt(dataWidth);
      dataHeight = parseInt(dataHeight);
      if (dataWidth <= 100 || dataHeight <= 100) {
        alert('Scene size too small');
      } else {
        projectActions.setProjectProperties({ width: dataWidth, height: dataHeight });
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
          dataWidth = _state2.dataWidth,
          dataHeight = _state2.dataHeight;
      var projectActions = this.context.projectActions;


      return _react2.default.createElement(
        _contentContainer2.default,
        { width: width, height: height },
        _react2.default.createElement(
          _contentTitle2.default,
          null,
          'Project config'
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
              { htmlFor: 'width' },
              'width'
            ),
            _react2.default.createElement(_formNumberInput2.default, { id: 'width', placeholder: 'width', value: dataWidth,
              onChange: function onChange(e) {
                return _this2.setState({ dataWidth: e.target.value });
              } })
          ),
          _react2.default.createElement(
            _formBlock2.default,
            null,
            _react2.default.createElement(
              _formLabel2.default,
              { htmlFor: 'height' },
              'height'
            ),
            _react2.default.createElement(_formNumberInput2.default, { id: 'height', placeholder: 'height', value: dataHeight,
              onChange: function onChange(e) {
                return _this2.setState({ dataHeight: e.target.value });
              } })
          ),
          _react2.default.createElement(
            'div',
            { style: { textAlign: "right" } },
            _react2.default.createElement(
              'div',
              { style: { marginRight: "3px", display: "inline-block" } },
              _react2.default.createElement(
                _cancelButton2.default,
                { size: 'large', onClick: function onClick(e) {
                    return projectActions.rollback();
                  } },
                'Cancel'
              )
            ),
            _react2.default.createElement(
              _formSubmitButton2.default,
              { size: 'large' },
              'Save'
            )
          )
        )
      );
    }
  }]);

  return ProjectConfigurator;
}(_react.Component);

exports.default = ProjectConfigurator;


ProjectConfigurator.propTypes = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  state: _react.PropTypes.object.isRequired
};

ProjectConfigurator.contextTypes = {
  projectActions: _react.PropTypes.object.isRequired
};