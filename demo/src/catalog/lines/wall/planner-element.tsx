import {ElementsFactories} from 'react-planner';

import wallPng from './wall.png';
import textures_bricksJpg from './textures/bricks.jpg';
import textures_bricksNormalJpg from './textures/bricks-normal.jpg';
import textures_paintedJpg from './textures/painted.jpg';
import textures_paintedNormalJpg from './textures/painted-normal.jpg';
const info = {
  title: 'wall',
  tag: ['wall'],
  description: 'Wall with bricks or painted',
  image: wallPng,
  visibility: {
    catalog: true,
    layerElementsVisible: true
  }
};

const textures = {
  bricks: {
    name: 'Bricks',
    uri: textures_bricksJpg,
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
    normal: {
      uri: textures_bricksNormalJpg,
      lengthRepeatScale: 0.01,
      heightRepeatScale: 0.01,
      normalScaleX: 0.8,
      normalScaleY: 0.8
    }
  },
  painted: {
    name:'Painted',
    uri: textures_paintedJpg,
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
    normal: {
      uri: textures_paintedNormalJpg,
      lengthRepeatScale: 0.01,
      heightRepeatScale: 0.01,
      normalScaleX: 0.4,
      normalScaleY: 0.4
    }
  },
};

export default ElementsFactories.WallFactory('wall', info, textures);

