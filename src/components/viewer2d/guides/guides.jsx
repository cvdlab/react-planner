import React from 'react';
import GuideHorizontalStreak from './guide-horizontal-streak';
import GuideVerticalStreak from './guide-vertical-streak';

export default function Guides({scene}) {

  let {width, height, guides} = scene;

  let renderedGuides = guides.entrySeq().map(([guideID, guide]) => {
    switch (guide.type) {
      case 'horizontal-streak':
        return (<GuideHorizontalStreak key={guideID} width={width} height={height} guide={guide}/>);

      case 'vertical-streak':
        return (<GuideVerticalStreak key={guideID} width={width} height={height} guide={guide}/>);

      default:
        console.warn(`guide ${guide.type} not allowed`);
    }
  }).toList();

  return (<g>{renderedGuides}</g>);
}

Guides.propTypes = {
  scene: React.PropTypes.object.isRequired
};
