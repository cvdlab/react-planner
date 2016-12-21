var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PropTypes, Component } from 'react';
import { Map, Seq, Iterable, fromJS } from 'immutable';
import FormSubmitButton from '../../style/form-submit-button';
import CancelButton from '../../style/cancel-button';
import DeleteButton from '../../style/delete-button';
import Button from '../../style/button';

var PropertiesEditor = function (_Component) {
  _inherits(PropertiesEditor, _Component);

  function PropertiesEditor(props, context) {
    _classCallCheck(this, PropertiesEditor);

    var _this = _possibleConstructorReturn(this, (PropertiesEditor.__proto__ || Object.getPrototypeOf(PropertiesEditor)).call(this, props, context));

    _this.state = { formData: _this.calculateInitialFormData() };
    return _this;
  }

  _createClass(PropertiesEditor, [{
    key: 'calculateInitialFormData',
    value: function calculateInitialFormData() {
      var element = this.props.element;
      var catalog = this.context.catalog;

      var catalogElement = catalog.getElement(element.type);

      return new Map(catalogElement.properties).map(function (configs, propertyName) {
        var currentValue = element.properties.has(propertyName) ? element.properties.get(propertyName) : fromJS(configs.defaultValue);

        return new Map({
          currentValue: currentValue,
          configs: configs
        });
      });
    }
  }, {
    key: 'updateProperty',
    value: function updateProperty(propertyName, value) {
      var formData = this.state.formData;

      formData = formData.setIn([propertyName, 'currentValue'], value);
      this.setState({ formData: formData });
    }
  }, {
    key: 'reset',
    value: function reset() {
      var state = this.calculateInitialFormData();
      this.setState({ formData: this.calculateInitialFormData() });
    }
  }, {
    key: 'save',
    value: function save(event) {
      event.preventDefault();
      var formData = this.state.formData,
          projectActions = this.context.projectActions;

      var properties = formData.map(function (data) {
        return data.get('currentValue');
      });
      projectActions.setProperties(properties);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var formData = this.state.formData,
          _context = this.context,
          projectActions = _context.projectActions,
          catalog = _context.catalog,
          translator = _context.translator,
          appState = this.props.state;


      var renderInputElement = function renderInputElement(inputElement, propertyName, value, configs) {
        var _catalog$propertyType = catalog.propertyTypes[inputElement],
            Viewer = _catalog$propertyType.Viewer,
            Editor = _catalog$propertyType.Editor;


        return React.createElement(Editor, {
          key: propertyName,
          propertyName: propertyName,
          value: value,
          configs: configs,
          onUpdate: function onUpdate(value) {
            return _this2.updateProperty(propertyName, value);
          },
          state: appState
        });
      };

      return React.createElement(
        'form',
        { onSubmit: function onSubmit(e) {
            return _this2.save(e);
          } },
        formData.entrySeq().map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              propertyName = _ref2[0],
              data = _ref2[1];

          var currentValue = data.get('currentValue'),
              configs = data.get('configs');

          var _catalog$getPropertyT = catalog.getPropertyType(configs.type),
              Viewer = _catalog$getPropertyT.Viewer,
              Editor = _catalog$getPropertyT.Editor;

          return React.createElement(Editor, {
            key: propertyName,
            propertyName: propertyName,
            value: currentValue,
            configs: configs,
            onUpdate: function onUpdate(value) {
              return _this2.updateProperty(propertyName, value);
            },
            state: appState
          });
        }),
        React.createElement(
          'div',
          { style: { textAlign: "right" } },
          React.createElement(
            'div',
            { style: { marginRight: "3px", display: "inline-block" } },
            React.createElement(
              Button,
              { size: 'small', onClick: function onClick(e) {
                  return projectActions.unselectAll();
                } },
              translator.t("Unselect")
            )
          ),
          React.createElement(
            'div',
            { style: { marginRight: "3px", display: "inline-block" } },
            React.createElement(
              DeleteButton,
              { size: 'small', onClick: function onClick(e) {
                  return projectActions.remove();
                } },
              translator.t("Delete")
            )
          ),
          React.createElement(
            'div',
            { style: { marginRight: "3px", display: "inline-block" } },
            React.createElement(
              CancelButton,
              { size: 'small', onClick: function onClick(e) {
                  return _this2.reset();
                } },
              translator.t("Reset")
            )
          ),
          React.createElement(
            FormSubmitButton,
            { size: 'small' },
            translator.t("Save")
          )
        )
      );
    }
  }]);

  return PropertiesEditor;
}(Component);

export default PropertiesEditor;


PropertiesEditor.propTypes = {
  state: PropTypes.object.isRequired,
  element: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired
};

PropertiesEditor.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};