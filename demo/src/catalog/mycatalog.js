import {Catalog} from '../../../src/index';

import area from './areas/area/area';
import door from './holes/door/door';
import windowCat from './holes/window/window';
import sashWindow from './holes/sash-window/sash-window';
import wall from './lines/wall/wall';
import item from './items/sofa/sofa';
import tv from './items/tv/tv';

let catalog = new Catalog();

catalog.registerElement(area);
catalog.registerElement(door);
catalog.registerElement(windowCat);
catalog.registerElement(sashWindow);
catalog.registerElement(wall);
catalog.registerElement(item);
catalog.registerElement(tv);

export default catalog;
