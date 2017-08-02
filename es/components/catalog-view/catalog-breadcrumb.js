import React from 'react';
import PropTypes from 'prop-types';
import Arrow from 'react-icons/lib/md/keyboard-arrow-right';

var CatalogBreadcrumb = function CatalogBreadcrumb(_ref) {
  var names = _ref.names;

  var labelNames = [];
  for (var i = 0; i < names.length - 1; i++) {

    var _cursor = 'default';
    if (names[i].hasOwnProperty('action')) {
      _cursor = 'pointer';
    }

    labelNames.push(React.createElement(
      'div',
      { key: i, style: { display: 'flex' } },
      React.createElement(
        'div',
        { style: { fontSize: '20px', cursor: _cursor },
          onClick: names[i].action },
        names[i].name
      ),
      React.createElement(
        'div',
        { style: { marginLeft: '10px', marginRight: '10px' } },
        React.createElement(Arrow, { style: { fill: '#000', fontSize: 24 } })
      )
    ));
  }

  var cursor = 'default';
  if (names[names.length - 1].hasOwnProperty('action')) {
    cursor = 'pointer';
  }

  labelNames.push(React.createElement(
    'div',
    { key: names.length - 1, style: { display: 'flex' } },
    React.createElement(
      'div',
      { style: { fontSize: '20px', cursor: cursor },
        onClick: names[names.length - 1].action },
      React.createElement(
        'b',
        null,
        names[names.length - 1].name
      )
    )
  ));

  return React.createElement(
    'div',
    { style: { margin: '50px', display: 'flex' } },
    labelNames
  );
};

CatalogBreadcrumb.propTypes = {
  names: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CatalogBreadcrumb;