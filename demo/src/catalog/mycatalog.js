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

//items
import blackboard from './items/blackboard/blackboard';
import coatHook from './items/coat-hook/coat-hook';
import cube from './items/cube/cube';
import fireEstinguisher from './items/fire-extinguisher/fire-extinguisher'
import image from './items/image/image';
import radiator from './items/radiator/radiator';
import recyclingBins from './items/recycling-bins/recycling-bins';
import schoolDesk from './items/school-desk/school-desk';
import schoolDeskDouble from './items/school-desk-double/school-desk-double';
import simpleStair from './items/simple-stair/simple-stair';
import sofa from './items/sofa/sofa';
import teachingPost from './items/teaching-post/teaching-post';
import trash from './items/trash/trash';
import tv from './items/tv/tv';

catalog.registerElement(blackboard);
catalog.registerElement(coatHook);
catalog.registerElement(cube);
catalog.registerElement(fireEstinguisher);
catalog.registerElement(image);
catalog.registerElement(radiator);
catalog.registerElement(recyclingBins);
catalog.registerElement(schoolDesk);
catalog.registerElement(schoolDeskDouble);
catalog.registerElement(simpleStair);
catalog.registerElement(sofa);
catalog.registerElement(teachingPost);
catalog.registerElement(trash);
catalog.registerElement(tv);

export default catalog;
