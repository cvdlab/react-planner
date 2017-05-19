var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React from 'react';
import PropTypes from 'prop-types';
import CatalogItem from './catalog-item';
import { Seq } from 'immutable';
import ContentContainer from '../style/content-container';
import ContentTitle from '../style/content-title';

var STYLE_ITEMS = {
  display: "flex",
  flexFlow: "row wrap"
};

export default function CatalogList(_ref, _ref2) {
  var width = _ref.width,
      height = _ref.height,
      state = _ref.state;
  var catalog = _ref2.catalog,
      translator = _ref2.translator;

  return React.createElement(
    ContentContainer,
    { width: width, height: height },
    React.createElement(
      ContentTitle,
      null,
      translator.t('Catalog')
    ),
    React.createElement(
      'div',
      { style: STYLE_ITEMS },
      Seq(catalog.elements).entrySeq().filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            name = _ref4[0],
            element = _ref4[1];

        return element.prototype !== 'areas';
      }).map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            name = _ref6[0],
            element = _ref6[1];

        return React.createElement(CatalogItem, { key: name, element: element });
      })
    )
  );
}

CatalogList.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};

CatalogList.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};