var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContentTitle, ContentContainer, FormLabel, FormBlock, FormNumberInput, FormSubmitButton, CancelButton } from '../style/export';

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
      var _context = this.context,
          projectActions = _context.projectActions,
          translator = _context.translator;


      return React.createElement(
        ContentContainer,
        { width: width, height: height },
        React.createElement(
          ContentTitle,
          null,
          translator.t('Project config')
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
              { htmlFor: 'width' },
              translator.t('width')
            ),
            React.createElement(FormNumberInput, {
              id: 'width',
              placeholder: 'width',
              value: dataWidth,
              onChange: function onChange(e) {
                return _this2.setState({ dataWidth: e.target.value });
              }
            })
          ),
          React.createElement(
            FormBlock,
            null,
            React.createElement(
              FormLabel,
              { htmlFor: 'height' },
              translator.t('height')
            ),
            React.createElement(FormNumberInput, {
              id: 'height',
              placeholder: 'height',
              value: dataHeight,
              onChange: function onChange(e) {
                return _this2.setState({ dataHeight: e.target.value });
              }
            })
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
                    CancelButton,
                    { size: 'large',
                      onClick: function onClick(e) {
                        return projectActions.rollback();
                      } },
                    translator.t('Cancel')
                  )
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement(
                    FormSubmitButton,
                    { size: 'large' },
                    translator.t('Save')
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return ProjectConfigurator;
}(Component);

export default ProjectConfigurator;


ProjectConfigurator.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};

ProjectConfigurator.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};