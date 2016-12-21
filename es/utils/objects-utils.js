export function objectsMap(object, func) {
  var mappedObject = {};
  for (var key in object) {
    mappedObject[key] = func(key, mappedObject[key]);
  }
  return mappedObject;
}