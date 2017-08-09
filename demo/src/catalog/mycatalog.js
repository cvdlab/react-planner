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

catalog.registerMultipleElements([
  windowCat,
  door,
  sashWindow,
  venetianBlindWindow,
  windowCurtain
]);

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

catalog.registerMultipleElements([
  blackboard,
  coatHook,
  cube,
  fireEstinguisher,
  image,
  radiator,
  recyclingBins,
  schoolDesk,
  schoolDeskDouble,
  simpleStair,
  sofa,
  teachingPost,
  trash,
  tv
]);

//categories
catalog.registerCategory('windows', 'Windows', [windowCat, sashWindow, venetianBlindWindow, windowCurtain] );

export default catalog;
