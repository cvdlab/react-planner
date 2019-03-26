var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import * as SharedStyle from '../../shared-style';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaPencil, FaTrash, FaTimes } from 'react-icons/fa';
import { FormNumberInput } from '../../components/style/export';

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


      return React.createElement(
        Panel,
        { name: translator.t('Guides') },
        React.createElement(
          Tabs,
          { id: 'guidesTabs', style: tabStyle },
          React.createElement(
            TabList,
            null,
            React.createElement(
              Tab,
              null,
              translator.t('Horizontal')
            ),
            React.createElement(
              Tab,
              null,
              translator.t('Vertical')
            )
          ),
          React.createElement(
            TabPanel,
            null,
            React.createElement(
              'table',
              { style: tableTabStyle },
              React.createElement(
                'tbody',
                null,
                guides.get('horizontal').entrySeq().map(function (_ref, ind) {
                  var _ref2 = _slicedToArray(_ref, 2),
                      hgKey = _ref2[0],
                      hgVal = _ref2[1];

                  return React.createElement(
                    'tr',
                    { key: hgKey },
                    React.createElement(
                      'td',
                      { style: { width: '2em' } },
                      ind + 1
                    ),
                    React.createElement(
                      'td',
                      null,
                      hgVal
                    ),
                    React.createElement(
                      'td',
                      { style: { width: '5em' } },
                      React.createElement(FaTrash, {
                        style: iconStyle,
                        onClick: function onClick(e) {
                          return projectActions.removeHorizontalGuide(hgKey);
                        }
                      })
                    )
                  );
                }),
                this.state.addHGVisible ? React.createElement(
                  'tr',
                  null,
                  React.createElement(
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
                ) : React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'td',
                    { colSpan: '2' },
                    React.createElement(FormNumberInput, {
                      value: 0,
                      onChange: function onChange(e) {
                        projectActions.addHorizontalGuide(e.target.value);
                        return _this2.setState({ addHGVisible: true });
                      },
                      min: 0,
                      max: this.props.state.getIn(['scene', 'height'])
                    })
                  ),
                  React.createElement(
                    'td',
                    null,
                    React.createElement(FaTimes, {
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
          React.createElement(
            TabPanel,
            null,
            React.createElement(
              'table',
              { style: tableTabStyle },
              React.createElement(
                'tbody',
                null,
                guides.get('vertical').entrySeq().map(function (_ref3, ind) {
                  var _ref4 = _slicedToArray(_ref3, 2),
                      hgKey = _ref4[0],
                      hgVal = _ref4[1];

                  return React.createElement(
                    'tr',
                    { key: hgKey },
                    React.createElement(
                      'td',
                      { style: { width: '2em' } },
                      ind + 1
                    ),
                    React.createElement(
                      'td',
                      null,
                      hgVal
                    ),
                    React.createElement(
                      'td',
                      { style: { width: '5em' } },
                      React.createElement(FaTrash, {
                        style: iconStyle,
                        onClick: function onClick(e) {
                          return projectActions.removeVerticalGuide(hgKey);
                        }
                      })
                    )
                  );
                }),
                this.state.addVGVisible ? React.createElement(
                  'tr',
                  null,
                  React.createElement(
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
                ) : React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'td',
                    { colSpan: '2' },
                    React.createElement(FormNumberInput, {
                      value: 0,
                      onChange: function onChange(e) {
                        projectActions.addVerticalGuide(e.target.value);
                        return _this2.setState({ addVGVisible: true });
                      },
                      min: 0,
                      max: this.props.state.getIn(['scene', 'height'])
                    })
                  ),
                  React.createElement(
                    'td',
                    null,
                    React.createElement(FaTimes, {
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
}(Component);

export default PanelGuides;


PanelGuides.propTypes = {
  state: PropTypes.object.isRequired
};

PanelGuides.contextTypes = {
  translator: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};