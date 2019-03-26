'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _panel = require('./panel');

var _panel2 = _interopRequireDefault(_panel);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _reactTabs = require('react-tabs');

var _fa = require('react-icons/fa');

var _export = require('../../components/style/export');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tabStyle = { margin: '1em' };

var iconStyle = {
  fontSize: '14px',
  margin: '2px',
  cursor: 'pointer'
};

var addGuideStyle = {
  cursor: 'pointer',
  height: '2em'
};

var tableTabStyle = {
  width: '100%',
  textAlign: 'center'
};

var PanelGuides = function (_Component) {
  _inherits(PanelGuides, _Component);

  function PanelGuides(props, context) {
    _classCallCheck(this, PanelGuides);

    var _this = _possibleConstructorReturn(this, (PanelGuides.__proto__ || Object.getPrototypeOf(PanelGuides)).call(this, props, context));

    _this.state = {
      addHGVisible: true,
      addVGVisible: true,
      addCGVisible: true
    };
    return _this;
  }

  _createClass(PanelGuides, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state.addHGVisible !== nextState.addHGVisible || this.state.addVGVisible !== nextState.addVGVisible || this.state.addCGVisible !== nextState.addCGVisible || this.props.state.getIn(['scene', 'guides']).hashCode() !== nextProps.state.getIn(['scene', 'guides']).hashCode();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var state = this.props.state;
      var _context = this.context,
          projectActions = _context.projectActions,
          translator = _context.translator;
      var guides = state.scene.guides;


      return _react2.default.createElement(
        _panel2.default,
        { name: translator.t('Guides') },
        _react2.default.createElement(
          _reactTabs.Tabs,
          { id: 'guidesTabs', style: tabStyle },
          _react2.default.createElement(
            _reactTabs.TabList,
            null,
            _react2.default.createElement(
              _reactTabs.Tab,
              null,
              translator.t('Horizontal')
            ),
            _react2.default.createElement(
              _reactTabs.Tab,
              null,
              translator.t('Vertical')
            )
          ),
          _react2.default.createElement(
            _reactTabs.TabPanel,
            null,
            _react2.default.createElement(
              'table',
              { style: tableTabStyle },
              _react2.default.createElement(
                'tbody',
                null,
                guides.get('horizontal').entrySeq().map(function (_ref, ind) {
                  var _ref2 = _slicedToArray(_ref, 2),
                      hgKey = _ref2[0],
                      hgVal = _ref2[1];

                  return _react2.default.createElement(
                    'tr',
                    { key: hgKey },
                    _react2.default.createElement(
                      'td',
                      { style: { width: '2em' } },
                      ind + 1
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      hgVal
                    ),
                    _react2.default.createElement(
                      'td',
                      { style: { width: '5em' } },
                      _react2.default.createElement(_fa.FaTrash, {
                        style: iconStyle,
                        onClick: function onClick(e) {
                          return projectActions.removeHorizontalGuide(hgKey);
                        }
                      })
                    )
                  );
                }),
                this.state.addHGVisible ? _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    {
                      colSpan: '3',
                      style: addGuideStyle,
                      onClick: function onClick(e) {
                        return _this2.setState({ addHGVisible: false });
                      }
                    },
                    translator.t('+ Add Horizontal Giude')
                  )
                ) : _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    { colSpan: '2' },
                    _react2.default.createElement(_export.FormNumberInput, {
                      value: 0,
                      onChange: function onChange(e) {
                        projectActions.addHorizontalGuide(e.target.value);
                        return _this2.setState({ addHGVisible: true });
                      },
                      min: 0,
                      max: this.props.state.getIn(['scene', 'height'])
                    })
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(_fa.FaTimes, {
                      style: iconStyle,
                      onClick: function onClick(e) {
                        return _this2.setState({ addHGVisible: true });
                      }
                    })
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            _reactTabs.TabPanel,
            null,
            _react2.default.createElement(
              'table',
              { style: tableTabStyle },
              _react2.default.createElement(
                'tbody',
                null,
                guides.get('vertical').entrySeq().map(function (_ref3, ind) {
                  var _ref4 = _slicedToArray(_ref3, 2),
                      hgKey = _ref4[0],
                      hgVal = _ref4[1];

                  return _react2.default.createElement(
                    'tr',
                    { key: hgKey },
                    _react2.default.createElement(
                      'td',
                      { style: { width: '2em' } },
                      ind + 1
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      hgVal
                    ),
                    _react2.default.createElement(
                      'td',
                      { style: { width: '5em' } },
                      _react2.default.createElement(_fa.FaTrash, {
                        style: iconStyle,
                        onClick: function onClick(e) {
                          return projectActions.removeVerticalGuide(hgKey);
                        }
                      })
                    )
                  );
                }),
                this.state.addVGVisible ? _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    {
                      colSpan: '3',
                      style: addGuideStyle,
                      onClick: function onClick(e) {
                        return _this2.setState({ addVGVisible: false });
                      }
                    },
                    translator.t('+ Add Vertical Giude')
                  )
                ) : _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    { colSpan: '2' },
                    _react2.default.createElement(_export.FormNumberInput, {
                      value: 0,
                      onChange: function onChange(e) {
                        projectActions.addVerticalGuide(e.target.value);
                        return _this2.setState({ addVGVisible: true });
                      },
                      min: 0,
                      max: this.props.state.getIn(['scene', 'height'])
                    })
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(_fa.FaTimes, {
                      style: iconStyle,
                      onClick: function onClick(e) {
                        return _this2.setState({ addVGVisible: true });
                      }
                    })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return PanelGuides;
}(_react.Component);

exports.default = PanelGuides;


PanelGuides.propTypes = {
  state: _propTypes2.default.object.isRequired
};

PanelGuides.contextTypes = {
  translator: _propTypes2.default.object.isRequired,
  projectActions: _propTypes2.default.object.isRequired
};