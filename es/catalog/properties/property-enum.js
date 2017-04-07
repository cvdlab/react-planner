var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { PropTypes } from 'react';
import { Seq } from 'immutable';
import FormSelect from '../../components/style/form-select';
import FormLabel from '../../components/style/form-label';

var firstTdStyle = {
  width: '6em'
};

export default function PropertyEnum(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs;


  return React.createElement(
    'table',
    { className: 'PropertyLengthMeasure', style: { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" } },
    React.createElement(
      'tbody',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          { style: firstTdStyle },
          React.createElement(
            FormLabel,
            null,
            configs.label
          )
        ),
        React.createElement(
          'td',
          null,
          React.createElement(
            FormSelect,
            { value: value, onChange: function onChange(event) {
                return onUpdate(event.target.value);
              } },
            Seq(configs.values).entrySeq().map(function (_ref2) {
              var _ref3 = _slicedToArray(_ref2, 2),
                  key = _ref3[0],
                  value = _ref3[1];

              return React.createElement(
                'option',
                { key: key, value: key },
                value
              );
            })
          )
        )
      )
    )
  );
}

PropertyEnum.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};