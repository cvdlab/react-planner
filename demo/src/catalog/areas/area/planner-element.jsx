import {ElementsFactories} from 'react-planner';

let info = {
  title: "area",
  tag: ['area'],
  group: "Horizontal Closure",
  description: "Generic Room",
  image: ""
};

let textures = {
  parquet: {
    name: 'Parquet',
    uri: require('./textures/parquet.jpg'),
    lengthRepeatScale: 0.004,
    heightRepeatScale: 0.004,
  },
  tile1: {
    name: 'Tile1',
    uri: require('./textures/tile1.jpg'),
    lengthRepeatScale: 0.01,
    heightRepeatScale: 0.01,
  },
};

export default ElementsFactories.AreaFactory("area", info, textures);
