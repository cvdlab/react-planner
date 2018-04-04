import * as Three from 'three';
import { HELVETIKER } from './libs/helvetiker_regular.typeface.js';
import guideHorizontalStreak from './guides/guide-horizontal-streak';
import guideVerticalStreak from './guides/guide-vertical-streak';

export default function createGrid(scene) {

  let grid = new Three.Object3D();
  let fontLoader = new Three.FontLoader();
  let font = fontLoader.parse(HELVETIKER); // For measures
  let { guides, width, height } = scene;

  guides.forEach(guide => {
    switch (guide.type) {
      case 'horizontal-streak':
        grid.add(guideHorizontalStreak(width, height, guide, font));
        break;
      case 'vertical-streak':
        grid.add(guideVerticalStreak(width, height, guide, font));
        break;
    }
  });

  grid.position.y = -1;
  return grid;
}
