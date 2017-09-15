'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _formSubmitButton = require('../../style/form-submit-button');

var _formSubmitButton2 = _interopRequireDefault(_formSubmitButton);

var _cancelButton = require('../../style/cancel-button');

var _cancelButton2 = _interopRequireDefault(_cancelButton);

var _deleteButton = require('../../style/delete-button');

var _deleteButton2 = _interopRequireDefault(_deleteButton);

var _attributesEditor = require('./attributes-editor/attributes-editor');

var _attributesEditor2 = _interopRequireDefault(_attributesEditor);

var _geometry = require('../../../utils/geometry.js');

var geometry = _interopRequireWildcard(_geometry);

var _math = require('../../../utils/math.js');

var math = _interopRequireWildcard(_math);

var _sharedStyle = require('../../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _convertUnits = require('convert-units');

var _convertUnits2 = _interopRequireDefault(_convertUnits);

var _contentCopy = require('react-icons/lib/md/content-copy');

var _contentCopy2 = _interopRequireDefault(_contentCopy);

var _contentPaste = require('react-icons/lib/md/content-paste');

var _contentPaste2 = _interopRequireDefault(_contentPaste);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tableStyle = {
  marginTop: '10px',
  marginRight: '0px',
  marginLeft: 'auto'
};

var attrPorpSeparatorStyle = {
  margin: '0.5em 0.25em 0.5em 0',
  border: '2px solid ' + SharedStyle.SECONDARY_COLOR.alt,
  position: 'relative',
  height: '2.5em',
  borderRadius: '2px'
};

var headActionStyle = {
  position: 'absolute',
  right: '0.5em',
  top: '0.5em'
};

var iconHeadStyle = {
  float: 'right',
  margin: '-3px 4px 0px 0px',
  padding: 0,
  cursor: 'pointer',
  fontSize: '1.4em'
};

var ElementEditor = function (_Component) {
  _inherits(ElementEditor, _Component);

  function ElementEditor(props, context) {
    _classCallCheck(this, ElementEditor);

    var _this = _possibleConstructorReturn(this, (ElementEditor.__proto__ || Object.getPrototypeOf(ElementEditor)).call(this, props, context));

    _this.state = {
      attributesFormData: _this.initAttrData(_this.props.element, _this.props.layer, _this.props.state),
      propertiesFormData: _this.initPropData(_this.props.element, _this.props.layer, _this.props.state)
    };

    _this.updateAttribute = _this.updateAttribute.bind(_this);
    return _this;
  }

  _createClass(ElementEditor, [{
    key: 'initAttrData',
    value: function initAttrData(element, layer, state) {

      element = _typeof(element.misc) === 'object' ? element.set('misc', new _immutable.Map(element.misc)) : element;

      switch (element.prototype) {
        case 'items':
          {
            return new _immutable.Map({
              x: element.x,
              y: element.y,
              rotation: math.toFixedFloat(element.rotation, 2)
            });
          }
        case 'lines':
          {
            var v_a = layer.vertices.get(element.vertices.get(0));
            var v_b = layer.vertices.get(element.vertices.get(1));

            var distance = geometry.pointsDistance(v_a.x, v_a.y, v_b.x, v_b.y);
            var _unit = element.misc.get('_unitLength') || this.context.catalog.unit;
            var _length = (0, _convertUnits2.default)(distance).from(this.context.catalog.unit).to(_unit);

            return new _immutable.Map({
              vertexOne: v_a,
              vertexTwo: v_b,
              lineLength: new _immutable.Map({ length: distance, _length: _length, _unit: _unit })
            });
          }
        case 'holes':
          {
            var line = layer.lines.get(element.line);

            var _layer$vertices$get = layer.vertices.get(line.vertices.get(0)),
                x0 = _layer$vertices$get.x,
                y0 = _layer$vertices$get.y;

            var _layer$vertices$get2 = layer.vertices.get(line.vertices.get(1)),
                x1 = _layer$vertices$get2.x,
                y1 = _layer$vertices$get2.y;

            var lineLength = geometry.pointsDistance(x0, y0, x1, y1);
            var startAt = lineLength * element.offset - element.properties.get('width').get('length') / 2;

            var _unitA = element.misc.get('_unitA') || this.context.catalog.unit;
            var _lengthA = (0, _convertUnits2.default)(startAt).from(this.context.catalog.unit).to(_unitA);

            var endAt = lineLength - lineLength * element.offset - element.properties.get('width').get('length') / 2;
            var _unitB = element.misc.get('_unitB') || this.context.catalog.unit;
            var _lengthB = (0, _convertUnits2.default)(endAt).from(this.context.catalog.unit).to(_unitB);

            return new _immutable.Map({
              offset: element.offset,
              offsetA: new _immutable.Map({
                length: math.toFixedFloat(startAt, 2),
                _length: math.toFixedFloat(_lengthA, 2),
                _unit: _unitA
              }),
              offsetB: new _immutable.Map({
                length: math.toFixedFloat(endAt, 2),
                _length: math.toFixedFloat(_lengthB, 2),
                _unit: _unitB
              })
            });
          }
        case 'areas':
          {
            return new _immutable.Map({});
          }
        default:
          return null;
      }
    }
  }, {
    key: 'initPropData',
    value: function initPropData(element, layer, state) {
      var catalog = this.context.catalog;

      var catalogElement = catalog.getElement(element.type);

      var mapped = {};
      for (var name in catalogElement.properties) {
        mapped[name] = new _immutable.Map({
          currentValue: element.properties.has(name) ? element.properties.get(name) : (0, _immutable.fromJS)(catalogElement.properties[name].defaultValue),
          configs: catalogElement.properties[name]
        });
      }

      return new _immutable.Map(mapped);
    }
  }, {
    key: 'updateAttribute',
    value: function updateAttribute(attributeName, value) {
      var _this2 = this;

      var attributesFormData = this.state.attributesFormData;


      switch (this.props.element.prototype) {
        case 'items':
          {
            attributesFormData = attributesFormData.set(attributeName, value);
            break;
          }
        case 'lines':
          {
            switch (attributeName) {
              case 'lineLength':
                {
                  var v_0 = attributesFormData.get('vertexOne');
                  var v_1 = attributesFormData.get('vertexTwo');

                  var _geometry$orderVertic = geometry.orderVertices([v_0, v_1]),
                      _geometry$orderVertic2 = _slicedToArray(_geometry$orderVertic, 2),
                      v_a = _geometry$orderVertic2[0],
                      v_b = _geometry$orderVertic2[1];

                  var v_b_new = geometry.extendLine(v_a.x, v_a.y, v_b.x, v_b.y, value.get('length'), 2);

                  attributesFormData = attributesFormData.withMutations(function (attr) {
                    attr.set(v_0 === v_a ? 'vertexTwo' : 'vertexOne', v_b.merge(v_b_new));
                    attr.set('lineLength', value);
                  });
                  break;
                }
              case 'vertexOne':
              case 'vertexTwo':
                {
                  attributesFormData = attributesFormData.withMutations(function (attr) {
                    attr.set(attributeName, attr.get(attributeName).merge(value));

                    var newDistance = geometry.verticesDistance(attr.get('vertexOne'), attr.get('vertexTwo'));

                    attr.mergeIn(['lineLength'], attr.get('lineLength').merge({
                      'length': newDistance,
                      '_length': (0, _convertUnits2.default)(newDistance).from(_this2.context.catalog.unit).to(attr.get('lineLength').get('_unit'))
                    }));
                  });
                  break;
                }
              default:
                {
                  attributesFormData = attributesFormData.set(attributeName, value);
                  break;
                }
            }
            break;
          }
        case 'holes':
          {
            switch (attributeName) {
              case 'offsetA':
                {
                  var offset = void 0;
                  var line = this.props.layer.lines.get(this.props.element.line);

                  var orderedVertices = geometry.orderVertices([this.props.layer.vertices.get(line.vertices.get(0)), this.props.layer.vertices.get(line.vertices.get(1))]);

                  var _orderedVertices$ = orderedVertices[0],
                      x0 = _orderedVertices$.x,
                      y0 = _orderedVertices$.y;
                  var _orderedVertices$2 = orderedVertices[1],
                      x1 = _orderedVertices$2.x,
                      y1 = _orderedVertices$2.y;


                  var alpha = Math.atan2(y1 - y0, x1 - x0);
                  var lineLength = geometry.pointsDistance(x0, y0, x1, y1);

                  var lengthValue = value.get('length');
                  lengthValue = Math.max(lengthValue, 0);
                  lengthValue = Math.min(lengthValue, lineLength - this.props.element.properties.get('width').get('length'));

                  var xp = (lengthValue + this.props.element.properties.get('width').get('length') / 2) * Math.cos(alpha) + x0;
                  var yp = (lengthValue + this.props.element.properties.get('width').get('length') / 2) * Math.sin(alpha) + y0;

                  offset = geometry.pointPositionOnLineSegment(x0, y0, x1, y1, xp, yp);

                  var endAt = math.toFixedFloat(lineLength - lineLength * offset - this.props.element.properties.get('width').get('length') / 2, 2);

                  var offsetB = new _immutable.Map({
                    length: endAt,
                    _length: (0, _convertUnits2.default)(endAt).from(this.context.catalog.unit).to(attributesFormData.get('offsetB').get('_unit')),
                    _unit: attributesFormData.get('offsetB').get('_unit')
                  });

                  attributesFormData = attributesFormData.set('offsetB', offsetB).set('offset', offset);

                  var offsetAttribute = new _immutable.Map({
                    length: math.toFixedFloat(lengthValue, 2),
                    _unit: value.get('_unit'),
                    _length: math.toFixedFloat((0, _convertUnits2.default)(lengthValue).from(this.context.catalog.unit).to(value.get('_unit')), 2)
                  });

                  attributesFormData = attributesFormData.set(attributeName, offsetAttribute);

                  break;
                }
              case 'offsetB':
                {
                  var _offset = void 0;
                  var _line = this.props.layer.lines.get(this.props.element.line);

                  var _orderedVertices = geometry.orderVertices([this.props.layer.vertices.get(_line.vertices.get(0)), this.props.layer.vertices.get(_line.vertices.get(1))]);

                  var _orderedVertices$3 = _orderedVertices[0],
                      _x = _orderedVertices$3.x,
                      _y = _orderedVertices$3.y;
                  var _orderedVertices$4 = _orderedVertices[1],
                      _x2 = _orderedVertices$4.x,
                      _y2 = _orderedVertices$4.y;


                  var _alpha = Math.atan2(_y2 - _y, _x2 - _x);
                  var _lineLength = geometry.pointsDistance(_x, _y, _x2, _y2);

                  var _lengthValue = value.get('length');
                  _lengthValue = Math.max(_lengthValue, 0);
                  _lengthValue = Math.min(_lengthValue, _lineLength - this.props.element.properties.get('width').get('length'));

                  var _xp = _x2 - (_lengthValue + this.props.element.properties.get('width').get('length') / 2) * Math.cos(_alpha);
                  var _yp = _y2 - (_lengthValue + this.props.element.properties.get('width').get('length') / 2) * Math.sin(_alpha);

                  _offset = geometry.pointPositionOnLineSegment(_x, _y, _x2, _y2, _xp, _yp);

                  var startAt = math.toFixedFloat(_lineLength * _offset - this.props.element.properties.get('width').get('length') / 2, 2);

                  var offsetA = new _immutable.Map({
                    length: startAt,
                    _length: (0, _convertUnits2.default)(startAt).from(this.context.catalog.unit).to(attributesFormData.get('offsetA').get('_unit')),
                    _unit: attributesFormData.get('offsetA').get('_unit')
                  });

                  attributesFormData = attributesFormData.set('offsetA', offsetA).set('offset', _offset);

                  var _offsetAttribute = new _immutable.Map({
                    length: math.toFixedFloat(_lengthValue, 2),
                    _unit: value.get('_unit'),
                    _length: math.toFixedFloat((0, _convertUnits2.default)(_lengthValue).from(this.context.catalog.unit).to(value.get('_unit')), 2)
                  });

                  attributesFormData = attributesFormData.set(attributeName, _offsetAttribute);

                  break;
                }
              default:
                {
                  attributesFormData = attributesFormData.set(attributeName, value);
                  break;
                }
            };
            break;
          }
        default:
          break;
      }

      this.setState({ attributesFormData: attributesFormData });
    }
  }, {
    key: 'updateProperty',
    value: function updateProperty(propertyName, value) {
      var propertiesFormData = this.state.propertiesFormData;

      propertiesFormData = propertiesFormData.setIn([propertyName, 'currentValue'], value);
      this.setState({ propertiesFormData: propertiesFormData });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.setState({ propertiesFormData: this.initPropData(this.props.element, this.props.layer, this.props.state) });
    }
  }, {
    key: 'save',
    value: function save(event) {
      event.preventDefault();
      var _state = this.state,
          propertiesFormData = _state.propertiesFormData,
          attributesFormData = _state.attributesFormData,
          projectActions = this.context.projectActions;


      var properties = propertiesFormData.map(function (data) {
        return data.get('currentValue');
      });

      projectActions.setProperties(properties);
      switch (this.props.element.prototype) {
        case 'items':
          {
            projectActions.setItemsAttributes(attributesFormData);
            break;
          }
        case 'lines':
          {
            projectActions.setLinesAttributes(attributesFormData);
            break;
          }
        case 'holes':
          {
            projectActions.setHolesAttributes(attributesFormData);
            break;
          }
      }
    }
  }, {
    key: 'copyProperties',
    value: function copyProperties(properties) {
      this.context.projectActions.copyProperties(properties);
    }
  }, {
    key: 'pasteProperties',
    value: function pasteProperties() {
      this.context.projectActions.pasteProperties();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state2 = this.state,
          propertiesFormData = _state2.propertiesFormData,
          attributesFormData = _state2.attributesFormData,
          _context = this.context,
          projectActions = _context.projectActions,
          catalog = _context.catalog,
          translator = _context.translator,
          _props = this.props,
          appState = _props.state,
          element = _props.element;


      return _react2.default.createElement(
        'form',
        { onSubmit: function onSubmit(e) {
            return _this3.save(e);
          } },
        _react2.default.createElement(_attributesEditor2.default, { element: element,
          onUpdate: this.updateAttribute,
          attributeFormData: attributesFormData,
          state: appState }),
        _react2.default.createElement(
          'div',
          { style: attrPorpSeparatorStyle },
          _react2.default.createElement(
            'div',
            { style: headActionStyle },
            _react2.default.createElement(
              'div',
              { title: translator.t('Copy'), style: iconHeadStyle, onClick: function onClick(e) {
                  return _this3.copyProperties(element.properties);
                } },
              _react2.default.createElement(_contentCopy2.default, null)
            ),
            appState.get('clipboardProperties') ? _react2.default.createElement(
              'div',
              { title: translator.t('Paste'), style: iconHeadStyle, onClick: function onClick(e) {
                  return _this3.pasteProperties();
                } },
              _react2.default.createElement(_contentPaste2.default, null)
            ) : null
          )
        ),
        propertiesFormData.entrySeq().map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              propertyName = _ref2[0],
              data = _ref2[1];

          var currentValue = data.get('currentValue'),
              configs = data.get('configs');

          var _catalog$getPropertyT = catalog.getPropertyType(configs.type),
              Editor = _catalog$getPropertyT.Editor;

          return _react2.default.createElement(Editor, {
            key: propertyName,
            propertyName: propertyName,
            value: currentValue,
            configs: configs,
            onUpdate: function onUpdate(value) {
              return _this3.updateProperty(propertyName, value);
            },
            state: appState,
            sourceElement: element,
            internalState: _this3.state
          });
        }),
        _react2.default.createElement(
          'table',
          { style: tableStyle },
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
                  { size: 'small', onClick: function onClick(e) {
                      return projectActions.remove();
                    } },
                  translator.t('Delete')
                )
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                  _cancelButton2.default,
                  { size: 'small', onClick: function onClick(e) {
                      return _this3.reset();
                    } },
                  translator.t('Reset')
                )
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                  _formSubmitButton2.default,
                  { size: 'small' },
                  translator.t('Save')
                )
              )
            )
          )
        )
      );
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        attributesFormData: this.initAttrData(nextProps.element, nextProps.layer, nextProps.state),
        propertiesFormData: this.initPropData(nextProps.element, nextProps.layer, nextProps.state)
      });
    }
  }]);

  return ElementEditor;
}(_react.Component);

exports.default = ElementEditor;


ElementEditor.propTypes = {
  state: _propTypes2.default.object.isRequired,
  element: _propTypes2.default.object.isRequired,
  layer: _propTypes2.default.object.isRequired
};

ElementEditor.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};