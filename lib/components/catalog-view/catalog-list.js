'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = CatalogList;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONTAINER_STYLE = {
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

var STYLE_ITEMS = {
  display: 'flex',
  flexFlow: 'row wrap'
};

function CatalogList(_ref, _ref2) {
  var width = _ref.width,
      height = _ref.height,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      state = _ref.state;
  var catalog = _ref2.catalog,
      translator = _ref2.translator,
      projectActions = _ref2.projectActions;


  var page = state.catalog.page;
  var currentCategory = catalog.getCategory(page);
  var categoriesToDisplay = currentCategory.categories;
  var elementsToDisplay = currentCategory.elements;

  var breadcrumbComponent = null;

  if (page !== 'root') {

    var breadcrumbsNames = [];

    state.catalog.path.forEach(function (pathName) {
      breadcrumbsNames.push({
        name: catalog.getCategory(pathName).label,
        action: function action() {
          return projectActions.goBackToCatalogPage(pathName);
        }
      });
    });

    breadcrumbsNames.push({ name: currentCategory.label, action: '' });

    breadcrumbComponent = _react2.default.createElement(_catalogBreadcrumb2.default, { names: breadcrumbsNames });
  }

  var pathSize = state.catalog.path.size;

  var turnBackButton = pathSize > 0 ? _react2.default.createElement(_catalogTurnBackPageItem2.default, { page: catalog.categories[state.catalog.path.get(pathSize - 1)] }) : null;

  return _react2.default.createElement(
    _contentContainer2.default,
    { width: width, height: height, style: _extends({}, CONTAINER_STYLE, style) },
    _react2.default.createElement(
      _contentTitle2.default,
      null,
      translator.t('Catalog')
    ),
    breadcrumbComponent,
    _react2.default.createElement(
      'div',
      { style: STYLE_ITEMS },
      turnBackButton,
      categoriesToDisplay.map(function (category) {
        return _react2.default.createElement(_catalogPageItem2.default, { key: category.name, page: category,
          oldPage: currentCategory });
      }),
      elementsToDisplay.filter(function (element) {
        return element.prototype !== 'areas';
      }).map(function (element) {
        return _react2.default.createElement(_catalogItem2.default, { key: element.name, element: element });
      })
    )
  );
}

CatalogList.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  style: _propTypes2.default.object
};

CatalogList.contextTypes = {
  catalog: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired,
  projectActions: _propTypes2.default.object.isRequired
};