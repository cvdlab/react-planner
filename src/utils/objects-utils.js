export function objectsMap(object, func){
  let mappedObject = {};
  for (let key in object) {
    mappedObject[key] = func(key, mappedObject[key]);
  }
  return mappedObject;
}
