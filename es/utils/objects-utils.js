function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
export function objectsMap(object, func) {
  var mappedObject = {};
  for (var key in object) {
    mappedObject[key] = func(key, mappedObject[key]);
  }
  return mappedObject;
}
export function objectsCompare(x, y) {
  if (x === y) return true;
  if (!(x instanceof Object) || !(y instanceof Object)) return false;
  if (x.constructor !== y.constructor) return false;
  for (var p in x) {
    if (!x.hasOwnProperty(p)) continue;
    if (!y.hasOwnProperty(p)) return false;
    if (x[p] === y[p]) continue;
    if (_typeof(x[p]) !== 'object') return false;
    if (!objectsCompare(x[p], y[p])) return false;
  }
  for (var _p in y) {
    if (y.hasOwnProperty(_p) && !x.hasOwnProperty(_p)) return false;
  }
  return true;
}
export function sameSet(set1, set2) {
  return set1.size === set2.size && set1.isSuperset(set2) && set1.isSubset(set2);
}