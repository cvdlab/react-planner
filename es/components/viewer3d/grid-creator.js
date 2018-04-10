import * as Three from 'three';
import { HELVETIKER } from './libs/helvetiker_regular.typeface.js';
import guideHorizontalStreak from './guides/guide-horizontal-streak';
import guideVerticalStreak from './guides/guide-vertical-streak';

export default function createGrid(scene) {

  var grid = new Three.Object3D();
  grid.name = 'grid';
  var fontLoader = new Three.FontLoader();
  var font = fontLoader.parse(HELVETIKER); // For measures
  var guides = scene.guides,
      width = scene.width,
      height = scene.height;


  guides.forEach(function (guide) {
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