var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import IconAdd from 'react-icons/lib/ti/plus';

var STYLE_ADD_WRAPPER = {
  display: "block",
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
  padding: "0px 15px",
  borderTop: "1px solid black"
};

var STYLE_ADD_LABEL = {
  fontSize: "10px",
  marginLeft: "5px"
};

export default function PanelGuides(_ref) {
  var _ref$state = _ref.state,
      scene = _ref$state.scene,
      mode = _ref$state.mode;

  return React.createElement(
    Panel,
    { name: 'Guides' },
    React.createElement(
      'div',
      { key: 1, style: { background: "#3a3a3e", padding: "5px 15px 5px 15px" } },
      scene.guides.entrySeq().map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            guideID = _ref3[0],
            guide = _ref3[1];

        return React.createElement(
          'div',
          { key: guideID },
          React.createElement('input', { type: 'checkbox', checked: 'true', readOnly: true }),
          guide.type,
          guide.properties.entrySeq().map(function (_ref4) {
            var _ref5 = _slicedToArray(_ref4, 2),
                key = _ref5[0],
                value = _ref5[1];

            return React.createElement(
              'span',
              { key: key },
              ' [',
              key,
              ':',
              value,
              '] '
            );
          })
        );
      })
    ),
    React.createElement(
      'a',
      { href: 'javascript:;', style: STYLE_ADD_WRAPPER, key: 'add',
        onClick: function onClick() {
          return alert('Sorry, but this feature is not supported yet');
        } },
      React.createElement(IconAdd, null),
      React.createElement(
        'span',
        { style: STYLE_ADD_LABEL },
        'New Guide'
      )
    )
  );
}

PanelGuides.propTypes = {
  state: PropTypes.object.isRequired
};

PanelGuides.contextTypes = {};