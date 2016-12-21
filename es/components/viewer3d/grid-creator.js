import * as Three from 'three';
import guideHorizontalStreak from './guides/guide-horizontal-streak';
import guideVerticalStreak from './guides/guide-vertical-streak';

export default function createGrid(scene) {

  var grid = new Three.Object3D();

  scene.guides.forEach(function (guide) {
    switch (guide.type) {
      case "horizontal-streak":
        grid.add(guideHorizontalStreak(scene.width, scene.height, guide));
        break;
      case 'vertical-streak':
        grid.add(guideVerticalStreak(scene.width, scene.height, guide));
        break;
    }
  });

  grid.position.y = -1;
  return grid;
}