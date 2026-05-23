import {ElementsFactories} from 'react-planner';

import textures_parquetJpg from './textures/parquet.jpg';
import textures_tile1Jpg from './textures/tile1.jpg';
import textures_ceramicTileJpg from './textures/ceramic-tile.jpg';
import textures_strandPorcelainJpg from './textures/strand-porcelain.jpg';
import textures_grassJpg from './textures/grass.jpg';
let info = {
  title: 'area',
  tag: ['area'],
  description: 'Generic Room',
  image: ''
};

let textures = {
  parquet: {
    name: 'Parquet',
    uri: textures_parquetJpg,
    lengthRepeatScale: 0.004,
    heightRepeatScale: 0.004,
  },
  tile1: {
    name: 'Tile1',
    uri: textures_tile1Jpg,
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
  },
  ceramic: {
    name:'Ceramic Tile',
    uri: textures_ceramicTileJpg,
    lengthRepeatScale: 0.02,
    heightRepeatScale: 0.02
  },
  strand_porcelain: {
    name:'Strand Porcelain Tile',
    uri: textures_strandPorcelainJpg,
    lengthRepeatScale: 0.02,
    heightRepeatScale: 0.02
  },
  grass: {
    name: 'Grass',
    uri: textures_grassJpg,
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
  }
};

export default ElementsFactories.AreaFactory('area', info, textures);
