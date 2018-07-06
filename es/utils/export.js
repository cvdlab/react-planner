import * as GeometryUtils from './geometry';
import * as GraphInnerCycles from './graph-inner-cycles';
import * as MathUtils from './math';
import * as SnapUtils from './snap';
import * as SnapSceneUtils from './snap-scene';
import * as history from './history';
import * as ObjectUtils from './objects-utils';
import IDBroker from './id-broker';
import NameGenerator from './name-generator';

export { GeometryUtils, GraphInnerCycles, MathUtils, SnapUtils, SnapSceneUtils, history, IDBroker, NameGenerator, ObjectUtils };

export default {
  GeometryUtils: GeometryUtils,
  GraphInnerCycles: GraphInnerCycles,
  MathUtils: MathUtils,
  SnapUtils: SnapUtils,
  SnapSceneUtils: SnapSceneUtils,
  history: history,
  IDBroker: IDBroker,
  NameGenerator: NameGenerator,
  ObjectUtils: ObjectUtils
};