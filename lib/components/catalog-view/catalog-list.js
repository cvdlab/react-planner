'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _catalogItem = require('./catalog-item');

var _catalogItem2 = _interopRequireDefault(_catalogItem);

var _catalogBreadcrumb = require('./catalog-breadcrumb');

var _catalogBreadcrumb2 = _interopRequireDefault(_catalogBreadcrumb);

var _catalogPageItem = require('./catalog-page-item');

var _catalogPageItem2 = _interopRequireDefault(_catalogPageItem);

var _catalogTurnBackPageItem = require('./catalog-turn-back-page-item');

var _catalogTurnBackPageItem2 = _interopRequireDefault(_catalogTurnBackPageItem);

var _contentContainer = require('../style/content-container');

var _contentContainer2 = _interopRequireDefault(_contentContainer);

var _contentTitle = require('../style/content-title');

var _contentTitle2 = _interopRequireDefault(_contentTitle);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var containerStyle = {
  position: 'fixed',
  width: 'calc( 100% - 51px)',
  height: 'calc( 100% - 20px)',
  backgroundColor: '#FFF',
  padding: '1em',
  left: 50,
  overflowY: 'auto',
  overflowX: 'hidden',
  zIndex: 10
};

var itemsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(14em, 1fr))',
  gridGap: '10px',
  marginTop: '1em'
};

var searchContainer = {
  width: '100%',
  height: '3em',
  padding: '0.625em',
  background: '#f7f7f9',
  border: '1px solid #e1e1e8',
  cursor: 'pointer',
  position: 'relative',
  boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)',
  borderRadius: '2px',
  transition: 'all .2s ease-in-out',
  WebkitTransition: 'all .2s ease-in-out',
  marginBottom: '1em'
};

var searchText = {
  width: '8em',
  display: 'inline-block'
};

var searchInput = {
  width: 'calc( 100% - 10em )',
  height: '2em',
  margin: '0',
  padding: '0 1em',
  border: '1px solid #EEE'
};

var historyContainer = _extends({}, searchContainer, {
  padding: '0.2em 0.625em'
});

var historyElementStyle = {
  width: 'auto',
  height: '2em',
  lineHeight: '2em',
  textAlign: 'center',
  borderRadius: '1em',
  display: 'inline-block',
  cursor: 'pointer',
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  color: SharedStyle.PRIMARY_COLOR.text_main,
  textTransform: 'capitalize',
  margin: '0.25em',
  padding: '0 1em'
};

var CatalogList = function (_Component) {
  _inherits(CatalogList, _Component);

  function CatalogList(props, context) {
    _classCallCheck(this, CatalogList);

    var _this = _possibleConstructorReturn(this, (CatalogList.__proto__ || Object.getPrototypeOf(CatalogList)).call(this, props));

    var page = props.state.catalog.page;
    var currentCategory = context.catalog.getCategory(page);
    var categoriesToDisplay = currentCategory.categories;
    var elementsToDisplay = currentCategory.elements.filter(function (element) {
      return element.info.visibility ? element.info.visibility.catalog : true;
    });

    _this.state = {
      categories: currentCategory.categories,
      elements: elementsToDisplay,
      matchString: '',
      matchedElements: []
    };
    return _this;
  }

  _createClass(CatalogList, [{
    key: 'flattenCategories',
    value: function flattenCategories(categories) {
      var toRet = [];

      for (var x = 0; x < categories.length; x++) {
        var curr = categories[x];
        toRet = toRet.concat(curr.elements);
        if (curr.categories.length) toRet = toRet.concat(this.flattenCategories(curr.categories));
      }

      return toRet;
    }
  }, {
    key: 'matcharray',
    value: function matcharray(text) {

      var array = this.state.elements.concat(this.flattenCategories(this.state.categories));

      var filtered = [];

      if (text != '') {
        var regexp = new RegExp(text, 'i');
        for (var i = 0; i < array.length; i++) {
          if (regexp.test(array[i].info.title)) {
            filtered.push(array[i]);
          }
        }
      }

      this.setState({
        matchString: text,
        matchedElements: filtered
      });
    }
  }, {
    key: 'select',
    value: function select(element) {

      switch (element.prototype) {
        case 'lines':
          this.context.linesActions.selectToolDrawingLine(element.name);
          break;
        case 'items':
          this.context.itemsActions.selectToolDrawingItem(element.name);
          break;
        case 'holes':
          this.context.holesActions.selectToolDrawingHole(element.name);
          break;
      }

      this.context.projectActions.pushLastSelectedCatalogElementToHistory(element);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var page = this.props.state.catalog.page;
      var currentCategory = this.context.catalog.getCategory(page);
      var categoriesToDisplay = currentCategory.categories;
      var elementsToDisplay = currentCategory.elements.filter(function (element) {
        return element.info.visibility ? element.info.visibility.catalog : true;
      });

      var breadcrumbComponent = null;

      if (page !== 'root') {

        var breadcrumbsNames = [];

        this.props.state.catalog.path.forEach(function (pathName) {
          breadcrumbsNames.push({
            name: _this2.context.catalog.getCategory(pathName).label,
            action: function action() {
              return projectActions.goBackToCatalogPage(pathName);
            }
          });
        });

        breadcrumbsNames.push({ name: currentCategory.label, action: '' });

        breadcrumbComponent = _react2.default.createElement(_catalogBreadcrumb2.default, { names: breadcrumbsNames });
      }

      var pathSize = this.props.state.catalog.path.size;

      var turnBackButton = pathSize > 0 ? _react2.default.createElement(_catalogTurnBackPageItem2.default, { key: pathSize, page: this.context.catalog.categories[this.props.state.catalog.path.get(pathSize - 1)] }) : null;

      var selectedHistory = this.props.state.get('selectedElementsHistory');
      var selectedHistoryElements = selectedHistory.map(function (el, ind) {
        return _react2.default.createElement(
          'div',
          { key: ind, style: historyElementStyle, title: el.name, onClick: function onClick() {
              return _this2.select(el);
            } },
          el.name
        );
      });

      return _react2.default.createElement(
        _contentContainer2.default,
        { width: this.props.width, height: this.props.height, style: _extends({}, containerStyle, this.props.style) },
        _react2.default.createElement(
          _contentTitle2.default,
          null,
          this.context.translator.t('Catalog')
        ),
        breadcrumbComponent,
        _react2.default.createElement(
          'div',
          { style: searchContainer },
          _react2.default.createElement(
            'span',
            { style: searchText },
            this.context.translator.t('Search Element')
          ),
          _react2.default.createElement('input', { type: 'text', style: searchInput, onChange: function onChange(e) {
              _this2.matcharray(e.target.value);
            } })
        ),
        selectedHistory.size ? _react2.default.createElement(
          'div',
          { style: historyContainer },
          _react2.default.createElement(
            'span',
            null,
            this.context.translator.t('Last Selected')
          ),
          selectedHistoryElements
        ) : null,
        _react2.default.createElement(
          'div',
          { style: itemsStyle },
          this.state.matchString === '' ? [turnBackButton, categoriesToDisplay.map(function (cat) {
            return _react2.default.createElement(_catalogPageItem2.default, { key: cat.name, page: cat, oldPage: currentCategory });
          }), elementsToDisplay.map(function (elem) {
            return _react2.default.createElement(_catalogItem2.default, { key: elem.name, element: elem });
          })] : this.state.matchedElements.map(function (elem) {
            return _react2.default.createElement(_catalogItem2.default, { key: elem.name, element: elem });
          })
        )
      );
    }
  }]);

  return CatalogList;
}(_react.Component);

exports.default = CatalogList;


CatalogList.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  style: _propTypes2.default.object
};

CatalogList.contextTypes = {
  catalog: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  projectActions: _propTypes2.default.object.isRequired
};