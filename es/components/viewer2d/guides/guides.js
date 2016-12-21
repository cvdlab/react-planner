var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React from 'react';
import GuideHorizontalStreak from './guide-horizontal-streak';
import GuideVerticalStreak from './guide-vertical-streak';

export default function Guides(_ref) {
  var scene = _ref.scene;
  var width = scene.width,
      height = scene.height,
      guides = scene.guides;


  var renderedGuides = guides.entrySeq().map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        guideID = _ref3[0],
        guide = _ref3[1];

    switch (guide.type) {
      case 'horizontal-streak':
        return React.createElement(GuideHorizontalStreak, { key: guideID, width: width, height: height, guide: guide });

      case 'vertical-streak':
        return React.createElement(GuideVerticalStreak, { key: guideID, width: width, height: height, guide: guide });

      default:
        console.warn('guide ' + guide.type + ' not allowed');
    }
  }).toList();

  return React.createElement(
    'g',
    null,
    renderedGuides
  );
}

Guides.propTypes = {
  scene: React.PropTypes.object.isRequired
};