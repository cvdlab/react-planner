import {Catalog} from 'react-planner';

let catalog = new Catalog();

//areas
import area from './areas/area/area';
catalog.registerElement(area);

//lines
import wall from './lines/wall/wall';
catalog.registerElement(wall);

//holes
import door from './holes/door/door';
import windowCat from './holes/window/window';
import sashWindow from './holes/sash-window/sash-window';
import venetianBlindWindow from './holes/venetian-blind-window/venetian-blind-window';
import windowCurtain from './holes/window-curtain/window-curtain';
catalog.registerElement(windowCat);
catalog.registerElement(door);
catalog.registerElement(sashWindow);
catalog.registerElement(venetianBlindWindow);
catalog.registerElement(windowCurtain);


import item from './items/sofa/sofa';
import tv from './items/tv/tv';
import image from './items/image/image';
import simpleStair from './items/simple-stair/simple-stair';
import cube from './items/cube/cube';




catalog.registerElement(item);
catalog.registerElement(tv);
catalog.registerElement(image);
catalog.registerElement(simpleStair);
catalog.registerElement(cube);

export default catalog;
