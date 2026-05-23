import { Catalog } from "react-planner";

let catalog = new Catalog();

type GlobModules = Record<string, { default: any }>;

function toCatalog(glob: GlobModules): Record<string, any> {
  const out: Record<string, any> = {};
  for (const filePath in glob) {
    // e.g. './holes/sash-window/planner-element.tsx' -> dir 'sash-window' -> name 'sashWindow'
    const segments = filePath.split('/');
    const dir = segments[segments.length - 2];
    const name = dir.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    out[name] = glob[filePath].default;
  }
  return out;
}

const Areas = toCatalog(import.meta.glob('./areas/**/planner-element.tsx', { eager: true }) as GlobModules);
const Lines = toCatalog(import.meta.glob('./lines/**/planner-element.tsx', { eager: true }) as GlobModules);
const Holes = toCatalog(import.meta.glob('./holes/**/planner-element.tsx', { eager: true }) as GlobModules);
const Items = toCatalog(import.meta.glob('./items/**/planner-element.tsx', { eager: true }) as GlobModules);

for (let x in Areas) catalog.registerElement(Areas[x]);
for (let x in Lines) catalog.registerElement(Lines[x]);
for (let x in Holes) catalog.registerElement(Holes[x]);
for (let x in Items) catalog.registerElement(Items[x]);

catalog.registerCategory("windows", "Windows", [
  Holes.window,
  Holes.sashWindow,
  Holes.venetianBlindWindow,
  Holes.windowCurtain,
]);
catalog.registerCategory("doors", "Doors", [
  Holes.door,
  Holes.doorDouble,
  Holes.panicDoor,
  Holes.panicDoorDouble,
  Holes.slidingDoor,
]);

export default catalog;
